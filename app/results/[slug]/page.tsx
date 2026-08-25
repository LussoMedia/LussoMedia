import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CaseStudyTemplate from '@/components/results/CaseStudyTemplate';
import { caseStudies, getCaseStudy } from '@/lib/config/caseStudies';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.client} Case Study — Lusso Media`,
    description: caseStudy.outcome,
    alternates: { canonical: `https://illussomedia.com/results/${caseStudy.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <Nav />
      <main>
        <CaseStudyTemplate caseStudy={caseStudy} />
      </main>
      <Footer />
    </>
  );
}
