'use client';

import { m } from 'framer-motion';
import { valueStack } from '@/lib/config/playbook';

export default function PlaybookValueStack() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">What You Can Actually Use</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white mb-6">
            More Than Marketing Advice.
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed">
            The playbook is built around implementation: scripts, workflows, visual systems,
            checklists, and operating standards you can put into the business.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {valueStack.map((category, i) => (
            <m.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="bg-[#141414] border border-white/5 rounded-xl p-6"
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-[0.08em]">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-[#C5C6C7] leading-relaxed mb-3">
            This is the DIY version of the same lead-conversion foundation Lusso uses when helping
            contractors build stronger lead-handling systems.
          </p>
          <p className="text-[#888] text-sm leading-relaxed">
            Use the playbook internally, assign it to the person responsible for incoming
            opportunities, and work through the 90-day implementation sequence at your own pace.
          </p>
        </m.div>
      </div>
    </section>
  );
}
