'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { caseStudies } from '@/lib/config/caseStudies';
import { trackEvent } from '@/lib/analytics';

const tagColors: Record<string, string> = {
  'Business Growth': 'bg-purple-900/30 text-purple-400 border-purple-800/30',
  'Demand Generation': 'bg-green-900/30 text-green-400 border-green-800/30',
};

export default function CaseStudies() {
  return (
    <section id="results" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-eyebrow text-[#008080] mb-4">Results</p>
          <h2 className="text-section-heading text-white">
            See What Happens When the Pieces Work Together.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <m.div
              key={cs.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: (i % 2) * 0.1 }}
              className="card-hover bg-[#141414] rounded-xl overflow-hidden border border-white/5 flex flex-col p-8"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">{cs.client}</h3>
                  <p className="text-[#888] text-sm mt-0.5">{cs.industry}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${tagColors[cs.tag] ?? 'bg-[#008080]/10 text-[#008080] border-[#008080]/25'}`}>
                  {cs.tag}
                </span>
              </div>

              <div className="space-y-4 text-sm mb-6">
                <div>
                  <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">Original Constraint</p>
                  <p className="text-[#C5C6C7] leading-relaxed">{cs.situation}</p>
                </div>
                <div>
                  <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">The Outcome</p>
                  <p className="text-[#C5C6C7] leading-relaxed">{cs.outcome}</p>
                </div>
              </div>

              <Link
                href={`/results/${cs.slug}`}
                onClick={() => trackEvent('case_study_view', { client: cs.client })}
                className="mt-auto pt-5 border-t border-white/5 flex items-center gap-2 text-[#008080] text-sm font-semibold"
              >
                {cs.ctaLabel}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </m.div>
          ))}
        </div>

        <p className="text-center text-[#666] text-xs max-w-2xl mx-auto mt-8">
          Results reflect a partnership over time and are not guaranteed for every business.
        </p>
      </div>
    </section>
  );
}
