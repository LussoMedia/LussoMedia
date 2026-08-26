// Case study data — Part 25/29 (no fabricated metrics) applies here.
// Only Full Curl Landscaping and Hanshew Flight Instruction have approved,
// verifiable claims. Halladay Plumbing is intentionally omitted per the
// current build decision — do not add it without verified data.

export interface CaseStudyMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudySnapshot {
  label: string;
  points: string[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  tag: string;
  featured?: boolean;
  heroImage?: CaseStudyMedia;
  gallery?: CaseStudyMedia[];
  situation: string;
  whatWeIdentified: string;
  whatWeInstalled: string[];
  // Which of the 7 Local Dominance System components were actually part of
  // this engagement — only list what was really performed (Part 3/7).
  systemComponents: string[];
  snapshot: {
    before: CaseStudySnapshot;
    today: CaseStudySnapshot;
    next: CaseStudySnapshot;
  };
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
    featured: true,
    heroImage: {
      src: '/images/case-studies/full-curl-landscaping/yard-01.jpg',
      alt: 'A completed Full Curl Landscaping residential project — fresh sod and clean lawn edging',
      width: 1800,
      height: 1200,
    },
    gallery: [
      {
        src: '/images/case-studies/full-curl-landscaping/aerial-01.jpg',
        alt: 'Aerial view of a completed Full Curl Landscaping property — custom lawn shaping, rock beds, and full property landscaping',
        width: 1400,
        height: 1400,
      },
    ],
    situation:
      'A two-person crew generating under $500,000 per year, with little online presence in a competitive local market.',
    whatWeIdentified:
      'Strong project work wasn\'t translating into a full pipeline of design/build and transformation projects. The craftsmanship and local reputation were already there — the market simply wasn\'t seeing enough of it. Growth relied too heavily on people who already knew the business, and the online presence didn\'t reflect the quality of the operation.',
    whatWeInstalled: [
      'Local market analysis and growth-priority selection',
      'Consistent content production showcasing real completed projects',
      'Paid demand generation targeting local homeowners',
      'Reputation and proof infrastructure built around completed work',
    ],
    systemComponents: ['Market Intelligence', 'Authority Engine', 'Demand Engine', 'Reputation Engine'],
    snapshot: {
      before: {
        label: 'Before',
        points: [
          'Two-person crew',
          'Under $500K annual revenue',
          'Heavy dependence on reputation and referrals',
          'Limited digital market presence',
        ],
      },
      today: {
        label: 'Today',
        points: [
          'Team has grown to approximately 14 people',
          'Recent performance tracking toward a seven-figure annualized run rate',
          'Stronger local market visibility',
          'More developed content and demand infrastructure',
        ],
      },
      next: {
        label: 'Next Target',
        points: [
          '$1.8M annual revenue',
          'Continued market expansion',
          'Additional acquisition opportunities',
        ],
      },
    },
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
    heroImage: {
      src: '/images/case-studies/hanshew-flight-instruction/preflight-wing.jpg',
      alt: 'Hunter Hanshew performing a preflight check on the wing of a Piper aircraft',
      width: 2000,
      height: 1333,
    },
    gallery: [
      {
        src: '/images/case-studies/hanshew-flight-instruction/preflight-board.jpg',
        alt: 'Hunter Hanshew boarding a Piper aircraft ahead of a flight instruction session',
        width: 1800,
        height: 2700,
      },
    ],
    situation:
      'A part-time instruction business with limited digital footprint and no consistent way to reach new students.',
    whatWeIdentified:
      'A niche, high-consideration service with real expertise behind it but no system for reaching the aspiring pilots already searching for instruction in the area.',
    whatWeInstalled: [
      'A clearer, more differentiated offer for prospective students',
      'Content and web presence built around discoverability',
      'Targeted demand generation reaching aspiring pilots in the region',
    ],
    systemComponents: ['Authority Engine', 'Demand Engine'],
    snapshot: {
      before: {
        label: 'Starting Point',
        points: [
          'Building the business alongside part-time employment',
          'Limited digital footprint',
          'No consistent way to reach new students',
        ],
      },
      today: {
        label: 'Transformation',
        points: [
          'Became a CFII',
          'Transitioned into flight instruction full time within about three months',
          'Stronger content and demand presence',
        ],
      },
      next: {
        label: 'Current Position',
        points: [
          'Operates with a waiting list',
          'Consistently found by new students in the region',
        ],
      },
    },
    outcome:
      'When Lusso began working with Hanshew Flight Instruction, Hunter was still working a part-time job while building the business. Within three months of becoming a CFII, he transitioned into the business full time. Today, Hanshew Flight Instruction operates with a waiting list.',
    timeline: 'An ongoing partnership.',
    ctaLabel: 'View Full Case Study',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
