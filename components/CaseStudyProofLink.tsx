'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function CaseStudyProofLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/results/${slug}`}
      onClick={() => trackEvent('case_study_view_from_confirmation', { case_study: slug })}
      className="inline-flex items-center gap-2 text-[#008080] text-sm font-semibold hover:text-[#00a8a8] transition-colors"
    >
      View Full Case Study
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
