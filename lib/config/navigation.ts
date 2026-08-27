// Centralized nav/footer link config.
// /system, /results, and the 5 vertical pages are real routes.
// "About" still points at the homepage's Founder section ("/#about") —
// no standalone /about route exists yet.

// Booking (Cal.com) is intentionally NOT the primary CTA anywhere general —
// Part 28 requires booking access to be gated behind application
// qualification. Primary CTA always routes into /apply; the actual
// calendar only appears on /book after a Tier A result.
export const primaryCTA = {
  label: 'Get Your Local Dominance Plan',
  href: '/apply',
};

// The lower-intent diagnostic path. Copy is deliberate: curiosity-led
// question as the main label, "2-Minute Local Dominance Score" as
// supporting clarification — never "Free Score" / "Quiz" / "Assessment".
export const scoreCTA = {
  label: 'How Do You Stack Up Locally?',
  shortLabel: 'How Do You Stack Up?',
  microcopy: '2-Minute Local Dominance Score',
  href: '/local-dominance-score',
};

export const secondaryCTA = {
  label: 'See Contractor Results',
  href: '/results',
};

// Homepage nav entry — deliberately not "Home" (reinforces positioning).
export const homeNavLink = { label: 'Local Dominance', href: '/' };

// "/#anchor" (not bare "#anchor") so these resolve correctly from any page,
// not just when already on the homepage.
// `industries: true` / `growthTools: true` mark the two items that render
// as a dropdown instead of a plain link (see components/nav/
// IndustriesDropdown.tsx and components/nav/GrowthToolsDropdown.tsx). The
// Score used to be its own top-level link — it now lives inside "Growth
// Tools" alongside the playbook so the top-level nav doesn't grow a second
// permanent item for the playbook funnel.
export const mainNavLinks = [
  homeNavLink,
  { label: 'System', href: '/system' },
  { label: 'Results', href: '/results' },
  { label: 'Industries', href: '/#industries', industries: true },
  { label: 'Growth Tools', href: scoreCTA.href, growthTools: true },
  { label: 'About', href: '/#about' },
];

export const footerNavLinks = [
  homeNavLink,
  { label: 'System', href: '/system' },
  { label: 'Results', href: '/results' },
  { label: 'Industries', href: '/#industries' },
  { label: scoreCTA.label, href: scoreCTA.href },
  { label: '90-Day Lead-to-Booked-Job Playbook', href: '/lead-to-booked-job-playbook' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
