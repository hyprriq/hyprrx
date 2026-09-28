import Stripe from "stripe";

// Hyprr X Stripe account. Live key in Production env, sandbox key in Preview env.
export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  if (!key.startsWith("sk_") && !key.startsWith("rk_")) console.error(`[stripe] STRIPE_SECRET_KEY does not look like a secret key: ${stripeKeyKind()} — writes (metadata, promo codes) will fail`);
  return new Stripe(key);
}

/** Key type for diagnostics only — "sk_live_", "rk_live_", "pk_live_", "sk_test_"… never the key itself. */
export function stripeKeyKind(): string {
  const k = process.env.STRIPE_SECRET_KEY || "";
  return k ? `${k.slice(0, 8)}… (${k.length} chars)` : "unset";
}

export const REPORT_PRICE_ID = process.env.STRIPE_REPORT_PRICE_ID || "price_1UKFWx4l7Wyuar9xCr0Jy7cl";
export const RECOVERY_COUPON_ID = process.env.STRIPE_RECOVERY_COUPON_ID || "REPORT59";
