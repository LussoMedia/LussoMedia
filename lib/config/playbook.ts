// Central copy/config for the 90-Day Lead-to-Booked-Job Playbook funnel —
// landing page (/lead-to-booked-job-playbook), thank-you page
// (/playbook-thank-you), the homepage teaser section, and the Growth Tools
// nav dropdown. Kept in one file the way lib/config/bonuses.ts and
// lib/config/systemComponents.ts centralize their own sections, so the
// asset path, meta title, and on-page copy can't drift out of sync.

export const playbook = {
  slug: 'lead-to-booked-job-playbook',
  href: '/lead-to-booked-job-playbook',
  thankYouHref: '/playbook-thank-you',
  eyebrow: 'FREE 90-DAY PLAYBOOK',
  // "The Home Service Lead Engine" is the resource's actual cover title —
  // kept in sync with public/images/playbook/cover.jpg and the PDF itself.
  title: 'The Home Service Lead Engine',
  subtitle:
    'The 90-Day Playbook for Capturing, Qualifying, Following Up With, and Converting More Local Leads',
  shortTitle: 'The Home Service Lead Engine',
  tagline: 'Build the system before you scale the traffic.',
  navLabel: 'The Home Service Lead Engine',
  navDescription:
    'The free 90-day playbook for capturing, qualifying, following up with, and converting more local leads.',
  navEyebrow: 'FREE 90-DAY PLAYBOOK',
  // Public Framework Originality Audit — renamed from the internal
  // "90-day-home-service-lead-to-booked-job-playbook.pdf" to a clean,
  // customer-facing filename once the revised PDF replaced the original
  // (see /docs/public-framework-originality-audit.md). Old path 301s to
  // this one via next.config.ts.
  pdfPath: '/resources/The-Home-Service-Lead-Engine-90-Day-Playbook.pdf',
  pdfFilename: 'The-Home-Service-Lead-Engine-90-Day-Playbook.pdf',
  coverImage: '/images/playbook/cover.jpg',
  pageCount: 61,
  microValueLine: '61 pages • Scripts • Workflows • Visual Systems • Scorecards • 90-Day Implementation Plan',
};

// The four numbered visual comparisons on Section 02 ("The Lead Problem").
export const brokenPath = [
  { label: 'Ads / Search / Referrals' },
  { label: 'New Lead' },
  { label: 'Slow or inconsistent response' },
  { label: 'Weak qualification' },
  { label: 'One or two follow-ups' },
  { label: 'Estimate goes cold' },
  { label: 'Lost opportunity' },
];

export const systemPath = [
  { label: 'Attention' },
  { label: 'Capture' },
  { label: 'Qualify' },
  { label: 'Respond' },
  { label: 'Follow Up' },
  { label: 'Appointment' },
  { label: 'Estimate' },
  { label: 'Booked Job' },
];

// Section 03 — Before / After.
export const beforeAfter = {
  before: [
    'Leads scattered across inboxes and platforms',
    'No consistent qualification standard',
    'Response speed depends on who sees the lead',
    'One or two contact attempts',
    'Estimates go cold',
    'Nobody clearly owns follow-up',
    'Marketing judged mostly by lead count',
  ],
  after: [
    'Every lead has a destination',
    'Fit is clearly defined',
    'Response standards are documented',
    'Follow-up continues systematically',
    'Estimates have a defined process',
    'Every opportunity has a status and owner',
    'Marketing can be evaluated closer to booked jobs and revenue',
  ],
};

export interface PlaybookSystem {
  number: string;
  name: string;
  description: string;
}

