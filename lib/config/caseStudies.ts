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
  outcome: string;
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
    outcome:
      'When Lusso began working with Full Curl Landscaping, the company was operating with a two-person crew and generating under $500,000 per year. Today, the team has grown to 14 people, recent performance is tracking toward a seven-figure annualized revenue run rate, and the business is now aiming for $1.8 million annually.',
    ctaLabel: 'View Full Case Study',
  },
  {
    slug: 'hanshew-flight-instruction',
    client: 'Hanshew Flight Instruction',
    industry: 'Flight Instruction (Secondary Proof)',
    tag: 'Demand Generation',
    situation:
      'A part-time instruction business with limited digital footprint and no consistent way to reach new students.',
    outcome:
      'When Lusso began working with Hanshew Flight Instruction, Hunter was still working a part-time job while building the business. Within three months of becoming a CFII, he transitioned into the business full time. Today, Hanshew Flight Instruction operates with a waiting list.',
    ctaLabel: 'View Full Case Study',
  },
];
