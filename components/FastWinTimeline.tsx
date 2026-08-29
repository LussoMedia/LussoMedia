'use client';

import { m } from 'framer-motion';

const traditional = [
  'Week 1 — Onboarding',
  'Week 2 — Strategy',
  'Week 3 — Creative',
  'Week 4 — Approvals',
  'Week 5 — Maybe launch',
];

const activation = [
  { range: 'Days 1–2', label: 'Market diagnosis + initial offer recommendation' },
  { range: 'Days 2–4', label: 'Conversion path + tracking + initial creative' },
  { range: 'Days 4–7', label: 'Initial acquisition campaign launched' },
];

export default function FastWinTimeline() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-section-heading text-white">
            Your Marketing Shouldn&rsquo;t Take 30 Days Just to Start.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6">Traditional Agency Onboarding</p>
            <ul className="space-y-4">
              {traditional.map((step) => (
                <li key={step} className="text-[#888] text-sm">{step}</li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-6">7-Day Market Activation</p>
            <ul className="space-y-5">
              {activation.map((step) => (
                <li key={step.range}>
                  <p className="text-white font-semibold text-sm mb-1">{step.range}</p>
                  <p className="text-[#C5C6C7] text-sm leading-relaxed">{step.label}</p>
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-body-lg text-[#C5C6C7] prose-measure mt-10"
        >
          We build the larger Local Dominance infrastructure in parallel. You don&rsquo;t have to
          wait for every long-term asset to be finished before we begin collecting real market
          feedback.
        </m.p>
      </div>
    </section>
  );
}
