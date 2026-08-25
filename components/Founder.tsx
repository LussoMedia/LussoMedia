'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityFounder } from '@/types/sanity';

// NOTE: prior fallback content here included unverified vanity stats
// ("500+ Clients Served," "2,000+ Videos Produced") — removed per Part 25.
// Replace with real, verifiable figures once available.
const defaultStats = [
  { value: 'Owner-Led', label: 'Direct access, not account managers' },
  { value: 'Southern Utah', label: 'Based here, working nationwide' },
  { value: 'Biweekly', label: 'Strategy cadence with every client' },
];

const defaultBio = [
  "Lusso Media was built in Southern Utah by Peter, after years watching strong local contractors get outpaced online by competitors with a fraction of their real-world reputation.",
  "The Local Dominance System exists because fragmented marketing — a video here, an ad there, a website nobody converts on — doesn't move the needle for an established operator. A connected system does.",
  "We work directly with owner-operators who already do great work and are ready to fund a real customer-acquisition system, not another one-off marketing project.",
];

interface Props {
  founder?: SanityFounder | null;
}

export default function Founder({ founder }: Props) {
  const photo = founder?.photo;
  const bio = (founder?.bio && founder.bio.length > 0) ? founder.bio : defaultBio;
  const stats = (founder?.stats && founder.stats.length > 0) ? founder.stats : defaultStats;

  return (
    <section id="about" className="section-pad bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image column */}
          <m.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#1A1A1A] border border-white/5">
              {photo?.asset ? (
                <Image
                  src={urlFor(photo).width(800).height(1000).url()}
                  alt="Pete — Founder, Lusso Media"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#008080]/20 border border-[#008080]/30 flex items-center justify-center mb-4">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="12" r="6" stroke="#008080" strokeWidth="1.5" />
                      <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#008080" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-[#555] text-sm">Upload photo in Studio</p>
                  <p className="text-[#444] text-xs mt-1">Founder → Photo</p>
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl border border-[#008080]/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-[#141414] border border-[#008080]/30 rounded-xl px-5 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
                <div>
                  <p className="text-white text-sm font-semibold font-[family-name:var(--font-space-grotesk)]">Based in Southern Utah</p>
                  <p className="text-[#888] text-xs">Serving Businesses Nationwide</p>
                </div>
              </div>
            </div>
          </m.div>

          {/* Content column */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">About</p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.05]">
              A Growth Partner
              <br />
              Who Actually Shows Up.
            </h2>

            <div className="flex flex-col gap-5 text-[#C5C6C7] leading-relaxed mb-10">
              {bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-[#888] text-xs leading-snug">{stat.label}</p>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
