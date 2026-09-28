"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/report/v1-hero.mp4";
const POSTER = "/report/v1-poster.jpg";

/** Hero explainer (V1, 16:9 page cut). Poster + play in the evidence stack; plays in a lightbox with sound and controls. */
export default function HeroVideo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    ref.current?.play().catch(() => {});
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <div className="vid">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="poster" src={POSTER} alt="" width={1280} height={720} loading="eager" />
        <span className="shade" aria-hidden />
        <button type="button" className="play" aria-label="Watch the explainer" onClick={() => setOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B1B33" aria-hidden><path d="M8 5v14l11-7z" /></svg>
        </button>
        <span className="mono label" onClick={() => setOpen(true)}>Watch the explainer</span>
      </div>
      {open && (
        <div className="rp-modal" role="dialog" aria-modal="true" aria-label="Explainer video" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="player">
            <button type="button" className="x" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D8F1FF" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <video ref={ref} src={SRC} poster={POSTER} controls playsInline preload="metadata" />
          </div>
        </div>
      )}
    </>
  );
}
