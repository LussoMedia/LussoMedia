'use client';

import { m } from 'framer-motion';

const phases = [
  {
    range: 'Days 1–7',
    name: 'Activate',
    items: ['Market analysis', 'Initial offer', 'First conversion path', 'First campaign'],
  },
  {
    range: 'Days 8–30',
    name: 'Install',
    items: ['Website system', 'Authority foundation', 'Reputation infrastructure', 'Tracking', 'Creative testing'],
  },
  {
    range: 'Days 31–60',
    name: 'Optimize',
    items: ['Lead quality', 'Offer response', 'Creative winners', 'Conversion rate', 'Campaign economics'],
  },
  {
    range: 'Days 61–90',
    name: 'Scale',
    items: ['Winning campaigns', 'Creative iteration', 'Additional opportunities', 'Baseline acquisition economics', 'Next growth priorities'],
  },
];

export default function NinetyDayRoadmap() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white">
            What the First 90 Days Look Like
          </h2>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {phases.map((phase, i) => (
            <m.div
              key={phase.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-6 relative"
            >
              <div className="w-2 h-2 rounded-full bg-[#008080] mb-4" />
              <p className="text-xs uppercase tracking-[0.1em] text-[#888] mb-1">{phase.range}</p>
              <h3 className="text-white font-semibold text-lg mb-4">{phase.name}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="text-[#C5C6C7] text-sm leading-snug flex gap-2">
                    <span className="text-[#008080] flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-[family-name:var(--font-space-grotesk)] text-white font-semibold mb-2">
            Month 4+ — Operate. Optimize. Expand.
          </p>
          <p className="text-[#888] text-sm max-w-xl mx-auto">
            Next service, next offer, additional service area, additional funnel, new acquisition
            channel, new landing pages, more creative, Google Search, retargeting, or reactivation
            campaigns — whichever moves the business forward next.
          </p>
        </m.div>
      </div>
    </section>
  );
}
