import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ApplicationFunnel from '@/components/apply/ApplicationFunnel';

export const metadata: Metadata = {
  title: 'Apply — Lusso Media',
  description:
    'Apply for the Lusso Local Dominance System. A few questions about your business and economics tell us whether it\'s a fit.',
  alternates: { canonical: 'https://illussomedia.com/apply' },
  robots: { index: true, follow: true },
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <ApplicationFunnel />
      </main>
      <Footer />
    </>
  );
}
