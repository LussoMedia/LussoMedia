import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BookingButton from '@/components/BookingButton';
import CalBookingListener from '@/components/CalBookingListener';

// Part 28: booking access is only supposed to be shown after strong-fit
// qualification via /apply. This route isn't linked from primary navigation
// and is noindexed, but nothing server-side currently enforces the gate —
// once a real backend exists, protect this route with the applicant's
// tier rather than relying on obscurity.

export const metadata: Metadata = {
  title: 'Book Your Local Dominance Plan Review — Lusso Media',
  description: 'Choose a time to review your Local Dominance Plan.',
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return (
    <>
      <CalBookingListener />
      <Nav />
      <main className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#008080] mb-4">Almost There</p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            Choose a Time to Review Your Local Dominance Plan.
          </h1>
          <p className="text-[#C5C6C7] mb-10 leading-relaxed">
            45 minutes. We&rsquo;ll walk through what we found and what we&rsquo;d install first.
          </p>
          <BookingButton
            label="Choose a Time"
            variant="primary"
            className="text-base px-10 py-4"
            event="calendar_view"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
