'use client';

import { motion } from 'framer-motion';

const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" stroke="#008080" strokeWidth="1.5" />
        <path d="M14 9v5l3 3" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: 'Your referrals are strong. Your online presence doesn\'t match.',
    body:
      'You\'ve built a real business on word-of-mouth. But when potential clients look you up, what they find doesn\'t reflect the quality you deliver. That gap is costing you deals you never even knew you were in the running for.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="#008080" strokeWidth="1.5" />
        <path d="M4 10h20" stroke="#008080" strokeWidth="1.5" />
        <path d="M9 15h10M9 19h6" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: 'You know content matters. You just don\'t have the time or team for it.',
    body:
      'Running a service business is already a full-time job. Trying to also plan, shoot, edit, post, and manage ads on top of that is a formula for burnout and mediocre results. You need a team that runs it for you — not another thing on your plate.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4l2.5 7.5H24l-6.5 4.7 2.5 7.5L14 19l-6 4.7 2.5-7.5L4 11.5h7.5L14 4z" stroke="#008080" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    heading: 'Your competitors look more professional online — even if they\'re not.',
    body:
      'Perception is half the battle. When someone in your market shows up consistently with polished content and targeted ads, they win the conversation before it even starts. Right now, someone less qualified than you is winning that conversation.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Problem() {
  return (
    <section id="problem" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Sound Familiar?</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white">
            You're Leaving Growth on the Table
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="card-hover bg-[#141414] rounded-xl p-8 flex flex-col gap-5"
            >
              <div className="w-12 h-12 rounded-lg bg-[#008080]/10 flex items-center justify-center flex-shrink-0">
                {point.icon}
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white leading-snug">
                {point.heading}
              </h3>
              <p className="text-[#C5C6C7] text-sm leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
