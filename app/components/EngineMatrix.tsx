// "The Engine" visual — a matrix of the dimensions HyprrX reasons across.
// Three labelled groups of chips, each tinted with an accent for variety.
// No stats or data-volume claims — these are categories, not metrics.

type Group = {
  label: string;
  tone: "accent" | "teal" | "mint";
  items: string[];
};

const groups: Group[] = [
  {
    label: "Business models",
    tone: "accent",
    items: ["Private Label", "Wholesale", "Dropship", "B2B", "Distribution"],
  },
  {
    label: "Marketplaces",
    tone: "teal",
    items: ["Amazon", "Walmart", "eBay", "Shopify", "and more"],
  },
  {
    label: "Signal types",
    tone: "mint",
    items: [
      "Brand behavior",
      "Seasonal patterns",
      "Seller activity",
      "Market timing",
    ],
  },
];

const chipTone: Record<Group["tone"], string> = {
  accent: "border-accent/20 bg-accent/[0.07] text-accent",
  teal: "border-teal/20 bg-teal/[0.07] text-teal",
  mint: "border-mint/20 bg-mint/[0.08] text-mint",
};

const dotTone: Record<Group["tone"], string> = {
  accent: "bg-accent",
  teal: "bg-teal",
  mint: "bg-mint",
};

export default function EngineMatrix() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-bg p-6 shadow-sm sm:p-7">
      <div className="flex flex-col gap-6">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
              <span className={`h-2 w-2 rounded-full ${dotTone[g.tone]}`} />
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${chipTone[g.tone]}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-[var(--radius-md)] bg-bg-alt px-4 py-3 text-sm text-text-secondary">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
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
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
        </span>
        <span>
          Your inputs run through this reasoning — not a one-size-fits-all
          benchmark.
        </span>
      </div>
    </div>
  );
}
