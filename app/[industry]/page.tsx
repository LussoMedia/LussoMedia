import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import IndustryPageTemplate from '@/components/industry/IndustryPageTemplate';
import { industryPages, getIndustryPage } from '@/lib/config/industryPages';

// Only the 5 known industry slugs render real content — anything else falls
// through to Next's normal 404 rather than mass-generating thin pages
// (Part 20 explicitly warns against that).
export const dynamicParams = false;

export function generateStaticParams() {
  return industryPages.map((i) => ({ industry: i.slug }));
}

const SITE_URL = 'https://illussomedia.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryPage(slug);
  if (!industry) return {};

  const title = `${industry.name} Marketing & Lead Generation`;

  return {
    title,
    description: industry.intro,
    alternates: { canonical: `${SITE_URL}/${industry.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${industry.slug}`,
      title: `${title} | Lusso Media`,
      description: industry.intro,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Lusso Media`,
      description: industry.intro,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getIndustryPage(slug);
  if (!industry) notFound();

  const url = `${SITE_URL}/${industry.slug}`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${industry.name} Marketing`,
    name: `${industry.name} Marketing & Lead Generation`,
    description: industry.intro,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Lusso Media',
      url: SITE_URL,
    },
    areaServed: 'United States',
    audience: {
      '@type': 'Audience',
      audienceType: `Established ${industry.name.toLowerCase()} contractors`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/#industries` },
      { '@type': 'ListItem', position: 3, name: `${industry.name} Marketing`, item: url },
    ],
  };

  const faqJsonLd = industry.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: industry.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Nav />
      <main>
        <IndustryPageTemplate industry={industry} />
      </main>
      <Footer />
    </>
  );
}
