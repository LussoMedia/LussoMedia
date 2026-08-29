'use client';

// Homepage Field Guide teaser block — activated in Phase 4C now that 3 real
// guides exist (Part 26 said wait for ~3; that threshold is now met). Job
// is narrow: demonstrate Lusso's strategic thinking before the visitor
// hires Lusso, without competing with the homepage's primary conversion
// narrative — this section's CTA is deliberately styled as secondary to
// primaryCTA everywhere else on the page.

import { m } from 'framer-motion';
import Link from 'next/link';
import { getHomepageFeaturedGuides, getCategory, getReadTime } from '@/lib/config/fieldGuides';
import { fieldGuides } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

export default function FieldGuidesHomeBlock() {
  const featured = getHomepageFeaturedGuides(3);
  if (featured.length === 0) return null; // never render an empty section

  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 max-w-2xl"
        >
          <p className="text-eyebrow text-[#008080] mb-4">Field Guides</p>
          <h2 className="text-section-heading text-white mb-4">
            See How We Think Before You Hire Us.
          </h2>
          <p className="text-[#888] text-sm leading-relaxed">
            Short, visual breakdowns of the same principles we use to diagnose growth constraints,
            engineer offers, and build stronger acquisition systems.
          </p>
        </m.div>

        {/* Numbered editorial rows — matches the System/90-Day pattern
            rather than another generic 3-card grid (Part "Homepage
            Design"). */}
        <div>
          {featured.map((g, i) => {
            const category = getCategory(g.category);
            return (
              <m.div
                key={g.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/resources/${g.slug}`}
                  onClick={() => trackEvent('field_guide_related_click', { from: 'homepage_teaser', destination: g.slug })}
                  className="grid grid-cols-[auto_1fr] md:grid-cols-[3rem_10rem_1fr_auto] items-start md:items-center gap-x-6 gap-y-2 py-6 border-b border-white/[0.08] first:pt-0 group"
                >
                  <p className="font-[family-name:var(--font-display)] text-[#008080] text-2xl font-semibold tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="text-eyebrow text-[#888] md:self-center">{category.label}</p>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-white font-semibold text-sm md:text-base group-hover:text-[#008080] transition-colors">
                      {g.shortTitle}
                    </p>
                    <p className="text-[#888] text-xs md:text-sm mt-1">{g.premise}</p>
                  </div>
                  <p className="text-[#666] text-xs uppercase tracking-[0.06em] whitespace-nowrap">
                    {getReadTime(g)} Min Read
                  </p>
                </Link>
              </m.div>
            );
          })}
        </div>

        {/* Secondary CTA — deliberately quieter than the site's primary
            conversion buttons (ghost-style text link, not a solid button). */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          <Link
            href={fieldGuides.href}
            onClick={() => trackEvent('field_guide_related_click', { from: 'homepage_teaser_cta', destination: fieldGuides.href })}
            className="text-[#008080] text-sm font-medium hover:text-[#00a8a8] transition-colors"
          >
            Explore All Field Guides &rarr;
          </Link>
        </m.div>
      </div>
    </section>
  );
}
