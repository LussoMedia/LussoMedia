// Centralized nav/footer link config.
// Currently the site is a single long-form homepage, so these are anchors.
// As /system, /results, /hvac etc. become real routes (Phase 5/6), swap the
// hrefs below to real paths without touching Nav.tsx or Footer.tsx.

// Booking (Cal.com) is intentionally NOT the primary CTA anywhere general —
// Part 28 requires booking access to be gated behind application
// qualification. Primary CTA always routes into /apply; the actual
// calendar only appears on /book after a Tier A result.
export const primaryCTA = {
  label: 'Get Your Local Dominance Plan',
  href: '/apply',
};

export const secondaryCTA = {
  label: 'See Contractor Results',
  href: '#results',
};

export const mainNavLinks = [
  { label: 'System', href: '#system' },
  { label: 'Results', href: '#results' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
];

export const footerNavLinks = [
  { label: 'System', href: '#system' },
  { label: 'Results', href: '#results' },
  { label: 'Industries', href: '#industries' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
