// Config-driven vertical landing pages (Part 12). Each entry varies
// headline, pain, economics framing, offers, seasonality, and FAQ context —
// no page-specific numbers or client counts are invented (Part 25). Case
// studies referenced here are real; industries without a directly relevant
// case study point to /results generally rather than implying a false
// industry-specific result.

export interface OfferExample {
  name: string;
  description: string;
}

export interface IndustryPage {
  slug: string;
  name: string;
  h1: string;
  eyebrow: string;
  intro: string;
  primaryPain: string;
  economics: string[];
  // Illustrative offer-engineering concepts (Change 4) — named, structured
  // examples of what a stronger offer can look like, not claims that these
  // are active client offers. Framed on-page as "Examples of Offers We Can
  // Engineer," never as "Common Offers We Build."
  offerExamples: OfferExample[];
  seasonality: string;
  projectExamples: string[];
  faq: { question: string; answer: string }[];
  proofCaseStudySlug?: string;
  // Supporting line under the industry page's Score CTA (Part 18) — kept
  // short and specific to the vertical rather than generic.
  scoreLeakLine: string;
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'hvac',
    scoreLeakLine: 'See where your HVAC growth system may be leaking.',
    name: 'HVAC',
    h1: 'Become the HVAC Company Homeowners Call First.',
    eyebrow: 'For established HVAC contractors',
    intro:
      'Replacement and install jobs carry the margin. The Local Dominance System is built to put your company in front of homeowners at the exact moment a unit fails or a maintenance visit turns into a replacement conversation.',
    primaryPain:
      'Emergency calls are unpredictable and maintenance plans rarely convert into the replacement revenue that actually moves the business forward.',
    economics: [
      'Replacement and install economics carry the business — a system built around one-off service calls leaves margin on the table.',
      'Seasonal demand swings mean the acquisition system has to be able to turn up quickly ahead of summer and winter peaks.',
      'The path from a maintenance visit to a replacement conversation is where a lot of revenue quietly gets lost.',
    ],
    offerExamples: [
      {
        name: 'Comfort System Replacement Assessment',
        description:
          'A structured home-comfort evaluation that identifies performance issues, replacement options, financing paths, and next-step recommendations.',
      },
      {
        name: 'Priority HVAC Rescue',
        description:
          'Dedicated scheduling for qualified homeowners dealing with urgent cooling or heating failures, with diagnostic costs credited toward approved repair work where applicable.',
      },
      {
        name: 'Home Efficiency Upgrade Plan',
        description:
          'A combined system-performance and comfort assessment designed to identify inefficiencies before a homeowner commits to major equipment upgrades.',
      },
    ],
    seasonality:
      'Demand concentrates ahead of and during extreme temperature swings. The system is built to have campaigns ready to scale before those windows, not scrambling once they hit.',
    projectExamples: [
      'Full system replacements',
      'Emergency repair response',
      'Maintenance-to-install pipeline',
      'Financing-backed replacement campaigns',
    ],
    faq: [
      {
        question: 'How do you handle seasonal demand spikes?',
        answer:
          'Campaigns and budget are built to scale up ahead of peak seasons rather than reacting once call volume already spikes — that timing is set during the diagnostic.',
      },
      {
        question: 'Do you focus on repair or replacement?',
        answer:
          'Both have a place, but the offer and conversion infrastructure are built to route qualified replacement opportunities to the top — that\'s where the margin is.',
      },
    ],
  },
  {
    slug: 'plumbing',
    scoreLeakLine: 'See where your plumbing growth system may be leaking.',
    name: 'Plumbing',
    h1: 'Turn Your Local Reputation Into Predictable Plumbing Demand.',
    eyebrow: 'For established plumbing contractors',
    intro:
      'Water treatment, repipe, tankless, and sewer work carry real ticket value — but they rarely get searched for the way an emergency leak does. The Local Dominance System is built to capture both the urgent calls and the higher-value installs.',
    primaryPain:
      'Emergency and service calls come in reactively, but the higher-value installation work — water treatment, repipe, tankless — doesn\'t get the same search volume or urgency, so it goes to whoever shows up first with the strongest offer.',
    economics: [
      'High-value installations (water treatment, repipe, tankless) carry better margin than one-off service calls but need a different offer and funnel than emergency work.',
      'Search intent varies sharply by service — "burst pipe" behaves nothing like "tankless water heater install."',
      'Service-area funnels matter more here than almost any other trade — plumbers often cover a tighter radius than they think.',
    ],
    offerExamples: [
      {
        name: 'Whole-Home Water Protection Assessment',
        description:
          'Diagnose hard-water damage, fixture impact, appliance exposure, and treatment options before recommending a system.',
      },
      {
        name: 'Water Softener Installation Credit',
        description:
          'Qualified homeowners receive an installation credit toward an approved whole-home water treatment system.',
      },
      {
        name: 'Appliance Protection Package',
        description:
          'Pair the installation with recurring maintenance, system servicing, and consumable delivery to increase long-term homeowner value.',
      },
    ],
    seasonality:
      'Emergency demand spikes around freeze events; installation demand is steadier but benefits from a consistent authority and reputation presence year-round.',
    projectExamples: [
      'Repipe projects',
      'Tankless water heater installs',
      'Water treatment system installs',
      'Sewer line replacement',
    ],
    faq: [
      {
        question: 'We get plenty of emergency calls already — why do we need this?',
        answer:
          'Emergency calls rarely convert into the higher-margin installation work. The system is built to capture both, and to make the emergency-to-install path more consistent.',
      },
      {
        question: 'How local does the targeting get?',
        answer:
          'As local as your actual service area — service-area-specific funnels are part of the Conversion Infrastructure component, not a one-size-fits-all page.',
      },
    ],
    proofCaseStudySlug: undefined,
  },
  {
    slug: 'roofing',
    scoreLeakLine: 'See where your roofing growth system may be leaking.',
    name: 'Roofing',
    h1: 'Win More of the Roofing Projects Already Being Searched for in Your Market.',
    eyebrow: 'For established roofing contractors',
    intro:
      'Homeowners researching a roof replacement compare three to five contractors before they call one. The Local Dominance System is built to make sure your company is one of them — and the most trusted one.',
    primaryPain:
      'Strong work and a solid reputation locally don\'t always translate into being found by homeowners who are actively comparing roofing contractors online right now.',
    economics: [
      'Replacements are the highest-value opportunity — the offer, proof, and financing options need to reflect that.',
      'Storm and insurance-driven demand creates sudden spikes that a fragmented marketing setup can\'t capitalize on fast enough.',
      'Trust is the biggest lever — before/after proof and reviews matter more here than in almost any other trade.',
    ],
    offerExamples: [
      {
        name: 'Storm Damage Documentation & Replacement Assessment',
        description:
          'A documented roof evaluation with photo evidence, condition findings, replacement recommendations, and next-step guidance.',
      },
      {
        name: 'Roof Replacement Planning Session',
        description:
          'Give homeowners clarity around condition, material options, project scope, expected timeline, and financing before they commit.',
      },
      {
        name: 'Priority Weather-Damage Response',
        description:
          'Fast-track qualified homeowners following severe weather events when inspection capacity is available.',
      },
    ],
    seasonality:
      'Storm events create sudden, sharp demand spikes. The system is built with creative and tracking ready so a market surge doesn\'t get missed.',
    projectExamples: [
      'Full roof replacements',
      'Storm damage repairs',
      'Insurance claim-assisted projects',
      'Before/after transformation proof',
    ],
    faq: [
      {
        question: 'How do you handle storm-driven demand spikes?',
        answer:
          'Campaigns and creative are built ahead of time so the system can scale quickly when a storm event hits your market, rather than starting from scratch.',
      },
      {
        question: 'Do you help with insurance claim positioning?',
        answer:
          'We help position your offer and proof clearly for homeowners navigating an insurance claim — the claims process itself stays with you and the homeowner.',
      },
    ],
  },
  {
    slug: 'landscaping',
    scoreLeakLine: 'See how your local market position compares.',
    name: 'Landscaping',
    h1: 'Win More of the High-Value Outdoor Projects in Your Market.',
    eyebrow: 'For established landscaping & design/build contractors',
    intro:
      'Full Curl Landscaping went from a two-person crew generating under $500,000 a year to a 14-person team tracking toward a seven-figure annualized run rate, working with Lusso. The Local Dominance System is built around exactly this kind of project-based, design/build growth.',
    primaryPain:
      'Great project work doesn\'t automatically translate into a full pipeline of the design/build and transformation projects that actually grow the business.',
    economics: [
      'Design/build and full outdoor transformations carry the real margin — a system built around small maintenance jobs won\'t move the business forward.',
      'Project scope and qualification matter more here than most trades — the wrong-fit lead wastes a design consult.',
      'Visual proof (real before/after, real completed projects) does more of the selling than almost any other channel.',
    ],
    offerExamples: [
      {
        name: 'Outdoor Transformation Planning Session',
        description:
          'A structured consultation that connects design goals, property conditions, scope, timeline, and realistic budget expectations.',
      },
      {
        name: 'Project Priority Deposit',
        description:
          'Qualify serious homeowners by requiring a planning or design commitment before major design work begins.',
      },
      {
        name: 'Seasonal Installation Priority',
        description:
          "Allow qualified projects to reserve limited production windows when the contractor's upcoming schedule has genuine capacity constraints.",
      },
    ],
    seasonality:
      'Demand builds ahead of the outdoor season and needs a pipeline of booked projects ready before the ground even thaws — waiting until spring to start marketing means competing for what\'s left.',
    projectExamples: [
      'Full outdoor living transformations',
      'Design/build project pipelines',
      'Seasonal project-booking campaigns',
      'Before/after visual proof funnels',
    ],
    faq: [
      {
        question: 'How is this different from just running more ads?',
        answer:
          'Ads without a strong offer and qualification process just generate more unqualified estimates. The system is built to fill the pipeline with the design/build projects worth your time.',
      },
      {
        question: 'What does the Full Curl Landscaping result actually reflect?',
        answer:
          'A partnership over time — offer, content, and demand generation working together, not a single tactic. See the full case study for the complete picture.',
      },
    ],
    proofCaseStudySlug: 'full-curl-landscaping',
  },
  {
    slug: 'concrete',
    scoreLeakLine: 'See where your project pipeline may be leaking.',
    name: 'Concrete & Hardscaping',
    h1: 'Become the Contractor Homeowners Trust for Their Next Major Outdoor Project.',
    eyebrow: 'For established concrete & hardscaping contractors',
    intro:
      'Driveways, patios, and retaining walls are high-consideration purchases — homeowners research before they call. The Local Dominance System is built to make your company the trusted choice by the time they do.',
    primaryPain:
      'Large concrete and hardscape projects are considered purchases — homeowners compare contractors and look at real project photos before ever picking up the phone.',
    economics: [
      'Driveways, patios, and retaining walls are big-ticket, infrequent purchases — the offer and proof need to earn trust before the first call.',
      'Capacity planning matters — these are longer projects, so the pipeline needs to be qualified, not just full.',
      'Before/after proof and real project photography do more of the convincing than almost any claim you could make.',
    ],
    offerExamples: [
      {
        name: 'Property Hardscape Planning Assessment',
        description:
          'Evaluate site conditions, intended use, drainage considerations, material options, scope, and budget before project design begins.',
      },
      {
        name: 'Project Scope & Buildability Review',
        description:
          "Help homeowners determine whether their patio, driveway, retaining wall, or outdoor structure is realistic before moving into design.",
      },
      {
        name: 'Priority Installation Window',
        description:
          'Allow qualified projects to secure genuine upcoming production availability when capacity is limited.',
      },
    ],
    seasonality:
      'Outdoor project season is compressed in colder climates — the system is built to fill the pipeline before the season starts, not scramble once it opens.',
    projectExamples: [
      'Driveway replacements',
      'Patio and outdoor living installs',
      'Retaining wall projects',
      'Full hardscape packages',
    ],
    faq: [
      {
        question: 'These are big, infrequent projects — how does the system account for that?',
        answer:
          'Qualification is built into the conversion path so the pipeline is filled with homeowners genuinely ready for a major project, not just window shoppers.',
      },
      {
        question: 'How important is project photography?',
        answer:
          'Very — before/after proof is one of the strongest trust signals for a purchase this size, and it\'s built into the Authority Engine component.',
      },
    ],
  },
];

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages.find((i) => i.slug === slug);
}
