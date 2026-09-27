import { NextRequest, NextResponse } from "next/server";
import { stripe, REPORT_PRICE_ID, RECOVERY_COUPON_ID } from "../../../../lib/stripe";
import { funnelBase, FUNNEL_TAG, isEmail, nextMidnightEpoch, pickUtm } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert } from "../../../../lib/loops";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: unknown; recover?: unknown; utm?: unknown; tz?: unknown; code?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  const recover = body.recover === true;
  const utm = pickUtm(body.utm);
  const base = funnelBase(req);

  try {
    const s = stripe();
    const metadata: Record<string, string> = { funnel: FUNNEL_TAG, email, variant: recover ? "recovery59" : "full79", ...utm };

    let discounts: { promotion_code: string }[] | undefined;
    const givenCode = typeof body.code === "string" && /^R59-[A-Z0-9]{4,10}$/i.test(body.code) ? body.code.toUpperCase() : "";
    if (givenCode) {
      // code from a recovery email: reuse it if it is still active
      const found = await s.promotionCodes.list({ code: givenCode, active: true, limit: 1 });
      const pc = found.data[0];
      if (pc && (!pc.expires_at || pc.expires_at > Math.floor(Date.now() / 1000))) {
        discounts = [{ promotion_code: pc.id }];
        metadata.promo_code = givenCode;
        metadata.variant = "recovery59";
      }
    }
    if (recover && !discounts) {
      const code = `R59-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const promo = await s.promotionCodes.create({
        promotion: { type: "coupon", coupon: RECOVERY_COUPON_ID },
        code,
        max_redemptions: 1,
        expires_at: nextMidnightEpoch(typeof body.tz === "string" ? body.tz : undefined),
        metadata: { funnel: FUNNEL_TAG, email, source: "return_popup" },
      });
      discounts = [{ promotion_code: promo.id }];
      metadata.promo_code = code;
    }

    const session = await s.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: REPORT_PRICE_ID, quantity: 1 }],
      customer_email: email,
      customer_creation: "always",
      ...(discounts ? { discounts } : { allow_promotion_codes: true }),
      success_url: `${base}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?returned=1`,
      after_expiration: { recovery: { enabled: true, allow_promotion_codes: true } },
      custom_fields: [
        { key: "supplier_name", label: { type: "custom", custom: "Supplier name (optional)" }, type: "text", optional: true },
        { key: "supplier_website", label: { type: "custom", custom: "Supplier website (optional)" }, type: "text", optional: true },
      ],
      metadata,
      payment_intent_data: { metadata, description: "HyprrIQ Supplier Report — one supplier, up to 5 brands" },
      consent_collection: { promotions: "auto" },
    });

    // Loops: mark checkout started (recovery loop starts from the expired event; this is for context)
    await loopsUpsert(email, { funnelStage: recover ? "checkout_recovery" : "checkout_started", ...utm });
    await loopsEvent(email, "checkout_started", { variant: metadata.variant, sessionId: session.id });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout unavailable";
    console.error("[report/checkout]", msg);
    return NextResponse.json({ error: "Checkout is unavailable right now. Try again in a minute." }, { status: 500 });
  }
}
