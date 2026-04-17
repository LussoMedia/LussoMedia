'use client';

import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

export default function FinalCTA() {
  return (
    <section id="contact" className="section-pad bg-[#111111] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#008080]/12 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#008080]/30 bg-[#008080]/10 text-[#008080] text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
          Free 45-Minute Strategy Call
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]"
        >
          Ready for Your Brand to
          <br />
          <span className="teal-gradient-text">Match Your Business?</span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-lg text-[#C5C6C7] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Book a free 45-minute strategy call. We'll audit your current brand presence and
          show you exactly what we'd build — and what it would do for your business.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-5"
        >
          <BookingButton label="Book My Free Strategy Call" variant="primary" className="text-base px-10 py-4" />
          <p className="text-[#888] text-sm">No pitch deck. No pressure. Just clarity.</p>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: '✓', text: 'No long-term contracts after Month 3' },
            { icon: '✓', text: 'One shoot day. We handle the rest.' },
            { icon: '✓', text: 'Results-driven — we report every month' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#008080] font-bold">{item.icon}</span>
              <span className="text-[#C5C6C7] text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
