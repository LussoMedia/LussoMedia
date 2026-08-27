'use client';

import { useEffect } from 'react';
import { m } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import ReviewTimeline from './ReviewTimeline';
import ReviewWhatWeCheck from './ReviewWhatWeCheck';
import ReviewChecklist from './ReviewChecklist';
import ReviewProof from './ReviewProof';
import ReviewPrep from './ReviewPrep';
import ReviewFAQ from './ReviewFAQ';
import ReviewLinks from './ReviewLinks';

interface Props {
  values: Record<string, string>;
}

// The Tier B ("manual review") outcome — a full post-conversion experience,
// not a dead-end thank-you screen (Part 1 of the review-page brief). Order
// follows the brief's recommended visual rhythm: confirmation hero → what
// happens next → what we review → have this ready → proof → FAQ → optional
// links out.
export default function ApplicationReviewPage({ values }: Props) {
  const companyName = values.companyName?.trim();

  useEffect(() => {
    trackEvent('application_review_page_view', {
      application_tier: 'B',
      industry: values.industry || '',
      source_page: 'apply',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-24 bg-[#0D0D0D] grain-overlay">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Application Received</p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-white mb-6 leading-[1.15]">
            Your Application Is In. We&rsquo;ll Review the Fit Personally.
          </h1>
          <p className="text-[#C5C6C7] leading-relaxed">
            {companyName && (
              <>
                We&rsquo;re reviewing the information you shared about <span className="text-white">{companyName}</span>.{' '}
              </>
            )}
            We review each application against your market, service economics, capacity, and growth goals before
            recommending a next step. If there&rsquo;s a clear fit, we&rsquo;ll send you the next step. If we need
            more context first, we&rsquo;ll reach out with a few focused questions.
          </p>
        </m.div>
      </section>

      <ReviewTimeline />
      <ReviewWhatWeCheck />
      <ReviewChecklist />
      <ReviewProof />
      <ReviewPrep />
      <ReviewFAQ />

      {/* Final CTA */}
      <section className="section-pad bg-[#111111] border-t border-white/5">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-6 text-center"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
            While We Review, See What the System Looks Like in Practice.
          </h2>
          <ReviewLinks placement="final_cta" variant="buttons" />
        </m.div>
      </section>
    </div>
  );
}
