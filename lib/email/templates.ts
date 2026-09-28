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

// ── building blocks ──────────────────────────────────────────────────────────────────────────────────────
// "Case File" look, matching the landing page: navy header, a case strip (order no. + status), hard-shadow
// buttons, a dashed 10-hour guarantee seal, footer outside the card. Arial for email safety; the order number
// sits in a typewriter face as the case reference.
const MONO = "'Courier New', Courier, monospace";
const a = (url: string, label: string) => `<a href="${href(url)}" style="color:${C.link};text-decoration:underline;">${label}</a>`;
const mutedSpan = (s: string) => `<span style="color:${C.muted};">${s}</span>`;
function h1(s: string) {
  return `<h1 style="margin:0 0 14px;font-family:${FONT};font-size:24px;line-height:125%;letter-spacing:-0.3px;font-weight:700;color:${C.navy};">${s}</h1>`;
}
function h3(s: string) {
  return `<h3 style="margin:0 0 10px;font-family:${FONT};font-size:16px;line-height:125%;font-weight:700;color:${C.navy};">${s}</h3>`;
}
function p(s: string, o: { size?: number; align?: string; lh?: number; mb?: number; color?: string } = {}) {
  return `<p style="margin:0 0 ${o.mb ?? 16}px;font-family:${FONT};font-size:${o.size ?? 16}px;line-height:${o.lh ?? 160}%;color:${o.color ?? C.text};${o.align ? `text-align:${o.align};` : ""}">${s}</p>`;
}
function box(inner: string, o: { bg: string; radius: number; pad: [number, number, number, number]; mb?: number; border?: string }) {
  const [t, r, b, l] = o.pad;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${o.mb ?? 16}px;border-collapse:separate;"><tr><td style="background:${o.bg};border-radius:${o.radius}px;padding:${t}px ${r}px ${b}px ${l}px;${o.border ? `border:${o.border};` : ""}">${inner}</td></tr></table>`;
}
/** Cobalt button with the page's hard navy drop shadow (a solid bottom/right edge works in every client). */
function button(url: string, label: string, align: "left" | "center" = "left", padTop = 4) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;"><tr><td align="${align}" style="padding-top:${padTop}px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr><td style="background:${C.button};border-radius:8px;border-right:3px solid ${C.navy};border-bottom:3px solid ${C.navy};">
<a href="${href(url)}" style="display:inline-block;padding:14px 26px;font-family:${FONT};font-size:16px;font-weight:700;line-height:20px;color:#ffffff;text-decoration:none;border-radius:8px;">${label} &rarr;</a>
</td></tr></table></td></tr></table>`;
}
/** The 10-hour guarantee as a dashed seal, like the one under the $79 price card. */
function guarantee(line: string) {
  return box(
    p(`<strong style="color:${C.navy};">10-hour guarantee</strong><br>${line}`, { size: 15, lh: 150, mb: 0 }),
    { bg: "#FFFDF2", radius: 10, pad: [14, 18, 14, 18], border: `2px dashed ${C.navy}`, mb: 18 },
  );
}
/** Paid → Supplier details → Report. Only used where the email is about that sequence. */
type Step = { label: string; state: "done" | "now" | "next" };
function steps(list: Step[]) {
  const cell = (s: Step, i: number) => {
    const dot =
      s.state === "done"
        ? `background:${C.button};color:#ffffff;border:2px solid ${C.button};`
        : s.state === "now"
          ? `background:${C.due};color:${C.navy};border:2px solid ${C.navy};`
          : `background:#ffffff;color:${C.muted};border:2px solid ${C.border};`;
    const mark = s.state === "done" ? "&#10003;" : String(i + 1);
    return `<td width="33%" valign="top" style="width:33%;padding:0 4px;text-align:center;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td width="26" height="26" align="center" valign="middle" style="width:26px;height:26px;border-radius:50%;${dot}font-family:${FONT};font-size:13px;font-weight:700;line-height:26px;">${mark}</td></tr></table>
<div style="margin-top:6px;font-family:${FONT};font-size:13px;line-height:140%;color:${s.state === "next" ? C.muted : C.navy};font-weight:${s.state === "now" ? 700 : 400};">${s.label}</div></td>`;
  };
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;"><tr>${list.map(cell).join("")}</tr></table>`;
}

