"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Meta Pixel for the report funnel only (this layout is mounted solely for report.hyprrx.com / the /report tree).
// Dataset id comes from NEXT_PUBLIC_META_PIXEL_ID; with it unset nothing loads.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window { fbq?: Fbq; _fbq?: Fbq }
}

function ensureFbq(): Fbq | null {
  if (typeof window === "undefined" || !PIXEL_ID) return null;
  if (window.fbq) return window.fbq;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", PIXEL_ID);
  return fbq;
}

/** Standard event; `eventId` enables browser↔server deduplication (Purchase uses the Checkout Session id). */
export function metaTrack(event: string, params: Record<string, string | number> = {}, eventId?: string) {
  const fbq = ensureFbq();
  if (!fbq) return;
  if (eventId) fbq("track", event, params, { eventID: eventId });
  else fbq("track", event, params);
}

/** Loads the pixel and fires PageView on every route of the funnel. */
export default function MetaPixel() {
  const pathname = usePathname();
  useEffect(() => {
    const fbq = ensureFbq();
    if (fbq) fbq("track", "PageView");
  }, [pathname]);
  return PIXEL_ID ? (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
    </noscript>
  ) : null;
}

/** Purchase on the verified thank-you page — once per order (guarded in sessionStorage so a refresh doesn't double-count). */
export function PurchasePixel({ eventId, value, currency }: { eventId: string; value: number; currency: string }) {
  useEffect(() => {
    const key = `rp_purchase_${eventId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {}
    metaTrack("Purchase", { value, currency }, eventId);
  }, [eventId, value, currency]);
  return null;
}
