import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Lusso Media website, application flow, and free tools like the Local Dominance Score and Home Service Lead Engine.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <LegalPage title="Terms of Use" updated="August 27, 2026">
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of illussomedia.com and its
            associated tools, including the Local Dominance Score, the Home Service Lead Engine playbook, and the
            application and booking flow (together, the &ldquo;Site&rdquo;), operated by Lusso Media
            (&ldquo;Lusso,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using the Site, you agree to these Terms.
            If you do not agree, do not use the Site. These Terms govern use of the Site itself — they are not a
            service agreement and do not create a client relationship. See{' '}
            <em>Service Engagements</em> below.
          </p>

          <h2>Eligibility</h2>
          <p>
            The Site is intended for business owners, operators, and decision-makers evaluating marketing services
            for an established home-service business. You must be at least 18 years old and have the authority to
            act on behalf of the business you represent to submit an application or request a diagnostic call.
          </p>

          <h2>Website Use</h2>
          <p>
            The Site is provided for informational purposes and to allow prospective clients to learn about, and
            apply for, Lusso Media&rsquo;s services. You agree to use the Site only for lawful purposes and not to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Submit false, misleading, or fraudulent information through any form on the Site</li>
            <li>Attempt to bypass, disable, or interfere with any security or rate-limiting feature</li>
            <li>Use automated means (bots, scrapers, or similar tools) to access or extract content from the Site</li>
            <li>Interfere with the proper functioning of the Site or its underlying infrastructure</li>
          </ul>

          <h2>Free Tools &amp; Diagnostics</h2>
          <p>
            The Local Dominance Score and the Home Service Lead Engine playbook are provided as free, self-serve
            educational tools. The Score is a directional diagnostic based on the information you provide — it is
            not an audit, appraisal, or guarantee of your business&rsquo;s marketing performance, and results will
            vary based on the accuracy of your answers. The playbook is general educational content and is not a
            substitute for a tailored engagement with our team.
          </p>

          <h2>No Guarantee of Results</h2>
          <p>
            Nothing on this Site — including case studies, testimonials, or example outcomes — constitutes a
            guarantee of revenue, leads, customers, or profitability for your business. Case studies reflect
            outcomes for the specific businesses named, achieved under their specific circumstances, and are not
            predictive of results for any other business. Any performance guarantee we offer as part of a service
            engagement is governed exclusively by the terms of the signed service agreement for that engagement,
            not by anything on this Site.
          </p>

          <h2>Service Engagements</h2>
          <p>
            Submitting an application, completing the Local Dominance Score, or booking a call through this Site
            does not create a service engagement, partnership, or any obligation on either party. A separate,
            signed service agreement — setting out scope, pricing, timelines, and any guarantees — must be executed
            before any Local Dominance System work begins. In the event of a conflict between this Site and a
            signed service agreement, the service agreement controls.
          </p>

          <h2>Qualification &amp; Application Review</h2>
          <p>
            We review applications and diagnostic submissions to determine fit. Submitting an application does not
            guarantee acceptance, a call, or an offer of services. We reserve the right to decline any application
            at our discretion, including to limit the number of businesses we work with per service category per
            market.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, logos, the Local Dominance System™ name and
            framework, the Home Service Lead Engine playbook, and case study materials — is owned by Lusso Media or
            its licensors and is protected by intellectual property law. You may view and download materials we
            make available (such as the playbook) for your own internal business use, but may not reproduce,
            distribute, or create derivative works from Site content for commercial purposes without our prior
            written permission.
          </p>

          <h2>Third-Party Links &amp; Tools</h2>
          <p>
            The Site links to or embeds third-party tools (such as our booking calendar) that are governed by their
            own terms. We are not responsible for the content, accuracy, or practices of third-party sites or
            tools.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Site and its tools are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
            warranties of any kind, express or implied, including warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, secure,
            or error-free.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Lusso Media will not be liable for any indirect, incidental,
            consequential, or special damages arising from your use of the Site or reliance on any content,
            diagnostic result, or free resource made available through it. This limitation does not apply to
            obligations under a separately signed service agreement.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date above reflects the
            most recent revision. Continued use of the Site after changes take effect constitutes acceptance of
            the updated Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Utah, without regard to its conflict-of-law
            principles, unless a signed service agreement specifies otherwise for that engagement.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms can be sent to{' '}
            <a href="mailto:admin@illussomedia.com">admin@illussomedia.com</a>.
          </p>
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
