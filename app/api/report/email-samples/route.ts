import { NextRequest, NextResponse } from "next/server";
import { sendMail, BUYER_REPLY_TO } from "../../../../lib/mail";
import {
  checklistEmail,
  orderCardEmail,
  orderConfirmedEmail,
  paymentReceivedEmail,
  reportReadyEmail,
  type OrderCardData,
} from "../../../../lib/email/templates";

export const runtime = "nodejs";

// Preview-only: sends every funnel email with sample data so the design can be checked in a real inbox.
// Never runs in Production; only ever sends to the two fixed addresses below.
const ALLOWED = ["gautamnaidu.p@gmail.com", "g@hyprrx.com"];

// Smallest valid one-page PDF, so the report-ready sample carries a real attachment.
const SAMPLE_PDF = Buffer.from(
  "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n" +
    "3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\n" +
    "4 0 obj<</Length 58>>stream\nBT /F1 24 Tf 72 700 Td (HyprrIQ sample report - test) Tj ET\nendstream endobj\n" +
    "5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n",
).toString("base64");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: NextRequest) {
  if (process.env.VERCEL_ENV === "production") return NextResponse.json({ error: "Not found" }, { status: 404 });
  const to = (req.nextUrl.searchParams.get("to") || ALLOWED[0]).trim().toLowerCase();
  if (!ALLOWED.includes(to)) return NextResponse.json({ error: "Recipient not allowed" }, { status: 400 });
  const only = req.nextUrl.searchParams.get("only") || "";

  const base = "https://report.hyprrx.com";
  const orderNo = "HX-260928-SMPL";
  const card: OrderCardData = {
    orderNo,
    buyerEmail: to,
    supplierName: "Sample Wholesale Co",
    supplierWebsite: "samplewholesale.example",
    websiteUrl: "https://samplewholesale.example",
    brands: "Nintendo, Sony",
    category: "Video games & accessories",
    amount: "$79.00 USD · A",
    notes: "They sent an invoice with no ship-from address · asked for a 60% deposit",
    files: "invoice-sample.pdf",
    dueTime: "4:55 pm",
    dueET: "4:55 pm ET · Tue 29 Sep",
    deliverUrl: `${base}/deliver/${orderNo}`,
    stripeUrl: "https://dashboard.stripe.com/test/payments",
    formUrl: `${base}/o/${orderNo}`,
  };
  const updated: OrderCardData = { ...card, brands: "Nintendo, Sony, Bandai", brandsWas: "Nintendo, Sony", notesWas: "They sent an invoice with no ship-from address" };

  const jobs = [
    { tag: "payment_received", email: paymentReceivedEmail({ formUrl: `${base}/o/${orderNo}`, orderNo }), replyTo: BUYER_REPLY_TO },
    { tag: "order_confirmed", email: orderConfirmedEmail({ supplierName: card.supplierName, supplierWebsite: card.supplierWebsite, brands: card.brands, files: card.files, formUrl: card.formUrl, orderNo }), replyTo: BUYER_REPLY_TO },
    { tag: "report_ready", email: reportReadyEmail({ supplierName: card.supplierName, verdict: "Level 3 · Verify Before Purchase", orderNo }), replyTo: BUYER_REPLY_TO, attachments: [{ filename: "HyprrIQ-Supplier-Report-Sample-Wholesale-Co.pdf", contentType: "application/pdf", data: SAMPLE_PDF }] },
    { tag: "checklist", email: checklistEmail({ checklistUrl: `${base}/9-red-flags.pdf`, siteUrl: `${base}/email` }), replyTo: BUYER_REPLY_TO },
    { tag: "order_internal", email: orderCardEmail(card, false), replyTo: to },
    { tag: "order_updated_internal", email: orderCardEmail(updated, true), replyTo: to },
  ].filter((j) => !only || j.tag === only);

  const results: { tag: string; ok: boolean; id?: string; error?: string }[] = [];
  for (const j of jobs) {
    const r = await sendMail({ to, ...j });
    results.push({ tag: j.tag, ok: r.ok, id: r.id, error: r.error });
    await sleep(600); // Resend default limit: 2 requests / second
  }
  return NextResponse.json({ to, results });
}
