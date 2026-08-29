import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CategoryNav from '@/components/resources/CategoryNav';
import FeaturedGuideCard from '@/components/resources/FeaturedGuideCard';
import { fieldGuideCategories, getHubFeaturedGuides, getPublishedGuides, getGuidesByCategory } from '@/lib/config/fieldGuides';
import { guides as deepGuides } from '@/lib/config/guides';

const SITE_URL = 'https://illussomedia.com';
const DESCRIPTION =
  'Short Field Guides when you need an answer quickly. Deeper Guides when you want the full framework.';

// Phase 4A: Field Guide #1 is live, so /resources becomes the primary
// public educational hub — indexed, in the sitemap, self-canonical. The
// `hasPublishedContent` gate (Part 30) is kept rather than hard-coding
// `index: true` so the hub automatically returns to noindex if it were
// ever emptied back out (e.g. every guide reverted to draft).
const hasPublishedContent = getPublishedGuides().length > 0;

export const metadata: Metadata = {
  title: 'Growth Resources',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/resources` },
  robots: { index: hasPublishedContent, follow: hasPublishedContent },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/resources`,
    title: 'Growth Resources | Lusso Media',
    description: DESCRIPTION,
  },
};

export default function ResourcesPage() {
  const featured = getHubFeaturedGuides(3);
  const categoriesWithGuides = fieldGuideCategories
    .map((c) => ({ category: c, guides: getGuidesByCategory(c.slug) }))
    .filter((c) => c.guides.length > 0);
  const activeCategorySlugs = new Set(categoriesWithGuides.map((c) => c.category.slug));

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-16 overflow-hidden grain-overlay">
          <div className="absolute inset-0 bg-[#0D0D0D]">
            <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#008080]/10 blur-[120px] pointer-events-none" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <p className="text-eyebrow text-[#008080] mb-4">Growth Resources</p>
            <h1 className="text-section-heading text-white mb-6">
              Practical Growth Strategy for Home Service Operators.
            </h1>
            <p className="text-body-lg text-[#C5C6C7]">{DESCRIPTION}</p>
          </div>
        </section>

        {categoriesWithGuides.length === 0 ? (
          // Infra-only state (Part 30) — kept for the rare case every Field
          // Guide reverts to draft. Not the normal path once Phase 4A ships.
          <section className="pb-24">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-[#666] text-sm border-t border-white/[0.08] pt-8">
                Field Guide infrastructure is live. Guides publish here starting Phase 4.
              </p>
            </div>
          </section>
        ) : (
          <section className="pb-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-8 max-w-xl">
                <p className="text-eyebrow text-[#008080] mb-3">Field Guides</p>
                <p className="text-[#888] text-sm">
                  2&ndash;4 minute visual frameworks built around one problem and actions you can
                  take this week.
                </p>
              </div>

              {featured.length > 0 && (
                <div className="mb-10">
                  <p className="text-eyebrow text-[#888] mb-6">Featured</p>
                  <div className="grid md:grid-cols-3 gap-5">
                    {featured.map((g) => (
                      <FeaturedGuideCard key={g.slug} guide={g} />
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <CategoryNav activeCategories={activeCategorySlugs} />
              </div>
            </div>

            {categoriesWithGuides.map(({ category, guides }) => (
              <div key={category.slug} id={category.slug} className="max-w-6xl mx-auto px-6 pt-10 border-t border-white/5 scroll-mt-24">
                <div className="mb-6 max-w-xl">
                  <h2 className="text-subsection-heading text-white mb-2">{category.label}</h2>
                  <p className="text-[#888] text-sm">{category.question}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  {guides.map((g) => (
                    <FeaturedGuideCard key={g.slug} guide={g} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Deep Guides — the pre-existing /guides system (Phase 4A
            reconciliation). Different content type, not implied to be a
            lesser or greater format — just a different intent (Part 4A
            "Do not imply one format is better"). Never migrated,
            redirected, or duplicated here — this section links out to the
            real, unchanged /guides/[slug] URLs. */}
        <section className="section-pad bg-[#111111] border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10 max-w-xl">
              <p className="text-eyebrow text-[#008080] mb-3">Deep Guides</p>
              <p className="text-[#888] text-sm">
                More comprehensive resources for owners who want to go deeper into search,
                acquisition, conversion, and local growth.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {deepGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="card-hover block h-full border border-white/10 rounded-[var(--radius-card)] p-7"
                >
                  <p className="text-eyebrow text-[#008080] mb-3">{g.eyebrow}</p>
                  <h3 className="text-white font-semibold text-lg leading-snug mb-2">{g.h1}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-5">{g.metaDescription}</p>
                  <span className="text-[#008080] text-xs font-medium">Read the Guide &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
