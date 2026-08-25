'use client';

import { trackEvent, AnalyticsEvent } from '@/lib/analytics';

interface BookingButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
  event?: AnalyticsEvent;
}

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'peter-hernandez-uxuta0/45min';

export default function BookingButton({
  label = 'Book a Free Strategy Call',
  className = '',
  variant = 'primary',
  event = 'calendar_view',
}: BookingButtonProps) {
  return (
    <button
      data-cal-link={CAL_LINK}
      data-cal-namespace="45min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      onClick={() => trackEvent(event, { label })}
      className={`booking-btn booking-btn--${variant} ${className}`}
    >
      {label}
    </button>
  );
}
