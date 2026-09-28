import { timingSafeEqual } from "crypto";

// Internal report-delivery page (/deliver). Guarded by REPORT_ADMIN_KEY (Vercel env, never in the repo).
// With the key unset the page and the API do not exist (404), so nothing is exposed until it's configured.
export const ADMIN_COOKIE = "rp_admin";
export const ADMIN_COOKIE_DAYS = 30;

export function adminKey(): string {
  return process.env.REPORT_ADMIN_KEY || "";
}

export function keyMatches(candidate: string | undefined | null): boolean {
  const key = adminKey();
  if (!key || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
