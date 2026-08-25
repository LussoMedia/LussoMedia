'use client';

import { m } from 'framer-motion';

const capabilities = [
  'Growth strategy',
  'Offer development',
  'Conversion / web',
  'Video production',
  'Editing',
  'Paid acquisition',
  'Reputation systems',
  'Analytics',
];

export default function TeamComparison() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            Building This Internally Takes More Than a Marketing Hire.
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-3 mb-12"
        >
          {capabilities.map((c) => (
            <div key={c} className="bg-[#141414] border border-white/5 rounded-lg py-4 px-5 text-[#C5C6C7] text-sm font-medium">
              {c}
            </div>
          ))}
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-bold teal-gradient-text"
        >
          One System. One Partner. One Growth Plan.
        </m.p>
      </div>
    </section>
  );
}
