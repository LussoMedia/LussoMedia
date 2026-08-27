'use client';

import { m } from 'framer-motion';
import { goodFit, probablyNot } from '@/lib/config/playbook';

export default function PlaybookWhoItsFor() {
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
            Built for Established Home-Service Operators.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-6">Good Fit</p>
            <ul className="space-y-3.5">
              {goodFit.map((item) => (
                <li key={item} className="text-[#C5C6C7] text-sm leading-relaxed flex gap-2.5">
                  <span className="text-[#008080] flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6">Probably Not for You If</p>
            <ul className="space-y-3.5">
              {probablyNot.map((item) => (
                <li key={item} className="text-[#888] text-sm leading-relaxed flex gap-2.5">
                  <span className="text-[#555] flex-shrink-0">•</span>
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
