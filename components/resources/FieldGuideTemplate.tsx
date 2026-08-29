'use client';

// The reusable Field Guide page — Part 10's six-part standard structure.
// 'use client' for framer-motion entrance fades + the view-tracking effect,
// matching the established pattern in components/guides/GuideTemplate.tsx;
// all text/links/structure are still present in the server-rendered HTML
// (Part 19/46 — interactions enhance, they never gate content).

import { useEffect } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import type { FieldGuide } from '@/lib/config/fieldGuides';
import { getCategory, getIndustryLabel, getReadTime, getRelatedFieldGuides } from '@/lib/config/fieldGuides';
import { getGuide } from '@/lib/config/guides';
import { resolveFieldGuideCTA } from '@/lib/fieldGuideCTA';
import { trackEvent } from '@/lib/analytics';
import Breadcrumbs from './Breadcrumbs';
import RelatedGuides from './RelatedGuides';
import DoThisThisWeek from './DoThisThisWeek';
import QuickDiagnosis from './QuickDiagnosis';
import { FieldGuideVisualRenderer } from './visuals';

// Two widths per Part 37 — wider for diagrams, narrower for reading.
const VISUAL_WIDTH = 'max-w-[1000px]';
const READ_WIDTH = 'max-w-[700px]';

export default function FieldGuideTemplate({ guide }: { guide: FieldGuide }) {
  const category = getCategory(guide.category);
  const eyebrowLabel = guide.industry ? `${getIndustryLabel(guide.industry)} · ${category.label}` : category.label;
  const readTime = getReadTime(guide);
  const cta = resolveFieldGuideCTA(guide.nextStepCTA);
  const related = getRelatedFieldGuides(guide);
  const relatedDeepGuides = (guide.relatedDeepGuideSlugs ?? [])
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  useEffect(() => {
    // Phase 4K audit (Part 14): include `industry` when a guide has one,
    // so industry-specific engagement is queryable without a new event.
    trackEvent('field_guide_view', { slug: guide.slug, category: guide.category, industry: guide.industry });
  }, [guide.slug, guide.category, guide.industry]);

  return (
    <>
      {/* Header — category, title, premise, read time (Part 11) */}
      <section className="relative pt-36 pb-4 overflow-hidden grain-overlay">
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/8 blur-[120px] pointer-events-none" />
        </div>
        <div className={`relative z-10 ${READ_WIDTH} mx-auto px-6`}>
          <Breadcrumbs
            items={[
              { label: 'Field Guides', href: '/resources' },
              { label: category.label, href: `/resources#${category.slug}` },
              { label: guide.shortTitle },
            ]}
          />
          <m.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-eyebrow text-[#008080] mb-4">
            {eyebrowLabel}
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-section-heading text-white mb-4"
          >
            {guide.title}
          </m.h1>
          <m.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-body-lg text-[#C5C6C7] mb-4">
            {guide.premise}
          </m.p>
          <p className="text-[#666] text-xs uppercase tracking-[0.08em]">{readTime} Min Read</p>
        </div>
      </section>

      {/* 01 — The Problem */}
      <section className="pt-10">
        <div className={`${READ_WIDTH} mx-auto px-6`}>
          <p className="text-[#C5C6C7] text-body-lg leading-relaxed">{guide.problem}</p>
        </div>
      </section>

      {/* 02 — See It */}
      <section className="section-pad pb-10">
        <div className={`${VISUAL_WIDTH} mx-auto px-6`}>
          <FieldGuideVisualRenderer visual={guide.seeIt} />
          {guide.seeItCaption && (
            <p className="text-white font-medium text-center mt-6">{guide.seeItCaption}</p>
          )}
          {guide.illustrativeExample && (
            <div className="mt-10">
              <p className="text-eyebrow text-[#888] mb-4">{guide.illustrativeExample.note}</p>
              <FieldGuideVisualRenderer visual={guide.illustrativeExample.visual} />
              {guide.illustrativeExample.conclusion && (
                <p className="text-white font-medium mt-5">{guide.illustrativeExample.conclusion}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 03 — Why It Happens, or (Phase 4E) a metrics section for
          measurement-focused guides — mutually exclusive. */}
      {guide.metricsSection ? (
        <section className="pb-16">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <h2 className="text-subsection-heading text-white mb-6">{guide.metricsSection.title}</h2>
            <div>
              {guide.metricsSection.metrics.map((metric, i) => (
                <div key={metric.label} className="grid grid-cols-[2rem_1fr] gap-x-4 py-5 border-b border-white/[0.08] last:border-b-0 first:pt-0">
                  <p className="font-[family-name:var(--font-display)] text-[#008080] text-lg font-semibold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <div>
                    <p className="text-white font-semibold text-sm">{metric.label}</p>
                    <p className="text-[#888] text-sm mt-1 leading-relaxed">{metric.detail}</p>
                    {metric.formula && (
                      <p className="text-[#008080] text-xs font-mono mt-1.5 break-words">{metric.formula}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="pb-16">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <h2 className="text-subsection-heading text-white mb-6">Why It Happens</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {guide.whyItHappens?.map((concept) => (
                <div key={concept.label} className="border-t border-white/[0.1] pt-4">
                  <p className="text-white font-semibold text-sm mb-1.5">{concept.label}</p>
                  <p className="text-[#888] text-sm leading-relaxed">{concept.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04 — The Framework */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className={`${VISUAL_WIDTH} mx-auto px-6`}>
          <h2 className="text-subsection-heading text-white mb-3">The Framework</h2>
          <p className="text-[#C5C6C7] text-body-lg mb-8 max-w-[700px]">{guide.frameworkIntro}</p>
          <FieldGuideVisualRenderer visual={guide.framework} />

          {guide.frameworkQuestions && guide.frameworkQuestions.length > 0 && (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
              {guide.frameworkQuestions.map((fq) => (
                <div key={fq.stage}>
                  <p className="text-eyebrow text-[#008080] mb-1.5">{fq.stage}</p>
                  <p className="text-[#C5C6C7] text-sm leading-relaxed">{fq.question}</p>
                </div>
              ))}
            </div>
          )}

          {guide.secondaryVisual && (
            <div className="mt-10">
              <p className="text-eyebrow text-[#888] mb-4">{guide.secondaryVisual.label}</p>
              <FieldGuideVisualRenderer visual={guide.secondaryVisual.visual} />
              {guide.interpretationNote && (
                <p className="text-[#888] text-sm leading-relaxed mt-4 italic">{guide.interpretationNote}</p>
              )}
            </div>
          )}

          {guide.keyPrinciple && (
            <div className="mt-10 border-l-2 border-[#008080] pl-6">
              <p className="text-white font-semibold text-lg leading-snug mb-2">{guide.keyPrinciple.statement}</p>
              <p className="text-[#888] text-sm leading-relaxed">{guide.keyPrinciple.supporting}</p>
            </div>
          )}
        </div>
      </section>

      {/* Optional concrete example applying the framework (Phase 4B) */}
      {guide.example && (
        <section className="pt-16">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <p className="text-eyebrow text-[#008080] mb-5">{guide.example.label}</p>
            <div className="border border-white/10 rounded-[var(--radius-card)] divide-y divide-white/[0.08]">
              {guide.example.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <span className="text-[#888] text-xs uppercase tracking-[0.08em]">{row.label}</span>
                  <span className="text-white text-sm font-medium text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Optional Quick Diagnosis */}
      {guide.quickDiagnosis && (
        <section className="pt-16">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <QuickDiagnosis data={guide.quickDiagnosis} />
          </div>
        </section>
      )}

      {/* 05 — Do This This Week */}
      <section className="section-pad">
        <div className={`${READ_WIDTH} mx-auto px-6`}>
          <DoThisThisWeek actions={guide.actions} guideSlug={guide.slug} />
        </div>
      </section>

      {/* 06 — Next Step (single CTA) */}
      <section className="section-pad bg-[#111111] border-y border-white/5">
        <div className={`${READ_WIDTH} mx-auto px-6`}>
          {guide.nextStepHeadline && (
            <h2 className="text-subsection-heading text-white mb-3">{guide.nextStepHeadline}</h2>
          )}
          <p className="text-[#C5C6C7] text-body-lg mb-6">{guide.nextStepSupporting}</p>
          <Link
            href={cta.href}
            onClick={() => trackEvent(cta.event, { slug: guide.slug, industry: guide.industry, placement: 'field_guide_next_step' })}
            className="booking-btn booking-btn--primary text-base px-8 py-4 inline-block"
          >
            {guide.nextStepCTALabel ?? cta.label}
          </Link>
        </div>
      </section>

      {/* Deep Guide cross-link (Phase 4A) — only when genuinely relevant,
          never a mechanical reciprocal link on every guide. */}
      {relatedDeepGuides.length > 0 && (
        <section className="pt-16">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <p className="text-eyebrow text-[#888] mb-4">Want the Complete Framework?</p>
            <div className="flex flex-col gap-3">
              {relatedDeepGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  onClick={() => trackEvent('field_guide_related_click', { from: guide.slug, destination: `/guides/${g.slug}` })}
                  className="text-[#008080] text-sm font-semibold hover:text-[#00a8a8] transition-colors"
                >
                  Read the Deep Guide: {g.h1} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Continue Learning */}
      {related.length > 0 ? (
        <section className="section-pad">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <RelatedGuides guides={related} fromSlug={guide.slug} />
          </div>
        </section>
      ) : (
        // No other Field Guide exists yet — fall back to genuinely relevant
        // commercial pages instead of a dead "Continue Learning" section
        // (Part 25). Never labeled as a Field Guide.
        <section className="section-pad">
          <div className={`${READ_WIDTH} mx-auto px-6`}>
            <p className="text-eyebrow text-[#008080] mb-6">Go Deeper</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/system"
                onClick={() => trackEvent('field_guide_related_click', { from: guide.slug, destination: '/system' })}
                className="card-hover block border border-white/10 rounded-[var(--radius-card)] p-6"
              >
                <p className="text-white font-semibold text-sm leading-snug mb-1.5">The Local Dominance System</p>
                <p className="text-[#888] text-xs leading-relaxed">See how this fits into the full connected growth system.</p>
              </Link>
              <Link
                href="/lead-to-booked-job-playbook"
                onClick={() => trackEvent('field_guide_playbook_click', { from: guide.slug, destination: '/lead-to-booked-job-playbook' })}
                className="card-hover block border border-white/10 rounded-[var(--radius-card)] p-6"
              >
                <p className="text-white font-semibold text-sm leading-snug mb-1.5">The 90-Day Lead-to-Booked-Job Playbook</p>
                <p className="text-[#888] text-xs leading-relaxed">Want the implementation system, not just the diagnosis?</p>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
