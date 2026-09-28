// Loops — contact properties + events only (they drive the two workflows and their exit rules).
// Transactional emails moved to Resend (lib/mail.ts). Fails soft: the funnel must never break on email.
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
      // subscribed: true — every upsert follows an email the visitor typed under the consent line
      // ("…occasional supplier-safety tips. Unsubscribe anytime."), and Loops workflows only send to subscribed contacts.
      body: JSON.stringify({ email, source: "report.hyprrx.com", subscribed: true, ...props }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

/** Current funnelStage of a contact ("" when unknown / not found). */
export async function loopsFunnelStage(email: string): Promise<string> {
  if (!process.env.LOOPS_API_KEY) return "";
  try {
    const res = await fetch(`${BASE}/contacts/find?email=${encodeURIComponent(email)}`, { headers: headers() });
    if (!res.ok) return "";
    const data = (await res.json()) as { funnelStage?: string }[];
    return data?.[0]?.funnelStage || "";
  } catch {
    return "";
  }
}
