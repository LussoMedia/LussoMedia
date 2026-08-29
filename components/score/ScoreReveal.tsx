'use client';

import { m } from 'framer-motion';
import { ScoreResult } from '@/lib/scoring';

interface Props {
  result: ScoreResult;
  onUnlock: () => void;
}

export default function ScoreReveal({ result, onUnlock }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto px-6 text-center"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Your Score</p>

      <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1A1A1A" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#008080"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(result.overall / 100) * 283} 283`}
          />
        </svg>
        <div>
          <p className="font-[family-name:var(--font-display)] text-5xl font-bold text-white">
            {result.overall}
          </p>
          <p className="text-[#888] text-xs">/ 100</p>
        </div>
      </div>

      <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-3">
        {result.band.label}
      </h1>
      <p className="text-[#C5C6C7] mb-10">{result.band.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2">Strongest Area</p>
          <p className="text-white font-semibold">{result.strongest}</p>
        </div>
        <div className="bg-[#141414] border border-[#008080]/30 rounded-xl p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-2">Biggest Growth Leak</p>
          <p className="text-white font-semibold">{result.weakest}</p>
        </div>
      </div>

      <button onClick={onUnlock} className="booking-btn booking-btn--primary text-base px-10 py-4">
        Unlock Your Full Breakdown
      </button>
    </m.div>
  );
}
