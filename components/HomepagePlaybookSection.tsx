'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { scoreCTA } from '@/lib/config/navigation';
import { playbook } from '@/lib/config/playbook';

// Secondary-resource section for homepage visitors who are interested but
// not ready to apply (Part 6). Deliberately does not compete with or
// replace the primary Local Dominance Plan CTA elsewhere on the page.
export default function HomepagePlaybookSection() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Start With the System</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6">
            Not Ready for a Growth Plan Yet?
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed max-w-xl mx-auto">
            Use one of these tools to understand where your current growth system needs attention.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 gap-6">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={scoreCTA.href}
              onClick={() => trackEvent('dominance_score_cta_click', { placement: 'homepage_playbook_section' })}
              className="card-hover block h-full bg-[#141414] border border-white/5 rounded-xl p-8"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-4">Diagnose the System</p>
              <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{scoreCTA.microcopy}</h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                Find the biggest constraint across visibility, conversion, reputation, demand, lead
                handling, and measurement.
              </p>
              <span className="text-[#008080] text-sm font-medium">Take the Score →</span>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href={playbook.href}
              onClick={() => trackEvent('homepage_playbook_clicked', { placement: 'homepage_playbook_section' })}
              className="card-hover block h-full bg-[#141414] border border-white/5 rounded-xl p-8"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-4">Improve Lead Conversion</p>
              <h3 className="text-white font-semibold text-lg mb-3 leading-snug">{playbook.shortTitle}</h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                Build the systems for capturing, qualifying, following up with, and converting more
                local opportunities.
              </p>
              <span className="text-[#008080] text-sm font-medium">Get the Playbook →</span>
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  );
}
