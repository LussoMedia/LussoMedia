'use client';

import { m } from 'framer-motion';
import { activationGuarantee } from '@/lib/config/guarantees';
import { trackEvent } from '@/lib/analytics';

// Compact early risk-reversal signal (Change 2) — surfaces the 7-Day Market
// Activation Guarantee right after the first proof section instead of
// making a visitor scroll all the way to GuaranteeSection to encounter it.
// Deliberately restrained: a single callout row, not the full guarantee
// card with its exclusions list — that detail stays in GuaranteeSection,
// which this anchors down to.
export default function EarlyGuarantee() {
  return (
    <section className="bg-[#0D0D0D] py-10 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 rounded-xl border border-[#008080]/30 bg-[#141414] px-6 py-5 sm:px-8"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#008080]/15 border border-[#008080]/30 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l6.5 2.6v4.9c0 4.2-2.8 7.9-6.5 9.2-3.7-1.3-6.5-5-6.5-9.2V4.6L10 2z" stroke="#008080" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M7 10l2 2 4-4.5" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="text-center sm:text-left flex-1">
            <p className="text-white font-semibold mb-1">{activationGuarantee.title}</p>
            <p className="text-[#888] text-sm leading-relaxed">
              Once required access and inputs are received, your first acquisition campaign
              launches within 7 business days. If a delay is caused by Lusso Media, we apply a
              $1,500 service credit toward your next invoice.
            </p>
          </div>

          <a
            href="#guarantee"
            onClick={() => trackEvent('guarantee_terms_click', { placement: 'early_trust_element' })}
            className="flex-shrink-0 text-[#008080] text-sm font-medium hover:text-[#00a8a8] transition-colors whitespace-nowrap"
          >
            See guarantee terms ↓
          </a>
        </m.div>
      </div>
    </section>
  );
}
