// Case study data — Part 25 (no fabricated metrics) applies here.
// Only Full Curl Landscaping and Hanshew Flight Instruction have approved,
// verifiable claims. Halladay Plumbing is intentionally omitted per the
// current build decision — do not add it without verified data.

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  tag: string;
  situation: string;
  whatWeIdentified: string;
  whatWeInstalled: string[];
  outcome: string;
  timeline: string;
  ctaLabel: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'full-curl-landscaping',
    client: 'Full Curl Landscaping',
    industry: 'Landscaping & Hardscaping',
    tag: 'Business Growth',
    situation:
      'A two-person crew generating under $500,000 per year, with little online presence in a competitive local market.',
    whatWeIdentified:
      'Strong project work wasn\'t translating into a full pipeline of design/build and transformation projects — the business needed a system to expand its reputation beyond direct referrals and into a broader local market.',
    whatWeInstalled: [
      'Offer engineering around full outdoor transformations and design/build projects',
      'A conversion-first web and landing page presence',
      'Consistent content production showcasing real completed projects',
      'Paid demand generation targeting local homeowners',
      'Reputation and proof infrastructure',
    ],
    outcome:
      'When Lusso began working with Full Curl Landscaping, the company was operating with a two-person crew and generating under $500,000 per year. Today, the team has grown to 14 people, recent performance is tracking toward a seven-figure annualized revenue run rate, and the business is now aiming for $1.8 million annually.',
    timeline: 'An ongoing partnership.',
    ctaLabel: 'View Full Case Study',
  },
  {
    slug: 'hanshew-flight-instruction',
    client: 'Hanshew Flight Instruction',
    industry: 'Flight Instruction (Secondary Proof)',
    tag: 'Demand Generation',
    situation:
      'A part-time instruction business with limited digital footprint and no consistent way to reach new students.',
    whatWeIdentified:
      'A niche, high-consideration service with real expertise behind it but no system for reaching the aspiring pilots already searching for instruction in the area.',
    whatWeInstalled: [
      'A clearer, more differentiated offer for prospective students',
      'Content and web presence built around discoverability',
      'Targeted demand generation reaching aspiring pilots in the region',
      'A conversion path from inquiry to booked instruction',
    ],
    outcome:
      'When Lusso began working with Hanshew Flight Instruction, Hunter was still working a part-time job while building the business. Within three months of becoming a CFII, he transitioned into the business full time. Today, Hanshew Flight Instruction operates with a waiting list.',
    timeline: 'An ongoing partnership.',
    ctaLabel: 'View Full Case Study',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
