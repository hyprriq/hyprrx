import Link from "next/link";
import { BuyButton, StickyBar, ZoomImage } from "./ui";
import { getSlotsLeft } from "../../lib/slots";
import {
  CTA, PRICE, SLOT_CAP, hero, pain, fear, questions, reportBlock, how, proof, offer, fit, faq, ps, footer,
  type Shot,
  type Mark,
} from "./content";

export const revalidate = 60;

function Marks({ marks }: { marks?: Mark[] }) {
  if (!marks?.length) return null;
  return (
    <>
      {marks.map((m, i) => {
        const style = { left: `${m.x}%`, top: `${m.y}%`, width: `${m.w}%`, height: `${m.h}%` } as const;
        if (m.type === "stamp")
          return (
            <div className="mark" key={i} style={{ left: `${m.x}%`, top: `${m.y}%` }}>
              <span className="mark-stamp">Red flag</span>
            </div>
          );
        if (m.type === "underline")
          return (
            <div className="mark" key={i} style={style}>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <path d="M1 15 C 20 12, 45 18, 70 14 S 95 17, 99 14" fill="none" stroke="#C1272D" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
          );
        if (m.type === "circle")
          return (
            <div className="mark" key={i} style={style}>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
                <path d="M8 20 C 6 6, 40 3, 62 5 S 98 10, 94 24 S 60 39, 30 36 S 4 32, 10 18" fill="none" stroke="#C1272D" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </div>
          );
        return (
          <div className="mark" key={i} style={style}>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
              <path d="M96 6 C 80 30, 40 36, 10 30" fill="none" stroke="#C1272D" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M20 22 L 8 30 L 20 38" fill="none" stroke="#C1272D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}
    </>
  );
}

function ZoomStrip({ zoom }: { zoom?: Shot["zoom"] }) {
  if (!zoom) return null;
  return (
    <div className="zoomstrip">
      <span className="zlabel">Zoomed in</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={zoom.src} alt="" width={zoom.w} height={zoom.h} loading="lazy" />
      <Marks marks={zoom.marks} />
    </div>
  );
}

function VideoSlot({ label, tag, loop, poster }: { label?: string; tag?: string; loop?: boolean; poster?: string }) {
  // Poster placeholder until Session B delivers the mp4s into 04 Landing Videos.
  return (
    <div className={`video ${loop ? "loop" : ""}`} aria-label={label || tag}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {poster && <img className="poster" src={poster} alt="" aria-hidden loading="lazy" />}
      {tag && <span className="tag">{tag}</span>}
      {label && (
        <span className="play">
          <i>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d="M7 5v14l12-7z" />
            </svg>
          </i>
          {label}
        </span>
      )}
    </div>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="wm" aria-label="Hyprr X">
      Hyprr<span>X</span>
    </Link>
  );
}

export default async function ReportPage() {
  const slots = await getSlotsLeft();

  return (
    <main>
      <header className="hdr">
        <div className="wrap">
          <Wordmark />
          <span className="pill">Supplier report · ${PRICE} · 24h</span>
        </div>
      </header>

      {/* 1 · HERO */}
      <section className="band band-dark" id="top">
        <div className="wrap">
          <p className="eyebrow">{hero.prehead}</p>
          <h1 className="h1">
            {hero.h1a} <span className="hl">{hero.h1b}</span>
          </h1>
          <p className="lead" style={{ marginTop: 22 }}>
            {hero.sub}
          </p>
          <BuyButton under={CTA.underSecure} />
          <div style={{ marginTop: 30 }}>
            <VideoSlot label={hero.videoLabel} poster="/report/r1-verdict-page.webp" />
          </div>
          <div className="strip">
            {hero.proof.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · PAIN STRIP */}
      <section className="band band-sky">
        <div className="wrap">
          <h2 className="h2">
            {pain.lines.map((l) => (
              <span key={l} style={{ display: "block" }}>
                {l}
              </span>
            ))}
            <span className="hl" style={{ display: "inline", marginTop: 6 }}>
              {pain.punch}
            </span>
          </h2>
          <p className="small" style={{ marginTop: 22, fontSize: 16 }}>
            {pain.small}
          </p>
        </div>
      </section>

      {/* 3 · FEAR, QUANTIFIED */}
      <section className="band band-dark">
        <div className="wrap">
          <p className="eyebrow">What&rsquo;s actually at stake</p>
          <div className="stats" style={{ marginTop: 0 }}>
            {fear.cards.map((c) => (
              <div className="stat" key={c.big}>
                <b>{c.big}</b>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <p className="kicker">
            <span className="hl">{fear.kicker}</span>
          </p>
        </div>
      </section>

      {/* 4 · FIVE QUESTIONS */}
      <section className="band band-white">
        <div className="wrap">
          <h2 className="h2">
            {questions.h2a} <span className="hl">{questions.h2b}</span>
          </h2>
          <div className="qs">
            {questions.items.map((it, i) => (
              <div className="q" key={it.q}>
                <span className="n">0{i + 1}</span>
                <div>
                  <h3>{it.q}</h3>
                  <p>{it.a}</p>
                </div>
              </div>
            ))}
          </div>
          <BuyButton under={questions.under} />
        </div>
      </section>

      {/* 5 · THE REPORT */}
      <section className="band band-dark" id="report">
        <div className="wrap">
          <p className="eyebrow">{reportBlock.eyebrow}</p>
          <h2 className="h2">
            {reportBlock.h2a} <span className="hl">{reportBlock.h2b}</span>
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            {reportBlock.intro}
          </p>
          <div className="shots">
            {reportBlock.shots.map((s, i) => (
              <div className={`shot ${s.zoom ? "has-zoom" : ""}`} key={s.src}>
                <figure>
                  <div style={{ position: "relative" }}>
                    <ZoomImage src={s.src} alt={s.alt} w={s.w} h={s.h} />
                    <Marks marks={s.marks} />
                  </div>
                  <ZoomStrip zoom={s.zoom} />
                  <figcaption>
                    <b>{s.captionStrong}</b> {s.caption}
                  </figcaption>
                </figure>
                {i === 0 && <div style={{ marginTop: 34 }}><VideoSlot loop tag="V2 · Verdict page — 10s loop" poster="/report/r1-verdict-page.webp" /></div>}
                {i === 2 && <div style={{ marginTop: 34 }}><VideoSlot loop tag="V3 · Red flags — 10s loop" poster="/report/r1-brand-risk.webp" /></div>}
              </div>
            ))}
          </div>
          <BuyButton label={CTA.report} />
        </div>
      </section>

      {/* 6 · HOW IT WORKS */}
      <section className="band band-white" id="how">
        <div className="wrap">
          <h2 className="h2">
            {how.h2a} <span className="hl">{how.h2b}</span>
          </h2>
          <div className="steps">
            {how.steps.map((s, i) => (
              <div className="step" key={s.t}>
                <span className="n">{i + 1}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.b}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <VideoSlot tag="V5 · How it works — 25s" poster="/report/r1-findings-table.webp" />
          </div>
          <p className="small" style={{ marginTop: 18, textAlign: "center", fontWeight: 600 }}>
            {how.line}
          </p>
        </div>
      </section>

      {/* 7 · PROOF */}
      <section className="band band-dark" id="proof">
        <div className="wrap">
          <p className="eyebrow">Real cases · suppliers anonymised</p>
          <h2 className="h2">
            {proof.h2a} <span className="hl">{proof.h2b}</span>
          </h2>
          <div className="cases">
            {proof.cases.map((c) => (
              <div className="case" key={c.n}>
                <span className="n">{c.n}</span>
                <h3>{c.who}</h3>
                <p>{c.body}</p>
                <span className="verdict">→ {c.verdict}</span>
                {c.shot && (
                  <div className={`shot ${c.zoom ? "has-zoom" : ""}`} style={{ marginTop: 16 }}>
                    <ZoomImage src={c.shot.src} alt={c.shot.alt} w={c.shot.w} h={c.shot.h} />
                    <ZoomStrip zoom={c.zoom} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <VideoSlot loop tag="V4 · Sources — 10s loop" poster="/report/r1-checklist.webp" />
          </div>
          <p className="small" style={{ marginTop: 18, textAlign: "center" }}>
            {proof.honesty}
          </p>
          <BuyButton />
        </div>
      </section>

      {/* 8 · OFFER BOX */}
      <section className="band band-sky" id="offer">
        <div className="wrap">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h2 className="h2">
            One supplier. Up to five brands. <span className="hl">${PRICE}, once.</span>
          </h2>
          <div className="order">
            <div className="price">
              <b>${PRICE}</b>
              <span>one-time · no subscription</span>
            </div>
            <p style={{ marginTop: 12, fontSize: 16 }}>{offer.line}</p>
            <ul>
              {offer.includes.map((x) => (
                <li key={x}>
                  <i>✓</i>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            {slots !== null && (
              <p className="slots">
                <i /> {slots} of {SLOT_CAP} report slots left today
              </p>
            )}
            <div style={{ marginTop: 18 }}>
              <div className="row">
                <b>Delivery</b>
                <span>{offer.delivery}</span>
              </div>
              <div className="row">
                <b>Refund</b>
                <span>{offer.refund}</span>
              </div>
            </div>
            <BuyButton under={offer.under} />
          </div>
        </div>
      </section>

      {/* 9 · FOR / NOT FOR */}
      <section className="band band-slate">
        <div className="wrap">
          <h2 className="h2">Who this is for.</h2>
          <div className="fit">
            <div className="fitbox yes">
              <h3>{fit.forTitle}</h3>
              <ul>
                {fit.forItems.map((x) => (
                  <li key={x}>
                    <span />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fitbox no">
              <h3>{fit.notTitle}</h3>
              <ul>
                {fit.notItems.map((x) => (
                  <li key={x}>
                    <span />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section className="band band-white" id="faq">
        <div className="wrap">
          <h2 className="h2">Questions sellers ask first.</h2>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <BuyButton />
          <p className="ps">
            <b>P.S.</b> {ps}
          </p>
        </div>
      </section>

      {/* 11 · FOOTER */}
      <footer className="ftr">
        <div className="wrap">
          <Wordmark />
          <p>{footer.built}</p>
          <nav aria-label="Footer">
            <a href="https://hyprrx.com/terms">Terms</a>
            <a href="https://hyprrx.com/privacy">Privacy</a>
            <a href={`mailto:${footer.contact}`}>{footer.contact}</a>
          </nav>
          <p>{footer.legal}</p>
          <p>© 2026 Hyprr Retail LLC.</p>
        </div>
      </footer>

      <StickyBar />
    </main>
  );
}
