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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryPage(slug);
  if (!industry) return {};

  return {
    title: `${industry.name} Marketing — Lusso Media`,
    description: industry.intro,
    alternates: { canonical: `https://illussomedia.com/${industry.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: industry.h1,
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

  return (
    <>
      <Nav />
      <main>
        <IndustryPageTemplate industry={industry} />
      </main>
      <Footer />
    </>
  );
}
