'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { systemComponents } from '@/lib/config/systemComponents';
import { trackEvent } from '@/lib/analytics';
import ObjectionNote from './ObjectionNote';
import ScoreContextCTA from './ScoreContextCTA';

interface Props {
  page?: string;
}

export default function SystemDeepDive({ page = 'system' }: Props) {
  return (
    <section id="system-details" className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16 max-w-2xl"
        >
          <h2 className="text-section-heading text-white">
            One System Built Around the Entire Customer Journey.
          </h2>
        </m.div>

        <div className="flex flex-col">
          {systemComponents.map((c, i) => (
            <m.div
              key={c.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="py-10 md:py-12 border-b border-white/[0.08] first:pt-0 last:border-b-0"
            >
              {/* "02 — OFFER ENGINEERING" editorial numbering (Part 27) */}
              <p className="text-eyebrow text-[#008080] mb-3">
                {c.number} &mdash; {c.name}
              </p>
              <h3 className="text-subsection-heading text-white mb-6 max-w-xl">{c.purpose}</h3>

              <div className="grid md:grid-cols-3 gap-x-6 gap-y-5 text-sm">
                <div>
                  <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">The Problem</p>
                  <p className="text-[#C5C6C7] leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">What We Install</p>
                  <ul className="text-[#C5C6C7] leading-relaxed space-y-1">
                    {c.installs.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#008080] flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">Why It Matters</p>
                  <p className="text-[#C5C6C7] leading-relaxed">{c.whyItMatters}</p>
                </div>
              </div>

              {c.objection && (
                <ObjectionNote
                  question={c.objection.question}
                  answer={c.objection.answer}
                  objectionType={c.name}
                  page={page}
                  section={`component-${c.number}`}
                />
              )}

              {/* Field Guide integration (Phase 3/4C, Part 27) — only
                  renders once a component has ≥1 real, published related
                  guide. `relatedGuides` (plural) takes precedence when a
                  component has outgrown a single guide. */}
              {(() => {
                const guides = c.relatedGuides ?? (c.relatedGuide ? [c.relatedGuide] : []);
                if (guides.length === 0) return null;
                return (
                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <p className="text-xs uppercase tracking-[0.08em] text-[#888] mb-2.5">
                      {guides.length > 1 ? 'Related Field Guides' : 'Related Field Guide'}
                    </p>
                    <div className="flex flex-col gap-2">
                      {guides.map((g) => (
                        <Link
                          key={g.href}
                          href={g.href}
                          onClick={() => trackEvent('field_guide_related_click', { from: `system-component-${c.number}`, destination: g.href })}
                          className="block group"
                        >
                          <p className="text-white text-sm font-medium group-hover:text-[#008080] transition-colors">
                            {g.title} &rarr;
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </m.div>
          ))}
        </div>

        <div className="mt-14 pt-14 border-t border-white/5">
          <ScoreContextCTA
            eyebrow="Which Part of Your Growth System Is Weakest?"
            supporting="The Local Dominance Score helps identify where your current system is strongest and where opportunities may be leaking."
            ctaLabel="Find My Biggest Growth Leak"
            placement="system_section"
          />
        </div>
      </div>
    </section>
  );
}
