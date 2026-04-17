'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { SanityClientLogo } from '@/types/sanity';

const fallbackClients = [
  'Bowlify',
  'Smart Air LV',
  'Red Rock RE',
  '777 Korean Restaurant',
  'Summit Roofing',
  'Desert Fit Co.',
];

interface Props {
  clients?: SanityClientLogo[] | null;
}

export default function ClientBar({ clients }: Props) {
  const hasCmsClients = clients && clients.length > 0;
  // Double the array so the marquee loops seamlessly
  const marqueeItems = hasCmsClients
    ? [...clients, ...clients]
    : [...fallbackClients, ...fallbackClients];

  return (
    <section className="py-16 border-y border-white/5 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-[#888]"
        >
          Trusted by Growing Businesses
        </motion.p>
      </div>

      <div className="marquee-container relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#111111] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#111111] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-12 items-center whitespace-nowrap">
          {hasCmsClients
            ? (marqueeItems as SanityClientLogo[]).map((client, i) => (
                <div
                  key={`${client._id}-${i}`}
                  className="flex-shrink-0 px-6 py-3 border border-white/10 rounded-lg bg-[#141414] hover:border-[#008080]/50 hover:bg-[#008080]/5 transition-all duration-200 group"
                >
                  {client.logo?.asset ? (
                    <Image
                      src={urlFor(client.logo).height(40).url()}
                      alt={client.name}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-[#888] group-hover:text-[#C5C6C7] transition-colors font-[family-name:var(--font-space-grotesk)] font-semibold text-sm tracking-wide">
                      {client.name}
                    </span>
                  )}
                </div>
              ))
            : (marqueeItems as string[]).map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-6 py-3 border border-white/10 rounded-lg bg-[#141414] hover:border-[#008080]/50 hover:bg-[#008080]/5 transition-all duration-200 group cursor-default"
                >
                  <span className="text-[#888] group-hover:text-[#C5C6C7] transition-colors font-[family-name:var(--font-space-grotesk)] font-semibold text-sm tracking-wide">
                    {name}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
