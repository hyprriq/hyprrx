/* eslint-disable react/no-unescaped-entities */
import type Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { FUNNEL_TAG } from "../../../lib/funnel";
import Footer from "../Footer";
import { PurchasePixel } from "../MetaPixel";
import ThankYouFlow, { type Saved } from "./ThankYouFlow";

export const dynamic = "force-dynamic";
export const metadata = { title: { absolute: "Your order — HyprrIQ Supplier Report" }, robots: { index: false } };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  let email = "";
  let submitted = false;
  let amount = 0;
  let currency = "USD";
  let saved: Saved = { supplier_name: "", supplier_website: "", brands: "", category: "", notes: "", files: "" };
  if (session_id && /^cs_(live|test)_[A-Za-z0-9]+$/.test(session_id)) {
    try {
      const cs = await stripe().checkout.sessions.retrieve(session_id, { expand: ["payment_intent"] });
      paid = cs.payment_status === "paid" && cs.metadata?.funnel === FUNNEL_TAG;
      email = cs.customer_details?.email || cs.customer_email || "";
      submitted = cs.metadata?.form_submitted === "1";
      amount = (cs.amount_total || 0) / 100;
      currency = (cs.currency || "usd").toUpperCase();
      // Checkout custom fields prefill the first form; after submission the PaymentIntent metadata is the order record.
      for (const f of cs.custom_fields || []) {
        if (f.key === "supplier_name" && f.text?.value) saved.supplier_name = f.text.value;
        if (f.key === "supplier_website" && f.text?.value) saved.supplier_website = f.text.value;
      }
      const pi = cs.payment_intent && typeof cs.payment_intent !== "string" ? (cs.payment_intent as Stripe.PaymentIntent) : null;
      if (submitted && pi?.metadata) {
        const m = pi.metadata;
        saved = {
          supplier_name: m.supplier_name || saved.supplier_name,
          supplier_website: m.supplier_website || saved.supplier_website,
          brands: m.brands || "",
          category: m.category || "",
          notes: m.notes || "",
          files: m.files || "",
        };
      }
    } catch {}
  }

  return (
    <main className="page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ height: "56px", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0B1B33", borderBottom: "1px solid #16305A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "24px", width: "auto" }} />
        <span className="mono" style={{ fontSize: "10.5px", color: "#D8F1FF" }}>{paid ? "Step 2 of 2" : "Supplier Report · $79"}</span>
      </div>
      <div style={{ padding: "36px 20px 48px", background: "#ffffff", display: "flex", flexDirection: "column", gap: "18px" }}>
        {paid ? (
          <>
            <PurchasePixel eventId={session_id!} value={amount} currency={currency} />
            <ThankYouFlow sessionId={session_id!} email={email} submitted={submitted} saved={saved} />
          </>
        ) : (
          <>
            <h1 className="disp" style={{ margin: 0, fontSize: "31px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>We couldn't find a payment for this link.</h1>
            <p style={{ margin: 0, fontSize: "16.5px", lineHeight: 1.5 }}>If you just paid, wait a few seconds and refresh. If you came back without paying, your report is one step away.</p>
            <a href="./?returned=1" className="cta"><b>Back to the report page</b></a>
          </>
        )}
      </div>
      <Footer refundsHref="./#guarantee" />
    </main>
  );
}
