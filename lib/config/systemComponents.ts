// The 7 components of the Lusso Local Dominance System.
// Used by both the homepage diagram overview and the deep-dive breakdown,
// so the mechanism only has to be defined once.

export interface SystemComponent {
  number: string;
  name: string;
  purpose: string;
  problem: string;
  installs: string[];
  whyItMatters: string;
  // Contextual objection handling (Part 9) — only components where a
  // common doubt naturally arises carry one.
  objection?: { question: string; answer: string };
  // Field Guide integration prep (Phase 3, Part 27). Left undefined on
  // every component until Phase 4 publishes a real, relevant guide —
  // SystemDeepDive only renders the "Related Field Guide" block when this
  // is set, so no empty placeholders ever show.
  relatedGuide?: { title: string; href: string; description: string };
  // Phase 4C: a component can outgrow a single related guide. Prefer this
  // over `relatedGuide` when ≥2 genuinely relevant guides exist — kept as a
  // separate field rather than replacing `relatedGuide` so single-guide
  // components don't need an unnecessary array wrapper.
  relatedGuides?: { title: string; href: string; description: string }[];
}

export const systemComponents: SystemComponent[] = [
  {
    number: '01',
    name: 'Market Intelligence',
    purpose: 'Find the highest-value growth opportunity.',
    problem:
      'Most contractors grow by instinct, not by data — spending time and money on the wrong service line or the wrong part of their market.',
    installs: [
      'Local market analysis',
      'Competitor research',
      'Service economics review',
      'Capacity assessment',
      'Campaign selection',
      'Growth priorities',
    ],
    whyItMatters:
      'Every dollar spent afterward is pointed at the opportunity most likely to produce a return, instead of a guess.',
    // Field Guide #8 (Phase 4H) — the first guide tied to Market
    // Intelligence, and directly about service/opportunity selection, not
    // offer creation, so it belongs here rather than under Offer Engineering.
    relatedGuide: {
      title: 'How Landscaping Companies Should Choose What to Advertise',
      href: '/resources/landscaping-what-to-advertise',
      description: "Don't advertise every service equally.",
    },
  },
  {
    number: '02',
    name: 'Offer Engineering',
    purpose: 'Give the market a stronger reason to choose you.',
    problem:
      'Generic "free estimate" positioning makes a strong contractor look identical to a weak one.',
    installs: [
      'Lusso prepares an initial offer recommendation',
      'Client validates operational and commercial realities',
      'Lusso builds the complete offer once approved',
    ],
    whyItMatters:
      'A sharper offer increases response and conversion before a single ad dollar is spent.',
    // Field Guide #2 and #3 (Phase 4B/4C) — both directly relevant to this
    // component; two genuinely related guides doesn't clutter the section.
    relatedGuides: [
      {
        title: 'The One Market, One Service, One Offer Framework',
        href: '/resources/one-market-one-service-one-offer',
        description: 'Concentrated messaging beats diluted advertising.',
      },
      {
        title: 'Why "10% Off" Isn’t a Home Service Offer',
        href: '/resources/why-10-percent-off-isnt-an-offer',
        description: 'A discount changes price. A strong offer changes perceived value.',
      },
    ],
  },
  {
    number: '03',
    name: 'Conversion Infrastructure',
    purpose: 'Turn attention into qualified inquiries.',
    problem:
      'Traffic arriving at a generic homepage with a "Contact Us" button converts a fraction of what it could.',
    installs: [
      'Conversion-first website framework',
      'Service pages',
      'Campaign landing pages',
      'Offer pages',
      'Qualification flow',
      'Clear CTAs and tracking',
      'Lead routing',
    ],
    whyItMatters:
      'This system is template and configuration driven, built and refined fast — not a bespoke 50-page site built from scratch for every client.',
    objection: {
      question: 'Already have a good website?',
      answer:
        "We don't rebuild assets simply to put our name on them. We evaluate the existing conversion path first and only replace or improve what is limiting performance.",
    },
    // Field Guide #4 (Phase 4D) — directly relevant to this component only.
    relatedGuide: {
      title: 'Stop Sending Paid Traffic to Your Homepage',
      href: '/resources/stop-sending-paid-traffic-to-your-homepage',
      description: 'Match one campaign promise to one conversion path.',
    },
  },
  {
    number: '04',
    name: 'Authority Engine',
    purpose: "Make the company's online presence match the quality of the operation.",
    problem:
      'A great operator with a thin or dated online presence loses trust to a worse operator who simply shows up more often.',
    installs: [
      '8–12 finished short-form content assets per month',
      'Mix determined by strategy and performance — direct-response, education, jobsite, before/after, testimonials, seasonal, and more',
    ],
    whyItMatters:
      'Consistent, credible presence compounds trust with everyone who sees it — not just the people who click an ad.',
    objection: {
      question: "Don't want to sound scripted on camera?",
      answer:
        "You don't have to. Creative can combine guided conversations, jobsite footage, expert commentary, scripted direct response, project showcases, and other formats based on what fits the brand and performs in the market.",
    },
    // Field Guide #7 (Phase 4G) — primary home chosen deliberately: this
    // component is about content/proof/online presence, which is exactly
    // what the guide teaches how to source; Reputation Engine (06) is
    // narrower (reviews/GBP specifically), so the guide is not duplicated
    // there. See docs/phase-4g-guide-7.md.
    relatedGuide: {
      title: 'The Job-to-Authority Flywheel',
      href: '/resources/job-to-authority-flywheel',
      description: 'A completed job should create proof that helps sell the next job.',
    },
  },
  {
    number: '05',
    name: 'Demand Engine',
    purpose: 'Put the right offer in front of the right market.',
    problem:
      "Running ads without a strong offer, a converting page, or clear tracking behind them wastes spend.",
    installs: [
      'Meta Ads',
      'Google Ads where economically appropriate',
      'Retargeting',
      'Direct-response creative and copy',
      'Audience strategy',
      'Ongoing optimization and creative testing',
      'Landing-page optimization',
    ],
    whyItMatters:
      "Lusso isn't a Meta Ads shop — this is one component of a system that makes ad spend perform.",
    objection: {
      question: 'Already running ads?',
      answer:
        "Good campaigns don't need to be thrown away. We audit what already exists, preserve what is working, and improve the offer, creative, targeting, tracking, or conversion path where the data shows a constraint.",
    },
    // Field Guide #6 (Phase 4F) — directly relevant to this component only.
    relatedGuide: {
      title: 'The 5 Awareness Levels in Home Service Advertising',
      href: '/resources/home-service-advertising-awareness-levels',
      description: 'The same ad should not be expected to persuade every prospect.',
    },
  },
  {
    number: '06',
    name: 'Reputation Engine',
    purpose: 'Give prospects more reasons to trust and choose the company.',
    problem: 'Thin or outdated review profiles quietly cost jobs to competitors with more social proof.',
    installs: [
      'Google Business Profile optimization',
      'Review-generation system (manual, migrating to NiceJob or equivalent as it scales)',
      'Review request copy',
      'QR assets',
      'Testimonial capture and proof integration',
    ],
    whyItMatters:
      'More recent, relevant reviews increase both conversion rate and the perceived risk of choosing anyone else.',
  },
  {
    number: '07',
    name: 'Revenue Intelligence',
    purpose: 'Understand what marketing is actually producing business.',
    problem: 'Vanity metrics — clicks, impressions, followers — don’t tell you what to fund next.',
    installs: [
      'Lead and qualified-opportunity tracking',
      'Cost per lead / cost per qualified opportunity',
      'Estimates, customers, revenue, average ticket',
      'Close rate, CAC, ROAS',
      'Creative performance and next tests',
      'Biweekly strategy cadence',
    ],
    whyItMatters:
      'Reporting is currently manual and tied to real business outcomes, not a live dashboard of vanity numbers.',
    objection: {
      question: "Don't know your close rate yet?",
      answer:
        "That's common. We establish the baseline and improve tracking so future decisions can be made against actual business outcomes instead of assumptions.",
    },
    // Field Guide #1 (Phase 4A) and #5 (Phase 4E) — diagnosis and
    // measurement are different roles, both genuinely belong here.
    relatedGuides: [
      {
        title: "Why More Leads Won't Fix a Broken Growth System",
        href: '/resources/why-more-leads-wont-fix-growth',
        description: 'Find the constraint before increasing demand.',
      },
      {
        title: 'The Lead-to-Booked-Job System',
        href: '/resources/lead-to-booked-job-system',
        description: 'Generating the lead is only the first handoff.',
      },
    ],
  },
];
