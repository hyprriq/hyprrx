import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminKey, keyMatches } from "../../../lib/admin";
import { fmtDueET, fmtIST, loadOrder, loadOrderByNo, stripePaymentUrl, type Order } from "../../../lib/orders";
import DeliverForm from "./DeliverForm";
import { DELIVER_CSS } from "./deliver.css";

export const metadata = { title: { absolute: "Report delivery — HyprrIQ (internal)" }, robots: { index: false, follow: false } };

/** Deadline state for the due bar: time left, overdue, or delivered. */
function deadline(o: Order): { cls: string; left: string } {
  if (o.deliveredAt) return { cls: "done", left: "Delivered" };
  if (!o.dueAt) return { cls: "none", left: "Clock not started" };
  const mins = Math.round((new Date(o.dueAt).getTime() - Date.now()) / 60000);
  const hm = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`;
  if (mins < 0) return { cls: "late", left: `Overdue by ${hm(-mins)}` };
  return { cls: mins < 180 ? "soon" : "", left: `${hm(mins)} left` };
}

export function Shell({ env, children }: { env?: "live" | "test"; children: React.ReactNode }) {
  return (
    <div className="dv">
      <style dangerouslySetInnerHTML={{ __html: DELIVER_CSS }} />
      <header className="dv-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/report/hyprriq-logo-reversed.svg" alt="HyprrIQ" />
        <span className="t">Report delivery</span>
        {env && <span className={`env ${env}`}>{env === "live" ? "Live" : "Test mode"}</span>}
      </header>
      <main className="dv-main">{children}</main>
    </div>
  );
}

// Internal page: open an order (from the order email), attach the finished PDF, send.
// Sends the branded "Your supplier report is ready" email with the PDF attached; state lives only in Stripe metadata.
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

  if (!authed)
    return (
      <Shell>
        <div className="dv-card dv-narrow">
          <h1>Sign in</h1>
          <p className="dv-muted">Enter the delivery key once on this device. It stays signed in for 30 days.</p>
          {bad && <p className="dv-err">That key didn&apos;t match.</p>}
          <form method="post" action="/api/report/deliver" style={{ display: "grid", gap: "12px" }}>
            <input type="hidden" name="action" value="login" />
            <input type="hidden" name="ref" value={ref} />
            <label className="dv-field">
              Delivery key
              <input className="dv-input" name="key" type="password" autoComplete="current-password" required />
            </label>
            <button type="submit" className="dv-btn">Sign in</button>
          </form>
        </div>
      </Shell>
    );

  if (!ref || !order)
    return (
      <Shell>
        <div className="dv-card dv-narrow">
          <h1>{ref ? `Order ${ref} not found` : "Open an order"}</h1>
          <p className="dv-muted">
            {ref ? "It may be in the other Stripe mode (test vs live), or it was paid under a minute ago. Try again shortly. " : ""}
            Click <strong>Send the finished report</strong> in the order email, or type the order number.
          </p>
          <form method="get" action={`${up}deliver`} style={{ display: "grid", gap: "12px" }}>
            <label className="dv-field">
              Order number
              <input className="dv-input" name="no" defaultValue={orderNo} placeholder="HX-260928-7Q4K" required autoCapitalize="characters" />
            </label>
            <button type="submit" className="dv-btn">Open order</button>
          </form>
        </div>
      </Shell>
    );

  return <Shell env={order.livemode ? "live" : "test"}><OrderView order={order} up={up} /></Shell>;
}

/** The signed-in order view (pure: no data loading), so it can be previewed with sample data. */
export function OrderView({ order, up }: { order: Order; up: string }) {
  const d = deadline(order);
  const status = order.deliveredAt ? { cls: "done", txt: "Report sent" } : order.submitted ? { cls: "wait", txt: "Awaiting report" } : { cls: "form", txt: "Form not in yet" };
  const site = order.supplier_website ? (order.supplier_website.startsWith("http") ? order.supplier_website : `https://${order.supplier_website}`) : "";
  const brands = (order.brands || "").split(",").map((b) => b.trim()).filter(Boolean);

  return (
    <>
      <section className="dv-card dv-head">
        <span className={`dv-status ${status.cls}`}>{status.txt}</span>
        <h1>{order.supplier_name || "Supplier not named yet"}</h1>
        <div className="dv-meta">
          <span className="dv-no">{order.orderNo || "—"}</span>
          <a href={`mailto:${order.email}`}>{order.email}</a>
          <span>
            Paid {order.amount}
            {order.promoCode ? ` · code ${order.promoCode}` : ""}
          </span>
        </div>
      </section>

      <section className={`dv-due ${d.cls}`}>
        <span className="lbl">{order.deliveredAt ? "Delivered" : "Due by"}</span>
        {order.deliveredAt ? (
          <>
            <span className="when">{fmtDueET(order.deliveredAt)}</span>
            <span className="ist">{fmtIST(order.deliveredAt)}</span>
          </>
        ) : order.dueAt ? (
          <>
            <span className="when">{fmtDueET(order.dueAt)}</span>
            <span className="ist">{fmtIST(order.dueAt)}</span>
          </>
        ) : (
          <span className="when">Starts when the buyer sends the supplier form</span>
        )}
        <span className="left">{d.left}</span>
      </section>

      <div className="dv-grid">
        <section className="dv-card">
          <h2>The order</h2>
          <dl className="dv-dl">
            <div>
              <dt>Website</dt>
              <dd>{site ? <a href={site} target="_blank" rel="noreferrer">{order.supplier_website}</a> : "—"}</dd>
            </div>
            <div>
              <dt>Brands</dt>
              <dd>{brands.length ? <span className="dv-chips">{brands.map((b) => <span key={b} className="dv-chip">{b}</span>)}</span> : "—"}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{order.category || "—"}</dd>
            </div>
            <div>
              <dt>Notes</dt>
              <dd style={{ whiteSpace: "pre-wrap" }}>{order.notes || "—"}</dd>
            </div>
            <div>
              <dt>Files</dt>
              <dd>{order.files ? <>{order.files} <span className="dv-muted">(attached to the order email)</span></> : "None"}</dd>
            </div>
            <div>
              <dt>Form received</dt>
              <dd>{order.submittedAt ? <>{fmtDueET(order.submittedAt)} <span className="dv-muted">· {fmtIST(order.submittedAt)}</span></> : "Not yet"}</dd>
            </div>
            {order.deliveredAt && (
              <div>
                <dt>Verdict sent</dt>
                <dd>{order.verdict || "—"}</dd>
              </div>
            )}
            <div>
              <dt>Links</dt>
              <dd>
                <a href={stripePaymentUrl(order)} target="_blank" rel="noreferrer">Payment in Stripe</a>
                {" · "}
                <a href={`${up}thank-you?session_id=${order.sessionId}`} target="_blank" rel="noreferrer">Buyer&apos;s form</a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="dv-card dv-send">
          <DeliverForm sessionId={order.sessionId} email={order.email} supplier={order.supplier_name} deliveredAt={order.deliveredAt ? fmtDueET(order.deliveredAt) : ""} submitted={order.submitted} />
        </section>
      </div>

      <div className="dv-foot">
        <a href={`${up}deliver`} className="dv-muted" style={{ fontSize: "13px" }}>Open another order</a>
        <form method="post" action="/api/report/deliver">
          <input type="hidden" name="action" value="logout" />
          <input type="hidden" name="ref" value={order.orderNo} />
          <button type="submit" className="dv-link">Sign out on this device</button>
        </form>
      </div>
    </>
  );
}
