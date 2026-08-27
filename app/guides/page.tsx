import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { guides } from '@/lib/config/guides';

const SITE_URL = 'https://illussomedia.com';
const DESCRIPTION =
  'Practical guides on home-service lead generation, qualification, follow-up, and local market share — from the team behind The Local Dominance System.';

export const metadata: Metadata = {
  title: 'Contractor Growth Guides',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/guides`,
    title: 'Contractor Growth Guides | Lusso Media',
    description: DESCRIPTION,
  },
};

export default function GuidesIndexPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-40 pb-16 bg-[#0D0D0D] grain-overlay">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Guides</p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
              Practical Growth Guides for Home-Service Contractors.
            </h1>
            <p className="text-lg text-[#C5C6C7] leading-relaxed">
              Lead qualification, follow-up systems, and local market share — written for established
              contractors, not marketers.
            </p>
          </div>
        </section>

        <section className="section-pad bg-[#0D0D0D] pt-8">
          <div className="max-w-4xl mx-auto px-6 grid sm:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card-hover block h-full bg-[#141414] border border-white/5 rounded-xl p-8"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-[#008080] mb-4">{guide.eyebrow}</p>
                <h2 className="text-white font-semibold text-lg mb-3 leading-snug">{guide.h1}</h2>
                <p className="text-[#888] text-sm leading-relaxed mb-6">{guide.metaDescription}</p>
                <span className="text-[#008080] text-sm font-medium">Read the Guide &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
