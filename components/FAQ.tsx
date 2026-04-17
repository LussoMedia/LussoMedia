'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What's included in the partnership?",
    answer:
      "Everything you need to run a complete content and ad operation: a monthly strategy call with market research, one shoot day at your location, 8–12 professionally edited videos, full social posting and management across Facebook, Instagram, TikTok, YouTube Shorts, and Reels, a complete ad funnel with setup, copy, tracking, and retargeting, ad campaign management (you provide the ad spend), and a monthly performance report with your next month's roadmap.",
  },
  {
    question: 'Why a 3-month minimum?',
    answer:
      "Month one is setup — we're learning your brand, building your content system, and launching the ad funnel. Month two is refinement — we see what's working and sharpen it. Month three is where momentum kicks in and results compound. A single month doesn't move the needle. A system does. We require three months because that's the minimum required to actually deliver on the promise.",
  },
  {
    question: 'Do I need to be on camera?',
    answer:
      "Not necessarily. We build content strategies that work for your business, not just the owner. Some of our best-performing content is product shots, behind-the-scenes footage, and team-driven video. We'll tell you what works for your specific industry and market — and we'll make sure you're comfortable with whatever we build.",
  },
  {
    question: 'What industries do you work with?',
    answer:
      "We work with established local service businesses: home services (HVAC, roofing, plumbing, landscaping), real estate, medical and wellness, fitness studios, restaurants, professional services, and similar. The common thread is that you do great work, your local reputation is strong, and your digital presence doesn't reflect that yet.",
  },
  {
    question: "How is this different from a social media manager?",
    answer:
      "A social media manager handles posting. We handle strategy, production, ads, and reporting — end to end. That means we show up to shoot, we edit the content, we write the ad copy, we set up the funnel, we manage campaigns, and we report on results. You're not hiring a poster. You're getting a full marketing operation.",
  },
  {
    question: 'What do I need to provide?',
    answer:
      "One shoot day per month and access to your business for context — walk us through what you do, introduce us to your team, show us the job site or space. We handle everything else. No equipment needed. No scripts to write. No posting to manage. Just show up once a month and run your business.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-start justify-between gap-6 group"
      >
        <span className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white group-hover:text-[#008080] transition-colors leading-snug">
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 mt-0.5 ${
            isOpen
              ? 'border-[#008080] bg-[#008080]/15 text-[#008080] rotate-45'
              : 'border-white/20 text-[#888]'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="text-[#C5C6C7] leading-relaxed pb-6 pr-10 text-[15px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">FAQ</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white">
            Questions Worth Asking
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] rounded-2xl px-8 divide-y divide-white/5 border border-white/5"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
