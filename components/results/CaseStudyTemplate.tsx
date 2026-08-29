'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/lib/config/caseStudies';
import { primaryCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';
import CaseStudyMidCTA from './CaseStudyMidCTA';

export default function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudy }) {
  const onMedia = (label: string) =>
    trackEvent('case_study_media_interaction', { case_study: caseStudy.slug, placement: label });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-0 bg-[#0D0D0D] grain-overlay">
        <div className="max-w-4xl mx-auto px-6 text-center pb-14">
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">{caseStudy.industry}</p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
              {caseStudy.client}
            </h1>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-[#008080]/10 text-[#008080] border-[#008080]/25">
              {caseStudy.tag}
            </span>
          </m.div>
        </div>

        {caseStudy.heroImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl mx-auto px-6"
          >
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={caseStudy.heroImage.src}
                alt={caseStudy.heroImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
                onLoad={() => onMedia('hero')}
              />
            </div>
          </m.div>
        )}
      </section>

      {/* Before / Today / Next snapshot */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[caseStudy.snapshot.before, caseStudy.snapshot.today, caseStudy.snapshot.next].map((block, i) => (
              <m.div
                key={block.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-xl p-6 border ${
                  i === 1 ? 'bg-[#008080]/10 border-[#008080]/30' : 'bg-[#141414] border-white/5'
                }`}
              >
                <p className={`text-xs uppercase tracking-[0.15em] mb-4 ${i === 1 ? 'text-[#008080]' : 'text-[#888]'}`}>
                  {block.label}
                </p>
                <ul className="space-y-2.5">
                  {block.points.map((point) => (
                    <li key={point} className="text-sm text-white leading-snug flex gap-2">
                      <span className="text-[#008080] flex-shrink-0">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Situation / identified / installed */}
      <section className="section-pad bg-[#0D0D0D]">
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
            <ul className="space-y-3 mb-6">
              {caseStudy.whatWeInstalled.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white">
                  <span className="text-[#008080] flex-shrink-0 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {caseStudy.systemComponents.map((component) => (
                <span
                  key={component}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-[#141414] text-[#C5C6C7]"
                >
                  {component}
                </span>
              ))}
            </div>
            <p className="text-[#666] text-xs mt-4">
              These efforts now inform how Lusso structures the Local Dominance System.
            </p>
          </m.div>
        </div>
      </section>

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="section-pad bg-[#111111] border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6 text-center">Real Project Proof</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudy.gallery.map((media) => (
                <m.div
                  key={media.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10"
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                    onLoad={() => onMedia('gallery')}
                  />
                </m.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mid-page CTA — A/B test: Score first vs. direct to Apply */}
      <CaseStudyMidCTA caseStudySlug={caseStudy.slug} />

      {/* Outcome */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
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

      {/* Final CTA */}
      <section className="section-pad bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6">
            Want to See What This System Could Look Like for Your Business?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryCTA.href}
              onClick={() => trackEvent('case_study_plan_cta_click', { case_study: caseStudy.slug })}
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
