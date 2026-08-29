'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { Tier } from '@/lib/applicationRouting';
import { trackEvent } from '@/lib/analytics';
import { useEffect } from 'react';
import ApplicationReviewPage from './ApplicationReviewPage';

interface Props {
  tier: Tier;
  values: Record<string, string>;
}

export default function ApplicationResult({ tier, values }: Props) {
  useEffect(() => {
    trackEvent('application_qualified', { tier });
  }, [tier]);

  if (tier === 'A') {
    return (
      <div className="min-h-screen flex items-center justify-center py-32">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-6 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Strong Fit</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            Your Business Looks Like a Strong Fit.
          </h1>
          <p className="text-[#C5C6C7] mb-10 leading-relaxed">
            Based on what you shared, the Local Dominance System looks like a strong match. Choose a
            time below to review your plan.
          </p>
          <Link
            href="/book"
            onClick={() => trackEvent('calendar_view', { tier: 'A' })}
            className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block"
          >
            Choose a Time to Review Your Local Dominance Plan
          </Link>
        </m.div>
      </div>
    );
  }

  if (tier === 'B') {
    // Full post-conversion review experience — see ApplicationReviewPage for
    // the confirmation hero, timeline, and every section below it.
    return <ApplicationReviewPage values={values} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-32">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto px-6 text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[#888] mb-4">Not Quite Yet</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
          The Full Local Dominance System May Be Premature Right Now.
        </h1>
        <p className="text-[#C5C6C7] mb-10 leading-relaxed">
          Based on where the business is today, it&rsquo;s worth building a bit more foundation
          first. Here&rsquo;s a free way to see exactly where to start.
        </p>
        <Link href="/local-dominance-score" className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block">
          Get Your Local Dominance Score
        </Link>
      </m.div>
    </div>
  );
}
