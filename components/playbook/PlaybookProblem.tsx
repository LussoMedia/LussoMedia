'use client';

import { m } from 'framer-motion';
import { brokenPath, systemPath } from '@/lib/config/playbook';

function FlowColumn({
  title,
  steps,
  variant,
}: {
  title: string;
  steps: { label: string }[];
  variant: 'broken' | 'system';
}) {
  const isBroken = variant === 'broken';
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`rounded-xl p-6 md:p-8 border ${
        isBroken ? 'bg-[#141414] border-white/5' : 'bg-[#141414] border-[#008080]/30'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-[0.15em] mb-6 ${
          isBroken ? 'text-[#888]' : 'text-[#008080]'
        }`}
      >
        {title}
      </p>
      <ol className="flex flex-col">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col items-start">
            <span
              className={`text-sm leading-snug py-1.5 ${
                isBroken ? 'text-[#888]' : 'text-white font-medium'
              }`}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className={`text-sm pl-0.5 ${isBroken ? 'text-[#444]' : 'text-[#008080]/50'}`} aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </m.div>
  );
}

export default function PlaybookProblem() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">
            THE LEAD PROBLEM MOST CONTRACTORS MISS
          </p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            More Leads Won&rsquo;t Fix a Broken Lead Process.
          </h2>
          <p className="text-[#C5C6C7] leading-relaxed">
            If opportunities are being lost between the form submission and the booked job,
            increasing traffic simply sends more leads into the same broken process.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          <FlowColumn title="Broken Path" steps={brokenPath} variant="broken" />
          <FlowColumn title="System Path" steps={systemPath} variant="system" />
        </div>
      </div>
    </section>
  );
}
