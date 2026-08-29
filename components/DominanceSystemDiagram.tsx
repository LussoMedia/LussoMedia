'use client';

import { m } from 'framer-motion';
import { systemComponents } from '@/lib/config/systemComponents';

export default function DominanceSystemDiagram() {
  return (
    <section id="system" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16 max-w-2xl"
        >
          <p className="text-eyebrow text-[#008080] mb-4">The System</p>
          <h2 className="text-section-heading text-white">
            The Lusso Local Dominance System
          </h2>
        </m.div>

        {/* Editorial numbered sequence, not seven identical cards (Part 26/56) */}
        <div>
          {systemComponents.map((c, i) => (
            <m.div
              key={c.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_1fr] gap-x-6 gap-y-2 py-7 border-b border-white/[0.08] first:pt-0"
            >
              <p className="font-[family-name:var(--font-display)] text-[#008080] text-3xl font-semibold tabular-nums">
                {c.number}
              </p>
              <h3 className="text-white text-lg font-semibold self-center">{c.name}</h3>
              <p className="col-span-2 md:col-span-1 text-[#888] text-sm leading-relaxed md:self-center">
                {c.purpose}
              </p>
            </m.div>
          ))}
        </div>

        <p className="mt-10">
          <a href="#system-details" className="text-[#008080] text-sm font-medium hover:text-[#00a8a8] transition-colors">
            See how each component works &darr;
          </a>
        </p>
      </div>
    </section>
  );
}
