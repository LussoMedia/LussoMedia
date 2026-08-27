'use client';

import { m } from 'framer-motion';
import { playbookSystems } from '@/lib/config/playbook';

// Same numbered-card visual language as DominanceSystemDiagram.tsx — large
// teal numeral, name, short purpose — so this reads as part of the same
// design system rather than a bespoke lead-magnet template.
export default function PlaybookFiveSystems() {
  return (
    <section id="inside-the-playbook" className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Inside the Playbook</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white">
            Five Systems That Work Together.
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {playbookSystems.map((s, i) => (
            <m.div
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="card-hover bg-[#141414] border border-white/5 rounded-xl p-6"
            >
              <p className="font-[family-name:var(--font-space-grotesk)] text-[#008080] text-2xl font-bold mb-3">
                {s.number}
              </p>
              <h3 className="text-white font-semibold mb-2 leading-snug">{s.name}</h3>
              <p className="text-[#888] text-sm leading-relaxed">{s.description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
