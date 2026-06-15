// Simple geometric line icons — single stroke language (1.6px), currentColor.
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function TargetIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

export function VerdictIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M4 7h16M4 12h10M4 17h7" />
      <path d="M15.5 18.5l2 2 4-4.5" />
    </svg>
  );
}

export function SeedlingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3 2-5 5-5 0 3-2 5-5 5z" />
      <path d="M12 14c0-2.5-1.8-4.5-4.5-4.5 0 2.7 1.8 4.5 4.5 4.5z" />
    </svg>
  );
}

export function TrendIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3 17l5-5 4 4 8-9" />
      <path d="M20 7v4M20 7h-4" />
    </svg>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="4" y="4" width="10" height="16" rx="1" />
      <path d="M14 9h6v11h-6" />
      <path d="M7.5 8h3M7.5 12h3M7.5 16h3M17 13h0.5M17 17h0.5" />
    </svg>
  );
}
