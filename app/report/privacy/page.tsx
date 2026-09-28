import LegalPage, { ADDRESS, COMPANY, Mail } from "../legal/LegalPage";

export const metadata = { title: { absolute: "Privacy Policy — HyprrIQ Supplier Report" }, description: "What we collect to produce your Supplier Report (email, supplier details, uploaded documents), who processes it, and how long we keep it. Payment data is held by Stripe." };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lede="To produce your report we need your email address, the supplier details you give us and any documents you upload. Payment data is held by Stripe. Here is what happens to each.">
      <h2>1. Who controls your data</h2>
      <p>
        <strong>{COMPANY}</strong>, {ADDRESS}, is the data controller. HyprrIQ is our product, operating under the HyprrX brand. Privacy contact: <Mail />. The Supplier Report is offered to business customers in the United States.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>When you start checkout:</strong> your email address, and the source you arrived from (for example a link in an Instagram bio), so we can send you the report and understand which channels work.</li>
        <li><strong>When you pay:</strong> the payment confirmation, amount and your email address from Stripe. <strong>Payment data is held by Stripe.</strong> Card details are entered on Stripe&apos;s secure checkout and stored by Stripe, not by us. We never see or keep full card numbers.</li>
        <li><strong>When you submit the supplier form:</strong> the supplier name and website, the brand names, the product category, any notes you write, and any documents you upload (an invoice or letter of authorisation).</li>
        <li><strong>Automatically:</strong> basic technical data needed to serve the page securely, and — if you have not blocked it in your browser — advertising measurement data via the Meta Pixel (see section 6).</li>
      </ul>

      <h2>3. Information about suppliers and third parties</h2>
      <p>
        To produce a report we research the supplier you name. That research is overwhelmingly about <strong>businesses</strong> — company registrations, addresses, websites, trade listings, marketplace policies. It may include <strong>limited information about individuals</strong> where that information is published in a business context: a named director in a company register, or a named employee on a company&apos;s public profile.
      </p>
      <p>
        Our basis for this is our legitimate interest in providing commercial due-diligence research our clients need to make informed purchasing decisions, using information already published in a business context. The information is public, business-related, used only to answer a specific commercial question, and never used to make decisions about the individuals themselves. We never contact the supplier. If you are named in a report and wish to exercise your rights, contact <Mail />.
      </p>

      <h2>4. Why we use your data</h2>
      <table>
        <thead><tr><th>Purpose</th><th>Basis</th></tr></thead>
        <tbody>
          <tr><td>Producing and delivering the report you bought</td><td>Performance of a contract</td></tr>
          <tr><td>Processing your payment and any refund</td><td>Performance of a contract</td></tr>
          <tr><td>Transactional email — order, form and delivery notices, support replies</td><td>Performance of a contract</td></tr>
          <tr><td>Researching the supplier you name</td><td>Performance of a contract (for you); legitimate interest (as to third-party business information)</td></tr>
          <tr><td>Keeping the service secure and preventing abuse</td><td>Legitimate interest</td></tr>
          <tr><td>Meeting tax, accounting and legal obligations; defending payment disputes</td><td>Legal obligation; legitimate interest</td></tr>
          <tr><td>Measuring advertising (Meta Pixel)</td><td>Legitimate interest; you can block it in your browser</td></tr>
          <tr><td>Marketing email — supplier-safety tips, reminders about an unfinished order</td><td><strong>Your consent</strong> — see section 7</td></tr>
        </tbody>
      </table>
      <p><strong>We do not sell your personal information. We do not use it to train AI models.</strong></p>

      <h2>5. Who processes data for us</h2>
      <table>
        <thead><tr><th>Provider</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>Stripe</td><td>Payments, receipts and refunds; holds the order record</td></tr>
          <tr><td>Vercel</td><td>Hosting</td></tr>
          <tr><td>Loops</td><td>Transactional and marketing email</td></tr>
          <tr><td>Anthropic</td><td>Automated research and analysis</td></tr>
          <tr><td>Serper · WHOIS XML API</td><td>Web search and domain records used in research</td></tr>
          <tr><td>Meta</td><td>Advertising measurement (Pixel and Conversions API)</td></tr>
        </tbody>
      </table>
      <p>What goes to our research providers: the supplier and brand names you enter, and the contents of documents you upload, are processed by our search and analysis providers in order to produce your report. Our providers are located in the United States; your data is stored and processed there.</p>

      <h2>6. Cookies and the Meta Pixel</h2>
      <p>
        The page sets only what it needs to work — Stripe&apos;s checkout session — plus the <strong>Meta Pixel</strong>, which lets us see whether our advertising leads to reports being bought. It sends Meta standard events (page view, checkout started, purchase) and a hashed version of your email, never your supplier details or documents. You can block it with your browser&apos;s tracking protection or an ad blocker; the report works exactly the same either way.
      </p>

      <h2>7. Marketing email</h2>
      <p>
        We send marketing email <strong>only to people who have asked for it</strong> — by entering an email address under the line that says so. We record the address, the fact of your consent, the date and time, and where you subscribed from. <strong>Every marketing email carries an unsubscribe link.</strong> Unsubscribing is immediate, and we keep a record of it so you are not re-added.
      </p>
      <p>
        <strong>Transactional emails are different</strong> — the order confirmation, the reminder to send your supplier form, and the report itself. They are part of the service you bought and carry no unsubscribe link, because unsubscribing from them would mean not receiving your own report.
      </p>

      <h2>8. How long we keep it</h2>
      <table>
        <thead><tr><th>Data</th><th>Retention</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Uploaded documents</td><td><strong>180 days</strong> after delivery, then deleted</td><td>They corroborate one case and cover the card-dispute window</td></tr>
          <tr><td>Supplier details, brands and notes</td><td>180 days after delivery, then removed from the order record</td><td>Same</td></tr>
          <tr><td>The delivered report</td><td>Yours by email; our copy 180 days after delivery</td><td>So we can re-send it or correct it</td></tr>
          <tr><td>Transaction records (amount, date, email, order number)</td><td><strong>7 years</strong></td><td>Legal obligation — tax and accounting</td></tr>
          <tr><td>Support correspondence</td><td>24 months</td><td></td></tr>
          <tr><td>Marketing consent and unsubscribe records</td><td>While subscribed; unsubscribe records kept permanently</td><td>So you are not re-added</td></tr>
        </tbody>
      </table>
      <p><strong>Deletion is permanent.</strong> Once a file is removed there is no recovery — not by us, not by request.</p>

      <h2>9. Your rights</h2>
      <p>
        You may <strong>access</strong> your data, ask us to <strong>correct</strong> it, ask us to <strong>delete</strong> it, ask for a <strong>copy</strong> in a portable format, and <strong>withdraw consent</strong> to marketing at any time. Email <Mail />; we respond within 30 days. One limit, stated plainly: we must keep transaction records for 7 years to meet tax and accounting obligations. Those cannot be deleted on request. Everything else can.
      </p>
      <p>
        <strong>California residents:</strong> the CCPA gives you the right to know what personal information we collect, to request deletion, to request a copy, and not to be discriminated against for exercising those rights. We do not sell personal information and we do not share it for cross-context behavioural advertising. Residents of Colorado, Connecticut, Utah and Virginia have comparable rights and may use the same contact.
      </p>

      <h2>10. Security</h2>
      <p>Data is encrypted in transit. Uploads are size- and type-restricted (PDF, JPG or PNG, up to 4 MB) and travel only to our order inbox — they are not published anywhere. Access to order records is restricted to the people producing your report. If a breach occurs that presents a risk to you, we will notify you and the relevant authorities as the law requires.</p>

      <h2>11. Children</h2>
      <p>The service is for businesses. It is not directed at anyone under 18 and we do not knowingly collect their information.</p>

      <h2>12. Changes</h2>
      <p>The current version and its effective date are always on this page. Material changes are notified by email to buyers with an open order.</p>
    </LegalPage>
  );
}
