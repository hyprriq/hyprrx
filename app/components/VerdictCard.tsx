// Illustrated "report card" mockup visualizing HyprrIQ's four-verdict system.
// One verdict is shown as the active result for an example report; the others
// render as the rest of the defined scale. Not a real report — abstract.

const verdicts = [
  {
    label: "Source Clear",
    tone: "mint",
    active: true,
  },
  {
    label: "Usable With Conditions",
    tone: "amber",
    active: false,
  },
  {
    label: "Verify Before Purchase",
    tone: "coral",
    active: false,
  },
  {
    label: "Do Not Rely On This Source",
    tone: "gray",
    active: false,
  },
] as const;

const toneStyles: Record<
  (typeof verdicts)[number]["tone"],
  { dot: string; text: string; chipBg: string }
> = {
  mint: { dot: "bg-mint", text: "text-mint", chipBg: "bg-mint/10" },
  amber: { dot: "bg-amber", text: "text-amber", chipBg: "bg-amber/10" },
  coral: { dot: "bg-coral", text: "text-coral", chipBg: "bg-coral/10" },
  gray: {
    dot: "bg-text-secondary",
    text: "text-text-secondary",
    chipBg: "bg-bg-alt",
  },
};

export default function VerdictCard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-md">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-border bg-bg-alt/60 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 3h9l4 4v14H6z" />
              <path d="M14 3v5h5M9 13h6M9 17h4" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-text">Source report</p>
            <p className="text-xs text-text-secondary">Example output</p>
          </div>
        </div>
        <span className="text-xs font-medium text-text-secondary">
          1 of 4 verdicts
        </span>
      </div>

      {/* Verdict scale */}
      <ul className="divide-y divide-border">
        {verdicts.map((v) => {
          const s = toneStyles[v.tone];
          return (
            <li
              key={v.label}
              className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                v.active ? s.chipBg : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                <span
                  className={`text-sm font-medium ${
                    v.active ? s.text : "text-text-secondary"
                  }`}
                >
                  {v.label}
                </span>
              </div>
              {v.active ? (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.chipBg} ${s.text}`}
                >
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
                  This report
                </span>
              ) : (
                <span className="text-xs text-text-secondary/70">—</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="border-t border-border px-5 py-3 text-xs text-text-secondary">
        One clear verdict per source — never a vague risk score.
      </div>
    </div>
  );
}
