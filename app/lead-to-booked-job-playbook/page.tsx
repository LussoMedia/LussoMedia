import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlaybookHero from '@/components/playbook/PlaybookHero';
import PlaybookProblem from '@/components/playbook/PlaybookProblem';
import PlaybookBeforeAfter from '@/components/playbook/PlaybookBeforeAfter';
import PlaybookFiveSystems from '@/components/playbook/PlaybookFiveSystems';
import PlaybookValueStack from '@/components/playbook/PlaybookValueStack';
import PlaybookPreview from '@/components/playbook/PlaybookPreview';
import PlaybookWhoItsFor from '@/components/playbook/PlaybookWhoItsFor';
import PlaybookEmailCapture from '@/components/playbook/PlaybookEmailCapture';
import { playbook } from '@/lib/config/playbook';

const SITE_URL = 'https://illussomedia.com';

export const metadata: Metadata = {
  title: '90-Day Home Service Lead-to-Booked-Job Playbook | Lusso Media',
  description:
    "Build a stronger system for capturing, qualifying, following up with, and converting local home-service leads into booked jobs with Lusso Media's 90-day playbook.",
  alternates: { canonical: `${SITE_URL}${playbook.href}` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}${playbook.href}`,
    title: playbook.title,
    description:
      "Build a stronger system for capturing, qualifying, following up with, and converting local home-service leads into booked jobs.",
    images: [{ url: `${SITE_URL}${playbook.coverImage}`, width: 1000, height: 1294, alt: playbook.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: playbook.title,
    description:
      "Build a stronger system for capturing, qualifying, following up with, and converting local home-service leads into booked jobs.",
    images: [`${SITE_URL}${playbook.coverImage}`],
  },
};

export default function PlaybookLandingPage() {
  return (
    <>
      <Nav />
      <main>
        <PlaybookHero />
        <PlaybookProblem />
        <PlaybookBeforeAfter />
        <PlaybookFiveSystems />
        <PlaybookValueStack />
        <PlaybookPreview />
        <PlaybookWhoItsFor />
        <PlaybookEmailCapture />
      </main>
      <Footer />
    </>
  );
}
