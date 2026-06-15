import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HeroVisual from "./components/HeroVisual";
import EngineMatrix from "./components/EngineMatrix";
import VerdictCard from "./components/VerdictCard";
import Reveal from "./components/Reveal";
import Eyebrow from "./components/Eyebrow";
import GradientBlob from "./components/GradientBlob";
import {
  TargetIcon,
  SearchIcon,
  VerdictIcon,
  SeedlingIcon,
  TrendIcon,
  BuildingIcon,
} from "./components/icons";

const problems = [
  {
    title: "The same data for everyone",
    body: "Every seller sees the same feeds, the same scores, the same charts — regardless of what they sell.",
    tone: "accent",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="13" height="13" rx="2" />
        <path d="M8 8h13v13H8" />
      </svg>
    ),
  },
  {
    title: "The same output, every time",
    body: "Generic tools return one answer for all users — your situation never changes what comes back.",
    tone: "teal",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    title: "No sense of your business",
    body: "Your inventory, budget, and goals don't enter the equation — so neither does the answer that fits them.",
    tone: "coral",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M4.5 4.5l15 15" />
      </svg>
    ),
  },
];

const approach = [
  {
    title: "Start with your specifics",
    body: "Your current listings, budget, goals, and constraints shape the question before any research begins.",
    Icon: TargetIcon,
    tone: "accent",
  },
  {
    title: "Research the actual situation",
    body: "AI-driven research investigates the specific supplier, brand, market, or opportunity in front of you — not a category average.",
    Icon: SearchIcon,
    tone: "teal",
  },
  {
    title: "Give a verdict, not a dashboard",
    body: "A clear answer for your specific case, reviewed for quality before it reaches you.",
    Icon: VerdictIcon,
    tone: "mint",
  },
] as const;

const toneClass: Record<string, string> = {
  accent: "bg-accent/10 text-accent",
  teal: "bg-teal/10 text-teal",
  mint: "bg-mint/10 text-mint",
  coral: "bg-coral/10 text-coral",
};

const hyprriqPoints = [
  "Before you commit capital to inventory, HyprrIQ researches the specific supplier and brand situation — not a generic checklist.",
  "You get one of four clear verdicts — never a vague risk score.",
  "Built to help you ask the right questions before you buy, not to promise outcomes.",
];

