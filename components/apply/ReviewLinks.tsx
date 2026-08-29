'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface Props {
  placement: string;
  variant?: 'cards' | 'buttons';
}

// The two "keep exploring" links shared by the prep/education block and the
// final CTA (Part 7 / 10). The prospect has already applied — neither of
// these is another application CTA.
export default function ReviewLinks({ placement, variant = 'cards' }: Props) {
  if (variant === 'buttons') {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/results"
          onClick={() => trackEvent('review_page_results_click', { placement })}
          className="booking-btn booking-btn--primary text-base px-8 py-3.5 w-full sm:w-auto text-center"
        >
          See Contractor Results
        </Link>
        <Link
          href="/system"
          onClick={() => trackEvent('review_page_system_click', { placement })}
          className="booking-btn booking-btn--ghost text-base px-8 py-3.5 w-full sm:w-auto text-center"
        >
          Explore the Local Dominance System
        </Link>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Link
        href="/results"
        onClick={() => trackEvent('review_page_results_click', { placement })}
        className="card-hover group bg-[#141414] rounded-xl p-6 border border-white/5 flex items-center justify-between gap-4"
      >
        <span className="font-[family-name:var(--font-display)] text-base font-bold text-white">
          See Contractor Results
        </span>
        <span className="text-[#008080] flex-shrink-0 transition-transform group-hover:translate-x-1">→</span>
      </Link>
      <Link
        href="/system"
        onClick={() => trackEvent('review_page_system_click', { placement })}
        className="card-hover group bg-[#141414] rounded-xl p-6 border border-white/5 flex items-center justify-between gap-4"
      >
        <span className="font-[family-name:var(--font-display)] text-base font-bold text-white">
          Explore the Local Dominance System
        </span>
        <span className="text-[#008080] flex-shrink-0 transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
