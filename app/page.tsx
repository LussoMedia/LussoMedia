import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ClientBar from '@/components/ClientBar';
import Problem from '@/components/Problem';
import Offer from '@/components/Offer';
import HowItWorks from '@/components/HowItWorks';
import Results from '@/components/Results';
import CaseStudies from '@/components/CaseStudies';
import Founder from '@/components/Founder';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import {
  getTestimonials,
  getCaseStudies,
  getFounder,
  getClientLogos,
} from '@/lib/queries';

// Revalidate every 60 seconds so Sanity content updates propagate quickly
export const revalidate = 60;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lusso Media',
  description:
    'Done-for-you content and ad partnership for local service businesses. Strategy, production, and paid ads — all handled.',
  url: 'https://illussomedia.com',
  email: 'hello@illussomedia.com',
  areaServed: 'United States',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'UT',
    addressCountry: 'US',
  },
  sameAs: [
    'https://instagram.com/illussomedia',
    'https://tiktok.com/@illussomedia',
    'https://linkedin.com/company/illussomedia',
  ],
  offers: {
    '@type': 'Offer',
    name: 'Strategic Content Partnership',
    description:
      'Monthly strategy call, shoot day, 8-12 videos, full social management, ad funnel setup and management, and monthly performance reporting.',
  },
};

export default async function Home() {
  // All fetches run in parallel; each returns null if Sanity isn't configured
  const [testimonials, caseStudies, founder, clients] = await Promise.all([
    getTestimonials(),
    getCaseStudies(),
    getFounder(),
    getClientLogos(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <ClientBar clients={clients} />
        <Problem />
        <Offer />
        <HowItWorks />
        <Results testimonials={testimonials} />
        <CaseStudies caseStudies={caseStudies} />
        <Founder founder={founder} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
