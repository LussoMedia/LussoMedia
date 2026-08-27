import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScoreFunnel from '@/components/score/ScoreFunnel';

const SITE_URL = 'https://illussomedia.com';
const DESCRIPTION =
  "A free 2-minute contractor marketing assessment. See where your local growth system is strongest, where it's leaking, and what's limiting your next stage of growth.";

export const metadata: Metadata = {
  title: 'Contractor Local Dominance Score',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/local-dominance-score` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/local-dominance-score`,
    title: 'Contractor Local Dominance Score | Lusso Media',
    description: DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Local Dominance Score',
  description: DESCRIPTION,
  url: `${SITE_URL}/local-dominance-score`,
  about: {
    '@type': 'Thing',
    name: 'Home-service contractor marketing assessment',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Established home-service contractors',
  },
};

export default function LocalDominanceScorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <ScoreFunnel />
      </main>
      <Footer />
    </>
  );
}
