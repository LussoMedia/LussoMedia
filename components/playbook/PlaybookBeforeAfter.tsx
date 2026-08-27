'use client';

import { m } from 'framer-motion';
import { beforeAfter } from '@/lib/config/playbook';

// Restrained two-column comparison — no red/green gimmicks (Part 4, Section
// 03), just a muted "before" card and a teal-accented "after" card, matching
// the pattern already established in FastWinTimeline.tsx.
export default function PlaybookBeforeAfter() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            What Changes When the Process Is Defined.
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
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6">Before</p>
            <ul className="space-y-4">
              {beforeAfter.before.map((item) => (
                <li key={item} className="text-[#888] text-sm leading-relaxed flex gap-2.5">
                  <span className="text-[#555] flex-shrink-0">•</span>
                  {item}
                </li>
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
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-6">After</p>
            <ul className="space-y-4">
              {beforeAfter.after.map((item) => (
                <li key={item} className="text-[#C5C6C7] text-sm leading-relaxed flex gap-2.5">
                  <span className="text-[#008080] flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </div>
    </section>
  );
}
