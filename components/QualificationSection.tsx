'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { strongFit, probablyNotFit } from '@/lib/config/qualification';
import { trackEvent } from '@/lib/analytics';

export default function QualificationSection() {
  return (
    <section id="qualify" className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white leading-tight">
            The Local Dominance System Isn&rsquo;t Built for Every Contractor.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-5">Strong Fit</p>
            <ul className="space-y-3">
              {strongFit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <span className="text-[#008080] flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-5">Probably Not a Fit</p>
            <ul className="space-y-3">
              {probablyNotFit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#888] text-sm">
                  <span className="flex-shrink-0 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
        >
          <Link
            href="/apply"
            onClick={() => trackEvent('primary_cta_click', { location: 'qualification' })}
            className="booking-btn booking-btn--primary text-base px-8 py-4 inline-block"
          >
            See If Your Business Qualifies
          </Link>
          <p className="text-[#888] text-sm mt-5">
            Not sure yet?{' '}
            <Link href="/local-dominance-score" className="text-[#008080] hover:text-[#00a8a8] underline">
              Get your free Local Dominance Score
            </Link>{' '}
            first.
          </p>
        </m.div>
      </div>
    </section>
  );
}
