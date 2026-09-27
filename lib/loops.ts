// Loops (email) — events + contact upserts. Fails soft: the funnel must never break on email.
// Transactional template ids (Loops team "Hyprr Retail LLC", group "Report funnel"). Drafts until Gautam publishes them.
export const LOOPS_TX = {
  paymentReceived: process.env.LOOPS_TX_PAYMENT_RECEIVED || "cmuk3t0ct2gfr0j3lhavcid5g",
  reportReady: process.env.LOOPS_TX_REPORT_READY || "cmuk3t1dd2gow0j48vuzfw10x",
  checklist: process.env.LOOPS_TX_CHECKLIST || "cmuk3t27b008s0j62swhhbkun",
  orderInternal: process.env.LOOPS_TX_ORDER_ID || "cmuk3t39l1bf80j3qjtsxw50e",
};
const BASE = "https://app.loops.so/api/v1";

function headers() {
  return { Authorization: `Bearer ${process.env.LOOPS_API_KEY || ""}`, "content-type": "application/json" };
}

export async function loopsEvent(email: string, eventName: string, props: Record<string, string | number | boolean> = {}, contact: Record<string, string> = {}) {
  if (!process.env.LOOPS_API_KEY) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${BASE}/events/send`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ email, eventName, eventProperties: props, ...contact, source: "report.hyprrx.com" }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export async function loopsUpsert(email: string, props: Record<string, string | boolean> = {}) {
  if (!process.env.LOOPS_API_KEY) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${BASE}/contacts/update`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ email, source: "report.hyprrx.com", ...props }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/** Transactional email via a Loops template id (created as a draft in Loops; id from env). */
export async function loopsTransactional(transactionalId: string, email: string, dataVariables: Record<string, string>) {
  if (!process.env.LOOPS_API_KEY || !transactionalId) return { ok: false, skipped: true };
  try {
    const res = await fetch(`${BASE}/transactional`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ transactionalId, email, dataVariables }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
