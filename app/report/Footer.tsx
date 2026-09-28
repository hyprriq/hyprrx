import { FooterLinks } from "./Legal";

/** Shared dark footer (page, thank-you, legal pages). Links resolve to report.hyprrx.com/… live and /report/… on previews. */
export default function Footer() {
  return (
    <div style={{ flexGrow: 1, padding: "28px 20px 110px", background: "#081427", display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "22px", width: "auto", alignSelf: "flex-start" }} />
      <FooterLinks />
      <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.5, color: "#7F93B2" }}>
        HyprrIQ Supplier Reports · Hyprr Retail LLC · 30 N Gould St, Ste R, Sheridan, WY 82801 · Research and evidence, not legal advice. Not affiliated with Amazon. Notices shown are real, with identifying details removed.
      </p>
    </div>
  );
}
