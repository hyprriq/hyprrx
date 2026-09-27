import { stripe } from "../../../lib/stripe";
import { FUNNEL_TAG } from "../../../lib/funnel";
import { thankYou } from "../content";
import Link from "next/link";
import SupplierForm from "./SupplierForm";

export const dynamic = "force-dynamic";

export const metadata = { title: { absolute: "Paid — tell us the supplier | Hyprr X" }, robots: { index: false } };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  let email = "";
  const prefill = { supplier_name: "", supplier_website: "" };
  let already = false;
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
    <main>
      <header className="hdr">
        <div className="wrap">
          <Link href="/" className="wm" aria-label="Hyprr X">Hyprr<span>X</span></Link>
          <span className="pill">Order received</span>
        </div>
      </header>
      <section className="band band-white">
        <div className="wrap">
          {paid ? (
            <>
              <p className="eyebrow">Step 2 of 2</p>
              <h1 className="h2">{thankYou.title}</h1>
              <p className="lead" style={{ marginTop: 16 }}>{thankYou.sub}</p>
              <p className="small" style={{ marginTop: 10 }}>Receipt sent to <b>{email}</b>.</p>
              <SupplierForm sessionId={session_id!} prefill={prefill} already={already} />
            </>
          ) : (
            <>
              <h1 className="h2">We couldn&rsquo;t find a payment for this link.</h1>
              <p className="lead" style={{ marginTop: 16 }}>
                If you just paid, wait a few seconds and refresh. If you came back without paying, your report is still one step away.
              </p>
              <p style={{ marginTop: 22 }}>
                <Link className="btn" href="/?returned=1">Back to the report page</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
