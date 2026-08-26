import type { Metadata } from 'next';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PreCallVideoSlot from '@/components/PreCallVideoSlot';
import ConfirmationPageTracker from '@/components/ConfirmationPageTracker';
import { getCaseStudy } from '@/lib/config/caseStudies';
import CaseStudyProofLink from '@/components/CaseStudyProofLink';

export const metadata: Metadata = {
  title: 'Your Local Dominance Review Is Booked — Lusso Media',
  description: 'Come prepared with a few rough numbers so we can make the most of the call.',
  robots: { index: false, follow: false },
};

const reviewAreas = [
  { title: 'Your Current Growth System', description: 'Where customers are coming from now.' },
  { title: 'Service Economics', description: 'Average ticket, margins, close rate, capacity.' },
  { title: 'Growth Constraints', description: "What's preventing the next stage of growth." },
  { title: 'Market Opportunity', description: 'Which service or campaign makes the most sense to prioritize.' },
  { title: 'Recommended Next Step', description: 'Whether Lusso is actually a fit.' },
];

const prepareNumbers = [
  'Monthly revenue',
  'Average ticket',
  'Gross margin',
  'Primary service to grow',
  'Close rate if known',
  'Monthly lead volume',
  'Current advertising spend',
  'Current capacity',
];

export default function PlanConfirmedPage() {
  const proofCaseStudy = getCaseStudy('full-curl-landscaping');

  return (
    <>
      <ConfirmationPageTracker />
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Booked</p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.05]">
            Your Local Dominance Review Is Booked.
          </h1>
          <p className="text-lg text-[#C5C6C7] leading-relaxed">
            We&rsquo;ll use this conversation to understand where the business is today, what
            you&rsquo;re trying to grow, and whether the Local Dominance System makes economic
            sense for your operation. A calendar confirmation with the exact time is on its way to
            your inbox.
          </p>
        </section>

        <PreCallVideoSlot />

        {/* What we'll review */}
        <section className="max-w-3xl mx-auto px-6 mb-16">
          <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6 text-center">What We&rsquo;ll Review</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {reviewAreas.map((area) => (
              <div key={area.title} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <p className="text-white font-semibold mb-1.5">{area.title}</p>
                <p className="text-[#888] text-sm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Come prepared */}
        <section className="max-w-2xl mx-auto px-6 mb-16">
          <div className="bg-[#141414] border border-[#008080]/30 rounded-xl p-8">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-4">
              Come Prepared With Rough Numbers
            </h2>
            <p className="text-[#C5C6C7] mb-6 leading-relaxed">
              Estimates are fine. We use these numbers to understand whether customer acquisition
              can reasonably make economic sense for the business.
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {prepareNumbers.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-white text-sm">
                  <span className="text-[#008080] flex-shrink-0">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-call proof */}
        {proofCaseStudy && (
          <section className="max-w-2xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[#888] mb-6 text-center">While You Wait</p>
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
              {proofCaseStudy.heroImage && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={proofCaseStudy.heroImage.src}
                    alt={proofCaseStudy.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.1em] text-[#008080] mb-2">{proofCaseStudy.industry}</p>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-3">
                  {proofCaseStudy.client}: 2-Person Crew → 14-Person Operation
                </h3>
                <p className="text-[#C5C6C7] text-sm leading-relaxed mb-6">
                  Under $500K/year → recent performance tracking toward a seven-figure annualized
                  run rate. Next target: $1.8M.
                </p>
                <CaseStudyProofLink slug={proofCaseStudy.slug} />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
