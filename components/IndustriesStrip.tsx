'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { industries } from '@/lib/config/industries';

export default function IndustriesStrip() {
  return (
    <section id="industries" className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Industries</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white">
            Built for Established Home-Service Contractors
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/${industry.slug}`}
              className="px-5 py-3 rounded-lg bg-[#141414] border border-white/10 text-[#C5C6C7] text-sm font-medium hover:border-[#008080]/50 hover:text-white transition-all duration-200"
            >
              {industry.name}
            </Link>
          ))}
        </m.div>

        <p className="text-[#666] text-xs mt-8 max-w-lg mx-auto">
          Also open to adjacent, high-value home-service businesses with profitable,
          project-based, or recurring revenue.
        </p>
      </div>
    </section>
  );
}
