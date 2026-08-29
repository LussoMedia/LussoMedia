'use client';

import { m } from 'framer-motion';
import ReviewLinks from './ReviewLinks';

export default function ReviewPrep() {
  return (
    <section className="section-pad bg-[#0D0D0D]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            In the Meantime, Here&rsquo;s the Most Useful Thing You Can Do.
          </h2>
          <div className="teal-divider mx-auto mb-6" />
          <p className="text-[#C5C6C7] leading-relaxed mb-12">
            Think about one service or project type you would most want to grow over the next 90 days. The
            strongest acquisition strategies usually start with one clear economic opportunity—not trying to
            market everything at once.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ReviewLinks placement="prep_block" />
        </m.div>
      </div>
    </section>
  );
}
