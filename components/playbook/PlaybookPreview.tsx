'use client';

import { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { previewPages } from '@/lib/config/playbook';

// Desktop: polished grid. Mobile: horizontal swipeable strip (Part 4,
// Section 06). Click-to-enlarge opens a simple lightbox — no new
// dependency, just local state + framer-motion (already used site-wide).
export default function PlaybookPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close]);

  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Inside the Pages</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-white">
            See the System Before You Use It.
          </h2>
          <div className="teal-divider mx-auto mt-6" />
        </m.div>

        {/* Mobile: horizontal scroll strip. Desktop: grid (scroll-snap classes are inert above sm:grid). */}
        <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none">
          {previewPages.map((page, i) => (
            <button
              key={page.src}
              onClick={() => setOpenIndex(i)}
              className="card-hover flex-shrink-0 w-[220px] sm:w-auto snap-start text-left rounded-xl overflow-hidden border border-white/5 bg-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#008080] focus-visible:outline-offset-2"
              aria-label={`Enlarge preview: ${page.label}`}
            >
              <div className="relative w-full aspect-[900/1164]">
                <Image
                  src={page.src}
                  alt={page.alt}
                  fill
                  sizes="(max-width: 640px) 220px, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-[#C5C6C7] text-xs px-3 py-2.5">{page.label}</p>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <m.div
            key="playbook-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={previewPages[openIndex].label}
          >
            <button
              onClick={close}
              aria-label="Close preview"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-white hover:border-[#008080]/50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <m.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[85vh]"
            >
              <div className="relative w-full aspect-[900/1164] rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={previewPages[openIndex].src}
                  alt={previewPages[openIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-contain bg-[#0D0D0D]"
                />
              </div>
              <p className="text-[#C5C6C7] text-sm text-center mt-4">{previewPages[openIndex].label}</p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
