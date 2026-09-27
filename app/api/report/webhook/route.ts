import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "../../../../lib/stripe";
import { FUNNEL_TAG } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert } from "../../../../lib/loops";

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
      await loopsUpsert(email, { funnelStage: "paid", paidAt: new Date().toISOString() });
      await loopsEvent(email, "paid", {
        amount: (cs.amount_total || 0) / 100,
        variant: cs.metadata?.variant || "",
        orderId: cs.id,
        formUrl: `https://report.hyprrx.com/thank-you?session_id=${cs.id}`,
      });
    } else if (event.type === "checkout.session.expired") {
      const recoveryUrl = cs.after_expiration?.recovery?.url || "https://report.hyprrx.com/?returned=1";
      await loopsUpsert(email, { funnelStage: "abandoned" });
      await loopsEvent(email, "checkout_abandoned", { recoveryUrl, variant: cs.metadata?.variant || "" });
    }
  }
  return NextResponse.json({ received: true });
}
