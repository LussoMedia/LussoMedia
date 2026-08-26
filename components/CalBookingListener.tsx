'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

// Cal.com's embed exposes its own tiny pub/sub API once loaded
// (window.Cal.ns["45min"]("on", ...)) — this waits for it, then listens for
// an actual completed booking and routes to the prep page. Poll briefly for
// Cal to finish loading rather than assuming it's ready on mount, since the
// embed script itself loads async in app/layout.tsx.
declare global {
  interface Window {
    Cal?: {
      ns?: Record<string, ((...args: unknown[]) => void) | undefined>;
    };
  }
}

export default function CalBookingListener() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const calFn = window.Cal?.ns?.['45min'];
      if (!calFn) {
        setTimeout(attach, 300);
        return;
      }
      calFn('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackEvent('call_booked');
          router.push('/plan-confirmed');
        },
      });
    };

    attach();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
