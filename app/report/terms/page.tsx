import LegalPage, { ADDRESS, COMPANY, Mail } from "../legal/LegalPage";

export const metadata = { title: { absolute: "Terms of Service — HyprrIQ Supplier Report" }, description: "Terms for the HyprrIQ Supplier Report: a one-time $79 research report on one wholesale supplier and up to 5 of its brands." };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lede="These Terms cover the HyprrIQ Supplier Report: a one-time $79 report on one wholesale supplier and up to 5 of its brands, delivered by email within 10 hours of your supplier form.">
      <h2>1. Who we are</h2>
      <p>
        HyprrIQ is a product of <strong>{COMPANY}</strong>, a limited liability company registered in Wyoming, United States, with a mailing address at {ADDRESS}. HyprrIQ operates under the HyprrX brand. In these Terms, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;HyprrIQ&rdquo; mean {COMPANY}. &ldquo;You&rdquo; means the person or business buying a report.
      </p>
      <p>Support and all notices: <Mail />.</p>

      <h2>2. What the service is</h2>
      <p>You buy one Supplier Report. We research the wholesale supplier you name and up to 5 brands you say you are buying from that supplier, and deliver a written report by email. Each report includes:</p>
      <ul>
        <li>a verdict on a four-level scale — <strong>Source Clear</strong>, <strong>Usable With Conditions</strong>, <strong>Verify Before Purchase</strong>, or <strong>Do Not Rely</strong></li>
        <li>findings on the supplier and on each brand relationship, each carrying a certainty label — Verified, Assessed or Not assessed</li>
        <li>an explicit account of what we could <strong>not</strong> confirm</li>
        <li>a checklist of questions to put to the supplier before you commit</li>
      </ul>
      <p>The report is offered to <strong>businesses located in the United States</strong>. You may research suppliers anywhere in the world; the restriction is on where your business is, not where your suppliers are.</p>

      <h2>3. What the service is not — read this carefully</h2>
      <div className="box warn">
        <p><strong>A verdict is a reading of observable evidence at the time of research. It is not a guarantee, a certification, or a warranty of any kind.</strong></p>
      </div>
      <p>We do not and cannot:</p>
      <ul>
        <li><strong>guarantee that a supplier is authorised</strong> by any brand. We report what the evidence shows and what it does not. Absence of confirmation is not proof of either authorisation or its absence</li>
        <li><strong>guarantee marketplace approval.</strong> Amazon, Walmart, eBay and others apply seller-history, category, regional and brand-specific review that we cannot see or predict</li>
        <li><strong>guarantee the safety of your selling account.</strong> Suspensions, listing removals and enforcement actions are decisions made by marketplaces and brand owners, not by us</li>
        <li><strong>verify that goods you receive are genuine.</strong> We assess the supplier and the brand relationship, not physical inventory</li>
        <li><strong>provide legal, financial, or professional advice.</strong> A report is commercial research</li>
      </ul>
      <p>
        <strong>A &ldquo;Source Clear&rdquo; verdict does not mean a supplier is safe.</strong> It means we found consistency and no significant gaps in the evidence available at the time. <strong>The decision to purchase is yours, and the consequences of that decision are yours.</strong> You are expected to apply your own commercial judgement and standard due diligence.
      </p>

      <h2>4. Accuracy and the limits of research</h2>
      <p>Our research draws on publicly available sources, any documents you provide, and automated analysis. It is limited by what those sources contain at the time we look. You accept that:</p>
      <ul>
        <li>public records are incomplete, out of date, and vary by country</li>
        <li><strong>a supplier not appearing in a brand&apos;s public listing is not evidence of wrongdoing.</strong> Many legitimate distributors operate under private agreements that never appear publicly</li>
        <li>research reflects a moment in time; circumstances change after delivery</li>
        <li>automated analysis, including the use of large language models, forms part of our method. Every report is reviewed by a person before it is sent</li>
      </ul>

      <h2>5. Price, payment and delivery</h2>
      <ul>
        <li><strong>One report costs $79, paid once.</strong> There is no account, subscription, plan or credit. A promotional price shown at checkout applies only to that purchase.</li>
        <li><strong>Stripe processes all payments.</strong> Prices are in US dollars; applicable taxes are calculated at checkout. A failed or declined payment is not charged and no order is created.</li>
        <li>Card details are entered on Stripe&apos;s secure checkout and stored by Stripe, not by us. We never see or keep full card numbers. We receive only the payment confirmation, your email address and the amount. Stripe emails a receipt for every payment and refund.</li>
        <li><strong>Delivery: within 10 hours of submitting the supplier form</strong>, by email to the address you paid with. The clock starts at the form, not at payment, because we cannot start until we know which supplier to look at.</li>
        <li>If we cannot take on your case, you are refunded in full, automatically.</li>
      </ul>

      <h2>6. Your submission is what we research</h2>
      <p>
        <strong>The supplier and brand names you enter are what we research.</strong> Use the supplier&apos;s full legal name. One supplier per report; brands must be brands you are buying from that supplier. Any document you upload (an invoice, a letter of authorisation) helps us confirm the supplier&apos;s entity and address. <strong>It does not determine what we research</strong>, and it cannot raise a verdict above what independent research supports.
      </p>
      <p>You confirm that you have the right to share any document you upload, and that it contains no information you are not permitted to disclose. You can review and correct your submission from the order link in your emails until we deliver.</p>

      <h2>7. Corrections and refunds</h2>
      <p>
        If you believe a finding is factually wrong, reply to the report email within <strong>7 days</strong> of delivery. We review within one business day and either correct the report or explain why the finding stands. <strong>Disagreement with a verdict is not itself grounds for a refund.</strong> Refunds are governed by our <a href="./refunds">Refund Policy</a>: full refund if the report is not delivered within 10 hours of the supplier form, or if we cannot take on your case.
      </p>

      <h2>8. Acceptable use</h2>
      <p>You may not:</p>
      <ul>
        <li>resell, republish or redistribute a report as your own work, or to parties other than your own business</li>
        <li>use a report to defame, harass or make public allegations against a supplier. <strong>A verdict is a reading of evidence, not an accusation</strong></li>
        <li>attempt to access another buyer&apos;s order or report, or use automated means to extract data from the service</li>
      </ul>

      <h2>9. Intellectual property</h2>
      <p>
        <strong>We own the report format, method and research engine.</strong> Nothing in these Terms transfers ownership of any of it. <strong>You own the content of the report delivered to you</strong> and may use it freely within your own business, subject to section 8. Third-party names and marks appearing in a report belong to their owners; their appearance is descriptive and implies no relationship with us. We are not affiliated with Amazon.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>To the fullest extent permitted by law:</p>
      <ul>
        <li>our total liability arising from a report is <strong>limited to the amount you paid for that report</strong></li>
        <li>we are not liable for lost profits, lost inventory, marketplace suspensions, enforcement actions, business interruption, or indirect or consequential loss</li>
        <li>we are not liable for decisions you take on the basis of a report</li>
      </ul>
      <p>Nothing here excludes liability for fraud, or for anything that cannot lawfully be excluded.</p>

      <h2>11. Privacy and data</h2>
      <p>How we handle your email, supplier details, uploaded documents and payment data is set out in our <a href="./privacy">Privacy Policy</a>, including how long we keep each of them.</p>

      <h2>12. Changes</h2>
      <p>We may update these Terms. The current version and its effective date are always on this page. Changes do not apply to a report you have already bought.</p>

      <h2>13. Governing law</h2>
      <p>These Terms are governed by the laws of the State of Wyoming, United States, without regard to conflict-of-law principles. Nothing here removes protections available to you under the mandatory law of your place of residence.</p>
    </LegalPage>
  );
}
