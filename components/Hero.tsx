'use client';

import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-[#008080]/5 blur-[100px] pointer-events-none" />
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#008080]/30 bg-[#008080]/10 text-[#008080] text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
          Done-for-You Strategic Content Partnership
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
        >
          Your Business Is Good.
          <br />
          <span className="teal-gradient-text">Your Brand Should Show It.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-xl text-[#C5C6C7] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Lusso Media is a done-for-you content and ad partnership for service businesses
          that are serious about growth. Strategy, production, and paid ads — all handled.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <BookingButton label="Book a Free Strategy Call" variant="primary" className="text-base px-8 py-4" />
          <a
            href="#case-studies"
            className="booking-btn booking-btn--ghost text-base px-8 py-4 flex items-center gap-2"
          >
            See Our Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          {...fadeUp(0.45)}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { label: 'Local Businesses Served', value: '15+' },
            { label: 'Videos Produced', value: '200+' },
            { label: '3-Month Minimum', value: 'Real Results' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-sm text-[#C5C6C7] mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#888] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#888] to-transparent" />
      </motion.div>
    </section>
  );
}
