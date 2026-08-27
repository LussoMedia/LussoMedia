'use client';

import { m } from 'framer-motion';
import { bonuses, totalAdditionalValue } from '@/lib/config/bonuses';

export default function BonusStack() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            We Also Remove the Problems That Kill Good Marketing.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {bonuses.map((bonus, i) => (
            <m.div
              key={bonus.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-8 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-white font-semibold leading-snug">{bonus.name}</h3>
                <span className="text-[#008080] text-sm font-semibold whitespace-nowrap">{bonus.value}</span>
              </div>
              <p className="text-[#888] text-sm mb-5">{bonus.purpose}</p>
              <ul className="space-y-2 mb-5">
                {bonus.includes.map((item) => (
                  <li key={item} className="text-[#C5C6C7] text-sm flex gap-2">
                    <span className="text-[#008080] flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              {bonus.whyItMatters && (
                <p className="text-[#888] text-xs leading-relaxed mt-auto pt-4 border-t border-white/5">
                  {bonus.whyItMatters}
                </p>
              )}
            </m.div>
          ))}
        </div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center text-[#C5C6C7] text-sm"
        >
          Included at no additional cost — standard additional value: <span className="text-white font-semibold">{totalAdditionalValue}</span>
        </m.p>
      </div>
    </section>
  );
}
