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
  // Field Guide integration prep (Phase 3, Part 28). Max 3 slugs into
  // lib/config/fieldGuides.ts. Left undefined on every industry until
  // Phase 4 has real, relevant guides — IndustryPageTemplate resolves this
  // against published guides and only renders the section when at least
  // one resolves, so no empty placeholders ever show.
  relatedFieldGuideSlugs?: string[];
  // Phase 4H, generalized in Phase 4J — a single, restrained inline link
  // to one industry-specific Field Guide, distinct from
  // `relatedFieldGuideSlugs` above (which renders a full 3-column "Growth
  // Strategies" module and is intentionally still inactive everywhere —
  // one guide doesn't justify that module). Rendered as one plain text
  // link under the economics section, nothing more. Left undefined on
  // every industry until a genuinely relevant guide exists for it.
  // Renamed from `economicsFieldGuide` (Phase 4H) once a third industry
  // (HVAC) confirmed the name had outgrown its original single-purpose
  // meaning — no behavior change, same single-link treatment.
  contextualFieldGuide?: { label?: string; title: string; href: string };
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
    // Phase 4J — third industry-specific Field Guide, using the newly
    // generalized `contextualFieldGuide` field.
    contextualFieldGuide: {
      title: 'The HVAC Demand Calendar — Market Around Capacity, Not Just Weather',
      href: '/resources/hvac-demand-calendar',
    },
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
    // Phase 4I — second industry-specific Field Guide. Migrated to
    // `contextualFieldGuide` in Phase 4J (see field comment) with zero
    // visible change — same slug, same title, same single-link treatment.
    contextualFieldGuide: {
      title: 'The 3 Types of Plumbing Demand — and Why They Need Different Campaigns',
      href: '/resources/plumbing-types-of-demand',
    },
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
    // Phase 4H — first industry-specific Field Guide, restrained inline
    // link only (see the interface comment above for why this isn't the
    // full relatedFieldGuideSlugs module). Migrated to `contextualFieldGuide`
    // in Phase 4J with zero visible change.
    contextualFieldGuide: {
      title: 'How Landscaping Companies Should Choose What to Advertise',
      href: '/resources/landscaping-what-to-advertise',
    },
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
  {
    slug: 'electrical',
    scoreLeakLine: 'See where your electrical growth system may be leaking.',
    name: 'Electrical',
    h1: 'Become the Electrician Homeowners Trust With Bigger Jobs.',
    eyebrow: 'For established electrical contractors',
    intro:
      'Panel upgrades, EV charger installs, and whole-home rewires carry the margin — but most electrical marketing is built around service calls. The Local Dominance System is built to put your company in front of homeowners planning the bigger project, not just the one with a tripped breaker.',
    primaryPain:
      'Service and troubleshooting calls come in reliably, but panel upgrades, EV charger installs, and larger electrical projects don\'t get searched for with the same urgency — so they go to whoever homeowners trust most by the time they\'re ready.',
    economics: [
      'Panel upgrades, EV charger installs, and rewires carry far better margin than a single service call, but need their own offer and funnel to surface consistently.',
      'Trust and licensing credibility matter more here than almost any other trade — homeowners are inviting someone into their electrical system.',
      'Commercial and light-commercial work can meaningfully change the revenue mix if the acquisition system is built to capture it.',
    ],
    offerExamples: [
      {
        name: 'Whole-Home Electrical Safety Assessment',
        description:
          'A structured inspection covering panel capacity, code compliance, and safety risks, with clear next-step recommendations.',
      },
      {
        name: 'EV Charger Readiness Evaluation',
        description:
          'Evaluate panel capacity and wiring needs for homeowners considering an EV charger install, with transparent scope and pricing before work begins.',
      },
      {
        name: 'Panel Upgrade Priority Scheduling',
        description:
          'Fast-track qualified homeowners dealing with an outdated or at-capacity panel when installation capacity allows.',
      },
    ],
    seasonality:
      'Demand is steadier year-round than most trades, with predictable bumps around storm season (service calls) and EV/home-renovation cycles (bigger installs) — the system is built to capture both without over-indexing on one.',
    projectExamples: [
      'Panel upgrades and replacements',
      'EV charger installations',
      'Whole-home rewires',
      'Generator and backup power installs',
    ],
    faq: [
      {
        question: 'We already get plenty of service calls — why does this matter?',
        answer:
          'Service calls rarely lead homeowners back for a panel upgrade or EV charger install on their own. The system is built to capture the bigger-ticket work that service calls alone don\'t generate.',
      },
      {
        question: 'Do you help us market EV charger installs specifically?',
        answer:
          'Yes — EV charger demand is one of the fastest-growing categories in residential electrical work, and the offer and funnel are built to target it directly where it makes sense for your market.',
      },
    ],
  },
  {
    slug: 'remodeling',
    scoreLeakLine: 'See where your remodeling pipeline may be leaking.',
    name: 'Remodeling',
    h1: 'Fill Your Pipeline With the Remodeling Projects Worth Building.',
    eyebrow: 'For established remodeling & renovation contractors',
    intro:
      'Kitchen and bath remodels, additions, and whole-home renovations are considered purchases — homeowners research extensively and compare contractors for weeks before they ever pick up the phone. The Local Dominance System is built to make sure they find you first, and trust you most.',
    primaryPain:
      'Strong past work and referrals aren\'t enough on their own — homeowners planning a major remodel spend weeks researching online, and the pipeline is only as strong as the system that captures and qualifies that research.',
    economics: [
      'Remodeling projects are high-ticket and infrequent — the offer, proof, and qualification process all need to earn trust well before the first estimate.',
      'Design/build capacity is usually the real constraint, so the pipeline needs to be filled with qualified projects, not just volume.',
      'Portfolio and before/after proof carry more weight here than almost any claim — homeowners are trying to picture their own home.',
    ],
    offerExamples: [
      {
        name: 'Remodel Planning & Scope Consultation',
        description:
          'A structured session connecting design goals, budget range, timeline, and project scope before a homeowner commits to a full estimate.',
      },
      {
        name: 'Design Deposit Priority',
        description:
          'Qualify serious homeowners by requiring a design or planning commitment before detailed estimating and scheduling begin.',
      },
      {
        name: 'Seasonal Production Window Priority',
        description:
          "Allow qualified projects to reserve upcoming production capacity when the contractor's schedule has genuine limited availability.",
      },
    ],
    seasonality:
      'Planning and research activity often runs months ahead of the actual build — the system is built to capture homeowners early in that research phase so the pipeline stays full well before ground breaks.',
    projectExamples: [
      'Kitchen and bathroom remodels',
      'Whole-home renovations',
      'Home additions',
      'Design/build project pipelines',
    ],
    faq: [
      {
        question: 'Our best work comes from referrals — why do we need this?',
        answer:
          'Referrals are valuable but unpredictable. The system is built to add a consistent, qualified pipeline of design/build projects alongside the referral relationships you\'ve already built.',
      },
      {
        question: 'How do you handle long sales cycles?',
        answer:
          'Follow-up and nurture are built into the Conversion Infrastructure component specifically because remodeling decisions take weeks or months, not days.',
      },
    ],
  },
  {
    slug: 'general-contractors',
    scoreLeakLine: 'See where your project pipeline may be leaking.',
    name: 'General Contracting',
    h1: 'Win More of the Projects Homeowners Are Already Comparing Bids On.',
    eyebrow: 'For established general contractors',
    intro:
      'Homeowners planning a major project — an addition, a full renovation, a ground-up build — get multiple bids before choosing. The Local Dominance System is built to make your company the trusted, credible option by the time those bids come in.',
    primaryPain:
      'Being the best builder in the market doesn\'t automatically mean being the most visible or most trusted one to homeowners quietly comparing contractors online before they ever request a bid.',
    economics: [
      'Project value varies widely — the offer, qualification, and follow-up process need to route the right-size projects to the right capacity.',
      'Trust and licensing credibility are the biggest lever — before/after proof, reviews, and completed-project content do more selling than any ad claim.',
      'Bid-to-win rate matters as much as lead volume — a system that fills the pipeline with poorly-qualified bids wastes estimating capacity.',
    ],
    offerExamples: [
      {
        name: 'Project Scope & Feasibility Consultation',
        description:
          'A structured conversation clarifying project goals, budget range, timeline, and buildability before a full bid is prepared.',
      },
      {
        name: 'Pre-Construction Planning Session',
        description:
          'Help homeowners understand permitting, scope, sequencing, and realistic cost ranges before committing to a full proposal.',
      },
      {
        name: 'Priority Bid Scheduling',
        description:
          'Fast-track estimating for qualified projects when the contractor\'s bidding and production capacity allows.',
      },
    ],
    seasonality:
      'Larger projects are planned well ahead of the build season — the system is built to keep the bid pipeline full year-round rather than compressed into a short window.',
    projectExamples: [
      'Home additions and structural renovations',
      'Ground-up custom builds',
      'Multi-trade renovation projects',
      'Design/build project pipelines',
    ],
    faq: [
      {
        question: 'We already win most of our bids — why do we need this?',
        answer:
          'A strong close rate on a thin pipeline still leaves capacity on the table. The system is built to fill the pipeline with more of the right-fit projects, not just more bids.',
      },
      {
        question: 'How do you help with project trust and credibility?',
        answer:
          'Authority and reputation are built into the system — before/after proof, reviews, and completed-project content are positioned specifically to build trust before the first bid conversation.',
      },
    ],
  },
];

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages.find((i) => i.slug === slug);
}
