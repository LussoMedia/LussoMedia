'use client';

import { m } from 'framer-motion';

const checklistItems = [
  'Monthly revenue',
  'Primary service you want to grow',
  'Average job / project value',
  'Approximate gross margin',
  'Current monthly lead volume',
  'Close rate (if known)',
  'Current advertising spend',
  'Additional monthly capacity',
  'Number of crews / technicians',
  'Primary service area',
];

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[#008080]/40 bg-[#008080]/10 text-[#008080] flex items-center justify-center mt-0.5">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ReviewChecklist() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6">
            If We Move Forward, Have These Numbers Ready.
          </h2>
          <div className="teal-divider mx-auto mb-6" />
          <p className="text-[#C5C6C7] leading-relaxed">
            Estimates are fine. These numbers help us determine what profitable acquisition can realistically look
            like for your business.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] rounded-2xl p-6 md:p-8 border border-white/5"
        >
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-white text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </m.div>

        <p className="text-[#888] text-sm text-center mt-8 leading-relaxed">
          Don&rsquo;t know every number? That&rsquo;s fine. We can establish the missing baselines together.
        </p>
      </div>
    </section>
  );
}
