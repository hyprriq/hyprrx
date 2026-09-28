import type Stripe from "stripe";
import { stripe } from "./stripe";
import { FUNNEL_TAG, ORDER_NO_RE, newOrderNo } from "./funnel";

// One order = one Checkout Session = one PaymentIntent. Stripe is the system of record:
// the Checkout Session holds the purchase, the PaymentIntent metadata holds the supplier form and delivery state.
// Buyers only ever see the short order number (HX-YYMMDD-XXXX); the Stripe ids stay internal.
export type Order = {
  sessionId: string;
  piId: string;
  orderNo: string;
  livemode: boolean;
  paid: boolean;
  email: string;
  amount: string; // "$79.00 USD"
  variant: string;
  promoCode: string;
  utm: string;
  createdAt: string; // ISO
  submitted: boolean;
  submittedAt: string; // ISO or ""
  dueAt: string; // ISO (submittedAt + 10h) or ""
  deliveredAt: string; // ISO or ""
  verdict: string;
  supplier_name: string;
  supplier_website: string;
  brands: string;
  category: string;
  notes: string;
  files: string;
};

export const DELIVERY_HOURS = 10;

function fromSession(cs: Stripe.Checkout.Session): Order | null {
  if (cs.metadata?.funnel !== FUNNEL_TAG) return null;
  const pi = cs.payment_intent && typeof cs.payment_intent !== "string" ? (cs.payment_intent as Stripe.PaymentIntent) : null;
  const m = pi?.metadata || {};
  const order: Order = {
    sessionId: cs.id,
    piId: pi?.id || (typeof cs.payment_intent === "string" ? cs.payment_intent : ""),
    orderNo: cs.metadata?.order_no || m.order_no || "",
    livemode: !!cs.livemode,
    paid: cs.payment_status === "paid",
    email: (cs.customer_details?.email || cs.customer_email || cs.metadata?.email || "").toLowerCase(),
    amount: `$${((cs.amount_total || 0) / 100).toFixed(2)} ${(cs.currency || "usd").toUpperCase()}`,
    variant: cs.metadata?.variant || "",
    promoCode: cs.metadata?.promo_code || "",
    utm: ["utm_source", "utm_medium", "utm_campaign", "utm_content"].map((k) => cs.metadata?.[k]).filter(Boolean).join(" / "),
    createdAt: new Date(cs.created * 1000).toISOString(),
    submitted: cs.metadata?.form_submitted === "1",
    submittedAt: m.form_submitted_at || "",
    dueAt: m.form_submitted_at ? new Date(new Date(m.form_submitted_at).getTime() + DELIVERY_HOURS * 3600 * 1000).toISOString() : "",
    deliveredAt: m.report_delivered_at || "",
    verdict: m.report_verdict || "",
    supplier_name: m.supplier_name || "",
    supplier_website: m.supplier_website || "",
    brands: m.brands || "",
    category: m.category || "",
    notes: m.notes || "",
    files: m.files || "",
  };
  // Before the form is in, Checkout custom fields hold the supplier name/website the buyer typed at payment.
  for (const f of cs.custom_fields || []) {
    if (f.key === "supplier_name" && f.text?.value && !order.supplier_name) order.supplier_name = f.text.value;
    if (f.key === "supplier_website" && f.text?.value && !order.supplier_website) order.supplier_website = f.text.value;
  }
  return order;
}

export async function loadOrder(sessionId: string): Promise<Order | null> {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  try {
    const cs = await stripe().checkout.sessions.retrieve(sessionId, { expand: ["payment_intent"] });
    return fromSession(cs);
  } catch {
    return null;
  }
}

/** Order by its short number (PaymentIntent metadata search → its Checkout Session). Search indexing can lag a few seconds after payment. */
export async function loadOrderByNo(orderNo: string): Promise<Order | null> {
  const no = orderNo.toUpperCase();
  if (!ORDER_NO_RE.test(no)) return null;
  try {
    const s = stripe();
    const found = await s.paymentIntents.search({ query: `metadata['order_no']:'${no}' AND metadata['funnel']:'${FUNNEL_TAG}'`, limit: 1 });
    const pi = found.data[0];
    if (!pi) return null;
    const sessions = await s.checkout.sessions.list({ payment_intent: pi.id, limit: 1, expand: ["data.payment_intent"] });
    const cs = sessions.data[0];
    return cs ? fromSession(cs) : null;
  } catch {
    return null;
  }
}

/** Orders placed before order numbers existed get one the first time they are touched (Session + PaymentIntent metadata). */
export async function ensureOrderNo(cs: Stripe.Checkout.Session, pi: Stripe.PaymentIntent | null): Promise<string> {
  const existing = cs.metadata?.order_no || pi?.metadata?.order_no;
  if (existing) return existing;
  const no = newOrderNo(new Date(cs.created * 1000));
  const s = stripe();
  await s.checkout.sessions.update(cs.id, { metadata: { ...cs.metadata, order_no: no } }).catch(() => {});
  if (pi) await s.paymentIntents.update(pi.id, { metadata: { order_no: no } }).catch(() => {});
  return no;
}

const ZONES: [string, string][] = [
  ["Asia/Kolkata", "IST"],
  ["America/New_York", "ET"],
];

function parts(iso: string, zone: string) {
  const d = new Date(iso);
  if (!iso || isNaN(d.getTime())) return null;
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", day: "numeric", month: "short" }).format(d).replace(",", "").replace("Sept", "Sep");
  const time = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", minute: "2-digit", hour12: true }).format(d).toLowerCase();
  return { day, time };
}
/** "Mon 28 Sep, 3:11 pm IST" */
export function fmtIn(iso: string, zone: string, label: string): string {
  const p = parts(iso, zone);
  return p ? `${p.day}, ${p.time} ${label}` : "—";
}
export const fmtIST = (iso: string) => fmtIn(iso, ZONES[0][0], ZONES[0][1]);
export const fmtET = (iso: string) => fmtIn(iso, ZONES[1][0], ZONES[1][1]);
/** "Mon 28 Sep, 3:11 pm IST (5:41 am ET)" — both team timezones on one line (the ET day is added only when it differs). */
export function fmtBoth(iso: string): string {
  const a = parts(iso, ZONES[0][0]);
  const b = parts(iso, ZONES[1][0]);
  if (!a || !b) return "—";
  return `${a.day}, ${a.time} IST (${b.time}${a.day === b.day ? "" : " " + b.day.split(" ")[0]} ET)`;
}

/** Stripe dashboard link for the order's payment (test-mode aware). */
export function stripePaymentUrl(o: Order): string {
  return `https://dashboard.stripe.com/${o.livemode ? "" : "test/"}payments/${o.piId}`;
}
