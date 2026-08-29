'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { playbook } from '@/lib/config/playbook';
import { scoreCTA } from '@/lib/config/navigation';

// Immediate in-browser download — never makes the visitor wait for email
// delivery (Part 5). The `download` attribute forces a save rather than a
// navigation, matching "Download the Playbook ↓".
export default function PlaybookThankYou() {
  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden grain-overlay">
        <div className="absolute inset-0 bg-[#0D0D0D]">
          <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
        </div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-xl mx-auto px-6 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Your Playbook Is Ready</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,5vw,2.75rem)] font-bold text-white mb-6 leading-[1.15]">
            Start With the System.
          </h1>
          <p className="text-[#C5C6C7] leading-relaxed mb-10">
            Use the playbook to audit your current lead process, identify the biggest gaps, and
            begin installing the system one piece at a time.
          </p>
          <a
            href={playbook.pdfPath}
            download={playbook.pdfFilename}
            onClick={() => trackEvent('playbook_download_clicked', { placement: 'thank_you_hero' })}
            className="booking-btn booking-btn--primary text-base px-10 py-4 inline-block"
          >
            Download the Playbook ↓
          </a>
        </m.div>
      </section>

      <section className="section-pad bg-[#111111] border-y border-white/5">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto px-6 text-center"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Know Where to Start</p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            Which Part of Your Growth System Needs Attention First?
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed mb-3">
            The playbook focuses heavily on the path from lead to booked job. The Local Dominance
            Score looks at the broader system around it.
          </p>
          <p className="text-[#888] text-sm leading-relaxed mb-8">
            See how your business stacks up across visibility, conversion, reputation, demand, lead
            handling, and measurement.
          </p>
          <Link
            href={scoreCTA.href}
            onClick={() => trackEvent('playbook_score_cta_clicked', { placement: 'thank_you' })}
            className="booking-btn booking-btn--ghost text-base px-8 py-4 inline-block"
          >
            Find My Biggest Growth Constraint →
          </Link>
        </m.div>
      </section>
    </>
  );
}
