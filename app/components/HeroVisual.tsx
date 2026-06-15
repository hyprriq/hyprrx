import GradientBlob from "./GradientBlob";

const models = ["Private Label", "Wholesale", "Dropship", "B2B", "Distribution"];
const activeModel = "Wholesale";

// Light "data → insight" illustration: faint generic output (the noise)
// resolving into one crisp, personalized answer card (the signal that's
// yours). Tool-agnostic — represents the HyprrX approach, not any one product.
export default function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-md">
      <GradientBlob
        gradient="radial-gradient(circle at 30% 30%, #635BFF, transparent 70%)"
        className="-top-10 -left-6 h-64 w-64"
        float
      />
      <GradientBlob
        gradient="radial-gradient(circle at 70% 70%, #0EA5E9, transparent 70%)"
        className="-bottom-12 right-0 h-60 w-60"
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* The "noise": faint generic output, dimmed and tilted back */}
        <div className="ml-auto w-[78%] -rotate-2 rounded-[var(--radius-lg)] border border-border bg-bg-alt/80 p-4 opacity-70 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-text-secondary/30" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              Generic output
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-text-secondary/15" />
            <div className="h-2 w-5/6 rounded-full bg-text-secondary/15" />
            <div className="h-2 w-2/3 rounded-full bg-text-secondary/15" />
          </div>
        </div>

        {/* The "signal": the answer built for you */}
        <div className="relative z-20 rounded-[var(--radius-lg)] border border-border bg-bg p-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Your situation
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-xs font-semibold text-mint">
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3.5 8.5l3 3 6-6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Personalized
            </span>
          </div>

          {/* Business-model selector row */}
          <p className="mb-2 text-xs font-medium text-text-secondary">
            Business model
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {models.map((m) => (
              <span
                key={m}
                className={
                  m === activeModel
                    ? "rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white"
                    : "rounded-full border border-border bg-bg-alt px-2.5 py-1 text-xs font-medium text-text-secondary"
                }
              >
                {m}
              </span>
            ))}
          </div>

          {/* Inputs → recommendation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Inputs</span>
              <span className="text-sm font-semibold text-text">
                Inventory · Budget · Goals
              </span>
            </div>
            <div className="h-px w-full bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Recommendation
              </span>
              <span className="text-sm font-semibold text-mint">
                Tailored to your inputs
              </span>
            </div>
          </div>

          {/* Signal bars — the answer resolving */}
          <div className="mt-5 flex items-end gap-1.5">
            {[40, 64, 32, 88, 52, 100, 44].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h * 0.4}px`,
                  background:
                    i === 5
                      ? "var(--color-accent)"
                      : "color-mix(in srgb, var(--color-accent) 18%, transparent)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
