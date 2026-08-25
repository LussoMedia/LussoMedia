'use client';

import { m } from 'framer-motion';
import { systemComponents } from '@/lib/config/systemComponents';

export default function DominanceSystemDiagram() {
  return (
    <section id="system" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">The System</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white">
            The Lusso Local Dominance System
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemComponents.map((c, i) => (
            <m.div
              key={c.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="card-hover bg-[#141414] border border-white/5 rounded-xl p-6"
            >
              <p className="font-[family-name:var(--font-space-grotesk)] text-[#008080] text-2xl font-bold mb-3">
                {c.number}
              </p>
              <h3 className="text-white font-semibold mb-2">{c.name}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{c.purpose}</p>
            </m.div>
          ))}
        </div>

        <p className="text-center mt-10">
          <a href="#system-details" className="text-[#008080] text-sm font-medium hover:text-[#00a8a8] transition-colors">
            See how each component works &darr;
          </a>
        </p>
      </div>
    </section>
  );
}
