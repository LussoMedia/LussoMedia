'use client';

import Link from 'next/link';
import type { FieldGuide } from '@/lib/config/fieldGuides';
import { getCategory } from '@/lib/config/fieldGuides';
import { trackEvent } from '@/lib/analytics';

// "Continue Learning" block (Part 25) — max 2–3 related guides, never an
// endless feed. Renders nothing if there are no real related guides yet.
export default function RelatedGuides({ guides, fromSlug }: { guides: FieldGuide[]; fromSlug: string }) {
  if (guides.length === 0) return null;

  return (
    <div>
      <p className="text-eyebrow text-[#008080] mb-6">Continue Learning</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {guides.map((g) => {
          const category = getCategory(g.category);
          return (
            <Link
              key={g.slug}
              href={`/resources/${g.slug}`}
              onClick={() => trackEvent('field_guide_related_click', { from: fromSlug, destination: g.slug })}
              className="card-hover block border border-white/10 rounded-[var(--radius-card)] p-6"
            >
              <p className="text-xs uppercase tracking-[0.08em] text-[#008080] mb-2">{category.label}</p>
              <p className="text-white font-semibold text-sm leading-snug mb-1.5">{g.shortTitle}</p>
              <p className="text-[#888] text-xs leading-relaxed">{g.premise}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
