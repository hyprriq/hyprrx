import Stripe from "stripe";

// Hyprr X Stripe account. Live key in Production env, sandbox key in Preview env.
export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export const REPORT_PRICE_ID = process.env.STRIPE_REPORT_PRICE_ID || "price_1UKFWx4l7Wyuar9xCr0Jy7cl";
export const RECOVERY_COUPON_ID = process.env.STRIPE_RECOVERY_COUPON_ID || "REPORT59";
