'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { ScoreResult } from '@/lib/scoring';
import { recommendations } from '@/lib/config/scoreRecommendations';
import { buildInterpretation } from '@/lib/scoreInterpretation';
import { trackEvent } from '@/lib/analytics';

interface Props {
  result: ScoreResult;
  firstName: string;
}

export default function ScoreBreakdown({ result, firstName }: Props) {
  const interpretation = buildInterpretation(result);

  const handleSave = () => {
    trackEvent('dominance_score_result_save', { method: 'print' });
    window.print();
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto px-6 print-result"
    >
      <div className="text-center mb-8 print:mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4 print:text-black">
          {firstName ? `${firstName}'s` : 'Your'} Local Dominance Score
        </p>
        <p className="font-[family-name:var(--font-space-grotesk)] text-6xl font-bold text-white mb-2 print:text-black">
          {result.overall}<span className="text-2xl text-[#888]"> / 100</span>
        </p>
        <p className="text-[#C5C6C7] print:text-black">{result.band.label}</p>
      </div>

      {/* Personalized interpretation */}
      <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-8 print:border-black print:bg-white">
        <p className="text-[#C5C6C7] text-lg leading-relaxed print:text-black">{interpretation}</p>
      </div>

      {/* Score by category */}
      <div className="bg-[#141414] border border-white/5 rounded-xl p-8 mb-8 print:border-black print:bg-white">
        <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-6 print:text-black">Score by Category</p>
        <div className="flex flex-col gap-4">
          {result.categoryResults.map((c) => (
            <div key={c.category}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white text-sm font-medium print:text-black">{c.category}</span>
                <span className="text-[#888] text-sm print:text-black">{c.score}</span>
              </div>
              <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden print:border print:border-black">
                <div
                  className="h-full bg-[#008080] rounded-full print:bg-black"
                  style={{ width: `${c.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 priorities — each with why it matters + one immediate action */}
      <div className="flex flex-col gap-4 mb-10">
        {result.rankedWeakest.map((category, i) => {
          const rec = recommendations[category];
          return (
            <div
              key={category}
              className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8 print:border-black print:bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#008080]/15 border border-[#008080]/30 text-[#008080] text-xs font-bold flex items-center justify-center flex-shrink-0 print:border-black print:text-black">
                  {i + 1}
                </span>
                <p className="text-white font-semibold print:text-black">Priority: {category}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2 print:text-black">Why It Matters</p>
              <p className="text-[#C5C6C7] text-sm leading-relaxed mb-4 print:text-black">{rec.priority}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-2 print:text-black">Immediate Action</p>
              <p className="text-[#C5C6C7] text-sm leading-relaxed print:text-black">{rec.actions[0]}</p>
            </div>
          );
        })}
      </div>

      <div className="text-center print:hidden">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-3">
            Want a Plan Built Around Your Business?
          </h2>
          <p className="text-[#C5C6C7] max-w-lg mx-auto mb-6 leading-relaxed">
            Your Score identifies the likely constraints. The Local Dominance Plan looks at your
            economics, market, capacity, and service mix to determine what should be fixed first.
          </p>
          <Link
            href="/apply"
            onClick={() => trackEvent('dominance_score_plan_click')}
            className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block"
          >
            Get My Local Dominance Plan
          </Link>
        </div>

        <button
          onClick={handleSave}
          className="booking-btn booking-btn--ghost text-sm px-6 py-3"
        >
          Print / Save My Results
        </button>
        <p className="text-[#666] text-xs mt-3">
          We&rsquo;ve also emailed a copy of this breakdown to you.
        </p>
      </div>
    </m.div>
  );
}
