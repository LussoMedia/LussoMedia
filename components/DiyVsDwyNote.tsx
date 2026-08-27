'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import { playbook } from '@/lib/config/playbook';

// Concise DIY vs. DWY distinction (Part 8 of the playbook-funnel brief) —
// sits directly under BonusStack so the Conversion Intensive bonus above it
// is never mistaken for the same deliverable as the public playbook.
// Deliberately small: one sentence per side, not a second sales pitch.
export default function DiyVsDwyNote() {
  return (
    <section className="bg-[#0D0D0D] py-12 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <Link
            href={playbook.href}
            onClick={() => trackEvent('homepage_playbook_clicked', { placement: 'diy_vs_dwy_note' })}
            className="card-hover bg-[#141414] border border-white/5 rounded-xl p-5"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-2">The Playbook — DIY</p>
            <p className="text-[#C5C6C7] text-sm leading-relaxed">
              Frameworks, scripts, workflows, and the 90-day implementation system.
            </p>
          </Link>

          <div className="bg-[#141414] border border-[#008080]/25 rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-2">
              The Conversion Intensive — Done With You
            </p>
            <p className="text-[#C5C6C7] text-sm leading-relaxed">
              Personalized adaptation, deeper buyer psychology, sales behavior, objection handling,
              and training for the person responsible for converting incoming opportunities.
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