const audiences = [
  {
    title: "Just starting out",
    body: "Deploying your first capital — whether that's $100 into a dropship test or $2,000 into your first wholesale order.",
    Icon: SeedlingIcon,
    tone: "mint",
  },
  {
    title: "Scaling fast",
    body: "Making more sourcing and inventory decisions across models than you can research by hand.",
    Icon: TrendIcon,
    tone: "teal",
  },
  {
    title: "Established operation",
    body: "Managing a multi-million dollar catalog across marketplaces, where every capital decision carries real weight.",
    Icon: BuildingIcon,
    tone: "accent",
  },
] as const;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <GradientBlob
            gradient="radial-gradient(circle at 50% 50%, #635BFF, transparent 70%)"
            className="-top-32 -left-40 h-[34rem] w-[34rem] opacity-[0.18]"
          />
          <GradientBlob
            gradient="radial-gradient(circle at 50% 50%, #0EA5E9, transparent 70%)"
            className="-top-20 right-[-10rem] h-[30rem] w-[30rem] opacity-[0.16]"
          />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:gap-10 md:py-24">
            <Reveal>
              <Eyebrow>HyprrX</Eyebrow>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.5rem]">
                Most tools show every seller the same data.{" "}
                <span className="text-accent">We show you yours.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                HyprrX builds AI tools for e-commerce sellers — across private
                label, wholesale, distribution, dropship, and B2B, on any
                marketplace. Each tool reasons about your business — your
                inventory, budget, goals, and model — and gives you the answer
                built for your situation. Whether you&apos;re deploying your
                first $100 or your ten-millionth dollar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="https://hyprriq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  See HyprrIQ in action ↗
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-border bg-bg px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="order-first md:order-none">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* ── The Problem With "More Data" ─────────────────────── */}
        <section className="bg-bg-alt">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Reveal>
              <Eyebrow>The problem with “more data”</Eyebrow>
              <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl">
                Sellers have more marketplace data than ever — and it hasn&apos;t
                made decisions easier.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                The hard part isn&apos;t finding data. It&apos;s knowing which
                data applies to{" "}
                <span className="font-semibold text-text">
                  your business, right now.
                </span>{" "}
                Generic tools give every user the same output regardless of
                their situation:
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {problems.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 0.08}
                  className="rounded-[var(--radius-lg)] border border-border bg-bg p-6 shadow-sm"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] ${toneClass[p.tone]} [&_svg]:h-5 [&_svg]:w-5`}>
                    {p.icon}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {p.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Engine ───────────────────────────────────────── */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
            <Reveal>
              <Eyebrow>How we build</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">
                Real expertise, encoded into reasoning — not generic benchmarks.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                HyprrX tools are built from real operator experience — sourcing
                decisions, brand behavior, seasonal and launch patterns, and
                seller behavior across business models and marketplaces. We
                encode that expertise into AI reasoning, then apply it to your
                specific inputs.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                The result: two sellers can ask the same question and get two
                different answers —{" "}
                <span className="font-semibold text-text">
                  because their businesses are different.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <EngineMatrix />
            </Reveal>
          </div>
        </section>

        {/* ── Our Approach ─────────────────────────────────────── */}
        <section id="approach" className="scroll-mt-16 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <Reveal>
              <Eyebrow>Our approach</Eyebrow>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                How a question moves through the thinking.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                Three steps, in order — from your situation to a verdict you can
                act on.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {approach.map((step, i) => (
                <Reveal
                  key={step.title}
                  delay={i * 0.1}
                  className="group rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${toneClass[step.tone]} [&_svg]:h-6 [&_svg]:w-6`}
                    >
                      <step.Icon />
                    </span>
                    <span className="font-display text-sm font-semibold text-text-secondary">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HyprrIQ — Proof of the Approach ──────────────────── */}
        <section
          id="hyprriq"
          className="relative isolate overflow-hidden border-y border-border bg-bg-alt scroll-mt-16"
        >
          <GradientBlob
            gradient="radial-gradient(circle at 50% 50%, #FF6B81, transparent 70%)"
            className="-bottom-32 -left-32 h-[30rem] w-[30rem] opacity-[0.16]"
          />
          <GradientBlob
            gradient="radial-gradient(circle at 50% 50%, #635BFF, transparent 70%)"
            className="-top-28 right-[-8rem] h-[28rem] w-[28rem] opacity-[0.14]"
          />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
            <Reveal>
              <Eyebrow>Built on this foundation</Eyebrow>
              <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                HyprrIQ: the first tool, built for wholesale sourcing decisions.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Before a wholesale seller commits capital to a supplier, HyprrIQ
                researches the specific supplier and brand situation and returns
                one of four clear verdicts — never a vague risk score. It&apos;s
                the first application of the HyprrX approach, scoped to one
                high-stakes decision.
              </p>

              <ul className="mt-7 flex flex-col gap-4">
                {hyprriqPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3.5 8.5l3 3 6-6.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://hyprriq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Visit HyprrIQ ↗
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <VerdictCard />
            </Reveal>
          </div>
        </section>

        {/* ── Who It's For ─────────────────────────────────────── */}
        <section className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <Reveal>
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                One question, at every stage:{" "}
                <span className="text-accent">
                  what&apos;s the right move for my business, right now?
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                We build for sellers across every business model — private
                label, wholesale, dropship, retail, distribution, B2B — and
                every stage, from your first sourcing decision to your
                ten-millionth dollar deployed.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {audiences.map((a, i) => (
                <Reveal
                  key={a.title}
                  delay={i * 0.1}
                  className="rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-sm"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${toneClass[a.tone]} [&_svg]:h-6 [&_svg]:w-6`}
                  >
                    <a.Icon />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-text">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {a.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="border-y border-border bg-bg-alt scroll-mt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-5 md:py-24">
            <Reveal className="md:col-span-3">
              <Eyebrow>About</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Built by operators, not theorists.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                After 15 years inside e-commerce — running inventory, managing
                supplier relationships, and making capital decisions across
                marketplaces — we know which problems actually cost sellers
                money and time.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Every tool we build starts there: a real decision sellers
                struggle with, turned into AI reasoning that accounts for their
                specific business — not a generic dashboard.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                HyprrIQ is the first result of that approach.{" "}
                <span className="font-semibold text-text">
                  It won&apos;t be the last.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.12} className="md:col-span-2">
              <div className="rounded-[var(--radius-lg)] bg-accent p-8 text-white shadow-md">
                <p className="font-display text-5xl font-bold leading-none">
                  15+
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-white/90">
                  years in e-commerce behind every tool we build.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <Reveal>
              <Eyebrow>Contact</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Questions? Get in touch.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal className="rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  Product inquiries
                </p>
                <a
                  href="mailto:hello@hyprriq.com"
                  className="mt-3 inline-block font-display text-xl font-semibold text-text transition-colors hover:text-accent"
                >
                  hello@hyprriq.com
                </a>
              </Reveal>
              <Reveal
                delay={0.1}
                className="rounded-[var(--radius-lg)] border border-border bg-bg p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  Business &amp; partnerships
                </p>
                <a
                  href="mailto:g@hyprrx.com"
                  className="mt-3 inline-block font-display text-xl font-semibold text-text transition-colors hover:text-accent"
                >
                  g@hyprrx.com
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