function footer() {
  const sep = mutedSpan(" · ");
  const company = "HyprrIQ Supplier Reports · Hyprr Retail LLC · 30 N Gould St, Ste\u200B R, Sheridan, WY\u200B 82801 · Research and evidence, not legal advice.";
  return `<tr><td style="padding:18px 24px 0 24px;text-align:center;">
${p(`${a(`${SITE}/terms`, "Terms")}${sep}${a(`${SITE}/privacy`, "Privacy")}${sep}${a(`${SITE}/refunds`, "Refunds")}${sep}${a(`mailto:${SUPPORT_EMAIL}`, SUPPORT_EMAIL)}`, { size: 13, lh: 150, mb: 8, align: "center" })}
${p(mutedSpan(company), { size: 12, lh: 150, mb: 0, align: "center" })}
</td></tr>`;
}

/** Case strip under the header: order number (case reference) on the left, where the order stands on the right. */
function caseStrip(orderNo: string, status: string, statusColor: string) {
  if (!orderNo && !status) return "";
  return `<tr><td style="background:${C.tint};border-bottom:1px solid ${C.border};padding:10px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family:${MONO};font-size:13px;line-height:18px;color:${C.navy};">${orderNo ? `Case ${esc(orderNo)}` : "&nbsp;"}</td>
<td align="right" style="font-family:${FONT};font-size:13px;line-height:18px;font-weight:700;color:${statusColor};">${esc(status)}</td>
</tr></table></td></tr>`;
}

function layout(o: { preheader: string; body: string; pad: [number, number, number, number]; withFooter: boolean; orderNo?: string; status?: string; statusColor?: string }) {
  const [t, r, b, l] = o.pad;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title></title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page};font-size:1px;line-height:1px;">${esc(o.preheader)}${"&#8203;&nbsp;".repeat(40)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};"><tr><td align="center" style="padding:28px 12px 32px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid ${C.border};border-radius:12px;border-collapse:separate;overflow:hidden;">
