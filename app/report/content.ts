// All copy for report.hyprrx.com lives here so edits after approval touch one file.
// Banned words (never as a conclusion): safe/unsafe, guaranteed, verified legit, ungating,
// "Amazon will accept/reject", "you should buy/not buy", "authorized" as a final conclusion.

export const PRICE = 79;
export const RECOVERY_PRICE = 59;
export const SLOT_CAP = 15;

export const CTA = {
  primary: `Check my supplier — $${PRICE}`,
  report: `Get this on my supplier — $${PRICE}`,
  under: "Report in 24h · No account · No subscription",
  underSecure: "Report in 24h · No account · No subscription · Secure card payment",
};

export const hero = {
  prehead: "Amazon wholesale sellers — read this before you pay a new supplier",
  h1a: "Before you wire that PO,",
  h1b: "know who you're wiring it to.",
  sub: "In 24 hours you get a full researched report on the supplier and the brands they're offering you: the business behind the website, whether the “authorized distributor” line holds up, how the brand treats resellers, and whether their invoice is built like real wholesale paperwork.",
  videoLabel: "What we found on one supplier — 90 seconds",
  proof: ["5 areas examined", "18 supplier questions", "Every finding sourced", "Human-reviewed"],
};

export const pain = {
  lines: ["The website looks real.", "The invoice looks real."],
  punch: "So did the last one that got someone suspended.",
  small:
    "Most sellers check a supplier the same way: Google the name, scroll the site, ask for a price list, wire the deposit. The supplier's story is the only story they ever hear.",
};

export const fear = {
  cards: [
    {
      big: "$2,000 – $10,000",
      body: "What a first wholesale PO usually costs. Wire-only or Zelle and it's gone the second it leaves your account.",
    },
    {
      big: "1 complaint",
      body: "One IP complaint or inauthentic claim pulls the listing while you fight it. Your FBA stock sits frozen. The invoice is the only thing that speaks for you.",
    },
    {
      big: "Days → months",
      body: "How long a suspension appeal can drag on — plan of action, rejection, rewrite, resubmit — with payouts held the whole time.",
    },
  ],
  kicker: "The supplier who sold you the stock won't be on that call.",
};

export const questions = {
  h2a: "Five questions you can't answer from their website.",
  h2b: "We can.",
  items: [
    {
      q: "Is the business real?",
      a: "Registration, address type (warehouse, virtual office, residential), domain age, phone and address consistency across directories, scam reports.",
    },
    {
      q: "Is the brand relationship real?",
      a: "Are they on the brand's own dealer or distributor pages — or does “authorized distributor” appear only on their site?",
    },
    {
      q: "How does the brand treat resellers?",
      a: "Enforcement history, IP complaints, marketplace gating, LOA requirements, published reseller policies.",
    },
    {
      q: "Will the invoice hold up?",
      a: "Is the paperwork built like standard wholesale documentation — or like a retail receipt with a logo on it? (Optional: upload the invoice or LOA they sent.)",
    },
    {
      q: "Does the deal make sense?",
      a: "Price against the brand's normal channel, MOQ, the stock story — the cross-check that catches “too good to be true”.",
    },
  ],
  under: "One supplier · up to 5 brands · all 5 areas",
};

export type Shot = {
  src: string;
  w: number;
  h: number;
  alt: string;
  captionStrong: string;
  caption: string;
  // red marks drawn over the screenshot; boxes are % of image width/height
  marks?: Mark[];
  // tight, phone-readable strip of the key line, shown as a magnifier under the full crop
  zoom?: { src: string; w: number; h: number; marks?: Mark[] };
};
export type Mark = { type: "stamp" | "underline" | "circle" | "arrow"; x: number; y: number; w: number; h: number };

