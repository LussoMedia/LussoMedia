'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface ObjectionNoteProps {
  question: string;
  answer: string;
  objectionType: string;
  page: string;
  section: string;
}

// Small, contextual objection-handling callout — meant to sit next to the
// section that naturally raises the doubt, not as a standalone FAQ dump
// (Part 9). Collapsed by default so it doesn't add visual weight until
// someone actually has the question.
export default function ObjectionNote({ question, answer, objectionType, page, section }: ObjectionNoteProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    if (!open) trackEvent('objection_expand', { objection_type: objectionType, page, section });
    setOpen(!open);
  };

  return (
    <div className="mt-4 border border-white/10 rounded-lg bg-[#0D0D0D]/40">
      <button
        onClick={toggle}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 text-sm"
        aria-expanded={open}
      >
        <span className="text-[#C5C6C7] font-medium">{question}</span>
        <span
          className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-transform duration-200 ${
            open ? 'border-[#008080] text-[#008080] rotate-45' : 'border-white/20 text-[#888]'
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-[#888] text-sm leading-relaxed">{answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
