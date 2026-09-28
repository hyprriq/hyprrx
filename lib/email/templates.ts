// The six funnel emails, ported 1:1 from the Loops transactional templates (theme "HyprrIQ Reports",
// header + footer components) to plain table-based HTML for Resend. Same copy, colours, sizes and footer.
// Every value that can come from a buyer is HTML-escaped here — never pass pre-built HTML in the data objects.

const C = {
  navy: "#0B1B33",
  page: "#F6F8FB",
  tint: "#F6F8FB",
  border: "#DCE2EB",
  text: "#1F2A3D",
  muted: "#67748A",
  link: "#1C4FE0",
  button: "#1C4FE0",
  due: "#FFE45C",
  amberBg: "#FFF3CD",
  amberText: "#7A5A00",
};
const FONT = "Arial, Helvetica, sans-serif";
const SITE = "https://report.hyprrx.com"; // legal links are always the live pages (same as the Loops footer)
const HEADER_IMG = "https://images.vialoops.com/cmujm4kvb1kyz0j3rlyambkuh/cmukw7ki00sut0j18hkzh1f0f.png";
export const SUPPORT_EMAIL = "hello@hyprriq.com";

export type Email = { subject: string; html: string; text: string };

export function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
/** Only http(s)/mailto links survive; anything else becomes "#". */
function href(u: string): string {
  const s = String(u || "").trim();
  return /^(https?:\/\/|mailto:)/i.test(s) ? esc(s) : "#";
}
const oneLine = (s: string) => String(s || "").replace(/[\r\n]+/g, " ").trim();

// ── building blocks (theme values from Loops theme cmujmk6dt287s0177tt4eggcv) ─────────────────────────────
const a = (url: string, label: string) => `<a href="${href(url)}" style="color:${C.link};text-decoration:underline;">${label}</a>`;
const mutedSpan = (s: string) => `<span style="color:${C.muted};">${s}</span>`;
function h1(s: string) {
  return `<h1 style="margin:0 0 16px;font-family:${FONT};font-size:26px;line-height:120%;letter-spacing:-0.3px;font-weight:700;color:${C.navy};">${s}</h1>`;
}
function h3(s: string) {
  return `<h3 style="margin:0 0 10px;font-family:${FONT};font-size:17px;line-height:125%;font-weight:700;color:${C.navy};">${s}</h3>`;
}
function p(s: string, o: { size?: number; align?: string; lh?: number; mb?: number } = {}) {
  return `<p style="margin:0 0 ${o.mb ?? 16}px;font-family:${FONT};font-size:${o.size ?? 16}px;line-height:${o.lh ?? 160}%;color:${C.text};${o.align ? `text-align:${o.align};` : ""}">${s}</p>`;
}
function box(inner: string, o: { bg: string; radius: number; pad: [number, number, number, number]; mb?: number }) {
  const [t, r, b, l] = o.pad;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${o.mb ?? 16}px;border-collapse:separate;"><tr><td style="background:${o.bg};border-radius:${o.radius}px;padding:${t}px ${r}px ${b}px ${l}px;">${inner}</td></tr></table>`;
}
function button(url: string, label: string, align: "left" | "center" = "left", padTop = 0) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;"><tr><td align="${align}" style="padding-top:${padTop}px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.button};border-radius:8px;">
<a href="${href(url)}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:16px;font-weight:700;line-height:20px;color:#ffffff;text-decoration:none;border-radius:8px;">${label}</a>
</td></tr></table></td></tr></table>`;
}
const orderLine = (orderNo: string) => (orderNo ? p(`${mutedSpan("Order ")}${esc(orderNo)}`, { size: 13 }) : "");

function footer() {
  const sep = mutedSpan(" · ");
  const company = "HyprrIQ Supplier Reports · Hyprr Retail LLC · 30 N Gould St, Ste\u200B R, Sheridan, WY\u200B 82801 · Research and evidence, not legal advice.";
  return `<tr><td style="padding:8px 32px 28px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;"><tr><td style="border-top:1px solid ${C.border};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr></table>
${p(mutedSpan(company), { size: 13, lh: 150 })}
${p(`${a(`${SITE}/terms`, "Terms")}${sep}${a(`${SITE}/privacy`, "Privacy")}${sep}${a(`${SITE}/refunds`, "Refunds")}${sep}${a(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}`, { size: 13, lh: 150, mb: 0 })}
</td></tr>`;
}

function layout(o: { preheader: string; body: string; pad: [number, number, number, number]; withFooter: boolean }) {
  const [t, r, b, l] = o.pad;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><title></title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page};font-size:1px;line-height:1px;">${esc(o.preheader)}${"&#8203;&nbsp;".repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${C.border};border-radius:12px;border-collapse:separate;overflow:hidden;">
<tr><td style="background:${C.navy};border-radius:11px 11px 0 0;font-size:0;line-height:0;"><img src="${HEADER_IMG}" width="600" alt="HyprrIQ" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;border-radius:11px 11px 0 0;"></td></tr>
<tr><td style="padding:${t}px ${r}px ${b}px ${l}px;font-family:${FONT};color:${C.text};">
${o.body}
</td></tr>
${o.withFooter ? footer() : ""}
</table>
</td></tr></table>
</body></html>`;
}