// Section 04 — Five Systems. Mirrors the shape of systemComponents.ts and
// matches the actual playbook's System 1–5 structure page-for-page.
export const playbookSystems: PlaybookSystem[] = [
  {
    number: '01',
    name: 'Capture the Right Leads',
    description: 'Define qualification, simplify lead forms, and organize every opportunity.',
  },
  {
    number: '02',
    name: 'Turn Leads Into Appointments',
    description: 'Install response standards, scripts, and structured follow-up.',
  },
  {
    number: '03',
    name: 'Build Local Trust + Demand',
    description: 'Use reviews, Google, content, and completed work to compound credibility.',
  },
  {
    number: '04',
    name: 'Create Predictable Lead Flow',
    description: 'Build better hooks, lead campaigns, offers, and conversion paths.',
  },
  {
    number: '05',
    name: "Know What's Working",
    description: 'Track leads, appointments, jobs, revenue, and the numbers that actually help you make better decisions.',
  },
];

export interface ValueStackCategory {
  name: string;
  items: string[];
}

// Section 05 — Value Stack.
export const valueStack: ValueStackCategory[] = [
  {
    name: 'Lead Capture',
    items: [
      'Qualified-lead framework',
      'Qualification matrix',
      'Lead form blueprint',
      'CRM-free lead tracker',
      'Lead-status workflow',
    ],
  },
  {
    name: 'Follow-Up',
    items: [
      'Speed-to-lead standards',
      'Phone script',
      'Missed-call text',
      'Voicemail framework',
      '21-day follow-up sequence',
      'Long-term nurture structure',
    ],
  },
  {
    name: 'Trust + Authority',
    items: [
      'Review request system',
      'Google Business Profile routine',
      'Jobsite content system',
      'Crew-led content framework',
      'Repeatable content formats',
    ],
  },
  {
    name: 'Demand',
    items: [
      'Ad hook frameworks',
      'Paid lead campaign structure',
      'Meta form logic',
      'Offer-building framework',
      'Financing presentation guidance',
    ],
  },
  {
    name: 'Measurement',
    items: [
      'KPI scorecard',
      'Weekly operating rhythm',
      'Weekly scorecard',
      '90-day implementation plan',
    ],
  },
];

export interface PlaybookPreviewPage {
  src: string;
  alt: string;
  label: string;
}

// Section 06 — interior page previews (Part 9: optimized images, not the
// PDF re-rendered into the DOM). Sourced from the actual approved PDF —
// each entry is a real page from the 61-page document.
export const previewPages: PlaybookPreviewPage[] = [
  { src: '/images/playbook/preview-4.jpg', alt: 'The Home Service Lead Engine — full lead-process model, page 4', label: 'The Lead Engine Model' },
  { src: '/images/playbook/preview-12.jpg', alt: 'Build a Simple Qualification Matrix, page 12', label: 'Qualification Matrix' },
  { src: '/images/playbook/preview-19.jpg', alt: 'Respond While Interest Is High — response-time framework, page 19', label: 'Response-Time Framework' },
  { src: '/images/playbook/preview-22.jpg', alt: 'The Complete High-Ticket Sequence — 21-day follow-up, page 22', label: '21-Day Follow-Up Sequence' },
  { src: '/images/playbook/preview-53.jpg', alt: 'Track the Numbers That Matter — KPI scoreboard, page 53', label: 'KPI Scoreboard' },
  { src: '/images/playbook/preview-8.jpg', alt: 'Install the System in Three Phases — 90-day roadmap, page 8', label: '90-Day Roadmap' },
];

// Section 07 — Who It's For.
export const goodFit = [
  'You already generate referrals, inquiries, or paid leads',
  'You have an established service operation',
  'Someone on the team handles incoming opportunities',
  'You want greater consistency from inquiry to booked job',
  'Lead quality, conversion, and revenue matter more than vanity metrics',
  'You want a process your team can actually follow',
];

export const probablyNot = [
  "You're still proving whether your service has demand",
  'You have no capacity to fulfill additional work',
  "You're looking for social-media hacks",
  'You want a shortcut instead of an operating process',
];

// Section 08 — Email capture fields only (no phone, no company data).
export const emailCaptureFields = {
  firstName: 'First Name',
  email: 'Email Address',
};
