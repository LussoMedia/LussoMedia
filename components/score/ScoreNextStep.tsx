'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ScoreResult } from '@/lib/scoring';
import { trackEvent } from '@/lib/analytics';
import { primaryCTA } from '@/lib/config/navigation';
import { playbook } from '@/lib/config/playbook';

interface Props {
  result: ScoreResult;
}

// Change 5 — the score→application ascension flow. Score alone never
// decides qualification (routeApplication() in the actual /apply funnel
// still owns that, using revenue/capacity/follow-up answers this quiz never
// asks); this only decides which EDUCATIONAL next step reads as most
// relevant given the score, and — for the strongest scores — invites a
// self-selected application rather than auto-declaring anyone "ready."
//
// Three action tiers derived from the overall score. Kept separate from
// the 4-tier gauge band in lib/config/score.ts (scoreBands) — that display
// band ("Strong Local Position" etc.) stays exactly as-is above this
// component; this is a second, coarser signal purely for CTA routing.
type ActionTier = 'foundation' | 'growth-constrained' | 'scale-ready';

function getActionTier(overall: number): ActionTier {
  if (overall < 40) return 'foundation';
  if (overall < 70) return 'growth-constrained';
  return 'scale-ready';
}

function CategoryChips({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {categories.map((c) => (
        <span
          key={c}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#008080]/25 bg-[#008080]/10 text-[#008080]"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export default function ScoreNextStep({ result }: Props) {
  const tier = getActionTier(result.overall);

  const handleApplyClick = (placement: string) => {
    trackEvent('score_to_application_click', {
      placement,
      score: result.overall,
      band: result.band.label,
      tier,
      weakest: result.weakest,
    });
    // Preserved for continuity with existing score→plan reporting.
    trackEvent('dominance_score_plan_click', { placement, score: result.overall });
  };

  if (tier === 'foundation') {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center print:hidden"
      >
        <p className="text-[#C5C6C7] max-w-lg mx-auto mb-6 leading-relaxed">
          Your foundation has several growth leaks. Increasing ad spend before fixing these gaps
          may simply send more opportunities into a system that isn&rsquo;t ready to convert them
          efficiently.
        </p>

        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-4">Your Weakest Areas</p>
        <CategoryChips categories={result.rankedWeakest} />

        <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-6 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-3">Recommended Next Step</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-3">
            Get the 90-Day Lead-to-Booked-Job Playbook
          </h2>
          <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">
            Start by strengthening your lead handling, follow-up, offers, reviews, conversion
            tracking, and demand-generation foundation.
          </p>
          <Link
            href={playbook.href}
            onClick={() => trackEvent('playbook_score_cta_clicked', { placement: 'score_foundation' })}
            className="booking-btn booking-btn--primary text-base px-8 py-3.5 inline-block"
          >
            Download the Playbook
          </Link>
        </div>

        <Link
          href="/system"
          className="text-[#888] text-sm hover:text-[#008080] transition-colors underline underline-offset-2"
        >
          See What the Local Dominance System Fixes
        </Link>
      </m.div>
    );
  }

  if (tier === 'growth-constrained') {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center print:hidden"
      >
        <p className="text-[#C5C6C7] max-w-lg mx-auto mb-6 leading-relaxed">
          You already have pieces working — but several gaps may be restricting growth. Your
          business isn&rsquo;t starting from zero. The opportunity is connecting your strongest
          assets into a system that produces more predictable demand.
        </p>

        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-4">Your 3 Biggest Constraints</p>
        <CategoryChips categories={result.rankedWeakest} />

        <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-8 max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-3">Recommended Next Step</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-3">
            Get Your 90-Day Growth Framework
          </h2>
          <Link
            href={playbook.href}
            onClick={() => trackEvent('playbook_score_cta_clicked', { placement: 'score_growth_constrained' })}
            className="booking-btn booking-btn--primary text-base px-8 py-3.5 inline-block"
          >
            Download the Playbook
          </Link>
        </div>

        <p className="text-[#888] text-sm mb-3">
          Already doing $50k+ per month and have capacity to grow?
        </p>
        <Link
          href={primaryCTA.href}
          onClick={() => handleApplyClick('score_growth_constrained')}
          className="booking-btn booking-btn--ghost text-base px-8 py-3.5 inline-block"
        >
          See If Your Market Qualifies
        </Link>
      </m.div>
    );
  }

  // scale-ready
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center print:hidden"
    >
      <p className="text-[#C5C6C7] max-w-lg mx-auto mb-8 leading-relaxed">
        Your foundation is strong. The next opportunity is market share. At this stage, the
        biggest gains usually come from connecting your offer, conversion infrastructure,
        authority, advertising, reputation, and tracking into one operating system.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto text-left">
        <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2">Where You&rsquo;re Strong</p>
          <p className="text-white font-semibold">{result.strongest}</p>
        </div>
        <div className="bg-[#141414] border border-[#008080]/30 rounded-xl p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-2">Next Growth Constraint</p>
          <p className="text-white font-semibold">{result.weakest}</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8 mb-6 max-w-lg mx-auto">
        <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-3">Recommended Next Step</p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-3">
          Apply for the Local Dominance System
        </h2>
        <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">
          If your business has the capacity to serve more customers, we&rsquo;ll review your
          market, competitive landscape, economics, and current acquisition system to determine
          whether Lusso Media is a fit.
        </p>
        <Link
          href={primaryCTA.href}
          onClick={() => handleApplyClick('score_scale_ready')}
          className="booking-btn booking-btn--primary text-base px-8 py-3.5 inline-block"
        >
          See If Your Market Qualifies
        </Link>
      </div>

      <Link
        href={playbook.href}
        onClick={() => trackEvent('playbook_score_cta_clicked', { placement: 'score_scale_ready' })}
        className="text-[#888] text-sm hover:text-[#008080] transition-colors underline underline-offset-2"
      >
        Download the 90-Day Playbook
      </Link>
    </m.div>
  );
}
