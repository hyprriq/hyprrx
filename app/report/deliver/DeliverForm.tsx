"use client";

import { useState } from "react";

const MAX_MB = 4;

export default function DeliverForm({ sessionId, email, supplier, deliveredAt, submitted }: { sessionId: string; email: string; supplier: string; deliveredAt: string; submitted: boolean }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ sentTo: string; filename: string; resend: boolean } | null>(null);

  if (done)
    return (
      <div style={{ padding: "16px 18px", background: "#DDF1E5", border: "1px solid #9FD6B4", borderRadius: "8px", fontSize: "15px", lineHeight: 1.5, color: "#0F5E36" }}>
        <strong>Sent to {done.sentTo}.</strong> “Your supplier report is ready: {supplier}” with <span style={{ overflowWrap: "anywhere" }}>{done.filename}</span> attached.
        {done.resend ? " (Second send — the buyer now has two copies.)" : ""} Stripe and Loops are updated; reminders stop.
      </div>
    );

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr("");
        const fd = new FormData(e.currentTarget);
        const f = fd.get("file");
        if (!(f instanceof File) || f.size === 0) return setErr("Attach the report PDF.");
        if (f.size > MAX_MB * 1024 * 1024) return setErr(`The PDF must be under ${MAX_MB} MB.`);
        if (deliveredAt && !window.confirm(`This report was already sent on ${deliveredAt}. Email ${email} a second copy?`)) return;
        fd.set("session_id", sessionId);
        setBusy(true);
        try {
          const res = await fetch("/api/report/deliver", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Could not send");
          setDone(data);
        } catch (er) {
          setErr(er instanceof Error ? er.message : "Something went wrong.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <strong className="disp" style={{ fontSize: "18px", color: "#0B1B33" }}>Send the finished report</strong>
      {!submitted && (
        <div style={{ padding: "12px 14px", background: "#FFF8D6", border: "1px solid #F1DE7A", borderRadius: "8px", fontSize: "14px", lineHeight: 1.45, color: "#0B1B33" }}>
          The buyer hasn&apos;t sent the supplier form yet. You can still send a report, but check the supplier with them first.
        </div>
      )}
      {deliveredAt && (
        <div style={{ padding: "12px 14px", background: "#FFF8D6", border: "1px solid #F1DE7A", borderRadius: "8px", fontSize: "14px", lineHeight: 1.45, color: "#0B1B33" }}>
          Already sent on {deliveredAt}. Sending again emails the buyer a second copy.
        </div>
      )}
      <label>
        Report PDF <span className="hint">(under {MAX_MB} MB · it is renamed HyprrIQ-Supplier-Report-{"<supplier>"}.pdf)</span>
        <input name="file" type="file" accept=".pdf,application/pdf" required />
      </label>
      <label>
        Verdict line <span className="hint">(optional · shows in the email&apos;s verdict box, e.g. “Authorised for 3 of 5 brands; Anker unverified”)</span>
        <input name="verdict" maxLength={200} placeholder="see page 1" />
      </label>
      {err && <p style={{ margin: 0, fontSize: "13px", color: "#C1272D" }}>{err}</p>}
      <button type="submit" className="cta" disabled={busy} style={{ minHeight: "60px" }}>
        <b>{busy ? "Sending…" : deliveredAt ? `Send again to ${email}` : `Send report to ${email}`}</b>
      </button>
      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.5, color: "#67748A" }}>
        Sends the branded “Your supplier report is ready” email with the PDF attached, stamps the order in Stripe, and moves the buyer to <em>delivered</em> in Loops so no reminder goes out.
      </p>
    </form>
  );
}
