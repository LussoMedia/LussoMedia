import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalPage from '@/components/LegalPage';

// NOTE: Standard boilerplate privacy policy. Flagged in the build summary —
// have this reviewed by an attorney before relying on it, and fill in the
// actual data-collection practices (Sanity, GA4, GTM, Cal.com, and any future
// application/score-funnel backend) once those integrations are finalized.

export const metadata: Metadata = {
  title: 'Privacy Policy — Lusso Media',
  description: 'How Lusso Media collects, uses, and protects your information.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <LegalPage title="Privacy Policy" updated="August 24, 2026">
          <p>
            Lusso Media (&ldquo;Lusso,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This
            policy explains what information we collect through illussomedia.com, how we use it, and the choices
            you have.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly — such as your name, company, email, phone number, and
            business details submitted through our application, diagnostic, or booking forms — and information
            collected automatically through analytics tools, including Google Analytics, Google Tag Manager, and
            similar technologies (page views, device/browser data, and referral source).
          </p>
          <h2>How We Use Information</h2>
          <p>
            We use the information we collect to evaluate whether your business is a fit for our services,
            respond to inquiries, schedule calls, operate and improve this website, and measure the performance of
            our marketing.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            We use third-party tools to operate this site and our funnels, including Google Analytics, Google Tag
            Manager, and Cal.com for scheduling. These providers may process data on our behalf subject to their
            own privacy policies.
          </p>
          <h2>Your Choices</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by contacting us at{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