/** Plain-text part (multipart alternative) derived from the HTML. */
export function htmlToText(html: string): string {
  return html
    .replace(/<div style="display:none[\s\S]*?<\/div>/, "")
    .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_m, u: string, label: string) => {
      const l = label.replace(/<[^>]+>/g, "").trim();
      const url = u.replace(/^mailto:/, "").replace(/&amp;/g, "&");
      return l === url || !u || u === "#" ? l : `${l} (${url})`;
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h1|h3|tr)>/gi, "\n\n")
    .replace(/<\/td>/gi, "  ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8203;|\u200B/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function build(subject: string, preheader: string, body: string, pad: [number, number, number, number], withFooter: boolean): Email {
  const html = layout({ preheader, body, pad, withFooter });
  return { subject: oneLine(subject), html, text: htmlToText(html) };
}

// ── 1. Payment received ────────────────────────────────────────────────────────────────────────────────────
export function paymentReceivedEmail(d: { formUrl: string; orderNo: string }): Email {
  const body = [
    h1("Payment received. One thing before we start."),
    p("Thanks — your $79 payment for the HyprrIQ Supplier Report is in. We can't start until you tell us who to look at."),
    button(d.formUrl || `${SITE}/thank-you`, "Tell us about your supplier"),
    p("One supplier per report — list only the brands you're buying from this supplier (up to 5). Add their invoice or LOA if you have one."),
    p(`Your report arrives within 10 hours of that form. Not in your inbox within 10 hours? ${a(`${SITE}/refunds`, "Full refund")}.`),
    p("We never contact your supplier."),
    orderLine(d.orderNo),
  ].join("\n");
  return build("Payment received — now tell us about your supplier", "Your report can't start until the supplier form is in. Takes 3 minutes.", body, [28, 32, 8, 32], true);
}

// ── 2. Order confirmed ─────────────────────────────────────────────────────────────────────────────────────
export function orderConfirmedEmail(d: { supplierName: string; supplierWebsite: string; brands: string; files: string; formUrl: string; orderNo: string }): Email {
  const sent =
    h3("What you sent us") +
    p(
      `<strong>Supplier:</strong> ${esc(d.supplierName || "your supplier")}<br><strong>Website:</strong> ${esc(d.supplierWebsite || "—")}<br><strong>Brands:</strong> ${esc(d.brands || "—")}<br><strong>Files:</strong> ${esc(d.files || "none")}`,
      { size: 15 },
    );
  const body = [
    h1("You're all set. Your report is on its way."),
    p("We have everything we need. Your HyprrIQ Supplier Report arrives in this inbox within 10 hours."),
    box(sent, { bg: C.tint, radius: 8, pad: [16, 18, 6, 18] }),
    p(`Report within 10 hours. Not in your inbox within 10 hours? ${a(`${SITE}/refunds`, "Full refund")}.`),
    p(`Something wrong? Reply to this email or ${a(d.formUrl || `${SITE}/thank-you`, "review your details")}.`),
    p("We never contact your supplier."),
    orderLine(d.orderNo),
  ].join("\n");
  return build("Order confirmed — your report is on its way", "We have what we need. Your supplier report arrives within 10 hours.", body, [28, 32, 8, 32], true);
}

// ── 3. Report ready (PDF attached by the caller) ───────────────────────────────────────────────────────────
export function reportReadyEmail(d: { supplierName: string; verdict: string; orderNo: string }): Email {
  const supplier = d.supplierName || "your supplier";
  const body = [
    h1(`Your report on ${esc(supplier)} is ready.`),
    p("It's attached as a PDF. Page 1 is the verdict and the single most important risk; the questions to send your supplier are at the end."),
    box(p(`<strong>Verdict: </strong>${esc(d.verdict || "see page 1")}`, { mb: 0 }), { bg: C.tint, radius: 8, pad: [14, 18, 14, 18] }),
    p("Every finding carries a certainty label — Verified, Assessed or Not assessed — and the report says plainly what we could not confirm."),
    p(`Found a factual error? Reply to this email within 7 days and we'll correct it. A verdict you don't like isn't a refund — but a mistake is ours to fix. ${a(`${SITE}/refunds`, "Refund policy")}.`),
    p(`Checking another supplier? Each report covers one supplier and up to 5 of its brands. ${a(`${SITE}/email`, "Order another report")}.`),
    orderLine(d.orderNo),
  ].join("\n");
  return build(`Your supplier report is ready: ${supplier}`, "Verdict, findings, what we couldn't confirm, and the questions to send your supplier.", body, [28, 32, 8, 32], true);
}

