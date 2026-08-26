'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { IndustryPage } from '@/lib/config/industryPages';
import { caseStudies } from '@/lib/config/caseStudies';
import { primaryCTA, scoreCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

export default function IndustryPageTemplate({ industry }: { industry: IndustryPage }) {
  const proofCaseStudy = industry.proofCaseStudySlug
    ? caseStudies.find((cs) => cs.slug === industry.proofCaseStudySlug)
    : undefined;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden grain-overlay">
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#008080]/30 bg-[#008080]/10 text-[#008080] text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
            {industry.eyebrow}
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]"
          >
            {industry.h1}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#C5C6C7] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {industry.intro}
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={primaryCTA.href}
              onClick={() => trackEvent('primary_cta_click', { location: `industry-${industry.slug}` })}
              className="booking-btn booking-btn--primary text-base px-8 py-4"
            >
              {primaryCTA.label}
            </Link>
            <Link
              href={scoreCTA.href}
              onClick={() => trackEvent('dominance_score_cta_click', { placement: 'industry_page' })}
              className="booking-btn booking-btn--ghost text-base px-8 py-4"
            >
              {scoreCTA.label}
            </Link>
          </m.div>
          <p className="text-[#666] text-xs mt-4">{industry.scoreLeakLine}</p>
        </div>
      </section>

      {/* Primary pain + economics */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white leading-snug">
              {industry.primaryPain}
            </h2>
          </m.div>

          <div className="grid md:grid-cols-3 gap-4">
            {industry.economics.map((point, i) => (
              <m.div
                key={point}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#141414] border border-white/5 rounded-xl p-6"
              >
                <p className="text-[#C5C6C7] text-sm leading-relaxed">{point}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common offers + seasonality + project examples */}
      <section className="section-pad bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-5">Common Offers We Build</p>
            <ul className="space-y-3">
              {industry.commonOffers.map((offer) => (
                <li key={offer} className="flex items-start gap-3 text-white text-sm">
                  <span className="text-[#008080] flex-shrink-0 mt-0.5">•</span>
                  {offer}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-5">Project Types</p>
            <ul className="space-y-3 mb-6">
              {industry.projectExamples.map((project) => (
                <li key={project} className="flex items-start gap-3 text-white text-sm">
                  <span className="text-[#008080] flex-shrink-0 mt-0.5">•</span>
                  {project}
                </li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2">Seasonality</p>
            <p className="text-[#C5C6C7] text-sm leading-relaxed">{industry.seasonality}</p>
          </m.div>
        </div>
      </section>

      {/* Proof */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {proofCaseStudy ? (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Real Results</p>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-4">
                {proofCaseStudy.client}
              </h3>
              <p className="text-[#C5C6C7] leading-relaxed mb-6">{proofCaseStudy.outcome}</p>
              <Link
                href={`/results/${proofCaseStudy.slug}`}
                className="text-[#008080] text-sm font-semibold hover:text-[#00a8a8] transition-colors"
              >
                View Full Case Study &rarr;
              </Link>
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Real Results</p>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-4">
                See What Happens When the Pieces Work Together
              </h3>
              <p className="text-[#C5C6C7] leading-relaxed mb-6">
                We&rsquo;re building out {industry.name.toLowerCase()}-specific case studies as partnerships mature.
                In the meantime, see how the same system has worked for other home-service businesses.
              </p>
              <Link
                href="/results"
                className="text-[#008080] text-sm font-semibold hover:text-[#00a8a8] transition-colors"
              >
                See Contractor Results &rarr;
              </Link>
            </m.div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto px-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
              {industry.name}-Specific Questions
            </h2>
          </m.div>
          <div className="flex flex-col gap-4">
            {industry.faq.map((item) => (
              <div key={item.question} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <p className="text-white font-semibold mb-2">{item.question}</p>
                <p className="text-[#C5C6C7] text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad bg-[#111111] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6">
            See If Your {industry.name} Business Qualifies.
          </h2>
          <Link
            href={primaryCTA.href}
            onClick={() => trackEvent('primary_cta_click', { location: `industry-${industry.slug}-final` })}
            className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block"
          >
            {primaryCTA.label}
          </Link>
        </div>
      </section>
    </>
  );
}
