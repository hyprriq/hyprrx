"use client";

import { useSyncExternalStore } from "react";

export const SUPPORT_EMAIL = "hello@hyprriq.com";

const noop = () => () => {};
const clientPrefix = () => (window.location.hostname.startsWith("report.") ? "" : "/report");
const serverPrefix = () => "";

/** Funnel paths are root-level on report.hyprrx.com and under /report on previews; the prefix is only known in the browser. */
export function useFunnelHref() {
  const prefix = useSyncExternalStore(noop, clientPrefix, serverPrefix);
  return (path: string) => `${prefix}${path}`;
}

const link = { color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px" } as const;

/** Under the $79 button and in the email step: "By continuing you agree to our Terms and Refund Policy." */
export function AgreeLine({ color = "#67748A", align = "center" }: { color?: string; align?: "center" | "left" }) {
  const href = useFunnelHref();
  return (
    <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.45, color, textAlign: align }}>
      By continuing you agree to our <a href={href("/terms")} style={link}>Terms</a> and <a href={href("/refunds")} style={link}>Refund Policy</a>.
    </p>
  );
}

/** Under the guarantee on the page. */
export function GuaranteeLine() {
  const href = useFunnelHref();
  return (
    <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.5, color: "#9FB3D1" }}>
      Not in your inbox within 10 hours? Ask for a full refund. Payments are processed securely by Stripe — we never store your card details.{" "}
      <a href={href("/refunds")} style={{ color: "#D8F1FF", textDecoration: "underline", textUnderlineOffset: "2px" }}>Refund policy</a>
    </p>
  );
}

/** Footer legal links: Terms · Privacy · Refunds · Contact. */
export function FooterLinks() {
  const href = useFunnelHref();
  const a = { color: "#9FB3D1" } as const;
  return (
    <div style={{ display: "flex", gap: "16px", fontSize: "13px", flexWrap: "wrap" }}>
      <a href={href("/terms")} style={a}>Terms</a>
      <a href={href("/privacy")} style={a}>Privacy</a>
      <a href={href("/refunds")} style={a}>Refunds</a>
      <a href={`mailto:${SUPPORT_EMAIL}`} style={a}>Contact</a>
    </div>
  );
}
