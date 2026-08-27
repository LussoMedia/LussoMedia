import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlaybookHero from '@/components/playbook/PlaybookHero';
import PlaybookProblem from '@/components/playbook/PlaybookProblem';
import PlaybookBeforeAfter from '@/components/playbook/PlaybookBeforeAfter';
import PlaybookFiveSystems from '@/components/playbook/PlaybookFiveSystems';
import PlaybookValueStack from '@/components/playbook/PlaybookValueStack';
import PlaybookPreview from '@/components/playbook/PlaybookPreview';
import PlaybookWhoItsFor from '@/components/playbook/PlaybookWhoItsFor';
import PlaybookEmailCapture from '@/components/playbook/PlaybookEmailCapture';
import { playbook } from '@/lib/config/playbook';

const SITE_URL = 'https://illussomedia.com';
const OG_IMAGE = `${SITE_URL}${playbook.href}/opengraph-image`;

const META_DESCRIPTION =
  'Free 90-day playbook for capturing, qualifying, following up with, and converting more local home-service leads into booked jobs. Built for established contractors.';

export const metadata: Metadata = {
  // absolute bypasses the root layout's "%s | Lusso Media" template —
  // this title is already a complete, self-branded SERP title.
  title: { absolute: 'Home Service Lead Engine | 90-Day Contractor Playbook' },
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${playbook.href}` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}${playbook.href}`,
    title: playbook.title,
    description: META_DESCRIPTION,
    siteName: 'Lusso Media',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: playbook.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: playbook.title,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: playbook.title,
  description: META_DESCRIPTION,
  url: `${SITE_URL}${playbook.href}`,
  about: {
    '@type': 'Thing',
    name: 'Home-service lead generation and conversion',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Established home-service contractors',
  },
  isPartOf: {
    '@type': 'WebSite',
    name: 'Lusso Media',
    url: SITE_URL,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is The Home Service Lead Engine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Home Service Lead Engine is a free 90-day playbook that walks established home-service contractors through capturing, qualifying, following up with, and converting more of the local leads they already generate into booked jobs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is the playbook built for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Established home-service businesses in plumbing, HVAC, roofing, landscaping, electrical, remodeling, concrete, exterior cleaning, and related trades that already generate referrals, inquiries, or paid leads and want a more consistent path from inquiry to booked job.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the playbook cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It covers the four moves of the Lead Engine — Capture, Qualify, Follow Up, and Convert — including qualification frameworks, follow-up scripts and sequences, review and content systems, demand-generation frameworks, and a KPI scorecard.',
      },
    },
  ],
};

export default function PlaybookLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main>
        <PlaybookHero />
        <PlaybookProblem />
        <PlaybookBeforeAfter />
        <PlaybookFiveSystems />
        <PlaybookValueStack />
        <PlaybookPreview />
        <PlaybookWhoItsFor />
        <PlaybookEmailCapture />
      </main>
      <Footer />
    </>
  );
}
