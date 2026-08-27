'use client';

import { useEffect } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import { playbook } from '@/lib/config/playbook';

// Hero deliberately does not show the email form (Part 4, Section 01) — the
// funnel demonstrates value first via "See What's Inside", which smooth
// -scrolls to the problem/value sections rather than jumping straight to
// conversion.
export default function PlaybookHero() {
  useEffect(() => {
    trackEvent('playbook_landing_view');
  }, []);

  const handleSeeInside = () => {
    trackEvent('playbook_see_inside_clicked', { placement: 'hero' });
    document.getElementById('inside-the-playbook')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden grain-overlay">
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">{playbook.eyebrow}</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-5 leading-[1.08]">
              {playbook.title}
            </h1>
            <p className="text-white text-lg font-semibold mb-4 leading-snug">{playbook.subtitle}</p>
            <p className="text-[#C5C6C7] text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              A practical operating system for established home-service contractors who want to
              capture, qualify, follow up with, and convert more of the opportunities they&rsquo;re
              already generating.
            </p>

            <button
              onClick={handleSeeInside}
              className="booking-btn booking-btn--primary text-base px-8 py-4 inline-block"
            >
              See What&rsquo;s Inside ↓
            </button>

            <p className="text-[#666] text-xs mt-6 leading-relaxed">{playbook.microValueLine}</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[260px] sm:w-[320px]">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-[#008080]/15 blur-sm" aria-hidden="true" />
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={playbook.coverImage}
                  alt="The Home Service Lead Engine — 90-day playbook cover"
                  width={1000}
                  height={1294}
                  priority
                  sizes="(max-width: 640px) 260px, 320px"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
