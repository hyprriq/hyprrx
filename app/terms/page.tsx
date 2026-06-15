import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Eyebrow from "../components/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the HyprrX website.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-text">
          Terms of Use
        </h1>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Last updated: June 2026
        </p>

        <div className="mt-12 flex flex-col gap-10 text-sm leading-relaxed text-text-secondary">
          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              1. About these terms
            </h2>
            <p className="mt-3">
              These Terms of Use govern your access to and use of the HyprrX
              website at hyprrx.com (the &ldquo;Site&rdquo;), operated by Hyprr
              Retail LLC (&ldquo;HyprrX,&rdquo; &ldquo;we,&rdquo; or
              &ldquo;us&rdquo;). By accessing the Site, you agree to these
              terms. If you do not agree, please do not use the Site. These
              terms apply only to this marketing Site — the HyprrIQ product has
              its own separate terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              2. Use of the Site
            </h2>
            <p className="mt-3">
              The Site is provided for general informational purposes about
              HyprrX and its work. You agree to use the Site only for lawful
              purposes and not to interfere with its operation, attempt to gain
              unauthorized access to any part of it, or use it in any way that
              could damage or impair the Site or others&apos; use of it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              3. Intellectual property
            </h2>
            <p className="mt-3">
              All content on the Site — including text, design, graphics,
              layout, and the HyprrX and HyprrIQ names and marks — is owned by
              or licensed to Hyprr Retail LLC and is protected by applicable
              intellectual property laws. You may view and share the content for
              personal, non-commercial reference, but you may not copy, modify,
              distribute, or otherwise exploit it without our prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              4. No warranties
            </h2>
            <p className="mt-3">
              The Site and its content are provided &ldquo;as is&rdquo; and
              &ldquo;as available,&rdquo; without warranties of any kind,
              whether express or implied. We make no warranty that the Site will
              be accurate, complete, current, uninterrupted, or error-free.
              Information on the Site is general in nature and does not
              constitute professional, legal, financial, or business advice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              5. Limitation of liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, Hyprr Retail LLC will not
              be liable for any indirect, incidental, consequential, or special
              damages arising out of or in connection with your use of, or
              inability to use, the Site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              6. External links
            </h2>
            <p className="mt-3">
              The Site links to other websites, including HyprrIQ at
              hyprriq.com. Those sites are governed by their own terms and
              privacy policies, and we are not responsible for their content or
              practices. Your use of HyprrIQ is subject to the terms published
              on that site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              7. Changes
            </h2>
            <p className="mt-3">
              We may update these terms from time to time. Changes take effect
              when posted to this page, and the &ldquo;last updated&rdquo; date
              above will reflect the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              8. Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of the State of [Wyoming],
              without regard to its conflict-of-laws principles.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text">
              9. Contact
            </h2>
            <p className="mt-3">
              For legal inquiries regarding the Site, contact us at{" "}
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
