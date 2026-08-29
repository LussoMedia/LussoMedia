'use client';

import { m } from 'framer-motion';

const items = [
  { title: 'Market Opportunity', description: 'Is there meaningful demand for the service you want to grow?' },
  { title: 'Service Economics', description: 'Can the average ticket and margin support customer acquisition?' },
  { title: 'Capacity', description: 'Can the business actually handle additional work?' },
  { title: 'Lead Handling', description: 'Is someone responsible for responding, estimating, and following up?' },
  {
    title: 'Growth Fit',
    description: 'Is the Local Dominance System the right next move—or would another step make more sense first?',
  },
];

export default function ReviewWhatWeCheck() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 max-w-2xl mx-auto"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6">
            What We&rsquo;re Looking At
          </h2>
          <div className="teal-divider mx-auto mb-6" />
          <p className="text-[#C5C6C7] leading-relaxed">
            We aren&rsquo;t judging whether your business is &ldquo;good enough.&rdquo; We&rsquo;re looking at whether
            the economics, capacity, and market opportunity make the Local Dominance System a rational growth
            investment.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {items.map((item, i) => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover bg-[#141414] rounded-xl p-6 border border-white/5"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-[#C5C6C7] text-sm leading-relaxed">{item.description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
