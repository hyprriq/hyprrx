"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CTA, PRICE, emailStep, exitPopup, recoveryPopup } from "./content";

/* ---------- context ---------- */
type Ctx = { openEmail: () => void; zoom: (src: string, alt: string) => void };
const FunnelCtx = createContext<Ctx>({ openEmail: () => {}, zoom: () => {} });

const LS_EMAIL = "rp_email";
const LS_UTM = "rp_utm";
const SS_EXIT = "rp_exit_shown";

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
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const found: Record<string, string> = {};
    keys.forEach((k) => {
      const v = p.get(k);
      if (v) found[k] = v.slice(0, 80);
    });
    if (Object.keys(found).length) localStorage.setItem(LS_UTM, JSON.stringify(found));
  } catch {}
}

const ArrowIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- provider: modals live here ---------- */
export function FunnelProvider({ children }: { children: React.ReactNode }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [recoverOpen, setRecoverOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [zoomSrc, setZoomSrc] = useState<{ src: string; alt: string } | null>(null);

  const openEmail = useCallback(() => setEmailOpen(true), []);
  const zoom = useCallback((src: string, alt: string) => setZoomSrc({ src, alt }), []);

  // on load: capture UTMs; ?returned=1 → $59 popup (only if we know the email)
  useEffect(() => {
    captureUtm();
    const p = new URLSearchParams(window.location.search);
    if (p.get("returned") === "1") {
      const email = localStorage.getItem(LS_EMAIL);
      queueMicrotask(() => (email ? setRecoverOpen(true) : setEmailOpen(true)));
      const clean = new URL(window.location.href);
      clean.searchParams.delete("returned");
      window.history.replaceState({ rp: 1 }, "", clean.toString());
    }
  }, []);

  // exit intent: desktop mouse-out at top; mobile back button or fast scroll up
  useEffect(() => {
    if (sessionStorage.getItem(SS_EXIT)) return;
    const already = () => !!localStorage.getItem(LS_EMAIL);
    const fire = () => {
      if (sessionStorage.getItem(SS_EXIT) || already()) return;
      sessionStorage.setItem(SS_EXIT, "1");
      setExitOpen(true);
    };
    const armedAt = Date.now() + 8000; // don't trap in the first seconds
    const onMouse = (e: MouseEvent) => {
      if (Date.now() > armedAt && e.clientY <= 0 && !e.relatedTarget) fire();
    };
    let lastY = window.scrollY;
    let lastT = Date.now();
    const onScroll = () => {
      const y = window.scrollY;
      const t = Date.now();
      const dy = lastY - y;
      const dt = t - lastT;
      if (Date.now() > armedAt && y > 600 && dy > 500 && dt < 300) fire();
      lastY = y;
      lastT = t;
    };
    // back-button trap (mobile): one extra history entry
    try {
      window.history.pushState({ rp: 1 }, "");
    } catch {}
    const onPop = () => {
      if (Date.now() > armedAt) fire();
    };
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
      {emailOpen && <EmailModal onClose={() => setEmailOpen(false)} />}
      {recoverOpen && <RecoveryModal onClose={() => setRecoverOpen(false)} />}
      {exitOpen && <ExitModal onClose={() => setExitOpen(false)} />}
      {zoomSrc && (
        <div className="rp-modal zoom" onClick={() => setZoomSrc(null)} role="dialog" aria-label="Zoomed screenshot">
          <div className="zbox">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomSrc.src} alt={zoomSrc.alt} />
          </div>
        </div>
      )}
    </FunnelCtx.Provider>
  );
}

/* ---------- buttons ---------- */
export function BuyButton({ label = CTA.primary, under = CTA.under }: { label?: string; under?: string }) {
  const { openEmail } = useContext(FunnelCtx);
  return (
    <div className="btn-wrap">
      <button type="button" className="btn" onClick={openEmail}>
        {label} <ArrowIcon />
      </button>
      {under && <p className="btn-under">{under}</p>}
    </div>
  );
}

export function StickyBar() {
  const { openEmail } = useContext(FunnelCtx);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > 700);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className={`sticky ${on ? "on" : ""}`} aria-hidden={!on}>
      <div className="in">
        <div className="t">
          ${PRICE}
          <small>Report in 24h</small>
        </div>
        <button type="button" className="btn" onClick={openEmail}>
          Check my supplier <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

export function ZoomImage({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  const { zoom } = useContext(FunnelCtx);
  return (
    <button type="button" onClick={() => zoom(src, alt)} className="frame" style={{ border: 0, padding: 0, width: "100%", display: "block" }} aria-label={`Zoom: ${alt}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" />
      <span className="zoomhint">Tap to zoom</span>
    </button>
  );
}

/* ---------- checkout helpers ---------- */
async function startCheckout(email: string, recover: boolean, setErr: (s: string) => void, setBusy: (b: boolean) => void) {
  setBusy(true);
  setErr("");
  try {
    localStorage.setItem(LS_EMAIL, email);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const res = await fetch("/api/report/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, recover, utm: readUtm(), tz, path: window.location.pathname }),
    });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout");
    window.location.href = data.url;
  } catch (e) {
    setErr(e instanceof Error ? e.message : "Something went wrong. Try again.");
    setBusy(false);
  }
}

function EmailModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem(LS_EMAIL) || "";
    } catch {
      return "";
    }
  });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-email-title">
      <form
        className="box"
        onSubmit={(e) => {
          e.preventDefault();
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErr("Enter a valid email.");
          startCheckout(email.trim(), false, setErr, setBusy);
        }}
      >
        <button type="button" className="x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h3 id="rp-email-title">{emailStep.title}</h3>
        <p>Your report lands here within 24 hours.</p>
        <input ref={ref} type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
        {err && <p className="err">{err}</p>}
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "One moment…" : emailStep.button}
        </button>
        <p className="consent">{emailStep.consent}</p>
      </form>
    </div>
  );
}

function RecoveryModal({ onClose }: { onClose: () => void }) {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const mid = new Date(now);
      mid.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((mid.getTime() - now.getTime()) / 1000));
      const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      setLeft(`${h}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const email = typeof window !== "undefined" ? localStorage.getItem(LS_EMAIL) || "" : "";
  return (
    <div className="rp-modal" role="dialog" aria-modal="true" aria-labelledby="rp-rec-title">
      <div className="box">
        <button type="button" className="x" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h3 id="rp-rec-title">{recoveryPopup.title}</h3>
        <p>{recoveryPopup.body}</p>
        <p className="count">Expires at midnight — {left} left</p>
        {err && <p className="err">{err}</p>}
        <button type="button" className="btn" disabled={busy} onClick={() => startCheckout(email, true, setErr, setBusy)}>
          {busy ? "One moment…" : recoveryPopup.button}
        </button>
        <p className="consent">{recoveryPopup.small}</p>
      </div>
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
        className="box"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErr("Enter a valid email.");
          setBusy(true);
          setErr("");
          try {
            const res = await fetch("/api/report/checklist", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ email: email.trim(), utm: readUtm() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not send");
            setDone(data.url);
          } catch (er) {
            setErr(er instanceof Error ? er.message : "Something went wrong.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <button type="button" className="x" onClick={onClose} aria-label="Close">
          ×
        </button>
        {done ? (
          <>
            <h3 id="rp-exit-title">Sent. Check your inbox.</h3>
            <p>
              Or open it now: <a href={done}>9 red flags (PDF)</a>
            </p>
          </>
        ) : (
          <>
            <h3 id="rp-exit-title">{exitPopup.title}</h3>
            <p>{exitPopup.body}</p>
            <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
            {err && <p className="err">{err}</p>}
            <button type="submit" className="btn" disabled={busy}>
              {busy ? "Sending…" : exitPopup.button}
            </button>
            <p className="consent">{exitPopup.small}</p>
          </>
        )}
      </form>
    </div>
  );
}