// ── 4. Checklist (exit popup) ──────────────────────────────────────────────────────────────────────────────
export function checklistEmail(d: { checklistUrl: string; siteUrl: string }): Email {
  const body = [
    h1("Your 9 red-flag checklist"),
    p("Here it is — the things we look at in the first ten minutes on every supplier."),
    button(d.checklistUrl || `${SITE}/9-red-flags.pdf`, "Open the checklist (PDF)"),
    p("Run it on the supplier you're talking to now. If more than two flags come up, that's exactly the case a $79 Supplier Report is for: one supplier, up to 5 brands, in your inbox within 10 hours."),
    p(a(d.siteUrl || `${SITE}/email`, "Check my supplier — $79")),
    p("We never contact your supplier."),
  ].join("\n");
  return build("Your 9 red-flag checklist", "The nine things to check on a wholesale supplier before you pay.", body, [28, 32, 8, 32], true);
}

// ── 5 + 6. Internal order card (NEW / UPDATED) — no footer, US Eastern times, Reply-To = buyer ─────────────
export type OrderCardData = {
  orderNo: string;
  buyerEmail: string;
  supplierName: string;
  supplierWebsite: string;
  websiteUrl: string;
  brands: string;
  category: string;
  amount: string;
  notes: string;
  files: string;
  dueET: string;
  dueTime: string;
  deliverUrl: string;
  stripeUrl: string;
  formUrl: string;
  // UPDATED only: previous values; "" hides the "was:" line
  supplierWas?: string;
  brandsWas?: string;
  categoryWas?: string;
  notesWas?: string;
};

function wasLine(v?: string) {
  if (!v) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 0;border-collapse:separate;"><tr><td style="background:${C.amberBg};border-radius:4px;padding:4px 8px;font-family:${FONT};font-size:13px;line-height:150%;color:${C.text};"><span style="color:${C.amberText};">was: </span>${esc(v)}</td></tr></table>`;
}
function cardRow(label: string, valueHtml: string, zebra: boolean, was?: string) {
  return `<tr style="background:${zebra ? C.tint : "#ffffff"};">
<td width="30%" valign="top" style="width:30%;padding:9px 6px 9px 14px;font-family:${FONT};font-size:12px;line-height:160%;color:${C.muted};">${label}</td>
<td width="70%" valign="top" style="width:70%;padding:9px 14px 9px 6px;font-family:${FONT};font-size:15px;line-height:160%;color:${C.text};word-break:break-word;">${valueHtml}${wasLine(was)}</td>
</tr>`;
}

export function orderCardEmail(d: OrderCardData, updated: boolean): Email {
  const rows = [
    cardRow("ORDER NO.", esc(d.orderNo), true),
    cardRow("BUYER", a(`mailto:${d.buyerEmail}`, esc(d.buyerEmail)), false),
    cardRow("SUPPLIER", `${esc(d.supplierName)}<br>${a(d.websiteUrl || "https://", esc(d.supplierWebsite))}`, true, updated ? d.supplierWas : ""),
    cardRow("BRANDS", esc(d.brands), false, updated ? d.brandsWas : ""),
    cardRow("CATEGORY", esc(d.category || "—"), true, updated ? d.categoryWas : ""),
    cardRow("AMOUNT PAID", esc(d.amount), false),
    cardRow("NOTES", esc(d.notes || "—"), true, updated ? d.notesWas : ""),
    cardRow("FILES", esc(d.files || "none"), false),
  ].join("\n");
  const body = [
    updated
      ? box(
          p(`<strong style="color:${C.amberText};">UPDATED</strong><span style="color:${C.amberText};"> — the buyer edited their details. Changed fields show “was: …”. 10-hour clock unchanged; no new order or charge.</span>`, { size: 13, mb: 0 }),
          { bg: C.amberBg, radius: 6, pad: [10, 14, 10, 14] },
        )
      : "",
    box(p(`<strong>Due by</strong> ${esc(d.dueET)}`, { size: 18, mb: 0 }), { bg: C.due, radius: 8, pad: [12, 16, 12, 16] }),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;border-collapse:collapse;">${rows}</table>`,
    button(d.deliverUrl, "Send the finished report", "center", 0),
    p(`${a(d.stripeUrl, "Stripe payment")}${mutedSpan(" · ")}${a(d.formUrl, "Buyer's form")}`, { size: 13, align: "center", mb: 0 }),
  ].join("\n");
  const subject = `${updated ? "Updated order" : "New order"} · ${d.supplierName} · ${d.brands} · due ${d.dueTime} ET`;
  const preheader = updated ? `The buyer edited their details. ${d.orderNo} · 10-hour clock unchanged.` : `${d.orderNo} · ${d.amount} · due ${d.dueET}`;
  return build(subject, preheader, body, [24, 32, 28, 32], false);
}
