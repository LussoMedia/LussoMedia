'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { industries, industryQualifierLabel } from '@/lib/config/industries';
import { primaryCTA, secondaryCTA, scoreCTA } from '@/lib/config/navigation';
import { trackEvent } from '@/lib/analytics';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function fadeUp(delay: number = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-[#008080]/5 blur-[100px] pointer-events-none" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#C5C6C7 1px, transparent 1px), linear-gradient(90deg, #C5C6C7 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 md:pt-0">
        {/* Eyebrow — restrained label, not a heavy SaaS pill (Part 5/56) */}
        <m.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 mb-8 text-eyebrow text-[#008080]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
          Built for Established Home Service Contractors
        </m.div>

        {/* Headline — typography alone creates the impact; no gradient text (Part 19) */}
        <m.h1
          {...fadeUp(0.1)}
          className="text-hero text-white mb-6"
        >
          Become the <span className="text-[#00a8a8]">First Call</span> in Your Local Market.
        </m.h1>

        {/* Primary supporting copy — dream outcome + reduced owner effort,
            before the mechanism (Change 1: outcome first, systems list
            second, not the other way around). Width constrained to a
            readable measure rather than a full-bleed paragraph (Part 7). */}
        <m.p
          {...fadeUp(0.2)}
          className="text-body-lg text-[#C5C6C7] prose-measure mx-auto mb-4"
        >
          Turn the reputation you&rsquo;ve already built into a predictable flow of qualified
          opportunities — without hiring an internal marketing team or managing five different
          vendors.
        </m.p>

        {/* Mechanism — smaller, secondary paragraph */}
        <m.p
          {...fadeUp(0.25)}
          className="text-body text-[#888] prose-measure mx-auto mb-10"
        >
          The Local Dominance System installs and operates the offers, conversion infrastructure,
          content, advertising, reputation, and tracking required to turn local attention into
          measurable growth.
        </m.p>

        {/* CTAs */}
        <m.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={primaryCTA.href}
            onClick={() => trackEvent('primary_cta_click', { location: 'hero' })}
            className="booking-btn booking-btn--primary text-base px-8 py-4"
          >
            See If Your Market Qualifies
          </Link>
          <Link
            href={scoreCTA.href}
            onClick={() => trackEvent('dominance_score_cta_click', { placement: 'hero' })}
            className="booking-btn booking-btn--ghost text-base px-8 py-4 flex items-center gap-2"
          >
            Take the 2-Minute Local Dominance Score
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </m.div>

        {/* Qualification microcopy + tertiary results link — the ghost CTA
            above already spells out the score's name/length, so the old
            separate "2-Minute Local Dominance Score" microcopy line here
            would just repeat it verbatim; dropped. */}
        <m.p
          {...fadeUp(0.4)}
          className="mt-6 text-sm text-[#888] tracking-wide"
        >
          {industries.map((i) => i.name).join(' • ')} • {industryQualifierLabel}
        </m.p>
        <m.p {...fadeUp(0.45)} className="mt-3 text-sm">
          <a
            href={secondaryCTA.href}
            onClick={() => trackEvent('secondary_cta_click', { location: 'hero' })}
            className="text-[#888] hover:text-[#008080] underline underline-offset-2 transition-colors"
          >
            {secondaryCTA.label}
          </a>
        </m.p>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs text-[#888] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#888] to-transparent" />
      </m.div>
    </section>
  );
}
