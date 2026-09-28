import { createHash } from "crypto";

// Meta Conversions API (server side). Fails soft: the funnel never breaks on tracking.
// Dataset: NEXT_PUBLIC_META_PIXEL_ID · token: META_CAPI_TOKEN · optional META_TEST_EVENT_CODE (Events Manager → Test events).
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const TOKEN = process.env.META_CAPI_TOKEN || "";
const TEST_CODE = process.env.META_TEST_EVENT_CODE || "";
const API = "https://graph.facebook.com/v21.0";

const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export type CapiPurchase = {
  eventId: string; // same id the browser used → Meta deduplicates
  email: string;
  value: number;
  currency: string;
  sourceUrl: string;
  userAgent?: string;
  ip?: string;
  fbp?: string;
  fbc?: string;
  orderId?: string;
};

export async function metaPurchase(p: CapiPurchase) {
  if (!PIXEL_ID || !TOKEN) return { ok: false, skipped: true };
  const user_data: Record<string, string | string[]> = { em: [sha256(p.email)] };
  if (p.userAgent) user_data.client_user_agent = p.userAgent;
  if (p.ip) user_data.client_ip_address = p.ip;
  if (p.fbp) user_data.fbp = p.fbp;
  if (p.fbc) user_data.fbc = p.fbc;
  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: p.eventId,
        action_source: "website",
        event_source_url: p.sourceUrl,
        user_data,
        custom_data: { currency: p.currency.toUpperCase(), value: p.value, content_name: "supplier_report", content_type: "product", order_id: p.orderId || p.eventId, num_items: 1 },
      },
    ],
  };
  if (TEST_CODE) body.test_event_code = TEST_CODE;
  try {
    const res = await fetch(`${API}/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error("[meta/capi]", res.status, (await res.text()).slice(0, 300));
    return { ok: res.ok };
  } catch (e) {
    console.error("[meta/capi]", e instanceof Error ? e.message : e);
    return { ok: false };
  }
}
