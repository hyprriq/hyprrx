"use client";

import { useState } from "react";
import { thankYou } from "../content";

const MAX_FILES = 2;
const MAX_MB = 4;

export default function SupplierForm({ sessionId, prefill, already }: { sessionId: string; prefill: { supplier_name: string; supplier_website: string }; already: boolean }) {
  const [done, setDone] = useState(already);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (done)
    return (
      <div className="order" style={{ marginTop: 26 }}>
        <h3 className="h3">Got it.</h3>
        <p style={{ marginTop: 10 }}>{thankYou.done}</p>
      </div>
    );

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr("");
        const fd = new FormData(e.currentTarget);
        const files = fd.getAll("files") as File[];
        const real = files.filter((f) => f && f.size > 0);
        if (real.length > MAX_FILES) return setErr(`Up to ${MAX_FILES} files.`);
        if (real.some((f) => f.size > MAX_MB * 1024 * 1024)) return setErr(`Each file must be under ${MAX_MB} MB.`);
        fd.set("session_id", sessionId);
        setBusy(true);
        try {
          const res = await fetch("/api/report/submit", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Could not submit");
          setDone(true);
          window.scrollTo({ top: 0 });
        } catch (er) {
          setErr(er instanceof Error ? er.message : "Something went wrong.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <label>
        Supplier name *
        <input name="supplier_name" required maxLength={120} defaultValue={prefill.supplier_name} placeholder="Company name as they gave it" />
      </label>
      <label>
        Supplier website *
        <input name="supplier_website" required maxLength={200} defaultValue={prefill.supplier_website} placeholder="https://" inputMode="url" />
      </label>
      <label>
        Brands they&rsquo;re offering (up to 5) *
        <input name="brands" required maxLength={300} placeholder="e.g. Nintendo, Sony, PlayStation" />
      </label>
      <label>
        Marketplace you sell on
        <select name="marketplace" defaultValue="Amazon US">
          {["Amazon US", "Amazon CA", "Amazon UK", "Amazon EU", "Walmart", "Other"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        What they&rsquo;ve told you <span className="hint">LOA? &ldquo;authorized&rdquo;? MOQ, prices, payment terms</span>
        <textarea name="told" rows={4} maxLength={2000} />
      </label>
      <label>
        Upload invoice / LOA <span className="hint">optional · up to 2 files · PDF, JPG or PNG · 4 MB each</span>
        <input name="files" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" />
      </label>
      <label>
        Anything else
        <textarea name="notes" rows={3} maxLength={2000} />
      </label>
      {err && <p className="err" style={{ color: "#C1272D" }}>{err}</p>}
      <button type="submit" className="btn" disabled={busy}>
        {busy ? "Sending…" : "Submit supplier details →"}
      </button>
      <p className="small" style={{ textAlign: "center" }}>Used for your report only. We never contact the supplier.</p>
    </form>
  );
}
