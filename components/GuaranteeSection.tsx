'use client';

import { m } from 'framer-motion';
import { activationGuarantee, performanceExtension } from '@/lib/config/guarantees';

export default function GuaranteeSection() {
  return (
    <section id="guarantee" className="section-pad bg-[#0D0D0D] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-section-heading text-white">
            We Put Our Skin in the Game Too.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <h3 className="text-white font-semibold text-lg mb-4">{activationGuarantee.title}</h3>
            <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">{activationGuarantee.description}</p>
            <p className="text-[#888] text-xs uppercase tracking-[0.1em] mb-2">Does not apply when delayed by</p>
            <ul className="space-y-1.5">
              {activationGuarantee.exclusions.map((item) => (
                <li key={item} className="text-[#888] text-xs flex gap-2">
                  <span className="flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <h3 className="text-white font-semibold text-lg mb-4">{performanceExtension.title}</h3>
            <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">{performanceExtension.description}</p>
            <ul className="space-y-1.5">
              {performanceExtension.disclaimers.map((item) => (
                <li key={item} className="text-[#888] text-xs flex gap-2">
                  <span className="flex-shrink-0">•</span>
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
