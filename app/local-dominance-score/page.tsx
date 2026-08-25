import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScoreFunnel from '@/components/score/ScoreFunnel';

export const metadata: Metadata = {
  title: 'Local Dominance Score — Lusso Media',
  description:
    'See where your local growth system is strongest, where it\'s leaking, and what could be limiting your next stage of growth. Free 2-minute assessment.',
  alternates: { canonical: 'https://illussomedia.com/local-dominance-score' },
  robots: { index: true, follow: true },
};

export default function LocalDominanceScorePage() {
  return (
    <>
      <Nav />
      <main>
        <ScoreFunnel />
      </main>
      <Footer />
    </>
  );
}
