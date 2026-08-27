'use client';

import { m } from 'framer-motion';

interface TimelineStep {
  number: string;
  title: string;
  status?: 'Complete' | 'Next';
  description: string;
}

const steps: TimelineStep[] = [
  {
    number: '01',
    title: 'Application Received',
    status: 'Complete',
    description: "We've received the information you submitted.",
  },
  {
    number: '02',
    title: 'Fit Review',
    status: 'Next',
    description: 'We review your business, service economics, market, capacity, and current growth constraints.',
  },
  {
    number: '03',
    title: 'Recommended Next Step',
    description:
      "If there's a fit, we'll invite you to review your Local Dominance Plan. If we need more context first, we'll reach out with specific questions.",
  },
];

export default function ReviewTimeline() {
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
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white">
            What Happens Next
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </m.div>

        {/* Horizontal on desktop, vertical sequence on mobile */}
        <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-4">
          {steps.map((step, i) => (
            <m.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex md:flex-col gap-4 md:gap-0 flex-1 pb-10 md:pb-0"
            >
              {/* Connector */}
              {i < steps.length - 1 && (
                <>
                  {/* mobile: vertical line */}
                  <span className="md:hidden absolute left-[19px] top-10 bottom-0 w-px bg-white/10" aria-hidden="true" />
                  {/* desktop: horizontal line */}
                  <span
                    className="hidden md:block absolute top-5 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-white/10"
                    aria-hidden="true"
                  />
                </>
              )}

              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center text-xs font-semibold font-[family-name:var(--font-space-grotesk)] ${
                  step.status === 'Complete'
                    ? 'border-[#008080] bg-[#008080] text-white'
                    : 'border-[#008080]/40 bg-[#141414] text-[#008080]'
                }`}
              >
                {step.status === 'Complete' ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              <div className="md:text-center md:mt-5">
                {step.status && (
                  <p
                    className={`text-[11px] uppercase tracking-[0.15em] font-semibold mb-1.5 ${
                      step.status === 'Complete' ? 'text-[#008080]' : 'text-[#00a8a8]'
                    }`}
                  >
                    {step.status}
                  </p>
                )}
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-[#C5C6C7] text-sm leading-relaxed md:max-w-[240px] md:mx-auto">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
