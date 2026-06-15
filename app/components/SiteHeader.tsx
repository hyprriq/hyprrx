import Link from "next/link";
import Wordmark from "./Wordmark";

const navLinks = [
  { label: "Approach", href: "/#approach" },
  { label: "HyprrIQ", href: "/#hyprriq" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl text-text no-underline"
          aria-label="HyprrX home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://hyprriq.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[var(--radius-md)] bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Visit HyprrIQ
        </a>
      </div>
    </header>
  );
}
