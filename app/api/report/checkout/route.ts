import { NextRequest, NextResponse } from "next/server";
import { stripe, REPORT_PRICE_ID, RECOVERY_COUPON_ID } from "../../../../lib/stripe";
import { funnelBase, FUNNEL_TAG, isEmail, LIVE_BASE, newOrderNo, nextMidnightEpoch, pickUtm } from "../../../../lib/funnel";
import { loopsEvent, loopsUpsert } from "../../../../lib/loops";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: unknown; recover?: unknown; utm?: unknown; tz?: unknown; code?: unknown; fbp?: unknown; fbc?: unknown } = {};
  try {
    body = await req.json();
  } catch {}
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!isEmail(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  const recover = body.recover === true;
  const utm = pickUtm(body.utm);
  const base = funnelBase(req);

  // Browser context for the server-side Meta Purchase event (sent from the Stripe webhook, deduplicated by session id)
  const meta_ua = (req.headers.get("user-agent") || "").slice(0, 500);
  const meta_ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim().slice(0, 64);
  const meta_fbp = typeof body.fbp === "string" && /^fb\.\d\.\d+\.\d+$/.test(body.fbp) ? body.fbp : "";
  const meta_fbc = typeof body.fbc === "string" && /^fb\.\d\.\d+\.[\w-]+$/.test(body.fbc) ? body.fbc.slice(0, 500) : "";

  try {
    const s = stripe();
    // order_no is the buyer-facing order number (emails, /o/<no> links); it lives on the Session and the PaymentIntent.
    const metadata: Record<string, string> = { funnel: FUNNEL_TAG, order_no: newOrderNo(), email, variant: recover ? "recovery59" : "full79", ...utm, source_url: `${base}/` };
    for (const [k, v] of Object.entries({ meta_ua, meta_ip, meta_fbp, meta_fbc })) if (v) metadata[k] = v;

    let discounts: { promotion_code: string }[] | undefined;
    // ?code= from the page: an R59-… code from a recovery email, or any other active promotion code on this Stripe account
    // (live mode in Production). Applied only if Stripe still reports it active and unexpired; otherwise full price.
    const givenCode = typeof body.code === "string" && /^[A-Z0-9][A-Z0-9_-]{2,30}$/i.test(body.code) ? body.code.toUpperCase() : "";
    if (givenCode) {
      const found = await s.promotionCodes.list({ code: givenCode, active: true, limit: 1 });
      const pc = found.data[0];
      const usable = pc && (!pc.expires_at || pc.expires_at > Math.floor(Date.now() / 1000)) && (!pc.max_redemptions || pc.times_redeemed < pc.max_redemptions);
      if (usable) {
        discounts = [{ promotion_code: pc.id }];
        metadata.promo_code = givenCode;
        metadata.variant = /^R59-/.test(givenCode) ? "recovery59" : "promo";
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
      // Stripe rejects allow_promotion_codes here when the session already carries a discount
      after_expiration: { recovery: discounts ? { enabled: true } : { enabled: true, allow_promotion_codes: true } },
      custom_fields: [
        { key: "supplier_name", label: { type: "custom", custom: "Supplier name (optional)" }, type: "text", optional: true },
        { key: "supplier_website", label: { type: "custom", custom: "Supplier website (optional)" }, type: "text", optional: true },
      ],
      metadata,
      payment_intent_data: { metadata, description: "HyprrIQ Supplier Report — one supplier, up to 5 brands" },
      // Legal links on the Stripe page. The "I agree to the terms" checkbox needs the Terms URL saved in the Stripe
      // dashboard first (Settings → Business → Public details), so it is switched on with STRIPE_TOS_CONSENT=1.
      custom_text: {
        submit: { message: `Delivered within 10 hours of your supplier form, or a full refund. Refund policy: ${LIVE_BASE}/refunds` },
        ...(process.env.STRIPE_TOS_CONSENT === "1" ? { terms_of_service_acceptance: { message: `I agree to the [Terms of Service](${LIVE_BASE}/terms) and [Refund Policy](${LIVE_BASE}/refunds).` } } : {}),
      },
      ...(process.env.STRIPE_TOS_CONSENT === "1" ? { consent_collection: { terms_of_service: "required" as const } } : {}),
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
