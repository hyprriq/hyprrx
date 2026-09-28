import LegalPage, { Mail } from "../legal/LegalPage";

export const metadata = { title: { absolute: "Refund Policy — HyprrIQ Supplier Report" }, description: "Full refund if your Supplier Report is not delivered within 10 hours of the supplier form. How refunds, payments and disputes work." };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy" lede="One report, one promise: it arrives within 10 hours of your supplier form, or you get your money back. Here is exactly how that works.">
      <h2>1. Report not delivered within 10 hours</h2>
      <div className="box">
        <p>
          <strong>If your report is not in your inbox within 10 hours of submitting the supplier form, you can request a full refund.</strong> Reply to your confirmation email, or write to <Mail /> with your order number (it looks like HX-240928-7Q4K and is on every email we send you).
        </p>
      </div>
      <p>The 10 hours start when you submit the supplier form, not at payment — we cannot start researching until we know which supplier to look at.</p>

      <h2>2. We can&apos;t take on your case</h2>
      <p>
        Occasionally we cannot research a supplier — for example when the business cannot be identified from what you sent, or when the case falls outside what a Supplier Report covers. In that case <strong>you receive a full refund, issued automatically</strong>, and we tell you why.
      </p>

      <h2>3. Report delivered on time</h2>
      <p>
        <strong>Once a report has been delivered on time, there is no refund, because the research has been done.</strong> Our reports say what the evidence shows, including when it is unfavourable or inconclusive — that is the service you bought. Disagreeing with the verdict is not grounds for a refund; a report that reaches an unwelcome conclusion has done its job.
      </p>
      <p>
        <strong>Found a factual error?</strong> Reply to the report email within <strong>7 days</strong> of delivery. We review within one business day and either correct the report or explain why the finding stands.
      </p>

      <h2>4. Refund timing</h2>
      <p>Refunds go back to the original card through Stripe. They usually appear within <strong>5–10 business days</strong>, depending on your bank. Stripe emails you a receipt for the refund.</p>

      <h2>5. Charge disputes</h2>
      <p>
        If a charge looks wrong, <strong>please email us first</strong> at <Mail />. We reply within <strong>1 business day</strong> and can usually resolve it faster than your bank. We keep delivery records for every report.
      </p>

      <h2>6. Payments</h2>
      <ul>
        <li><strong>Stripe processes all payments.</strong> Prices are in US dollars. The price is shown before you pay, and applicable taxes are calculated at checkout.</li>
        <li>A failed or declined payment is not charged, and no order is created.</li>
        <li>Card details are entered on Stripe&apos;s secure checkout and stored by Stripe, not by us. <strong>We never see or keep full card numbers.</strong> We only receive the payment confirmation, your email address and the amount.</li>
        <li>Stripe emails a receipt for every payment and every refund.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Nothing in this policy limits rights you have under applicable law. Questions: <Mail />.</p>
    </LegalPage>
  );
}
