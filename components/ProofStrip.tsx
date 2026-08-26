'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { caseStudies } from '@/lib/config/caseStudies';

export default function ProofStrip() {
  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Real Businesses</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
            Built Around Business Results. Not Vanity Metrics.
          </h2>
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <m.div
              key={cs.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden flex flex-col"
            >
              {cs.heroImage && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={cs.heroImage.src}
                    alt={cs.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>
              )}
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-2">{cs.industry}</p>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-4">
                  {cs.client}
                </h3>
                <p className="text-[#C5C6C7] text-sm leading-relaxed">{cs.outcome}</p>
              </div>
            </m.div>
          ))}
        </div>

        <p className="text-center text-[#666] text-xs max-w-2xl mx-auto mt-8">
          Results reflect a partnership over time, not a guarantee — see the{' '}
          <a href="#results" className="underline hover:text-[#888]">full case studies</a> below.
        </p>
      </div>
    </section>
  );
}