<tr><td style="background:${C.navy};border-radius:11px 11px 0 0;font-size:0;line-height:0;"><img src="${HEADER_IMG}" width="600" alt="HyprrIQ" style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;border-radius:11px 11px 0 0;"></td></tr>
${caseStrip(o.orderNo || "", o.status || "", o.statusColor || C.navy)}
<tr><td style="padding:${t}px ${r}px ${b}px ${l}px;font-family:${FONT};color:${C.text};">
${o.body}
</td></tr>
</table>
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
      const l = label.replace(/<[^>]+>/g, "").replace(/&rarr;/g, "").trim();
      const url = u.replace(/^mailto:/, "").replace(/&amp;/g, "&");
      return l === url || !u || u === "#" ? l : `${l} (${url})`;
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h1|h3|tr|div)>/gi, "\n\n")
    .replace(/<\/td>/gi, "  ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#10003;/g, "✓")
    .replace(/&rarr;/g, "→")
    .replace(/&#8203;|\u200B/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type Frame = { orderNo?: string; status?: string; statusColor?: string };
function build(subject: string, preheader: string, body: string, pad: [number, number, number, number], withFooter: boolean, frame: Frame = {}): Email {
  const html = layout({ preheader, body, pad, withFooter, ...frame });
  return { subject: oneLine(subject), html, text: htmlToText(html) };
}
const PAD: [number, number, number, number] = [28, 32, 12, 32];

// ── 1. Payment received ────────────────────────────────────────────────────────────────────────────────────
export function paymentReceivedEmail(d: { formUrl: string; orderNo: string }): Email {
  const body = [
    h1("Payment received. One thing before we start."),
    steps([{ label: "Paid", state: "done" }, { label: "Supplier details", state: "now" }, { label: "Report", state: "next" }]),
    p("Thanks — your $79 payment for the HyprrIQ Supplier Report is in. We can't start until you tell us who to look at."),
    button(d.formUrl || `${SITE}/thank-you`, "Tell us about your supplier"),
    p("One supplier per report — list only the brands you're buying from this supplier (up to 5). Add their invoice or LOA if you have one."),
    guarantee(`Your report arrives within 10 hours of that form. Not in your inbox within 10 hours? ${a(`${SITE}/refunds`, "Full refund")}.`),
    p("We never contact your supplier.", { size: 15, color: C.muted }),
  ].join("\n");
  return build("Payment received — now tell us about your supplier", "Your report can't start until the supplier form is in. Takes 3 minutes.", body, PAD, true, { orderNo: d.orderNo, status: "Action needed", statusColor: C.amberText });
}

// ── 2. Order confirmed ─────────────────────────────────────────────────────────────────────────────────────
export function orderConfirmedEmail(d: { supplierName: string; supplierWebsite: string; brands: string; files: string; formUrl: string; orderNo: string }): Email {
  const row = (k: string, v: string, last = false) =>
    `<tr><td width="30%" valign="top" style="width:30%;padding:8px 0;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${FONT};font-size:14px;color:${C.muted};">${k}</td><td valign="top" style="padding:8px 0;${last ? "" : `border-bottom:1px solid ${C.border};`}font-family:${FONT};font-size:15px;color:${C.text};word-break:break-word;">${esc(v)}</td></tr>`;
  const sent =
    h3("What you sent us") +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${row("Supplier", d.supplierName || "your supplier")}${row("Website", d.supplierWebsite || "—")}${row("Brands", d.brands || "—")}${row("Files", d.files || "none", true)}</table>`;
  const body = [
    h1("You're all set. Your report is on its way."),
    steps([{ label: "Paid", state: "done" }, { label: "Supplier details", state: "done" }, { label: "Report", state: "now" }]),
    p("We have everything we need. Your HyprrIQ Supplier Report arrives in this inbox within 10 hours."),
    box(sent, { bg: "#ffffff", radius: 10, pad: [16, 18, 8, 18], border: `1px solid ${C.border}`, mb: 18 }),
    guarantee(`Report within 10 hours. Not in your inbox within 10 hours? ${a(`${SITE}/refunds`, "Full refund")}.`),
    p(`Something wrong? Reply to this email or ${a(d.formUrl || `${SITE}/thank-you`, "review your details")}.`),
    p("We never contact your supplier.", { size: 15, color: C.muted }),
  ].join("\n");
  return build("Order confirmed — your report is on its way", "We have what we need. Your supplier report arrives within 10 hours.", body, PAD, true, { orderNo: d.orderNo, status: "In progress", statusColor: C.link });
}

// ── 3. Report ready (PDF attached by the caller) ───────────────────────────────────────────────────────────
/** Verdict colour by level wording: clear = green, verify = amber, do-not-rely / avoid = red, else navy. */
function verdictTone(v: string): { bg: string; edge: string; ink: string } {
  const s = v.toLowerCase();
  if (/source clear|\bclear\b|level 1/.test(s)) return { bg: "#EAF7EF", edge: "#1E8E4E", ink: "#14532D" };
  if (/do not rely|avoid|high risk|level 4|level 5/.test(s)) return { bg: "#FDECEC", edge: "#C62828", ink: "#7F1D1D" };
  if (/verify|caution|level 2|level 3/.test(s)) return { bg: "#FFF6DA", edge: "#D9A400", ink: "#6B4E00" };
  return { bg: C.tint, edge: C.navy, ink: C.navy };
}
export function reportReadyEmail(d: { supplierName: string; verdict: string; orderNo: string }): Email {
  const supplier = d.supplierName || "your supplier";
  const verdict = d.verdict || "see page 1";
  const tone = verdictTone(verdict);
  const verdictCard = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;border-collapse:separate;"><tr>
<td width="6" style="width:6px;background:${tone.edge};border-radius:8px 0 0 8px;font-size:0;line-height:0;">&nbsp;</td>
<td style="background:${tone.bg};border-radius:0 8px 8px 0;padding:14px 18px;">
<p style="margin:0 0 2px;font-family:${FONT};font-size:13px;line-height:150%;color:${tone.ink};">Verdict</p>
<p style="margin:0;font-family:${FONT};font-size:19px;line-height:135%;font-weight:700;color:${tone.ink};">${esc(verdict)}</p>
</td></tr></table>`;
  const body = [
    h1(`Your report on ${esc(supplier)} is ready.`),
    steps([{ label: "Paid", state: "done" }, { label: "Supplier details", state: "done" }, { label: "Report", state: "done" }]),
    verdictCard,
    p("It's attached as a PDF. Page 1 is the verdict and the single most important risk; the questions to send your supplier are at the end."),
    p("Every finding carries a certainty label — Verified, Assessed or Not assessed — and the report says plainly what we could not confirm."),
    box(
      p(`Found a factual error? Reply to this email within 7 days and we'll correct it. A verdict you don't like isn't a refund — but a mistake is ours to fix. ${a(`${SITE}/refunds`, "Refund policy")}.`, { size: 15, lh: 155, mb: 0 }),
      { bg: C.tint, radius: 10, pad: [14, 18, 14, 18], mb: 18 },
    ),
    p("Checking another supplier? Each report covers one supplier and up to 5 of its brands."),
    button(`${SITE}/email`, "Order another report"),
  ].join("\n");
  return build(`Your supplier report is ready: ${supplier}`, "Verdict, findings, what we couldn't confirm, and the questions to send your supplier.", body, PAD, true, { orderNo: d.orderNo, status: "Delivered", statusColor: "#1E8E4E" });
}

// ── 4. Checklist (exit popup) ──────────────────────────────────────────────────────────────────────────────
export function checklistEmail(d: { checklistUrl: string; siteUrl: string }): Email {
  const body = [
    h1("Your 9 red-flag checklist"),
    p("Here it is — the things we look at in the first ten minutes on every supplier."),
    button(d.checklistUrl || `${SITE}/9-red-flags.pdf`, "Open the checklist (PDF)"),
    box(
      p("Run it on the supplier you're talking to now. If more than two flags come up, that's exactly the case a $79 Supplier Report is for: one supplier, up to 5 brands, in your inbox within 10 hours.", { size: 15, lh: 155, mb: 12 }) +
        p(`<strong>${a(d.siteUrl || `${SITE}/email`, "Check my supplier — $79")}</strong>`, { size: 15, mb: 0 }),
      { bg: "#FFFDF2", radius: 10, pad: [16, 18, 16, 18], border: `2px dashed ${C.navy}`, mb: 18 },
    ),
    p("We never contact your supplier.", { size: 15, color: C.muted }),
  ].join("\n");
  return build("Your 9 red-flag checklist", "The nine things to check on a wholesale supplier before you pay.", body, PAD, true);
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
function cardRow(label: string, valueHtml: string, last: boolean, was?: string) {
  const line = last ? "" : `border-bottom:1px solid ${C.border};`;
  return `<tr>
<td width="30%" valign="top" style="width:30%;padding:10px 6px 10px 14px;${line}font-family:${FONT};font-size:13px;line-height:150%;color:${C.muted};">${label}</td>
<td width="70%" valign="top" style="width:70%;padding:10px 14px 10px 6px;${line}font-family:${FONT};font-size:15px;line-height:150%;color:${C.text};word-break:break-word;">${valueHtml}${wasLine(was)}</td>
</tr>`;
}

export function orderCardEmail(d: OrderCardData, updated: boolean): Email {
  const rows = [
    cardRow("Buyer", a(`mailto:${d.buyerEmail}`, esc(d.buyerEmail)), false),
    cardRow("Supplier", `<strong>${esc(d.supplierName)}</strong><br>${a(d.websiteUrl || "https://", esc(d.supplierWebsite))}`, false, updated ? d.supplierWas : ""),
    cardRow("Brands", esc(d.brands), false, updated ? d.brandsWas : ""),
    cardRow("Category", esc(d.category || "—"), false, updated ? d.categoryWas : ""),
    cardRow("Amount paid", esc(d.amount), false),
    cardRow("Notes", esc(d.notes || "—"), false, updated ? d.notesWas : ""),
    cardRow("Files", esc(d.files || "none"), true),
  ].join("\n");
  const body = [
    updated
      ? box(
          p(`<strong style="color:${C.amberText};">Updated</strong><span style="color:${C.amberText};"> — the buyer edited their details. Changed fields show “was: …”. 10-hour clock unchanged; no new order or charge.</span>`, { size: 13, mb: 0 }),
          { bg: C.amberBg, radius: 8, pad: [10, 14, 10, 14] },
        )
      : "",
    box(p(`<strong>Due by</strong> ${esc(d.dueET)}`, { size: 18, mb: 0, color: C.navy }), { bg: C.due, radius: 8, pad: [12, 16, 12, 16], border: `2px solid ${C.navy}` }),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px;border:1px solid ${C.border};border-radius:10px;border-collapse:separate;">${rows}</table>`,
    button(d.deliverUrl, "Send the finished report", "center", 0),
    p(`${a(d.stripeUrl, "Stripe payment")}${mutedSpan(" · ")}${a(d.formUrl, "Buyer's form")}`, { size: 13, align: "center", mb: 0 }),
  ].join("\n");
  const subject = `${updated ? "Updated order" : "New order"} · ${d.supplierName} · ${d.brands} · due ${d.dueTime} ET`;
  const preheader = updated ? `The buyer edited their details. ${d.orderNo} · 10-hour clock unchanged.` : `${d.orderNo} · ${d.amount} · due ${d.dueET}`;
  return build(subject, preheader, body, [22, 32, 26, 32], false, { orderNo: d.orderNo, status: updated ? "Updated order" : "New order", statusColor: updated ? C.amberText : C.navy });
}
