'use client';

import Link from 'next/link';
import type { FieldGuide } from '@/lib/config/fieldGuides';
import { getCategory, getIndustryLabel, getReadTime } from '@/lib/config/fieldGuides';
import { trackEvent } from '@/lib/analytics';

// Reusable card for the /resources hub's featured section (Part 5) and,
// later, the homepage teaser block (Part 26). Category + title + one-line
// premise + read time + CTA — deliberately not a generic "blog card"
// (no date, no author, no thumbnail placeholder).
export default function FeaturedGuideCard({ guide }: { guide: FieldGuide }) {
  const category = getCategory(guide.category);
  const eyebrowLabel = guide.industry ? `${getIndustryLabel(guide.industry)} · ${category.label}` : category.label;
  return (
    <Link
      href={`/resources/${guide.slug}`}
      onClick={() => trackEvent('field_guide_related_click', { from: 'hub_featured', destination: guide.slug })}
      className="card-hover block h-full border border-white/10 rounded-[var(--radius-card)] p-7"
    >
      <p className="text-eyebrow text-[#008080] mb-3">{eyebrowLabel}</p>
      <h3 className="text-white font-semibold text-lg leading-snug mb-2">{guide.shortTitle}</h3>
      <p className="text-[#888] text-sm leading-relaxed mb-5">{guide.premise}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#666] uppercase tracking-[0.06em]">{getReadTime(guide)} Min Read</span>
        <span className="text-[#008080] font-medium">Read the Guide &rarr;</span>
      </div>
    </Link>
  );
}
