import Footer from "../Footer";
import { FooterLinks, SUPPORT_EMAIL } from "../Legal";

// Legal pages for the $79 Supplier Report (report.hyprrx.com/terms, /privacy, /refunds).
// Adapted from HyprrIQ_LEGAL_PAGES_FINAL.md for a one-time product: no accounts, plans, credits or subscriptions.
export const COMPANY = "Hyprr Retail LLC";
export const ADDRESS = "30 N Gould St, Ste R, Sheridan, WY 82801, United States";
export const SUPPORT = SUPPORT_EMAIL;
// Effective date = go-live date. Set NEXT_PUBLIC_LEGAL_EFFECTIVE (e.g. "1 October 2026") on Production before launch.
export const EFFECTIVE = process.env.NEXT_PUBLIC_LEGAL_EFFECTIVE || "";

export function Effective() {
  return <p className="eff">{EFFECTIVE ? `Effective ${EFFECTIVE}` : "Effective from the day report.hyprrx.com goes live"}</p>;
}

export function Mail({ children = SUPPORT }: { children?: string }) {
  return <a href={`mailto:${children}`}>{children}</a>;
}

export default function LegalPage({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <main className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ height: "56px", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0B1B33", borderBottom: "1px solid #16305A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="./" style={{ display: "flex" }}><img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "24px", width: "auto" }} /></a>
        <span className="mono" style={{ fontSize: "10.5px", color: "#D8F1FF" }}>Supplier Report · $79</span>
      </div>
      <article className="legal">
        <h1 className="disp">{title}</h1>
        <Effective />
        <p className="lede">{lede}</p>
        {children}
        <div className="legal-nav">
          <FooterLinks />
        </div>
      </article>
      <Footer />
    </main>
  );
}
