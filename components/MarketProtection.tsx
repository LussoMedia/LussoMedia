'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { primaryCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

// Change 3 — real scarcity, not fake urgency. Deliberately does NOT promise
// unbounded exclusivity ("only one contractor per city/state") — the
// territory itself is defined per-partner based on service area, trade, and
// competitive overlap once an agreement is in place, so the public copy
// stays scoped to what the agreement can actually support.
export default function MarketProtection() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Market Protection</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            We don&rsquo;t build the same acquisition system for direct competitors inside the
            same protected service territory.
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed mb-4">
            When a Local Dominance partner is accepted, we define their protected market based on
            service area, trade, and competitive overlap. While that agreement remains active,
            Lusso Media will not install the Local Dominance System for a direct competitor inside
            that protected territory.
          </p>
          <p className="text-[#666] text-xs leading-relaxed mb-10">
            Market protection is subject to geography, service category, operating capacity, and
            agreement terms.
          </p>
          <Link
            href={primaryCTA.href}
            onClick={() => trackEvent('market_protection_apply_click')}
            className="booking-btn booking-btn--primary text-base px-8 py-4 inline-block"
          >
            Check Market Availability
          </Link>
        </m.div>
      </div>
    </section>
  );
}
