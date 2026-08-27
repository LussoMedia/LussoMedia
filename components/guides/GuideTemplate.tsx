'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { Guide, getRelatedGuides } from '@/lib/config/guides';
import { getIndustryPage } from '@/lib/config/industryPages';
import { primaryCTA, scoreCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

export default function GuideTemplate({ guide }: { guide: Guide }) {
  const relatedIndustry = guide.relatedIndustrySlug ? getIndustryPage(guide.relatedIndustrySlug) : undefined;
  const relatedGuides = getRelatedGuides(guide);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden grain-overlay">
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4"
          >
            {guide.eyebrow}
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.1]"
          >
            {guide.h1}
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#C5C6C7] leading-relaxed"
          >
            {guide.intro}
          </m.p>
        </div>
      </section>

      {/* Body */}
      <section className="section-pad bg-[#0D0D0D] pt-0">
        <div className="max-w-3xl mx-auto px-6">
          {guide.sections.map((section, i) => (
            <m.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.2) }}
              className="mb-12 last:mb-0"
            >
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="text-[#C5C6C7] leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 flex flex-col gap-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#C5C6C7] text-sm leading-relaxed">
                      <span className="text-[#008080] flex-shrink-0 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </m.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {guide.faq && guide.faq.length > 0 && (
        <section className="section-pad bg-[#111111] border-y border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-8">
              Common Questions
            </h2>
            <div className="flex flex-col gap-4">
              {guide.faq.map((item) => (
                <div key={item.question} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <p className="text-white font-semibold mb-2">{item.question}</p>
                  <p className="text-[#C5C6C7] text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related industry + Score CTA */}
      <section className="section-pad bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto px-6 grid sm:grid-cols-2 gap-6">
          {relatedIndustry && (
            <Link
              href={`/${relatedIndustry.slug}`}
              onClick={() => trackEvent('guide_related_industry_click', { slug: guide.slug, destination: relatedIndustry.slug })}
              className="card-hover block bg-[#141414] border border-white/5 rounded-xl p-8"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-3">Related Industry Page</p>
              <p className="text-white font-semibold text-lg mb-2">{relatedIndustry.name} Marketing &amp; Lead Generation</p>
              <span className="text-[#008080] text-sm font-medium">See how it applies &rarr;</span>
            </Link>
          )}
          <Link
            href={scoreCTA.href}
            onClick={() => trackEvent('dominance_score_cta_click', { placement: `guide-${guide.slug}` })}
            className="card-hover block bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-3">Diagnose Your System</p>
            <p className="text-white font-semibold text-lg mb-2">{scoreCTA.microcopy}</p>
            <span className="text-[#008080] text-sm font-medium">Take the Score &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="section-pad bg-[#111111] border-y border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-6">Related Reading</p>
            <div className="flex flex-col gap-4">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="text-white text-sm font-medium hover:text-[#008080] transition-colors"
                >
                  {g.h1} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-pad bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6">
            See If Your Business Qualifies for The Local Dominance System.
          </h2>
          <Link
            href={primaryCTA.href}
            onClick={() => trackEvent('primary_cta_click', { location: `guide-${guide.slug}-final` })}
            className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block"
          >
            {primaryCTA.label}
          </Link>
        </div>
      </section>
    </>
  );
}
