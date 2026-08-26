'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getVariant } from '@/lib/abTest';
import { trackEvent } from '@/lib/analytics';
import { primaryCTA } from '@/lib/config/navigation';

const TEST_NAME = 'case_study_mid_cta';
const VARIANTS = ['score', 'apply'] as const;

// A/B test: does the mid-page case-study CTA convert better sending
// lower-intent readers to the Score first ("score"), or sending everyone
// straight into the application ("apply")? Gated on `mounted` rather than
// defaulting to a variant during SSR, so there's no hydration mismatch —
// costs a one-frame pop-in instead, which is fine for a non-LCP element.
export default function CaseStudyMidCTA({ caseStudySlug }: { caseStudySlug: string }) {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>('score');

  useEffect(() => {
    // Intentionally syncs from localStorage (an external system) after
    // mount rather than in the initializer, to avoid an SSR/client
    // hydration mismatch — this component renders nothing until mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(getVariant(TEST_NAME, VARIANTS) as (typeof VARIANTS)[number]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (variant === 'apply') {
    return (
      <section className="section-pad bg-[#0D0D0D] text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-4">
            See What This System Could Look Like for Your Business.
          </h2>
          <p className="text-[#C5C6C7] mb-8 leading-relaxed">
            A short application tells us whether the economics make sense for your market and
            capacity.
          </p>
          <Link
            href={primaryCTA.href}
            onClick={() =>
              trackEvent('case_study_plan_cta_click', {
                case_study: caseStudySlug,
                placement: 'mid-page',
                ab_variant: variant,
              })
            }
            className="booking-btn booking-btn--ghost text-base px-8 py-4 inline-block"
          >
            {primaryCTA.label}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-[#0D0D0D] text-center">
      <div className="max-w-xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-4">
          How Does Your Business Compare?
        </h2>
        <p className="text-[#C5C6C7] mb-8 leading-relaxed">
          Measure your visibility, offer, conversion infrastructure, reputation, demand generation,
          lead handling, and tracking.
        </p>
        <Link
          href="/local-dominance-score"
          onClick={() => {
            trackEvent('case_study_score_cta_click', {
              case_study: caseStudySlug,
              placement: 'mid-page',
              ab_variant: variant,
            });
            trackEvent('dominance_score_cta_click', { placement: 'case_study' });
          }}
          className="booking-btn booking-btn--ghost text-base px-8 py-4 inline-block"
        >
          See How You Stack Up Locally
        </Link>
      </div>
    </section>
  );
}
