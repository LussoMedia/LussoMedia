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
  },
];
