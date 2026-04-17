'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Strategy Call',
    description:
      'We audit your brand, research your market, and map your local competition. Then we build a custom content roadmap aligned to your business goals — before we shoot a single frame.',
    detail: 'You get clarity on what to say, who to say it to, and how to say it.',
  },
  {
    number: '02',
    title: 'We Execute',
    description:
      'Shoot day, editing, posting, ad setup, tracking, and reporting — all handled by our team. You show up once a month. We turn that into 8–12 videos and a full paid ad campaign.',
    detail: 'Strategy, production, and paid ads — running in parallel. Every month.',
  },
  {
    number: '03',
    title: 'You Grow',
    description:
      'Your brand becomes visible, consistent, and magnetic — without you touching your phone. Every month, we report what worked, what didn\'t, and exactly what we\'re building next.',
    detail: 'You focus on the business. We build the brand.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">The Process</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white">
            How the Partnership Works
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-[#008080]/50 via-[#008080]/20 to-transparent -translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.08 }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-last' : ''
                }`}
              >
                {/* Content */}
                <div className={`${i % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <div className={`flex items-center gap-4 mb-5 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <span className="font-[family-name:var(--font-space-grotesk)] text-6xl font-black text-[#008080]/20 leading-none select-none">
                      {step.number}
                    </span>
                    <div className="teal-divider" />
                  </div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#C5C6C7] leading-relaxed mb-4">{step.description}</p>
                  <p className="text-[#008080] text-sm font-semibold">{step.detail}</p>
                </div>

                {/* Visual card */}
                <div className="card-hover bg-[#141414] rounded-2xl p-8 border border-white/5 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#008080]/10 border border-[#008080]/25 flex items-center justify-center mx-auto mb-4">
                      <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#008080]">
                        {step.number}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
                      Step {step.number} — {step.title}
                    </p>
                    <p className="text-[#888] text-sm mt-2">{step.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
