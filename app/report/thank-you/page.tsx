/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { stripe } from "../../../lib/stripe";
import { FUNNEL_TAG } from "../../../lib/funnel";
import { thankYou } from "../content";
import SupplierForm from "./SupplierForm";

export const dynamic = "force-dynamic";
export const metadata = { title: { absolute: "Payment received — tell us about your supplier | HyprrIQ" }, robots: { index: false } };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  let email = "";
  let already = false;
  const prefill = { supplier_name: "", supplier_website: "" };
  if (session_id && /^cs_(live|test)_[A-Za-z0-9]+$/.test(session_id)) {
    try {
      const cs = await stripe().checkout.sessions.retrieve(session_id);
      paid = cs.payment_status === "paid" && cs.metadata?.funnel === FUNNEL_TAG;
      email = cs.customer_details?.email || cs.customer_email || "";
      already = cs.metadata?.form_submitted === "1";
      for (const f of cs.custom_fields || []) {
        if (f.key === "supplier_name" && f.text?.value) prefill.supplier_name = f.text.value;
        if (f.key === "supplier_website" && f.text?.value) prefill.supplier_website = f.text.value;
      }
    } catch {}
  }

  return (
    <main className="page">
      <div style={{ height: "56px", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0B1B33", borderBottom: "1px solid #16305A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "24px", width: "auto" }} />
        <span className="mono" style={{ fontSize: "10.5px", color: "#D8F1FF" }}>{paid ? "Step 2 of 2" : "Supplier Report · $79"}</span>
      </div>
      <div style={{ padding: "40px 20px 60px", background: "#ffffff", display: "flex", flexDirection: "column", gap: "18px", minHeight: "80vh" }}>
        {paid ? (
          <>
            <span className="tag" style={{ alignSelf: "flex-start", background: "#DDF1E5", color: "#0F5E36" }}>Payment received</span>
            <h1 className="disp" style={{ margin: 0, fontSize: "31px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>{thankYou.title}</h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#67748A" }}>Receipt sent to <strong>{email}</strong>.</p>
            <SupplierForm sessionId={session_id!} prefill={prefill} already={already} />
          </>
        ) : (
          <>
            <h1 className="disp" style={{ margin: 0, fontSize: "31px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>We couldn't find a payment for this link.</h1>
            <p style={{ margin: 0, fontSize: "16.5px", lineHeight: 1.5 }}>If you just paid, wait a few seconds and refresh. If you came back without paying, your report is one step away.</p>
            <Link href="/?returned=1" className="cta"><b>Back to the report page</b></Link>
          </>
        )}
      </div>
    </main>
  );
}
