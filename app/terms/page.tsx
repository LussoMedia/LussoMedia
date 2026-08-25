import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalPage from '@/components/LegalPage';

// NOTE: Standard boilerplate terms of use for the website itself (not a
// service agreement/SOW). Flagged in the build summary — have this reviewed
// by an attorney, and pair it with a separate signed service agreement for
// actual Local Dominance System engagements.

export const metadata: Metadata = {
  title: 'Terms of Use — Lusso Media',
  description: 'Terms governing use of the Lusso Media website.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <LegalPage title="Terms of Use" updated="August 24, 2026">
          <p>
            These Terms of Use govern your access to and use of illussomedia.com (the &ldquo;Site&rdquo;). By using
            the Site, you agree to these terms.
          </p>
          <h2>Website Use</h2>
          <p>
            The Site is provided for informational purposes and to allow prospective clients to learn about, and
            apply for, Lusso Media&rsquo;s services. Content on the Site — including case study results — reflects
            outcomes for the specific businesses named and is not a guarantee of results for any other business.
          </p>
          <h2>No Guarantee of Results</h2>
          <p>
            Nothing on this Site constitutes a guarantee of revenue, leads, customers, or profitability. Any
            guarantee offered as part of a service engagement is governed exclusively by the terms of the signed
            service agreement for that engagement, not by this Site.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, and case study materials, is owned by Lusso Media
            or its licensors and may not be reproduced without permission.
          </p>
          <h2>Service Engagements</h2>
          <p>
            Applying through this Site does not create a service engagement. A separate service agreement must be
            signed before any Local Dominance System work begins.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
