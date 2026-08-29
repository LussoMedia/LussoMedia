'use client';

import { m } from 'framer-motion';

const fragments = [
  { from: 'Ads', to: 'a weak generic homepage' },
  { from: 'Content', to: 'no compelling offer' },
  { from: 'Website', to: 'a generic "Contact Us" CTA' },
  { from: 'Leads', to: 'inconsistent follow-up' },
  { from: 'Agency reporting', to: 'clicks, impressions, followers' },
];

const dominanceFlow = [
  'Offer',
  'Conversion Infrastructure',
  'Authority',
  'Demand',
  'Qualified Opportunities',
  'Revenue Data',
  'Optimization',
];

export default function FragmentedMarketing() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16 max-w-2xl"
        >
          <h2 className="text-section-heading text-white">
            You Don&rsquo;t Need More Random Marketing.
            <br className="hidden md:block" /> You Need the Pieces to Work Together.
          </h2>
          <p className="text-body-lg text-[#C5C6C7] mt-5 prose-measure">
            Most agencies sell one piece of the customer-acquisition process. The Local Dominance
            System connects the pieces so each part makes the next one more effective.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Fragmented model */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-eyebrow text-[#888] mb-5">Fragmented</p>
            <div className="space-y-0">
              {fragments.map((f, i) => (
                <div key={f.from} className={`py-4 ${i > 0 ? 'border-t border-white/[0.08]' : ''}`}>
                  <p className="text-white font-semibold text-sm">{f.from}</p>
                  <p className="text-[#888] text-sm mt-1">&rarr; {f.to}</p>
                </div>
              ))}
            </div>
          </m.div>

          {/* Dominance flow */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-eyebrow text-[#008080] mb-5">The Lusso Approach</p>
            <div className="space-y-0">
              {dominanceFlow.map((step, i) => (
                <div
                  key={step}
                  className={`py-4 flex items-center gap-3 ${i > 0 ? 'border-t border-white/[0.08]' : ''}`}
                >
                  <span className="text-white font-semibold text-sm">{step}</span>
                  {i < dominanceFlow.length - 1 && (
                    <span className="ml-auto text-[#008080]" aria-hidden="true">&darr;</span>
                  )}
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