export const reportBlock = {
  eyebrow: "Real report · supplier name blurred · brands as submitted",
  h2a: "A “PlayStation distributor” with a Miami office and real staff on LinkedIn.",
  h2b: "Here's what came back.",
  intro:
    "A seller sent us an electronics distributor offering Nintendo, Sony and PlayStation stock. The company checked out as a real business. Then we looked at the brands.",
  shots: [
    {
      src: "/report/r1-verdict-cover.webp", w: 1200, h: 448,
      alt: "Report cover verdict card: Level 3 of 4, Verify Before Purchase",
      captionStrong: "Page 1: the verdict.",
      caption: "Level 3 of 4 — Verify Before Purchase — and the one-line reason.",
      marks: [{ type: "stamp", x: 64, y: 5, w: 30, h: 20 }],
    },
    {
      src: "/report/r1-directories.webp", w: 1200, h: 504,
      alt: "Remaining unknowns: not listed on Nintendo or Sony dealer pages",
      captionStrong: "Not on Nintendo's retailer or distributor pages. Not in Sony's dealer directory.",
      caption: "The only “distributor” claim comes from the supplier itself.",
      zoom: { src: "/report/r1-directories-zoom.webp", w: 900, h: 297, marks: [{ type: "underline", x: 6, y: 26, w: 60, h: 8 }, { type: "underline", x: 6, y: 90, w: 60, h: 8 }] },
    },
    {
      src: "/report/r1-brand-risk.webp", w: 1200, h: 992,
      alt: "Brand risk signals for Nintendo, Sony and PlayStation",
      captionStrong: "Nintendo listings need a Letter of Authorization on Amazon, per seller reports. One Sony reseller described ~40 IP notices within weeks.",
      caption: "We separate what's verified from what's forum talk.",
      zoom: { src: "/report/r1-brand-risk-zoom.webp", w: 900, h: 108, marks: [{ type: "circle", x: 0, y: 42, w: 62, h: 54 }] },
    },
    {
      src: "/report/r1-could-not-confirm.webp", w: 1200, h: 690,
      alt: "What we could not confirm: PlayStation distributor page references only the PS4",
      captionStrong: "Their “PlayStation distributor” page mentions only the PS4 — a console from 2013.",
      caption: "Nothing covers current hardware.",
      zoom: { src: "/report/r1-could-not-confirm-zoom.webp", w: 900, h: 108, marks: [{ type: "underline", x: 0, y: 84, w: 64, h: 14 }] },
    },
    {
      src: "/report/r1-findings-table.webp", w: 1200, h: 540,
      alt: "Assessment findings table with certainty labels",
      captionStrong: "Every area carries a certainty label: Verified · Assessed · Not assessed.",
      caption: "You always know how hard the evidence is.",
    },
    {
      src: "/report/r1-checklist.webp", w: 1200, h: 1000,
      alt: "Verification checklist: questions to put to the supplier",
      captionStrong: "18 questions to send this supplier before you commit.",
      caption: "Written for this case, not a generic list.",
    },
    {
      src: "/report/r1-verdict-page.webp", w: 1200, h: 1130,
      alt: "Verdict page with the single most important risk",
      captionStrong: "The single most important risk, in plain English, on one page.",
      caption: "",
      zoom: { src: "/report/r1-verdict-page-zoom.webp", w: 900, h: 198 },
    },
  ] as Shot[],
};

export const how = {
  h2a: "Pay. Tell us the supplier.",
  h2b: "Get the report tomorrow.",
  steps: [
    {
      t: "Two minutes.",
      b: `Pay $${PRICE} by card. Then fill in the supplier: name, website, the brands on offer, what they've told you. Upload the invoice or LOA if you have one (optional, up to 2 files).`,
    },
    {
      t: "We research.",
      b: "Company registries, domain and address records, brand dealer pages, reseller policies, enforcement history, seller-community signals. Every finding carries its source. A person reviews the report before it goes out.",
    },
    {
      t: "Inbox, within 24 hours.",
      b: "A PDF: verdict, findings by area, what we could not confirm, and the questions to put to the supplier. No account. No subscription. Nothing renews.",
    },
  ],
  line: "We never contact your supplier. They will not know you checked.",
};

export const proof = {
  h2a: "Three suppliers sellers were about to pay.",
  h2b: "Same verdict. Three different reasons.",
  cases: [
    {
      n: "Case 1",
      who: "Electronics distributor → Nintendo · Sony · PlayStation",
      body: "Real company. Real office. Real staff on LinkedIn. Absent from every official Nintendo and Sony dealer or distributor page we could find; its own “distributor” page references only the PS4. Nintendo requires an LOA to list on Amazon.",
      verdict: "Verify Before Purchase",
    },
    {
      n: "Case 2",
      who: "Beauty wholesaler → RevitaLash · Bioderma",
      body: "A+ BBB rating, consistent address and phone across directories. Missing from both brands' official reseller and store lists. RevitaLash's published distribution agreement restricts online sales to pre-approved sellers on pre-approved sites, and the brand publicly warns buyers off unauthorized sources.",
      verdict: "Verify Before Purchase",
      shot: { src: "/report/r2-brand-risk.webp", w: 1200, h: 695, alt: "RevitaLash and Bioderma risk signals" },
      zoom: { src: "/report/r2-brand-risk-zoom.webp", w: 900, h: 147, marks: [{ type: "underline", x: 6, y: 30, w: 92, h: 10 }] as Mark[] },
    },
    {
      n: "Case 3",
      who: "47-year-old New York distributor → Aquaphor · Florida Water · African Pride · Clubman · SoftSheen",
      body: "Decades in business, physical address, listed on BBB, Yelp, Crunchbase. Calls itself an “Authorized Distributor” for all five brands. For three of the five the record contained nothing at all — no brand policy, no channel, no relationship. A real supplier is not the same as a resolved brand.",
      verdict: "Verify Before Purchase",
      shot: { src: "/report/r3-verdict-cover.webp", w: 1200, h: 484, alt: "Verdict card for a long-standing distributor" },
    },
  ],
  honesty: "No testimonials here yet — the one-time report launched this month. The reports are the proof.",
};

