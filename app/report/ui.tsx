"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { cta, emailStep, exitPopup, recoveryPopup } from "./content";

type Ctx = { openEmail: () => void; zoom: (src: string, alt: string) => void };
const FunnelCtx = createContext<Ctx>({ openEmail: () => {}, zoom: () => {} });

const LS_EMAIL = "rp_email";
const LS_UTM = "rp_utm";
const SS_EXIT = "rp_exit_shown";
const SS_CODE = "rp_code";

function readUtm(): Record<string, string> {
  try {
    const raw = localStorage.getItem(LS_UTM);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = p.get(k);
      if (v) found[k] = v.slice(0, 80);
    }
    if (Object.keys(found).length) localStorage.setItem(LS_UTM, JSON.stringify(found));
  } catch {}
}
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const Arrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const X = ({ color = "#67748A" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

/* ---------- provider ---------- */
export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [recoverOpen, setRecoverOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<{ src: string; alt: string } | null>(null);
  const openEmail = useCallback(() => setEmailOpen(true), []);
  const zoom = useCallback((src: string, alt: string) => setZoomSrc({ src, alt }), []);

  useEffect(() => {
    captureUtm();
    const p = new URLSearchParams(window.location.search);
    const code = p.get("code");
    if (code && /^R59-[A-Z0-9]{4,10}$/i.test(code)) {
      try { sessionStorage.setItem(SS_CODE, code.toUpperCase()); } catch {}
    }
    if (p.get("returned") === "1" || code) {
      const email = localStorage.getItem(LS_EMAIL);
      queueMicrotask(() => (email ? setRecoverOpen(true) : setEmailOpen(true)));
      const clean = new URL(window.location.href);
      clean.searchParams.delete("returned");
      clean.searchParams.delete("code");
      window.history.replaceState({ rp: 1 }, "", clean.toString());
    }
  }, []);

  // exit intent: desktop mouse leaves at the top; mobile back button or fast scroll up. Once per session, armed after 8s.
  useEffect(() => {
    if (sessionStorage.getItem(SS_EXIT)) return;
    const armedAt = Date.now() + 8000;
    const fire = () => {
      if (Date.now() < armedAt || sessionStorage.getItem(SS_EXIT) || localStorage.getItem(LS_EMAIL)) return;
      sessionStorage.setItem(SS_EXIT, "1");
      setExitOpen(true);
    };
    const onMouse = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire();
    };
    let lastY = window.scrollY, lastT = Date.now();
    const onScroll = () => {
      const y = window.scrollY, t = Date.now();
      if (y > 600 && lastY - y > 500 && t - lastT < 300) fire();
      lastY = y; lastT = t;
    };
    try { window.history.pushState({ rp: 1 }, ""); } catch {}
    const onPop = () => fire();
    document.addEventListener("mouseout", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("mouseout", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return (
    <FunnelCtx.Provider value={{ openEmail, zoom }}>
      {children}
      {emailOpen && <EmailSheet onClose={() => setEmailOpen(false)} />}
      {recoverOpen && <RecoveryModal onClose={() => setRecoverOpen(false)} />}
      {exitOpen && <ExitModal onClose={() => setExitOpen(false)} />}
      {zoomSrc && (
        <div className="rp-modal" onClick={() => setZoomSrc(null)} role="dialog" aria-label="Zoomed image">
          <div className="zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomSrc.src} alt={zoomSrc.alt} />
          </div>
        </div>
      )}
    </FunnelCtx.Provider>
  );
}

/* ---------- CTA (two-line button from the design) ---------- */
export function Cta({ style }: { style?: CSSProperties }) {
  const { openEmail } = useContext(FunnelCtx);
  return (
    <button type="button" className="cta" style={style} onClick={openEmail}>
      <b>
        {cta.label} <Arrow />
      </b>
      <small>{cta.small}</small>
    </button>
  );
}

export function StickyBar() {
  const { openEmail } = useContext(FunnelCtx);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 640);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`sticky ${on ? "on" : ""}`} aria-hidden={!on}>
      <div className="in">
        <div className="price">
          <b>$79</b>
          <span>Report in 10h</span>
        </div>
        <button type="button" className="cta" onClick={openEmail}>
          {cta.sticky}
        </button>
      </div>
    </div>
  );
}

export function Zoomable({ src, alt, style, width, height }: { src: string; alt: string; style?: CSSProperties; width?: number; height?: number }) {
  const { zoom } = useContext(FunnelCtx);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={{ cursor: "zoom-in", ...style }} width={width} height={height} loading="lazy" onClick={() => zoom(src, alt)} />;
}

/* ---------- checkout ---------- */
async function startCheckout(email: string, recover: boolean, setErr: (s: string) => void, setBusy: (b: boolean) => void) {
  setBusy(true);
  setErr("");
  try {
    localStorage.setItem(LS_EMAIL, email);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch("/api/report/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, recover, utm: readUtm(), tz, code: recover ? sessionStorage.getItem(SS_CODE) || "" : "" }),
    });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout");
    window.location.href = data.url;
  } catch (e) {
    setErr(e instanceof Error ? e.message : "Something went wrong. Try again.");
    setBusy(false);
  }
}

function EmailSheet({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem(LS_EMAIL) || ""; } catch { return ""; }
  });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-email-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form
        className="sheet"
        onSubmit={(e) => {
          e.preventDefault();
          if (!EMAIL_RE.test(email.trim())) return setErr("Enter a valid email.");
          startCheckout(email.trim().toLowerCase(), !!sessionStorage.getItem(SS_CODE), setErr, setBusy);
        }}
      >
        <span className="grab" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: "10.5px", fontWeight: 600, color: "#1C4FE0" }}>{emailStep.step}</span>
          <button type="button" className="x" style={{ position: "static" }} onClick={onClose} aria-label="Close"><X /></button>
        </div>
        <h3 id="rp-email-title" className="disp" style={{ margin: 0, fontSize: "28px", lineHeight: 1.1, fontWeight: 900, color: "#0B1B33" }}>{emailStep.title}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label htmlFor="rp-em1">{emailStep.label}</label>
          <input ref={ref} id="rp-em1" className="field" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" required />
        </div>
        {err && <p className="err">{err}</p>}
        <button type="submit" className="btn" disabled={busy}>{busy ? "One moment…" : emailStep.button}</button>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.45, color: "#67748A", textAlign: "center" }}>{emailStep.consent}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", fontSize: "12.5px", color: "#67748A" }}>
          <span>{emailStep.footer[0]}</span><span>·</span><span>{emailStep.footer[1]}</span><span>·</span><span>{emailStep.footer[2]}</span>
        </div>
      </form>
    </div>
  );
}

