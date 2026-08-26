'use client';

import { m } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export default function ScoreIntro({ onStart }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-6 text-center"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Local Dominance Score</p>
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
        How Dominant Is Your Business in Your Local Market?
      </h1>
      <p className="text-lg text-[#C5C6C7] mb-10 leading-relaxed">
        Answer a few questions and see where your current growth system is strongest, where
        it&rsquo;s leaking, and what could be limiting your next stage of growth.
      </p>
      <button onClick={onStart} className="booking-btn booking-btn--primary text-base px-10 py-4">
        Get My Score
      </button>
      <p className="text-[#666] text-xs mt-5">
        About 2 minutes • No email required to start • Instant initial score
      </p>
    </m.div>
  );
}