export const offer = {
  eyebrow: "One-time supplier report",
  line: "The same Growth-depth report our plan customers get — for one supplier, without the plan.",
  includes: [
    "All 5 assessment areas: Supplier Legitimacy · Supply-Chain Relationship · Brand Risk · Documentation Review · Sourcing Logic",
    "Verdict on the four-level scale + the single most important risk",
    "“What we could not confirm” — the honest section nobody else prints",
    "Verification checklist: the exact questions to send the supplier",
    "Optional invoice / LOA review (upload up to 2 files)",
    "PDF in your inbox within 24 hours, human-reviewed",
    "No account · No subscription · Nothing renews",
  ],
  delivery: "Within 24 hours of your completed form",
  refund:
    "Miss 24 hours and you get a full refund, no questions. A verdict you don't like isn't grounds for a refund — a factual error is grounds for a free change request within 7 days.",
  under: "Secure card payment via Stripe · Sold by Hyprr Retail LLC",
};

export const fit = {
  forTitle: "This is for you if",
  forItems: [
    "You're about to send a deposit to a new wholesale supplier",
    "You're working through a supplier list and can't tell who's real",
    "You run accounts for clients and someone just asked “is this supplier fine?”",
    "You sell in the US from abroad and can't visit or call around",
  ],
  notTitle: "This is NOT",
  notItems: [
    "A way to get approved for a brand or category on Amazon — we don't do that",
    "A guarantee of anything: not marketplace approval, not account outcomes, not brand behaviour",
    "Legal advice",
    "A “buy” or “don't buy” — we show what the evidence says; the decision stays yours",
  ],
};

export const faq = [
  { q: "How fast is 24 hours, really?", a: "The clock starts when your supplier form is complete. If we miss it, full refund." },
  { q: "What if the supplier checks out?", a: "Then you get a Source Clear or Usable With Conditions verdict and a short list of what to collect before you commit. A clean report is worth as much as a red one — you pay the deposit without the knot in your stomach." },
  { q: "Do you contact the supplier?", a: "No. Never. Public records, brand pages, registries, community sources. The supplier won't know." },
  { q: "What do I need to give you?", a: "Supplier name and website, the brands on offer, anything they've told you. Invoice or LOA uploads help the Documentation Review but are optional." },
  { q: "One supplier or one brand?", a: "One supplier and up to 5 of the brands they're offering, in one report." },
  { q: "Who does the research?", a: "It runs on HyprrIQ, the supplier-intelligence platform built by an Amazon wholesale operator. Every finding is sourced; a person reviews every report before delivery." },
  { q: "Refunds?", a: "Missed deadline: full refund, no time limit. Within 14 days of paying and before research starts: full refund on request. After delivery, disagreeing with the verdict isn't a refund — a factual error gets a free change request within 7 days." },
  { q: "Is my information private?", a: "Your supplier details are used for your report only. Not shared, not sold, not reused." },
];

export const ps =
  `The deposit is the cheap part. The expensive part is the listing that comes down three weeks after the stock lands. $${PRICE} and 24 hours is the price of knowing first.`;

export const footer = {
  built: "Built by an Amazon wholesale operator — 12+ years, 50+ accounts managed.",
  legal: "Reports produced on HyprrIQ · Sold by Hyprr Retail LLC · Not affiliated with Amazon.",
  contact: "hello@hyprriq.com",
};

export const emailStep = {
  title: "Where should we send your report?",
  consent: "We'll email your report and occasional supplier-safety tips. Unsubscribe any time.",
  button: "Continue to secure checkout →",
};

export const recoveryPopup = {
  title: "Wait — take $20 off. Today only.",
  body: `Your report for $${RECOVERY_PRICE} instead of $${PRICE}. Your code is already applied. Expires at midnight.`,
  button: `Get my report for $${RECOVERY_PRICE} →`,
  small: "Same report. Same 24 hours.",
};

export const exitPopup = {
  title: "Not ready? Take the free 9-red-flag checklist.",
  body: "The nine things we check in the first ten minutes on every supplier — the ones that catch most bad suppliers before you ever pay.",
  button: "Send me the checklist",
  small: "No discount, no tricks — just the checklist.",
};

export const thankYou = {
  title: "Paid — now tell us who to look at.",
  sub: "We can't start until this form is in. The 24 hours start when you hit Submit.",
  done: "Got it. Your report will be in your inbox within 24 hours. Reply to any email from us if something changes.",
};
