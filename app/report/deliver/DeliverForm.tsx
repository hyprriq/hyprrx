"use client";

import { useState } from "react";

const MAX_MB = 4;
// One-tap verdict lines; the email colours its verdict box from these words (clear = green, verify = amber, do not rely = red).
const QUICK = [
  { label: "Source Clear", cls: "g" },
  { label: "Verify Before Purchase", cls: "a" },
  { label: "Do Not Rely", cls: "r" },
];

export default function DeliverForm({ sessionId, email, supplier, deliveredAt, submitted }: { sessionId: string; email: string; supplier: string; deliveredAt: string; submitted: boolean }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [over, setOver] = useState(false);
  const [verdict, setVerdict] = useState("");
  const [done, setDone] = useState<{ sentTo: string; filename: string; resend: boolean } | null>(null);

  if (done)
    return (
      <div className="dv-ok" role="status">
        <strong>✓ Report sent to {done.sentTo}</strong>
        <span>
          “Your supplier report is ready: {supplier}” with <span style={{ overflowWrap: "anywhere" }}>{done.filename}</span> attached.
          {done.resend ? " This was a second send, so the buyer now has two copies." : ""}
        </span>
        <span>Stripe and Loops are updated, and the reminder emails have stopped.</span>
      </div>
    );

  const pick = (f: File | null | undefined) => {
    setErr("");
    if (!f) return setFile(null);
    if (f.type !== "application/pdf" && !/\.pdf$/i.test(f.name)) return setErr("That isn't a PDF.");
    if (f.size > MAX_MB * 1024 * 1024) return setErr(`The PDF must be under ${MAX_MB} MB (this one is ${(f.size / 1048576).toFixed(1)} MB).`);
    setFile(f);
  };

  return (
    <form
      style={{ display: "grid", gap: "14px" }}
      onSubmit={async (e) => {
        e.preventDefault();
        setErr("");
        if (!file) return setErr("Attach the report PDF.");
        if (deliveredAt && !window.confirm(`This report was already sent on ${deliveredAt}. Email ${email} a second copy?`)) return;
        const fd = new FormData();
        fd.set("session_id", sessionId);
        fd.set("file", file);
        fd.set("verdict", verdict.trim());
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
      <h2 style={{ marginBottom: 0 }}>Send the finished report</h2>
      {!submitted && <div className="dv-note">The buyer hasn&apos;t sent the supplier form yet. You can still send a report, but check the supplier with them first.</div>}
      {deliveredAt && <div className="dv-note">Already sent on {deliveredAt}. Sending again emails the buyer a second copy.</div>}

      <label
        className={`dv-drop${over ? " over" : ""}${file ? " has" : ""}`}
        onDragOver={() => setOver(true)}
        onDragLeave={() => setOver(false)}
        onDrop={() => setOver(false)}
      >
        <input type="file" accept=".pdf,application/pdf" onChange={(e) => pick(e.currentTarget.files?.[0])} aria-label="Report PDF" />
        {file ? (
          <>
            <strong>✓ {file.name}</strong>
            <span>{(file.size / 1048576).toFixed(1)} MB · tap to change</span>
          </>
        ) : (
          <>
            <strong>Drop the report PDF here</strong>
            <span>or tap to choose · under {MAX_MB} MB</span>
          </>
        )}
      </label>
      <span className="dv-muted" style={{ fontSize: "12.5px", marginTop: "-6px" }}>
        The buyer receives it as HyprrIQ-Supplier-Report-{supplier ? supplier.replace(/[^\w-]+/g, "-").slice(0, 40) : "supplier"}.pdf
      </span>

      <label className="dv-field">
        Verdict line <span className="dv-muted" style={{ fontWeight: 400 }}>(optional, shown in the email&apos;s verdict box)</span>
        <input className="dv-input" value={verdict} onChange={(e) => setVerdict(e.target.value)} maxLength={200} placeholder="e.g. Level 3 · Verify Before Purchase" />
      </label>
      <div className="dv-quick">
        {QUICK.map((q) => (
          <button key={q.label} type="button" className={q.cls} onClick={() => setVerdict(q.label)}>
            {q.label}
          </button>
        ))}
      </div>

      {err && <p className="dv-err">{err}</p>}
      <button type="submit" className="dv-btn" disabled={busy}>
        {busy ? "Sending…" : deliveredAt ? `Send again to ${email}` : `Send report to ${email}`}
      </button>
      <p className="dv-muted" style={{ fontSize: "13px" }}>
        Emails the branded “Your supplier report is ready” message with the PDF attached, stamps the order in Stripe, and marks the buyer delivered in Loops so no reminder goes out.
      </p>
    </form>
  );
}
