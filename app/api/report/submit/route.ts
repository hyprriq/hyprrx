import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { FUNNEL_TAG } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert, LOOPS_TX } from "../../../../lib/loops";

export const runtime = "nodejs";

const ORDER_INBOX = process.env.REPORT_ORDER_INBOX || "g@hyprrx.com";
const MAX_FILES = 2;
const MAX_BYTES = 4 * 1024 * 1024;
const OK_TYPES = ["application/pdf", "image/jpeg", "image/png"];

function str(fd: FormData, k: string, max = 2000) {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Bad form" }, { status: 400 });
  }
  const sessionId = str(fd, "session_id", 200);
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return NextResponse.json({ error: "Missing order reference" }, { status: 400 });

  const s = stripe();
  let cs;
  try {
    cs = await s.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (cs.payment_status !== "paid" || cs.metadata?.funnel !== FUNNEL_TAG) return NextResponse.json({ error: "Payment not found for this order" }, { status: 402 });
  const email = (cs.customer_details?.email || cs.customer_email || "").toLowerCase();

  const supplier_name = str(fd, "supplier_name", 120);
  const supplier_website = str(fd, "supplier_website", 200);
  const brands = str(fd, "brands", 300);
  const category = str(fd, "category", 120);
  const notes = str(fd, "notes");
  if (!supplier_name || !supplier_website || !brands) return NextResponse.json({ error: "Supplier name, website and brands are required." }, { status: 400 });

  // files → base64 attachments (no storage anywhere; they only travel inside the order email)
  const attachments: { filename: string; contentType: string; data: string }[] = [];
  const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0).slice(0, MAX_FILES);
  for (const f of files) {
    if (f.size > MAX_BYTES) return NextResponse.json({ error: "Each file must be under 4 MB." }, { status: 400 });
    if (!OK_TYPES.includes(f.type)) return NextResponse.json({ error: "PDF, JPG or PNG only." }, { status: 400 });
    const buf = Buffer.from(await f.arrayBuffer());
    attachments.push({ filename: f.name.replace(/[^\w.\-]+/g, "_").slice(0, 80), contentType: f.type, data: buf.toString("base64") });
  }

  const amount = ((cs.amount_total || 0) / 100).toFixed(2);
  const summary = [
    `ORDER ${sessionId}`,
    `Paid: $${amount} ${cs.currency?.toUpperCase()} · variant ${cs.metadata?.variant || "?"}${cs.metadata?.promo_code ? " · code " + cs.metadata.promo_code : ""}`,
    `Buyer: ${email}`,
    `Supplier: ${supplier_name}`,
    `Website: ${supplier_website}`,
    `Brands: ${brands}`,
    `Product category: ${category || "—"}`,
    `Anything we should know: ${notes || "—"}`,
    `Files: ${attachments.length ? attachments.map((a) => a.filename).join(", ") : "none"}`,
    `UTM: ${["utm_source", "utm_medium", "utm_campaign", "utm_content"].map((k) => cs.metadata?.[k]).filter(Boolean).join(" / ") || "—"}`,
  ].join("\n");

  // 1) Stripe is the system of record: PaymentIntent metadata (500 chars per value)
  try {
    const piId = typeof cs.payment_intent === "string" ? cs.payment_intent : cs.payment_intent?.id;
    if (piId) {
      await s.paymentIntents.update(piId, {
        metadata: {
          supplier_name: supplier_name.slice(0, 500),
          supplier_website: supplier_website.slice(0, 500),
          brands: brands.slice(0, 500),
          category,
          notes: notes.slice(0, 500),
          files: attachments.map((a) => a.filename).join(", ").slice(0, 500),
          form_submitted_at: new Date().toISOString(),
        },
      });
    }
    // flag the session so a refresh of the thank-you page shows "Got it"
    await s.checkout.sessions.update(sessionId, { metadata: { ...cs.metadata, form_submitted: "1" } }).catch(() => {});
  } catch (e) {
    console.error("[report/submit] stripe metadata", e instanceof Error ? e.message : e);
  }

  // 2) Order email to Gautam (Loops transactional template; attachments ride along)
  const txId = LOOPS_TX.orderInternal;
  const mail = await loopsTransactionalWithAttachments(txId, ORDER_INBOX, { summary, supplier_name, supplier_website, brands, buyer_email: email, order_id: sessionId }, attachments);

  // 3) Loops: buyer moves to "form submitted" (stops form reminders)
  await loopsUpsert(email, { funnelStage: "form_submitted", supplierName: supplier_name });
  await loopsEvent(email, "form_submitted", { supplier: supplier_name, orderId: sessionId });

  if (!mail.ok) console.error("[report/submit] order email not sent — Stripe metadata holds the order", sessionId);
  return NextResponse.json({ ok: true });
}

async function loopsTransactionalWithAttachments(transactionalId: string, email: string, dataVariables: Record<string, string>, attachments: { filename: string; contentType: string; data: string }[]) {
  if (!process.env.LOOPS_API_KEY || !transactionalId) return { ok: false, skipped: true };
  try {
    const res = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ transactionalId, email, dataVariables, attachments }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
