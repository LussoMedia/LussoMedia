'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityTestimonial } from '@/types/sanity';

const fallback: SanityTestimonial[] = [
  {
    _id: '1',
    quote: 'Before Lusso, we were invisible online. Now we get calls every week from people who found us through content Pete made. It pays for itself.',
    name: 'Client Name',
    business: 'Local Service Business',
    result: '+40% inbound leads in 90 days',
  },
  {
    _id: '2',
    quote: "I tried hiring someone to run my social media twice. Both times it was a disaster. Pete actually understands what local businesses need — he shows up, shoots great stuff, and handles everything.",
    name: 'Client Name',
    business: 'Home Services Company',
    result: '3x more Google profile views',
  },
  {
    _id: '3',
    quote: "The monthly strategy call alone is worth it. I finally feel like someone has a plan for my brand instead of just posting to post.",
    name: 'Client Name',
    business: 'Professional Services',
    result: '10+ new clients in first quarter',
  },
];

interface Props {
  testimonials?: SanityTestimonial[] | null;
}

export default function Results({ testimonials }: Props) {
  const items = (testimonials && testimonials.length > 0) ? testimonials : fallback;

  return (
    <section id="results" className="section-pad bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Social Proof</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white">
            What Happens When Your Brand
            <br className="hidden md:block" />
            Matches Your Business
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
              className="card-hover bg-[#141414] rounded-xl p-8 flex flex-col gap-6 border border-white/5"
            >
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="flex-shrink-0">
                <path d="M0 24V14.4C0 10.267 1.067 6.933 3.2 4.4 5.333 1.867 8.267.267 12 0l1.6 2.8C9.6 3.6 7.467 5.467 6.4 8.4H12V24H0zm20 0V14.4c0-4.133 1.067-7.467 3.2-10C25.333 1.867 28.267.267 32 0l1.6 2.8C29.6 3.6 27.467 5.467 26.4 8.4H32V24H20z" fill="#008080" fillOpacity="0.4" />
              </svg>

              <p className="text-[#C5C6C7] leading-relaxed flex-1 italic">"{t.quote}"</p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#008080]/10 border border-[#008080]/25 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008080]" />
                <span className="text-[#008080] text-xs font-semibold">{t.result}</span>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {t.avatar?.asset ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#008080]/30">
                    <Image
                      src={urlFor(t.avatar).width(80).height(80).url()}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#008080]/20 border border-[#008080]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#008080] text-xs font-bold">
                      {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#888] text-xs">{t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
