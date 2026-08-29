import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Lusso Media collects, uses, discloses, and protects information through illussomedia.com and its lead-generation tools.',
  alternates: { canonical: 'https://illussomedia.com/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <LegalPage title="Privacy Policy" updated="August 27, 2026">
          <p>
            Lusso Media (&ldquo;Lusso,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides
            The Local Dominance System™ and related marketing services to home-service contractors. This policy
            explains what information we collect through illussomedia.com and its associated tools — including the
            Local Dominance Score, the Home Service Lead Engine playbook, and the application and booking flow
            (together, the &ldquo;Site&rdquo;) — how we use and share it, and the choices you have. It does not
            apply to information we collect from active clients under a signed service agreement, which is governed
            by that agreement.
          </p>

          <h2>Information We Collect</h2>
          <p>
            <strong>Information you provide directly.</strong> When you submit an application, take the Local
            Dominance Score, request the Home Service Lead Engine playbook, or book a call, we collect the
            information you enter — which may include your name, email address, phone number, company name,
            website, service area, and details about your business (such as revenue range, average ticket, close
            rate, current marketing mix, and similar business-economics answers). We also collect anything you send
            us directly by email.
          </p>
          <p>
            <strong>Information collected automatically.</strong> Like most websites, we automatically collect
            technical and usage data when you visit — including IP address, device and browser type, pages viewed,
            referring/exit pages, approximate location (derived from IP), and UTM/campaign parameters. This is
            collected via cookies and similar technologies through Google Analytics and Google Tag Manager, and —
            once enabled on the Site — the Meta Pixel. We also derive a short-lived rate-limiting identifier from
            your IP address to prevent form abuse; it is not used for tracking or marketing.
          </p>
          <p>
            <strong>Information from spam-prevention fields.</strong> Our forms include a hidden field (a
            &ldquo;honeypot&rdquo;) designed to catch automated bot submissions. Legitimate visitors never
            interact with this field, and submissions that trigger it are discarded rather than processed.
          </p>

          <h2>How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Evaluate whether your business is a fit for our services and respond to applications</li>
            <li>Generate and deliver your Local Dominance Score results</li>
            <li>Deliver the Home Service Lead Engine playbook and related follow-up communications</li>
            <li>Schedule and manage calls through our booking tool</li>
            <li>Operate, secure, and improve the Site and measure marketing performance</li>
            <li>Send service-related and, where you have not opted out, marketing communications</li>
            <li>Comply with legal obligations and enforce our Terms of Use</li>
          </ul>
          <p>
            We do not sell your personal information, and we do not use it to make automated decisions that
            produce legal or similarly significant effects about you.
          </p>

          <h2>Third-Party Services We Use</h2>
          <p>
            We rely on the following third-party providers to operate the Site and our funnels. Each processes data
            subject to its own privacy policy:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Google Analytics &amp; Google Tag Manager</strong> — site analytics and tag management</li>
            <li><strong>Meta Pixel</strong> — advertising performance measurement (once enabled on the Site)</li>
            <li><strong>Cal.com</strong> — call scheduling and calendar booking</li>
            <li><strong>Brevo</strong> — email marketing, contact management, and follow-up automation</li>
            <li><strong>Resend</strong> — transactional email delivery (playbook delivery, score results, application confirmations)</li>
            <li><strong>Notion</strong> — internal tracking of applications we receive</li>
            <li><strong>Sanity</strong> — content management for the Site (does not process visitor personal data)</li>
            <li><strong>Vercel</strong> — website hosting and infrastructure</li>
          </ul>
          <p>
            We do not control these providers&rsquo; independent use of data and encourage you to review their
            respective privacy policies.
          </p>

          <h2>Cookies</h2>
          <p>
            The Site uses cookies and similar technologies set by the analytics and booking tools listed above to
            remember your session, understand how the Site is used, and measure marketing performance. You can
            control cookies through your browser settings; disabling them may limit some Site functionality (for
            example, the booking calendar).
          </p>

          <h2>How We Share Information</h2>
          <p>
            We share information with the service providers listed above as needed to operate the Site and deliver
            the tools you request. We may also disclose information if required by law, to protect our rights or
            the safety of others, or in connection with a merger, acquisition, or sale of assets — in which case we
            would require the recipient to honor the commitments in this policy.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain application, score, and playbook-request information for as long as reasonably necessary to
            evaluate and follow up on your inquiry, maintain business records, and comply with legal obligations —
            and delete or anonymize it when it is no longer needed for those purposes, or sooner upon your request.
          </p>

          <h2>Your Choices &amp; Rights</h2>
          <p>
            You may request access to, correction of, or deletion of the personal information we hold about you,
            and you may opt out of marketing emails at any time using the unsubscribe link in any message or by
            contacting us directly. Depending on where you live, you may have additional rights under applicable
            law (for example, the California Consumer Privacy Act or comparable state privacy laws), including the
            right to know what personal information we collect and to request its deletion. To exercise any of
            these rights, contact us at{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>

          <h2>Children&rsquo;s Privacy</h2>
          <p>
            The Site is intended for business owners and professionals and is not directed to individuals under
            18. We do not knowingly collect personal information from children.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable administrative and technical safeguards — including rate-limiting and spam-prevention
            controls on our forms — to protect the information we collect. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above reflects the
            most recent revision. Material changes will be reflected on this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy, or requests regarding your personal information, can be sent to{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
