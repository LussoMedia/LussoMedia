'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ConfirmationPageTracker() {
  useEffect(() => {
    trackEvent('confirmation_page_view');
  }, []);
  return null;
}
