import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Eyebrow from "../components/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the HyprrX website.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-text">
          Privacy Policy
        </h1>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Last updated: June 2026
        </p>

        <div className="mt-12 flex flex-col gap-10 text-sm leading-relaxed text-text-secondary">
          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              Overview
            </h2>
            <p className="mt-3">
              This policy explains how the HyprrX website at hyprrx.com (the
              &ldquo;Site&rdquo;), operated by Hyprr Retail LLC, handles
              information. The Site is a static, informational website. We have
              built it to collect as little information as possible.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              Information we collect
            </h2>
            <p className="mt-3">
              The Site does not contain forms, accounts, or sign-ups, and we do
              not run analytics or tracking scripts on it. We do not set
              tracking cookies. As a result, we do not collect personal
              information from you through the Site itself.
            </p>
            <p className="mt-3">
              Like most websites, the Site is served through a hosting provider
              (Vercel) that may automatically process standard technical
              information — such as IP address and basic request logs — for
              security and to deliver the Site. That processing is governed by
              the hosting provider&apos;s own policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              Contacting us
            </h2>
            <p className="mt-3">
              If you email us at the addresses listed on the Site, we receive
              your email address and the contents of your message, and use them
              only to respond to you. We do not add you to marketing lists.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              HyprrIQ
            </h2>
            <p className="mt-3">
              HyprrIQ, at hyprriq.com, is a separate product with its own
              privacy policy. This policy does not cover HyprrIQ. Please review
              the privacy policy published on that site for information about
              how it handles data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this policy from time to time. Changes take effect
              when posted to this page, and the &ldquo;last updated&rdquo; date
              above will reflect the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              Contact
            </h2>
            <p className="mt-3">
              For privacy questions about this Site, contact us at{" "}
              <a
                href="mailto:g@hyprrx.com"
                className="font-medium text-accent hover:underline"
              >
                g@hyprrx.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