function useMidnightCountdown() {
  const [t, setT] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const mid = new Date(now);
      mid.setHours(24, 0, 0, 0);
      const sec = Math.max(0, Math.floor((mid.getTime() - now.getTime()) / 1000));
      setT({ h: String(Math.floor(sec / 3600)).padStart(2, "0"), m: String(Math.floor((sec % 3600) / 60)).padStart(2, "0"), s: String(sec % 60).padStart(2, "0") });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function RecoveryModal({ onClose }: { onClose: () => void }) {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const t = useMidnightCountdown();
  const email = typeof window !== "undefined" ? localStorage.getItem(LS_EMAIL) || "" : "";
  return (
    <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-rec-title">
      <div className="box">
        <button type="button" className="x" onClick={onClose} aria-label="Close"><X /></button>
        <span className="tag" style={{ alignSelf: "flex-start", background: "#FFE45C", color: "#0B1B33" }}>{recoveryPopup.tag}</span>
        <h3 id="rp-rec-title" className="disp" style={{ margin: 0, fontSize: "27px", lineHeight: 1.12, fontWeight: 900, color: "#0B1B33" }}>
          {recoveryPopup.titleA}<span className="hl">{recoveryPopup.titleHl}</span>{recoveryPopup.titleB}
        </h3>
        <div className="count">
          <div><b>{t.h}</b><span>Hours</span></div>
          <div><b>{t.m}</b><span>Min</span></div>
          <div><b>{t.s}</b><span>Sec</span></div>
        </div>
        <span className="mono" style={{ fontSize: "9.5px", color: "#67748A", textAlign: "center" }}>{recoveryPopup.countdownNote}</span>
        {err && <p className="err">{err}</p>}
        <button type="button" className="btn" disabled={busy} onClick={() => startCheckout(email, true, setErr, setBusy)}>{busy ? "One moment…" : recoveryPopup.button}</button>
        <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} style={{ alignSelf: "center", fontSize: "13.5px", color: "#67748A", minHeight: "44px", display: "flex", alignItems: "center" }}>{recoveryPopup.dismiss}</a>
      </div>
    </div>
  );
}

function ChecklistIcon() {
  const row = (
    <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      <span style={{ width: "6px", height: "6px", border: "1.5px solid #C1272D", borderRadius: "1px" }} />
      <span style={{ height: "3px", flexGrow: 1, background: "#D5DCE7" }} />
    </span>
  );
  return (
    <div style={{ flexShrink: 0, width: "62px", height: "78px", background: "#fff", borderRadius: "4px", padding: "8px 7px", display: "flex", flexDirection: "column", gap: "6px", transform: "rotate(-4deg)" }}>
      <span style={{ height: "5px", width: "70%", background: "#0B1B33", borderRadius: "2px" }} />
      {row}{row}{row}{row}
    </div>
  );
}

function ExitModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  return (
    <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-exit-title">
      <form
        className="box exit"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!EMAIL_RE.test(email.trim())) return setErr("Enter a valid email.");
          setBusy(true); setErr("");
          try {
            const res = await fetch("/api/report/checklist", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase(), utm: readUtm() }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not send");
            setDone(data.url);
          } catch (er) {
            setErr(er instanceof Error ? er.message : "Something went wrong.");
          } finally { setBusy(false); }
        }}
      >
        <div style={{ position: "relative", padding: "24px 22px 18px", background: "#0B1B33", display: "flex", gap: "14px", alignItems: "center" }}>
          <button type="button" className="x" style={{ right: 4, top: 4 }} onClick={onClose} aria-label="Close"><X color="#D8F1FF" /></button>
          <ChecklistIcon />
          <h3 id="rp-exit-title" className="disp" style={{ margin: 0, fontSize: "24px", lineHeight: 1.12, fontWeight: 900, color: "#fff" }}>
            {exitPopup.titleA}<span style={{ color: "#FFE45C" }}>{exitPopup.titleHl}</span>
          </h3>
        </div>
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {done ? (
            <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5 }}>Sent — check your inbox. Or open it now: <a href={done}>9 red-flag checklist (PDF)</a>.</p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label htmlFor="rp-em3">{exitPopup.label}</label>
                <input id="rp-em3" className="field" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" required />
              </div>
              {err && <p className="err">{err}</p>}
              <button type="submit" className="btn" disabled={busy}>{busy ? "Sending…" : exitPopup.button}</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
