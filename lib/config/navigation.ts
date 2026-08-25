// Centralized nav/footer link config.
// /system, /results, and the 5 vertical pages are real routes (Phase 5/6).
// /about and /insights (Part 14) aren't split into standalone pages yet —
// "About" still points at the homepage's Founder section.

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
  href: '/results',
};

// "/#anchor" (not bare "#anchor") so these resolve correctly from any page,
// not just when already on the homepage.
export const mainNavLinks = [
  { label: 'System', href: '/system' },
  { label: 'Results', href: '/results' },
  { label: 'Industries', href: '/#industries' },
  { label: 'About', href: '/#about' },
];

export const footerNavLinks = [
  { label: 'System', href: '/system' },
  { label: 'Results', href: '/results' },
  { label: 'Industries', href: '/#industries' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
