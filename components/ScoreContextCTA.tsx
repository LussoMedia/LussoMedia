'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { scoreCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

interface Props {
  eyebrow: string;
  supporting: string;
  ctaLabel?: string;
  placement: string;
}

// Reusable contextual Score CTA — used after the Referral Ceiling
// argument, the System explanation, and other spots where the diagnostic
// is the logical next step, not a generic repeated banner (Part 13/15/16).
export default function ScoreContextCTA({ eyebrow, supporting, ctaLabel, placement }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center"
    >
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold text-white mb-3">
        {eyebrow}
      </h3>
      <p className="text-[#C5C6C7] text-sm mb-6 leading-relaxed">{supporting}</p>
      <Link
        href={scoreCTA.href}
        onClick={() => trackEvent('dominance_score_cta_click', { placement })}
        className="booking-btn booking-btn--ghost text-sm px-6 py-3 inline-flex items-center gap-2"
      >
        {ctaLabel || scoreCTA.label}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <p className="text-[#666] text-xs mt-3">{scoreCTA.microcopy}</p>
    </m.div>
  );
}
