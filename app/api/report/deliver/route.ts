import { NextRequest, NextResponse } from "next/server";
import { stripe, stripeKeyKind } from "../../../../lib/stripe";
import { funnelBase, ORDER_NO_RE } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert } from "../../../../lib/loops";
import { sendMail, BUYER_REPLY_TO } from "../../../../lib/mail";
import { reportReadyEmail } from "../../../../lib/email/templates";
import { loadOrder } from "../../../../lib/orders";
import { ADMIN_COOKIE, ADMIN_COOKIE_DAYS, adminKey, keyMatches } from "../../../../lib/admin";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 4 * 1024 * 1024; // Vercel request-body limit is 4.5 MB

// Internal: delivers the finished report.
//   POST (form)      action=login&key=…&session_id=…  → sets the admin cookie, back to /deliver
//   POST (multipart) session_id + file (+ verdict)     → emails the PDF to the buyer (Resend, attached) with the branded "report ready" email,
//                                                        stamps report_delivered_at on the PaymentIntent, moves Loops to "delivered".
export async function POST(req: NextRequest) {
  if (!adminKey()) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const base = funnelBase(req);
  const ct = req.headers.get("content-type") || "";

  if (ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    const ref = String(fd.get("ref") || "").trim().toUpperCase();
    const back = new URL(`${base}/deliver`);
    if (ORDER_NO_RE.test(ref)) back.pathname += `/${ref}`;
    else if (/^CS_(LIVE|TEST)_[A-Z0-9]+$/.test(ref)) back.searchParams.set("session_id", String(fd.get("ref")).trim());
    if (fd.get("action") === "logout") {
      const res = NextResponse.redirect(back, 303);
      res.cookies.set(ADMIN_COOKIE, "", { maxAge: 0, path: "/" });
      return res;
    }
    if (!keyMatches(String(fd.get("key") || ""))) {
      back.searchParams.set("bad", "1");
      return NextResponse.redirect(back, 303);
    }
    const res = NextResponse.redirect(back, 303);
    res.cookies.set(ADMIN_COOKIE, adminKey(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: ADMIN_COOKIE_DAYS * 86400 });
    return res;
  }

  if (!keyMatches(req.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Sign in again" }, { status: 401 });

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Bad form" }, { status: 400 });
  }
  const sessionId = String(fd.get("session_id") || "").trim();
  const order = await loadOrder(sessionId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (!order.paid) return NextResponse.json({ error: "This order was never paid" }, { status: 402 });
  if (!order.email) return NextResponse.json({ error: "No buyer email on this order" }, { status: 400 });

  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "Attach the report PDF" }, { status: 400 });
  if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) return NextResponse.json({ error: "The report must be a PDF" }, { status: 400 });
  if (file.size > MAX_PDF_BYTES) return NextResponse.json({ error: "PDF must be under 4 MB" }, { status: 400 });
  const verdict = String(fd.get("verdict") || "").trim().slice(0, 200);

  const safeSupplier = (order.supplier_name || "supplier").replace(/[^\w\-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "supplier";
  const filename = `HyprrIQ-Supplier-Report-${safeSupplier}.pdf`;
  const data = Buffer.from(await file.arrayBuffer()).toString("base64");

  const sent = await sendMail({
    to: order.email,
    email: reportReadyEmail({ supplierName: order.supplier_name || "your supplier", verdict: verdict || "see page 1", orderNo: order.orderNo || "" }),
    replyTo: BUYER_REPLY_TO,
    tag: "report_ready",
    attachments: [{ filename, contentType: "application/pdf", data }],
  });
  if (!sent.ok) return NextResponse.json({ error: sent.error || "Email could not be sent" }, { status: 502 });

  const deliveredAt = new Date().toISOString();
  try {
    if (order.piId) {
      await stripe().paymentIntents.update(order.piId, {
        metadata: { report_delivered_at: deliveredAt, report_verdict: verdict.slice(0, 500), report_file: filename, report_sends: String(Number(order.deliveredAt ? 1 : 0) + 1) },
      });
    }
  } catch (e) {
    console.error("[report/deliver] stripe metadata", `key ${stripeKeyKind()} ·`, e instanceof Error ? e.message : e);
  }
  // Loops: stage "delivered" (exit for every reminder workflow) + an event a future follow-up could hang off.
  await loopsUpsert(order.email, { funnelStage: "delivered", deliveredAt });
  await loopsEvent(order.email, "report_delivered", { supplier: order.supplier_name, orderNo: order.orderNo, resend: !!order.deliveredAt });

  return NextResponse.json({ ok: true, sentTo: order.email, filename, deliveredAt, resend: !!order.deliveredAt });
}
