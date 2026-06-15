import Link from "next/link";
import Wordmark from "./Wordmark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark className="text-xl text-text" />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              An AI research lab building decision intelligence for e-commerce
              sellers.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium"
          >
            <a
              href="https://hyprriq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors hover:text-accent"
            >
              HyprrIQ ↗
            </a>
            <Link
              href="/terms"
              className="text-text-secondary transition-colors hover:text-text"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-text-secondary transition-colors hover:text-text"
            >
              Privacy
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-text-secondary md:flex-row md:items-center md:justify-between">
          <p>© 2026 Hyprr Retail LLC. All rights reserved.</p>
          <p className="max-w-md md:text-right">
            HyprrX is not affiliated with Amazon, Walmart, eBay, or Shopify.
          </p>
        </div>
      </div>
    </footer>
  );
}
