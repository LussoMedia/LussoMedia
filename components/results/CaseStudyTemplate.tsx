'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { CaseStudy } from '@/lib/config/caseStudies';
import { primaryCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

export default function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <section className="pt-40 pb-20 bg-[#0D0D0D] grain-overlay">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">{caseStudy.industry}</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
              {caseStudy.client}
            </h1>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-[#008080]/10 text-[#008080] border-[#008080]/25">
              {caseStudy.tag}
            </span>
          </m.div>
        </div>
      </section>

      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-10">
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-3">The Situation</p>
            <p className="text-[#C5C6C7] text-lg leading-relaxed">{caseStudy.situation}</p>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-3">What Lusso Identified</p>
            <p className="text-[#C5C6C7] text-lg leading-relaxed">{caseStudy.whatWeIdentified}</p>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-4">What Lusso Installed</p>
            <ul className="space-y-3">
              {caseStudy.whatWeInstalled.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white">
                  <span className="text-[#008080] flex-shrink-0 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      <section className="section-pad bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8 mb-6"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-3">The Outcome</p>
            <p className="text-white text-lg leading-relaxed">{caseStudy.outcome}</p>
          </m.div>
          <p className="text-[#666] text-xs mb-2">{caseStudy.timeline}</p>
          <p className="text-[#666] text-xs">
            Results reflect a partnership over time and are not guaranteed for every business —
            growth depends on the specific market, offer, and execution.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6">
            See If Your Business Qualifies for the Same System.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryCTA.href}
              onClick={() => trackEvent('primary_cta_click', { location: `case-study-${caseStudy.slug}` })}
              className="booking-btn booking-btn--primary text-base px-10 py-4"
            >
              {primaryCTA.label}
            </Link>
            <Link href="/results" className="booking-btn booking-btn--ghost text-base px-8 py-4">
              See More Results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
