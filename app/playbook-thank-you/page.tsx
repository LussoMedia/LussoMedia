import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlaybookThankYou from '@/components/playbook/PlaybookThankYou';

export const metadata: Metadata = {
  title: 'Your Playbook Is Ready — Lusso Media',
  description: 'Download the 90-Day Home Service Lead-to-Booked-Job Playbook.',
  alternates: { canonical: 'https://illussomedia.com/playbook-thank-you' },
  robots: { index: false, follow: true },
};

export default function PlaybookThankYouPage() {
  return (
    <>
      <Nav />
      <main>
        <PlaybookThankYou />
      </main>
      <Footer />
    </>
  );
}
