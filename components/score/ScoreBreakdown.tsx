'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ScoreResult } from '@/lib/scoring';
import { recommendations } from '@/lib/config/scoreRecommendations';

interface Props {
  result: ScoreResult;
  firstName: string;
}

export default function ScoreBreakdown({ result, firstName }: Props) {
  const topLeak = recommendations[result.weakest];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6"
    >
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">
          {firstName ? `${firstName}'s` : 'Your'} Local Dominance Score
        </p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold text-white mb-2">
          {result.overall}<span className="text-2xl text-[#888]"> / 100</span>
        </p>
        <p className="text-[#C5C6C7]">{result.band.label}</p>
      </div>

      {/* Score by category */}
      <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-8">
        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-6">Score by Category</p>
        <div className="flex flex-col gap-4">
          {result.categoryResults.map((c) => (
            <div key={c.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-medium">{c.category}</span>
                <span className="text-[#888] text-sm">{c.score}</span>
              </div>
              <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#008080] rounded-full"
                  style={{ width: `${c.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 growth leaks */}
      <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-8">
        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-4">Top 3 Growth Leaks</p>
        <ul className="flex flex-col gap-2">
          {result.rankedWeakest.map((category, i) => (
            <li key={category} className="flex items-center gap-3 text-white">
              <span className="w-6 h-6 rounded-full bg-[#008080]/15 border border-[#008080]/30 text-[#008080] text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended priority + action steps */}
      <div className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8 mb-10">
        <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-3">Recommended Priority</p>
        <p className="text-white font-semibold mb-6">{topLeak.priority}</p>
        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-3">Immediate Action Steps</p>
        <ul className="flex flex-col gap-2">
          {topLeak.actions.map((action) => (
            <li key={action} className="text-[#C5C6C7] text-sm flex gap-2">
              <span className="text-[#008080] flex-shrink-0">•</span>
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <Link href="/apply" className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block">
          Build My Local Dominance Plan
        </Link>
      </div>
    </m.div>
  );
}
