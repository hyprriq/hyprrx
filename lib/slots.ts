import { stripe, REPORT_PRICE_ID } from "./stripe";

const CAP = 15;
const TZ = "America/New_York"; // "today" for a US seller audience

function startOfTodayEpoch(): number {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const h = get("hour") % 24, m = get("minute"), s = get("second");
  const secondsIntoDay = h * 3600 + m * 60 + s;
  return Math.floor(now.getTime() / 1000) - secondsIntoDay;
}

/**
 * TRUE slot count: paid Checkout Sessions for the report price created today (US Eastern),
 * against a cap of 15. Returns null if it cannot be computed — the page then hides the line.
 */
export async function getSlotsLeft(): Promise<number | null> {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    const s = stripe();
    let paid = 0;
    let starting_after: string | undefined;
    for (let i = 0; i < 5; i++) {
      const page = await s.checkout.sessions.list({ created: { gte: startOfTodayEpoch() }, status: "complete", limit: 100, starting_after });
      for (const cs of page.data) {
        if (cs.payment_status === "paid" && cs.metadata?.funnel === "report_hyprrx") paid++;
      }
      if (!page.has_more) break;
      starting_after = page.data[page.data.length - 1]?.id;
    }
    void REPORT_PRICE_ID;
    return Math.max(0, CAP - paid);
  } catch {
    return null;
  }
}
