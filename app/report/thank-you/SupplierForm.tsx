"use client";

import { useState } from "react";
import { thankYou } from "../content";

const MAX_FILES = 2;
const MAX_MB = 4;

export default function SupplierForm({ sessionId, prefill, already }: { sessionId: string; prefill: { supplier_name: string; supplier_website: string }; already: boolean }) {
  const [done, setDone] = useState(already);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const f = thankYou.fields;

  if (done)
    return (
      <div style={{ padding: "20px 18px", border: "3px solid #0B1B33", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <strong className="disp" style={{ fontSize: "21px", color: "#0B1B33" }}>{thankYou.done}</strong>
        <p style={{ margin: 0, fontSize: "15.5px", lineHeight: 1.5 }}>Reply to any email from us if something changes. We never contact your supplier.</p>
      </div>
    );

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr("");
        const fd = new FormData(e.currentTarget);
        const real = (fd.getAll("files") as File[]).filter((x) => x && x.size > 0);
        if (real.length > MAX_FILES) return setErr(`Up to ${MAX_FILES} files.`);
        if (real.some((x) => x.size > MAX_MB * 1024 * 1024)) return setErr(`Each file must be under ${MAX_MB} MB.`);
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
      <div style={{ padding: "12px 14px", background: "#FFF8D6", border: "1px solid #F1DE7A", borderRadius: "8px", fontSize: "14.5px", lineHeight: 1.45, color: "#0B1B33" }}>
        <strong>{thankYou.oneSupplier}</strong>
      </div>
      <label>
        {f.name} *
        <input name="supplier_name" required maxLength={120} defaultValue={prefill.supplier_name} />
      </label>
      <label>
        {f.website} *
        <input name="supplier_website" required maxLength={200} defaultValue={prefill.supplier_website} placeholder="https://" inputMode="url" />
      </label>
      <label>
        {f.brands} * <span className="hint">({f.brandsHint})</span>
        <input name="brands" required maxLength={300} />
      </label>
      <label>
        {f.category}
        <input name="category" maxLength={120} />
      </label>
      <label>
        {f.notes}
        <textarea name="notes" rows={4} maxLength={2000} />
      </label>
      <label>
        {f.upload} <span className="hint">({f.uploadHint} · PDF, JPG or PNG · {MAX_MB} MB each)</span>
        <input name="files" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" />
      </label>
      {err && <p style={{ margin: 0, fontSize: "13px", color: "#C1272D" }}>{err}</p>}
      <button type="submit" className="cta" disabled={busy}>
        <b>{busy ? "Sending…" : thankYou.button}</b>
      </button>
      <p style={{ margin: 0, fontSize: "13.5px", color: "#67748A", textAlign: "center" }}>{thankYou.line}</p>
    </form>
  );
}
