'use client';

// Optional lightweight interaction (Part 18). Explicitly NOT a lead form:
// no fields, no submission, no storage — a single Yes/No toggle that swaps
// which pre-written response is shown. Purpose is comprehension/engagement,
// not data capture.

import { useState } from 'react';
import type { QuickDiagnosis as QuickDiagnosisData } from '@/lib/config/fieldGuides';

export default function QuickDiagnosis({ data }: { data: QuickDiagnosisData }) {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="border border-white/10 rounded-[var(--radius-card)] p-6">
      <p className="text-eyebrow text-[#888] mb-4">Quick Check</p>
      <p className="text-white font-semibold mb-5">{data.question}</p>
      <div className="flex gap-3 mb-5">
        <button
          type="button"
          aria-pressed={answer === 'yes'}
          onClick={() => setAnswer('yes')}
          className={`px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-semibold border transition-colors ${
            answer === 'yes' ? 'bg-[#008080] border-[#008080] text-white' : 'border-white/20 text-[#C5C6C7] hover:border-white/40'
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          aria-pressed={answer === 'no'}
          onClick={() => setAnswer('no')}
          className={`px-5 py-2.5 rounded-[var(--radius-btn)] text-sm font-semibold border transition-colors ${
            answer === 'no' ? 'bg-[#008080] border-[#008080] text-white' : 'border-white/20 text-[#C5C6C7] hover:border-white/40'
          }`}
        >
          No
        </button>
      </div>
      {answer && (
        <p className="text-[#C5C6C7] text-sm leading-relaxed border-t border-white/[0.08] pt-4" role="status">
          {answer === 'yes' ? data.yes : data.no}
        </p>
      )}
    </div>
  );
}
