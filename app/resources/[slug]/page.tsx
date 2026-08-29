import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FieldGuideTemplate from '@/components/resources/FieldGuideTemplate';
import { fieldGuides, getFieldGuide, getPublishedGuides, getCategory } from '@/lib/config/fieldGuides';

const SITE_URL = 'https://illussomedia.com';

// `dynamicParams` must be a literal static boolean (Next.js route-segment
// config requirement) — always false, exactly like the [industry] and
// /guides/[slug] routes: only the slugs generateStaticParams returns are
// ever reachable. Draft guides (Part 48) are included in that list ONLY
// outside production, so the visual component system can be exercised in
// `next dev` without ever being statically generated/reachable in a
// production build.
export const dynamicParams = false;

export function generateStaticParams() {
  const list = process.env.NODE_ENV === 'production' ? getPublishedGuides() : fieldGuides;
  return list.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getFieldGuide(slug, process.env.NODE_ENV !== 'production');
  if (!guide || (guide.draft && process.env.NODE_ENV === 'production')) return {};

  const url = `${SITE_URL}/resources/${guide.slug}`;

  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: url },
    robots: { index: !guide.draft, follow: !guide.draft },
    openGraph: {
      type: 'article',
      url,
      title: guide.metaTitle,
      description: guide.metaDescription,
      siteName: 'Lusso Media',
      publishedTime: guide.publishDate,
      modifiedTime: guide.updatedDate,
      images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630, alt: guide.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

export default async function FieldGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getFieldGuide(slug, process.env.NODE_ENV !== 'production');
  if (!guide) notFound();
  if (guide.draft && process.env.NODE_ENV === 'production') notFound();

  const url = `${SITE_URL}/resources/${guide.slug}`;
  const category = getCategory(guide.category);

  // Part 22 — Article, accurate dates/author, no fabricated fields.
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    image: `${url}/opengraph-image`,
    url,
    datePublished: guide.publishDate,
    dateModified: guide.updatedDate,
    author: { '@type': 'Organization', name: 'Lusso Media', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Lusso Media', url: SITE_URL },
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Field Guides', item: `${SITE_URL}/resources` },
      { '@type': 'ListItem', position: 2, name: category.label, item: `${SITE_URL}/resources#${category.slug}` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: url },
    ],
  };

  return (
    <>
      {!guide.draft && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        </>
      )}
      <Nav />
      <main>
        <FieldGuideTemplate guide={guide} />
      </main>
      <Footer />
    </>
  );
}
