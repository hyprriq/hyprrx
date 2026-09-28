import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminKey, keyMatches } from "../../../lib/admin";
import { fmtDueET, loadOrder, loadOrderByNo, stripePaymentUrl, type Order } from "../../../lib/orders";
import DeliverForm from "./DeliverForm";

export const metadata = { title: { absolute: "Report delivery — HyprrIQ (internal)" }, robots: { index: false, follow: false } };

const label: React.CSSProperties = { fontSize: "10.5px", color: "#67748A", paddingTop: "3px" };
const cell: React.CSSProperties = { display: "grid", gridTemplateColumns: "96px 1fr", gap: "10px", padding: "8px 0", borderTop: "1px solid #E1E7F0", fontSize: "15px", lineHeight: 1.45 };
const input: React.CSSProperties = { height: "50px", border: "1.5px solid #B9C6DB", borderRadius: "10px", padding: "0 14px", fontSize: "16px", color: "#0B1B33", background: "#fff", width: "100%" };

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div style={cell}>
      <span className="mono" style={label}>{k}</span>
      <span style={{ color: "#0B1B33", overflowWrap: "anywhere" }}>{v}</span>
    </div>
  );
}

// Internal page: paste (or click from the order email) an order link, attach the finished PDF, send.
// Sends the branded "Your report is ready" email with the PDF attached; nothing is stored anywhere but Stripe metadata.
export default async function DeliverPage({ orderNo = "", sessionId = "", bad = "", nested = false }: { orderNo?: string; sessionId?: string; bad?: string; nested?: boolean }) {
  const up = nested ? "../" : "./"; // relative links work on report.hyprrx.com (root) and on previews (/report)
  if (!adminKey()) notFound();
  const authed = keyMatches((await cookies()).get(ADMIN_COOKIE)?.value);
  const ref = orderNo || sessionId;
  let order: Order | null = null;
  if (authed && orderNo) order = await loadOrderByNo(orderNo);
  else if (authed && sessionId) order = await loadOrder(sessionId);
  // old links carried the Stripe id; move them onto the order-number URL
  if (order && !orderNo && order.orderNo) redirect(`${up}deliver/${order.orderNo}`);

  return (
    <main className="page" style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ height: "56px", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0B1B33", borderBottom: "1px solid #16305A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" style={{ height: "24px", width: "auto" }} />
        <span className="mono" style={{ fontSize: "10.5px", color: "#D8F1FF" }}>Internal · Report delivery</span>
      </div>

      <div style={{ padding: "32px 20px 60px", display: "flex", flexDirection: "column", gap: "18px" }}>
        {!authed ? (
          <>
            <h1 className="disp" style={{ margin: 0, fontSize: "28px", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>Team sign-in</h1>
            <p style={{ margin: 0, fontSize: "15px", color: "#67748A" }}>Enter the delivery key once on this device; it stays signed in for 30 days.</p>
            {bad && <p style={{ margin: 0, fontSize: "14px", color: "#C1272D" }}>That key didn&apos;t match.</p>}
            <form method="post" action="/api/report/deliver" className="form">
              <input type="hidden" name="action" value="login" />
              <input type="hidden" name="ref" value={ref} />
              <label>
                Delivery key
                <input name="key" type="password" autoComplete="current-password" required style={input} />
              </label>
              <button type="submit" className="cta" style={{ minHeight: "56px" }}><b>Sign in</b></button>
            </form>
          </>
        ) : !ref || !order ? (
          <>
            <h1 className="disp" style={{ margin: 0, fontSize: "28px", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>{ref ? `Order ${ref} not found` : "Which order?"}</h1>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5, color: "#1F2A3D" }}>
              {ref ? "Not a funnel order on this Stripe mode (test vs live), or paid less than a minute ago — try again shortly. " : ""}
              Click <strong>send report</strong> in the order email, or type the order number from it.
            </p>
            <form method="get" action={`${up}deliver`} className="form">
              <label>
                Order number
                <input name="no" defaultValue={orderNo} placeholder="HX-240928-7Q4K" required style={input} />
              </label>
              <button type="submit" className="cta" style={{ minHeight: "56px" }}><b>Open order</b></button>
            </form>
          </>
        ) : (
          <>
            <span className="tag" style={{ alignSelf: "flex-start", background: order.deliveredAt ? "#DDF1E5" : order.submitted ? "#E9EFFF" : "#FFF3CD", color: order.deliveredAt ? "#0F5E36" : order.submitted ? "#16305A" : "#7A5A00" }}>
              {order.deliveredAt ? "Report sent" : order.submitted ? "Awaiting report" : "Form not in yet"}
            </span>
            <h1 className="disp" style={{ margin: 0, fontSize: "28px", lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em", color: "#0B1B33" }}>{order.supplier_name || "Supplier not named yet"}</h1>
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5, color: "#1F2A3D" }}>
              Order <strong>{order.orderNo || "—"}</strong> · <a href={`mailto:${order.email}`} style={{ color: "#1C4FE0" }}>{order.email}</a> · paid {order.amount}{order.promoCode ? ` (code ${order.promoCode})` : ""} · {order.livemode ? "live" : "test mode"}
            </p>

            <div style={{ border: "3px solid #0B1B33", borderRadius: "8px", padding: "16px 18px 6px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <strong className="disp" style={{ fontSize: "18px", color: "#0B1B33", marginBottom: "6px" }}>The order</strong>
              <Row k="Website" v={order.supplier_website ? <a href={order.supplier_website.startsWith("http") ? order.supplier_website : `https://${order.supplier_website}`} target="_blank" rel="noreferrer" style={{ color: "#1C4FE0" }}>{order.supplier_website}</a> : "—"} />
              <Row k="Brands" v={order.brands || "—"} />
              <Row k="Category" v={order.category || "—"} />
              <Row k="Notes" v={order.notes || "—"} />
              <Row k="Files" v={order.files ? `${order.files} (attached to the order email)` : "none"} />
              <Row k="Form in" v={order.submittedAt ? fmtDueET(order.submittedAt) : "not yet — the 10-hour clock hasn't started"} />
              <Row k="Due by" v={order.dueAt ? <strong>{fmtDueET(order.dueAt)}</strong> : "—"} />
              {order.deliveredAt && <Row k="Sent" v={`${fmtDueET(order.deliveredAt)}${order.verdict ? ` · “${order.verdict}”` : ""}`} />}
              <Row k="Links" v={<><a href={stripePaymentUrl(order)} target="_blank" rel="noreferrer" style={{ color: "#1C4FE0" }}>Payment in Stripe</a> · <a href={`${up}thank-you?session_id=${order.sessionId}`} target="_blank" rel="noreferrer" style={{ color: "#1C4FE0" }}>Buyer&apos;s form</a></>} />
            </div>

            <DeliverForm sessionId={order.sessionId} email={order.email} supplier={order.supplier_name} deliveredAt={order.deliveredAt ? fmtDueET(order.deliveredAt) : ""} submitted={order.submitted} />

            <form method="post" action="/api/report/deliver" style={{ marginTop: "12px" }}>
              <input type="hidden" name="action" value="logout" />
              <input type="hidden" name="ref" value={order.orderNo} />
              <button type="submit" style={{ background: "none", border: 0, padding: 0, fontSize: "13px", color: "#67748A", textDecoration: "underline", cursor: "pointer" }}>Sign out on this device</button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
