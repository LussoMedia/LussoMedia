import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PlaybookThankYou from '@/components/playbook/PlaybookThankYou';

export const metadata: Metadata = {
  title: 'Your Playbook Is Ready',
  description: 'Download The Home Service Lead Engine — the free 90-day playbook for capturing, qualifying, following up with, and converting more local leads.',
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
