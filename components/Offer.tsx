'use client';

import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

const deliverables = [
  'Monthly strategy call + market research on your business, niche, and local competition',
  'One shoot day per month — we come to you',
  '8–12 professionally edited videos monthly',
  'Full social posting + management across Facebook, Instagram, TikTok, YouTube Shorts, and Reels',
  'Full ad funnel: setup, copy, tracking, and retargeting',
  'Ad campaign management — client provides $30/day minimum ad spend',
  'Monthly performance report + next month\'s strategic roadmap',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Offer() {
  return (
    <section id="offer" className="section-pad bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">The Offer</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.05]">
              One Partnership.
              <br />
              Full Execution.
            </h2>
            <p className="text-[#C5C6C7] text-lg leading-relaxed mb-8">
              The Strategic Content Partnership gives you a complete content and ad operation —
              without hiring a team. We embed in your business, learn your brand, and run everything.
            </p>

            {/* Callout */}
            <div className="rounded-xl border border-[#008080]/30 bg-[#008080]/8 p-6 mb-8">
              <p className="text-white font-[family-name:var(--font-space-grotesk)] text-base font-semibold leading-snug">
                "For the cost of one junior marketing hire, you get a full content and ad operation
                already running."
              </p>
            </div>

            {/* 3-month note */}
            <div className="flex items-start gap-3 bg-[#1A1A1A] rounded-lg px-5 py-4">
              <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5z" stroke="#008080" strokeWidth="1.5"/>
                <path d="M9 6v4M9 12.5v.5" stroke="#008080" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-[#C5C6C7] text-sm leading-relaxed">
                <span className="text-white font-semibold">3-month minimum commitment.</span>{' '}
                We require this because real results take consistent execution — not one month of content.
                Month one is setup. Month two is refinement. Month three is where momentum kicks in.
              </p>
            </div>

            <div className="mt-8">
              <BookingButton label="Start the Conversation" variant="primary" />
            </div>
          </motion.div>

          {/* Right: Deliverables checklist */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#141414] rounded-2xl p-8 border border-white/5"
          >
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white mb-6">
              Everything Included
            </h3>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-4"
            >
              {deliverables.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#008080]/15 border border-[#008080]/40 flex items-center justify-center mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[#C5C6C7] text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Value strip */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-3">What you avoid</p>
              <div className="flex flex-wrap gap-2">
                {['Hiring a videographer', 'Social media manager', 'Ad agency fees', 'Strategy consultants', 'Editing contractors'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#1A1A1A] text-[#888] text-xs border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
