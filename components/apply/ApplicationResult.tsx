'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { Tier } from '@/lib/applicationRouting';
import { trackEvent } from '@/lib/analytics';
import { useEffect } from 'react';

interface Props {
  tier: Tier;
}

export default function ApplicationResult({ tier }: Props) {
  useEffect(() => {
    trackEvent('application_qualified', { tier });
  }, [tier]);

  if (tier === 'A') {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto px-6 text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Strong Fit</p>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
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
    );
  }

  if (tier === 'B') {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto px-6 text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Application Received</p>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
          Your Application Needs a Quick Review Before We Recommend the Next Step.
        </h1>
        <p className="text-[#C5C6C7] mb-10 leading-relaxed">
          Thanks for the detail. Someone from Lusso will personally review your application and
          follow up with the right next step — that might be a call, or it might be more questions
          first.
        </p>
        <p className="text-[#666] text-xs">
          No backend is wired up yet to deliver this submission — see the outstanding integrations
          note for what needs to be connected before this goes live.
        </p>
      </m.div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto px-6 text-center"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[#888] mb-4">Not Quite Yet</p>
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
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
  );
}
