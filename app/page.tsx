import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProofStrip from '@/components/ProofStrip';
import EarlyGuarantee from '@/components/EarlyGuarantee';
import ReferralCeiling from '@/components/ReferralCeiling';
import FragmentedMarketing from '@/components/FragmentedMarketing';
import DominanceSystemDiagram from '@/components/DominanceSystemDiagram';
import FastWinTimeline from '@/components/FastWinTimeline';
import CaseStudies from '@/components/CaseStudies';
import IndustriesStrip from '@/components/IndustriesStrip';
import SystemDeepDive from '@/components/SystemDeepDive';
import NinetyDayRoadmap from '@/components/NinetyDayRoadmap';
import TeamComparison from '@/components/TeamComparison';
import BonusStack from '@/components/BonusStack';
import DiyVsDwyNote from '@/components/DiyVsDwyNote';
import HomepagePlaybookSection from '@/components/HomepagePlaybookSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import MarketProtection from '@/components/MarketProtection';
import QualificationSection from '@/components/QualificationSection';
import Founder from '@/components/Founder';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { getFounder } from '@/lib/queries';
import { faqs } from '@/lib/config/faqs';

// Revalidate every 60 seconds so Sanity content updates propagate quickly
export const revalidate = 60;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Lusso Media',
  description:
    'The Lusso Local Dominance System installs and operates the offer, website, content, advertising, reputation, and tracking infrastructure established home-service contractors need to become the first choice in their local market.',
  url: 'https://illussomedia.com',
  email: 'admin@illussomedia.com',
  // Southern Utah is where Lusso is based and where local search relevance
  // matters most, without positioning the business as exclusive to it —
  // areaServed also names the country-wide reach described on-page.
  areaServed: [
    { '@type': 'City', name: 'St. George, Utah' },
    { '@type': 'City', name: 'Cedar City, Utah' },
    { '@type': 'AdministrativeArea', name: 'Southern Utah' },
    { '@type': 'Country', name: 'United States' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'UT',
    addressCountry: 'US',
  },
  sameAs: [
    'https://instagram.com/illussomedia',
    'https://tiktok.com/@illussomedia',
    'https://linkedin.com/company/lussomedia',
  ],
  offers: {
    '@type': 'Offer',
    name: 'The Local Dominance System',
    description:
      'A done-for-you customer acquisition system that helps established home-service contractors become the first choice in their local market.',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default async function Home() {
  const founder = await getFounder();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <EarlyGuarantee />
        <ReferralCeiling />
        <FragmentedMarketing />
        <DominanceSystemDiagram />
        <FastWinTimeline />
        <CaseStudies />
        <IndustriesStrip />
        <SystemDeepDive page="home" />
        <NinetyDayRoadmap />
        <TeamComparison />
        <BonusStack />
        <DiyVsDwyNote />
        <HomepagePlaybookSection />
        <GuaranteeSection />
        <MarketProtection />
        <QualificationSection />
        <Founder founder={founder} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
