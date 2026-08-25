'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { primaryCTA, secondaryCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

export default function FinalCTA() {
  return (
    <section id="contact" className="section-pad bg-[#111111] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]"
        >
          You Already Built the Reputation.
          <br />
          <span className="teal-gradient-text">Now Put a System Behind It.</span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#C5C6C7] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Find out where your local growth is leaking and what it would take to become the first
          choice in your market.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={primaryCTA.href}
            onClick={() => trackEvent('primary_cta_click', { location: 'final-cta' })}
            className="booking-btn booking-btn--primary text-base px-10 py-4"
          >
            {primaryCTA.label}
          </Link>
          <a
            href={secondaryCTA.href}
            onClick={() => trackEvent('secondary_cta_click', { location: 'final-cta' })}
            className="booking-btn booking-btn--ghost text-base px-8 py-4"
          >
            {secondaryCTA.label}
          </a>
        </m.div>
      </div>
    </section>
  );
}
