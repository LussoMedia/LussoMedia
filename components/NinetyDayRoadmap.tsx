'use client';

import { m } from 'framer-motion';

const phases = [
  {
    number: '01',
    range: 'Days 1–7',
    name: 'Activate',
    items: ['Market analysis', 'Initial offer', 'First conversion path', 'First campaign'],
  },
  {
    number: '02',
    range: 'Days 8–30',
    name: 'Install',
    items: ['Website system', 'Authority foundation', 'Reputation infrastructure', 'Tracking', 'Creative testing'],
  },
  {
    number: '03',
    range: 'Days 31–60',
    name: 'Optimize',
    items: ['Lead quality', 'Offer response', 'Creative winners', 'Conversion rate', 'Campaign economics'],
  },
  {
    number: '04',
    range: 'Days 61–90',
    name: 'Scale',
    items: ['Winning campaigns', 'Creative iteration', 'Additional opportunities', 'Baseline acquisition economics', 'Next growth priorities'],
  },
];

export default function NinetyDayRoadmap() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-section-heading text-white">
            What the First 90 Days Look Like
          </h2>
        </m.div>

        {/* Number-led editorial sequence — the period is a secondary label,
            not the headline (Part 29). */}
        <div>
          {phases.map((phase, i) => (
            <m.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid md:grid-cols-[5rem_10rem_1fr] gap-x-6 gap-y-3 py-8 border-b border-white/[0.08] first:pt-0"
            >
              <p className="font-[family-name:var(--font-display)] text-[#008080] text-3xl font-semibold tabular-nums">
                {phase.number}
              </p>
              <div>
                <h3 className="text-white font-semibold text-lg">{phase.name}</h3>
                <p className="text-xs uppercase tracking-[0.1em] text-[#888] mt-1">{phase.range}</p>
              </div>
              <ul className="space-y-1.5">
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
          className="mt-10 pt-8"
        >
          <p className="font-[family-name:var(--font-display)] text-white font-semibold mb-2">
            Month 4+ — Operate. Optimize. Expand.
          </p>
          <p className="text-[#888] text-sm prose-measure">
            Next service, next offer, additional service area, additional funnel, new acquisition
            channel, new landing pages, more creative, Google Search, retargeting, or reactivation
            campaigns — whichever moves the business forward next.
          </p>
        </m.div>
      </div>
    </section>
  );
}
