'use client';

interface BookingButtonProps {
  label?: string;
  className?: string;
  variant?: 'primary' | 'ghost';
}

export default function BookingButton({
  label = 'Book a Free Strategy Call',
  className = '',
  variant = 'primary',
}: BookingButtonProps) {
  return (
    <button
      data-cal-link="peter-hernandez-uxuta0/45min"
      data-cal-namespace="45min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={`booking-btn booking-btn--${variant} ${className}`}
    >
      {label}
    </button>
  );
}
