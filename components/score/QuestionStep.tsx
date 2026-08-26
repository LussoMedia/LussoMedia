'use client';

import { m } from 'framer-motion';
import { ScoreQuestion } from '@/lib/config/score';

interface Props {
  question: ScoreQuestion;
  selected?: number;
  onAnswer: (optionIndex: number) => void;
  onBack?: () => void;
}

export default function QuestionStep({ question, selected, onAnswer, onBack }: Props) {
  return (
    <m.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="max-w-xl mx-auto px-6"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-4 text-center">
        {question.category}
      </p>
      {/* ScoreIntro's h1 unmounts once questions start — this is the only
          heading on screen at this stage, so it's the h1 (Part 27/31). */}
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-10 text-center leading-snug">
        {question.question}
      </h1>

      <div className="flex flex-col gap-3">
        {question.options.map((option, i) => (
          <button
            key={option.label}
            onClick={() => onAnswer(i)}
            className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-200 text-base ${
              selected === i
                ? 'border-[#008080] bg-[#008080]/10 text-white'
                : 'border-white/10 bg-[#141414] text-[#C5C6C7] hover:border-[#008080]/40'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="mt-8 mx-auto block text-[#888] text-sm hover:text-white transition-colors"
        >
          &larr; Back
        </button>
      )}
    </m.div>
  );
}
