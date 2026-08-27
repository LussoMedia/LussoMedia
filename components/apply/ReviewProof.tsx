'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudy } from '@/lib/config/caseStudies';
import { trackEvent } from '@/lib/analytics';

// One compact proof block — Full Curl Landscaping only (Part 8). Deliberately
// not a second application/booking CTA; the prospect has already applied.
export default function ReviewProof() {
  const caseStudy = getCaseStudy('full-curl-landscaping');
  if (!caseStudy) return null;

  return (
    <section className="section-pad bg-[#111111] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden grid md:grid-cols-2"
        >
          {caseStudy.heroImage && (
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[320px]">
              <Image
                src={caseStudy.heroImage.src}
                alt={caseStudy.heroImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">{caseStudy.client}</p>

            <ul className="space-y-2.5 mb-6">
              <li className="text-white font-semibold leading-snug">2-person crew → approximately 14 people</li>
              <li className="text-white font-semibold leading-snug">
                Under $500K/year → recent performance tracking toward a seven-figure annualized run rate
              </li>
              <li className="text-white font-semibold leading-snug">Next target: $1.8M annually</li>
            </ul>

            <p className="text-[#C5C6C7] text-sm leading-relaxed mb-8">
              Full Curl is one example of what can happen when a strong operation puts consistent visibility,
              authority, and demand generation behind an already-proven service.
            </p>

            <Link
              href="/results/full-curl-landscaping"
              onClick={() => trackEvent('case_study_view_from_confirmation', { case_study: caseStudy.slug, page: 'application_review' })}
              className="booking-btn booking-btn--ghost text-sm px-6 py-3 self-start"
            >
              View Full Case Study →
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
}
