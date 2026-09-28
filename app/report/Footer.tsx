/** Shared dark footer (page + thank-you). Relative hrefs so it works on report.hyprrx.com (root) and on previews (/report). */
export default function Footer({ refundsHref = "#guarantee" }: { refundsHref?: string }) {
  return (
    <div style={{ flexGrow: 1, padding: "28px 20px 110px", background: "#081427", display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "22px", width: "auto", alignSelf: "flex-start" }} />
      <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
        <a href="https://hyprrx.com/terms" style={{ color: "#9FB3D1" }}>Terms</a>
        <a href="https://hyprrx.com/privacy" style={{ color: "#9FB3D1" }}>Privacy</a>
        <a href={refundsHref} style={{ color: "#9FB3D1" }}>Refunds</a>
        <a href="mailto:hello@hyprriq.com" style={{ color: "#9FB3D1" }}>Contact</a>
      </div>
      <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.5, color: "#7F93B2" }}>Research and evidence, not legal advice. Not affiliated with Amazon. Notices shown are real, with identifying details removed.</p>
    </div>
  );
}
