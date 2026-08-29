'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { reviewFaqs } from '@/lib/config/reviewFaqs';
import { faqs, FaqItem } from '@/lib/config/faqs';
import { trackEvent } from '@/lib/analytics';

// Reuse the site's one approved pricing answer rather than restating it, so
// pricing never reads differently between /apply and the main FAQ (Part 9).
const pricingFaq = faqs.find((f) => f.question === 'How much does the Local Dominance System cost?');
const items: FaqItem[] = pricingFaq ? [...reviewFaqs, pricingFaq] : reviewFaqs;

function AccordionItem({ faq, isOpen, onToggle }: { faq: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-start justify-between gap-6 group min-h-[44px]"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-display)] text-base font-semibold text-white group-hover:text-[#008080] transition-colors leading-snug">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
            isOpen ? 'border-[#008080] bg-[#008080]/15 text-[#008080] rotate-45' : 'border-white/20 text-[#888]'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="text-[#C5C6C7] leading-relaxed pb-6 pr-10 text-[15px]">{faq.answer}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    const next = openIndex === i ? null : i;
    setOpenIndex(next);
    if (next !== null) {
      trackEvent('review_page_faq_expand', { question: items[i].question });
    }
  };

  return (
    <section id="review-faq" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-3xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white">
            Questions While We Review Your Application
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] rounded-2xl px-8 divide-y divide-white/5 border border-white/5"
        >
          {items.map((faq, i) => (
            <AccordionItem key={faq.question} faq={faq} isOpen={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
