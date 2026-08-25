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
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            You Don&rsquo;t Need More Random Marketing.
            <br />
            You Need the Pieces to Work Together.
          </h2>
        </m.div>

        {/* Fragmented model */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10"
        >
          {fragments.map((f) => (
            <div key={f.from} className="bg-[#141414] border border-white/5 rounded-lg p-5 text-center">
              <p className="text-white font-semibold text-sm mb-2">{f.from}</p>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mx-auto mb-2 text-[#555]">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[#888] text-xs leading-snug">{f.to}</p>
            </div>
          ))}
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center text-[#C5C6C7] max-w-2xl mx-auto mb-14"
        >
          Most agencies sell one piece of the customer-acquisition process. The Local Dominance
          System connects the pieces so each part makes the next one more effective.
        </m.p>

        {/* Dominance flow */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-6 text-center">
            The Lusso Approach
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {dominanceFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-[#008080]/10 border border-[#008080]/30 text-white text-sm font-medium whitespace-nowrap">
                  {step}
                </span>
                {i < dominanceFlow.length - 1 && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#008080] flex-shrink-0">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
