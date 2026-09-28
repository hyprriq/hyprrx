import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, RECOVERY_COUPON_ID } from "../../../../lib/stripe";
import { FUNNEL_TAG } from "../../../../lib/funnel";
import { loopsEvent, loopsTransactional, loopsUpsert, LOOPS_TX } from "../../../../lib/loops";
import { metaPurchase } from "../../../../lib/meta";

export const runtime = "nodejs";

// Stripe → Loops bridge. Events:
//   checkout.session.completed → "paid"               (stops recovery, starts form reminders)
//   checkout.session.expired   → "checkout_abandoned" (starts +1h / +24h $59 / +60h recovery)
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const raw = await req.text();
    event = stripe().webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature: ${e instanceof Error ? e.message : "?"}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.expired") {
    const cs = event.data.object as Stripe.Checkout.Session;
    if (cs.metadata?.funnel !== FUNNEL_TAG) return NextResponse.json({ ignored: true });
    const email = (cs.customer_details?.email || cs.customer_email || cs.metadata?.email || "").toLowerCase();
    if (!email) return NextResponse.json({ ignored: "no email" });

    if (event.type === "checkout.session.completed" && cs.payment_status === "paid") {
      const formUrl = `https://report.hyprrx.com/thank-you?session_id=${cs.id}`;
      await loopsUpsert(email, { funnelStage: "paid", paidAt: new Date().toISOString() });
      await loopsEvent(email, "paid", { amount: (cs.amount_total || 0) / 100, variant: cs.metadata?.variant || "", orderId: cs.id, formUrl });
      await loopsTransactional(LOOPS_TX.paymentReceived, email, { formUrl, orderId: cs.id });
      // Meta Conversions API — same event_id as the browser Purchase on /thank-you, so Meta counts it once
      const m = cs.metadata || {};
      await metaPurchase({
        eventId: cs.id,
        email,
        value: (cs.amount_total || 0) / 100,
        currency: cs.currency || "usd",
        sourceUrl: m.source_url ? `${m.source_url.replace(/\/$/, "")}/thank-you` : "https://report.hyprrx.com/thank-you",
        userAgent: m.meta_ua,
        ip: m.meta_ip,
        fbp: m.meta_fbp,
        fbc: m.meta_fbc,
        orderId: cs.id,
      });
    } else if (event.type === "checkout.session.expired") {
      // unique $59 code for the +24h email (valid ~72h so it covers the send + 48h)
      let promoCode = "";
      try {
        const code = `R59-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        await stripe().promotionCodes.create({
          promotion: { type: "coupon", coupon: RECOVERY_COUPON_ID },
          code,
          max_redemptions: 1,
          expires_at: Math.floor(Date.now() / 1000) + 72 * 3600,
          metadata: { funnel: FUNNEL_TAG, email, source: "recovery_email" },
        });
        promoCode = code;
      } catch (e) {
        console.error("[report/webhook] promo code", e instanceof Error ? e.message : e);
      }
      const recoveryUrl = promoCode ? `https://report.hyprrx.com/?code=${promoCode}` : "https://report.hyprrx.com/?returned=1";
      await loopsUpsert(email, { funnelStage: "abandoned" });
      await loopsEvent(email, "checkout_abandoned", { recoveryUrl, promoCode, variant: cs.metadata?.variant || "" });
    }
  }
  return NextResponse.json({ received: true });
}
