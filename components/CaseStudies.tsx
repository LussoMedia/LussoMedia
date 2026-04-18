'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityCaseStudy } from '@/types/sanity';

const fallback: SanityCaseStudy[] = [
  {
    _id: '1',
    client: 'Full Curl Landscaping',
    industry: 'Landscaping / Home Services',
    tag: 'Brand Authority',
    challenge: 'Little online presence in a competitive local market. Great work, but no one knew who they were outside of direct referrals.',
    built: 'Full brand identity through content — monthly shoot days, professional video, consistent posting across platforms, and a paid ad strategy targeting local homeowners.',
    result: 'Became locally recognized, booked out the entire following summer, and remain a continued partnership.',
  },
  {
    _id: '2',
    client: 'Hanshew Flight Instruction',
    industry: 'Aviation / Flight Training',
    tag: 'Lead Generation',
    challenge: 'Struggling to find new students. A niche service with no digital footprint meant potential students couldn\'t find them.',
    built: 'Strategic content system built around discoverability — SEO-aligned video content, social media presence, and targeted ads reaching aspiring pilots in the region.',
    result: 'Now fully booked months in advance and consistently found by new students through social media and Google.',
  },
];

const tagColors: Record<string, string> = {
  'Launch Campaign': 'bg-blue-900/30 text-blue-400 border-blue-800/30',
  'Lead Generation': 'bg-green-900/30 text-green-400 border-green-800/30',
  'Brand Authority': 'bg-purple-900/30 text-purple-400 border-purple-800/30',
  'Audience Growth': 'bg-orange-900/30 text-orange-400 border-orange-800/30',
};

interface Props {
  caseStudies?: SanityCaseStudy[] | null;
}

export default function CaseStudies({ caseStudies }: Props) {
  const items = (caseStudies && caseStudies.length > 0) ? caseStudies : fallback;

  return (
    <section id="case-studies" className="section-pad bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Our Work</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white">
            Real Businesses. Real Results.
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((cs, i) => (
            <motion.div
              key={cs._id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: (i % 2) * 0.1 }}
              className="card-hover bg-[#141414] rounded-xl overflow-hidden border border-white/5 flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-48 bg-[#1A1A1A] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                {cs.image?.asset ? (
                  <Image
                    src={urlFor(cs.image).width(800).height(400).url()}
                    alt={cs.client}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#008080]/10 to-transparent" />
                    <div className="text-center z-10">
                      <p className="text-[#555] text-xs uppercase tracking-widest mb-2">[ Add photo in Studio ]</p>
                      <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white/20">{cs.client}</p>
                    </div>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-8 flex flex-col gap-5 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">{cs.client}</h3>
                    <p className="text-[#888] text-sm mt-0.5">{cs.industry}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${tagColors[cs.tag] ?? 'bg-[#008080]/10 text-[#008080] border-[#008080]/25'}`}>
                    {cs.tag}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">The Challenge</p>
                    <p className="text-[#C5C6C7] leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[#888] uppercase tracking-[0.1em] text-xs mb-1.5">What We Built</p>
                    <p className="text-[#C5C6C7] leading-relaxed">{cs.built}</p>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 10l4-4 3 3 5-6" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#008080] text-sm font-semibold">{cs.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
