'use client';

import { m } from 'framer-motion';
import PlaybookForm from './PlaybookForm';

// The primary conversion section (Part 4, Section 08) — visually prominent
// after value has already been demonstrated by every section above it.
export default function PlaybookEmailCapture() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Get the Complete Playbook</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Build the System Before You Scale the Traffic.
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed mb-10">
            Enter your name and email and we&rsquo;ll send you the complete 90-Day Home Service
            Lead-to-Booked-Job Playbook.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <PlaybookForm />
        </m.div>
      </div>
    </section>
  );
}
