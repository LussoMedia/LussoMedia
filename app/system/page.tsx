import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DominanceSystemDiagram from '@/components/DominanceSystemDiagram';
import SystemDeepDive from '@/components/SystemDeepDive';
import FastWinTimeline from '@/components/FastWinTimeline';
import NinetyDayRoadmap from '@/components/NinetyDayRoadmap';
import GuaranteeSection from '@/components/GuaranteeSection';
import MarketProtection from '@/components/MarketProtection';
import { primaryCTA, secondaryCTA } from '@/lib/config/navigation';

export const metadata: Metadata = {
  title: 'The Local Dominance System™',
  description:
    'A fully managed demand-generation and lead-conversion system for contractors — Market Intelligence, Offer Engineering, Conversion Infrastructure, Authority, Demand, Reputation, and Revenue Intelligence.',
  alternates: { canonical: 'https://illussomedia.com/system' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://illussomedia.com/system',
    title: 'The Local Dominance System™ | Lusso Media',
    description:
      'A fully managed demand-generation, lead-conversion, and local-authority system for established home-service contractors.',
  },
};

export default function SystemPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-40 pb-20 overflow-hidden grain-overlay">
          <div className="absolute inset-0 bg-[#0D0D0D]">
            <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">The System</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
              One System Built Around the Entire Customer Journey.
            </h1>
            <p className="text-lg text-[#C5C6C7] leading-relaxed mb-10">
              Seven connected components — not seven separate vendors. Each part makes the next
              one more effective, from finding the right opportunity to knowing exactly what your
              marketing produced.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={primaryCTA.href} className="booking-btn booking-btn--primary text-base px-8 py-4">
                {primaryCTA.label}
              </Link>
              <Link href={secondaryCTA.href} className="booking-btn booking-btn--ghost text-base px-8 py-4">
                {secondaryCTA.label}
              </Link>
            </div>
          </div>
        </section>

        <DominanceSystemDiagram />
        <SystemDeepDive />
        <FastWinTimeline />
        <NinetyDayRoadmap />
        <GuaranteeSection />
        <MarketProtection />

        <section className="section-pad bg-[#0D0D0D] text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6">
              See If Your Business Qualifies.
            </h2>
            <Link href={primaryCTA.href} className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block">
              {primaryCTA.label}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
