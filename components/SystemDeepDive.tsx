'use client';

import { m } from 'framer-motion';
import { systemComponents } from '@/lib/config/systemComponents';
import ObjectionNote from './ObjectionNote';
import ScoreContextCTA from './ScoreContextCTA';

interface Props {
  page?: string;
}

export default function SystemDeepDive({ page = 'system' }: Props) {
  return (
    <section id="system-details" className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white">
            One System Built Around the Entire Customer Journey.
          </h2>
        </m.div>

        <div className="flex flex-col gap-4">
          {systemComponents.map((c, i) => (
            <m.div
              key={c.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-8"
            >
              <div className="flex items-start gap-5">
                <span className="font-[family-name:var(--font-space-grotesk)] text-[#008080] text-2xl font-bold flex-shrink-0 mt-0.5">
                  {c.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-3">{c.name}</h3>

                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">Problem</p>
                      <p className="text-[#C5C6C7] leading-relaxed">{c.problem}</p>
                    </div>
                    <div>
                      <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">What Lusso Installs</p>
                      <ul className="text-[#C5C6C7] leading-relaxed space-y-1">
                        {c.installs.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-[#008080] flex-shrink-0">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">Why It Matters</p>
                      <p className="text-[#C5C6C7] leading-relaxed">{c.whyItMatters}</p>
                    </div>
                  </div>

                  {c.objection && (
                    <ObjectionNote
                      question={c.objection.question}
                      answer={c.objection.answer}
                      objectionType={c.name}
                      page={page}
                      section={`component-${c.number}`}
                    />
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <div className="mt-14 pt-14 border-t border-white/5">
          <ScoreContextCTA
            eyebrow="Which Part of Your Growth System Is Weakest?"
            supporting="The Local Dominance Score helps identify where your current system is strongest and where opportunities may be leaking."
            ctaLabel="Find My Biggest Growth Leak"
            placement="system_section"
          />
        </div>
      </div>
    </section>
  );
}
