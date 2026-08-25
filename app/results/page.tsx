import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies } from '@/lib/config/caseStudies';

export const metadata: Metadata = {
  title: 'Contractor Results — Lusso Media',
  description:
    'See what happens when the offer, conversion infrastructure, content, demand, and reputation all work together — real business outcomes, not vanity metrics.',
  alternates: { canonical: 'https://illussomedia.com/results' },
  robots: { index: true, follow: true },
};

const tagColors: Record<string, string> = {
  'Business Growth': 'bg-purple-900/30 text-purple-400 border-purple-800/30',
  'Demand Generation': 'bg-green-900/30 text-green-400 border-green-800/30',
};

export default function ResultsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-40 pb-20 bg-[#0D0D0D] grain-overlay">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Results</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
              See What Happens When the Pieces Work Together.
            </h1>
            <p className="text-lg text-[#C5C6C7] leading-relaxed">
              Built around business results, not vanity metrics — every case study reflects a
              partnership over time, not a guarantee.
            </p>
          </div>
        </section>

        <section className="section-pad bg-[#111111] border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/results/${cs.slug}`}
                className="card-hover bg-[#141414] rounded-xl border border-white/5 flex flex-col p-8"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">{cs.client}</h2>
                    <p className="text-[#888] text-sm mt-0.5">{cs.industry}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${tagColors[cs.tag] ?? 'bg-[#008080]/10 text-[#008080] border-[#008080]/25'}`}>
                    {cs.tag}
                  </span>
                </div>
                <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">{cs.outcome}</p>
                <span className="mt-auto pt-5 border-t border-white/5 flex items-center gap-2 text-[#008080] text-sm font-semibold">
                  {cs.ctaLabel}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
