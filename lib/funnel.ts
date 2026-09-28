import type { NextRequest } from "next/server";

export const FUNNEL_TAG = "report_hyprrx";

export const LIVE_BASE = "https://report.hyprrx.com";

/** Public base URL for funnel pages. On report.hyprrx.com paths are root-level; elsewhere (previews) they live under /report.
 *  In Production every link is report.hyprrx.com — never a *.vercel.app host — whatever host the request came in on. */
export function funnelBase(req: NextRequest): string {
  if (process.env.VERCEL_ENV === "production") return LIVE_BASE;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "report.hyprrx.com";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const isReportHost = host.startsWith("report.");
  return `${proto}://${host}${isReportHost ? "" : "/report"}`;
}

/** Same rule for links built outside a request (Stripe webhook): the base the buyer used on previews, report.hyprrx.com live. */
export function publicBase(sourceUrl: string | undefined): string {
  if (process.env.VERCEL_ENV === "production") return LIVE_BASE;
  return (sourceUrl || LIVE_BASE + "/").replace(/\/$/, "");
}

/** Short order number shown to buyers instead of the Stripe id: HX-YYMMDD-XXXX (4 chars, no 0/O/1/I). */
export function newOrderNo(now = new Date()): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  let tail = "";
  for (let i = 0; i < 4; i++) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `HX-${d}-${tail}`;
}
export const ORDER_NO_RE = /^HX-\d{6}-[A-Z0-9]{4}$/;

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) && v.length < 200;
}

export function pickUtm(u: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (u && typeof u === "object") {
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = (u as Record<string, unknown>)[k];
      if (typeof v === "string" && v) out[k] = v.slice(0, 80);
    }
  }
  return out;
}

/** Epoch seconds for the next local midnight in the visitor's IANA timezone (falls back to UTC). */
export function nextMidnightEpoch(tz: string | undefined): number {
  const now = new Date();
  let zone = "UTC";
  try {
    if (tz) {
      new Intl.DateTimeFormat("en-US", { timeZone: tz });
      zone = tz;
    }
  } catch {}
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const into = (get("hour") % 24) * 3600 + get("minute") * 60 + get("second");
  const midnight = Math.floor(now.getTime() / 1000) - into + 86400;
  // Stripe needs a little headroom; never less than 30 minutes from now.
  return Math.max(midnight, Math.floor(now.getTime() / 1000) + 1800);
}
