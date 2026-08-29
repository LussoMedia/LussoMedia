'use client';

import { m } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onRetry: () => void | Promise<void>;
}

// Shown when the server couldn't confirm the application actually reached
// a real endpoint (Part 2) — never a success screen for an undelivered
// submission. The form's answers stay in ApplicationFunnel's state, so
// retrying doesn't ask the applicant to redo anything.
export default function SubmissionError({ onRetry }: Props) {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = async () => {
    setRetrying(true);
    await onRetry();
    setRetrying(false);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto px-6 text-center"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[#888] mb-4">Submission Didn&rsquo;t Go Through</p>
      <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
        We Couldn&rsquo;t Submit Your Application Just Yet.
      </h1>
      <p className="text-[#C5C6C7] mb-10 leading-relaxed">
        Your answers are still here — nothing was lost. This is usually a brief connection issue. Please try again.
      </p>
      <button
        onClick={handleRetry}
        disabled={retrying}
        className="booking-btn booking-btn--primary text-base px-10 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {retrying ? 'Trying Again…' : 'Try Again'}
      </button>
    </m.div>
  );
}
