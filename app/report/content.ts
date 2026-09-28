// Microcopy for report.hyprrx.com — from claude/HyprrIQ_Funnel_Copy_v4.md (v4.2, LOCKED). Page blocks live in page.tsx.
export const PRICE = 79;
export const RECOVERY_PRICE = 59;
export const DELIVERY = "10 hours";

export const cta = {
  label: `Check my supplier — $${PRICE}`,
  small: `Report in ${DELIVERY} · No account · No subscription`,
  sticky: "Check my supplier",
};

export const emailStep = {
  step: "Step 1 of 2",
  title: "Where should we send your report?",
  label: "Email",
  button: "Continue to secure checkout",
  consent: "We'll email your report and occasional supplier-safety tips. Unsubscribe anytime.",
  footer: ["$79 one-time", "Report in 10h", "10h or refund"],
};

export const recoveryPopup = {
  tag: "Today only",
  titleA: "Still deciding? Take $20 off — ",
  titleHl: "your report for $59",
  titleB: ", today only.",
  countdownNote: "Counts down to real midnight",
  button: "Get my report for $59",
  dismiss: "No thanks",
};

export const exitPopup = {
  titleA: "Not ready? Get the free ",
  titleHl: "9 red-flag checklist.",
  label: "Email",
  button: "Send me the checklist",
};

export const thankYou = {
  title: "Payment received. Now tell us about your supplier.",
  oneSupplier: "One supplier per report — list only brands you're buying from this supplier.",
  fields: {
    name: "Supplier name",
    website: "Supplier website",
    brands: "Brands you want to buy from this supplier",
    brandsHint: "up to 5",
    category: "Product category",
    notes: "Anything we should know",
    upload: "Optional upload",
    uploadHint: "invoice / LOA, max 2",
  },
  button: "Start my report",
  line: "Your report arrives within 10 hours of this form.",
  sentTo: "Confirmation sent to",
};

// Confirmation state (after the supplier form) — Gautam 2026-09-28
export const confirmed = {
  tag: "Order confirmed",
  title: "You're all set. Your report is on its way.",
  line: (email: string) => `Your report arrives at ${email} within 10 hours.`,
  sentTitle: "What you sent us",
  wrong: "Something wrong? Reply to your confirmation email.",
  nextTitle: "What happens next",
  steps: ["We research your supplier.", "A person reviews the findings.", "Your PDF report lands in your inbox within 10 hours."],
  small: "Add reports@mail.hyprrx.com to your contacts so it doesn't land in spam. We never contact your supplier.",
};

// Revisit of the form link after it was submitted
export const review = {
  title: "You've already sent us these details",
  ok: "Looks right",
  edit: "Edit and resubmit",
  updateButton: "Update my details",
  updated: "Details updated.",
};
