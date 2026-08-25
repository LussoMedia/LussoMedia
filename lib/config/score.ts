// Centralized Local Dominance Score configuration (Part 10).
// All scoring logic lives in lib/scoring.ts and reads only from this file —
// nothing here should ever be duplicated into a component.

export type ScoreCategory =
  | 'Local Visibility'
  | 'Offer Strength'
  | 'Conversion Infrastructure'
  | 'Authority'
  | 'Reputation'
  | 'Demand Generation'
  | 'Lead Handling'
  | 'Measurement';

export const categories: ScoreCategory[] = [
  'Local Visibility',
  'Offer Strength',
  'Conversion Infrastructure',
  'Authority',
  'Reputation',
  'Demand Generation',
  'Lead Handling',
  'Measurement',
];

export interface ScoreOption {
  label: string;
  points: number; // 0-3
}

export interface ScoreQuestion {
  id: string;
  category: ScoreCategory;
  question: string;
  options: ScoreOption[];
}

const scale4 = (labels: string[]): ScoreOption[] =>
  labels.map((label, i) => ({ label, points: i }));

export const scoreQuestions: ScoreQuestion[] = [
  {
    id: 'local-search',
    category: 'Local Visibility',
    question: 'When someone in your area searches for your service, how do you show up?',
    options: scale4([
      "We don't show up / not sure",
      'We show up occasionally, low on the page',
      'We show up consistently in the map pack or top results',
      "We're consistently the top result or top map pack listing",
    ]),
  },
  {
    id: 'offer-clarity',
    category: 'Offer Strength',
    question: 'How would you describe your current offer to a new customer?',
    options: scale4([
      '"Free estimate" — same as every competitor',
      'We have some differentiation but it\'s not clearly stated anywhere',
      'We have a clear, differentiated offer stated on our website',
      'We have a strong, tested offer we lead every campaign with',
    ]),
  },
  {
    id: 'website-purpose',
    category: 'Conversion Infrastructure',
    question: 'What does your website do when someone lands on it?',
    options: scale4([
      "It's outdated or hard to use on mobile",
      'It looks fine but has a generic "Contact Us" CTA',
      'It has clear service pages and a real CTA',
      'It has a conversion-first structure with qualification built in',
    ]),
  },
  {
    id: 'lead-capture',
    category: 'Conversion Infrastructure',
    question: 'How do prospects actually request an estimate or ask a question?',
    options: scale4([
      'Phone call only, no online path',
      'A generic contact form',
      'A form plus click-to-call, tracked',
      'Multiple conversion paths, all tracked to source',
    ]),
  },
  {
    id: 'content-consistency',
    category: 'Authority',
    question: 'How consistently does your business publish content (video, photos, project updates)?',
    options: scale4([
      'Rarely or never',
      'A few times a year',
      'Monthly',
      'Weekly or more, with a real content system',
    ]),
  },
  {
    id: 'review-volume',
    category: 'Reputation',
    question: 'How many Google reviews have you gotten in the last 90 days?',
    options: scale4(['0', '1–3', '4–10', '10+']),
  },
  {
    id: 'review-process',
    category: 'Reputation',
    question: 'Do you have a system for asking every customer for a review?',
    options: scale4([
      'No, it happens randomly if at all',
      'We ask sometimes, no formal process',
      'We have a manual process most of the team follows',
      'We have an automated, consistent review request system',
    ]),
  },
  {
    id: 'paid-demand',
    category: 'Demand Generation',
    question: 'How does your business generate new customer demand today?',
    options: scale4([
      'Referrals and word of mouth only',
      'Some organic social/SEO, no paid',
      'Paid ads running, but performance is unclear',
      'Paid ads running with clear cost-per-lead tracking',
    ]),
  },
  {
    id: 'ad-strategy',
    category: 'Demand Generation',
    question: 'If you run paid ads, how would you describe the strategy behind them?',
    options: scale4([
      "We don't run ads",
      'Boosted posts / no real targeting strategy',
      'Some targeting and creative strategy',
      'Ongoing testing, retargeting, and optimization',
    ]),
  },
  {
    id: 'lead-response',
    category: 'Lead Handling',
    question: 'How fast does your team typically respond to a new lead?',
    options: scale4([
      'Whenever someone gets to it — no set standard',
      'Same day, usually',
      'Within an hour during business hours',
      'Immediate response with a defined follow-up sequence',
    ]),
  },
  {
    id: 'lead-followup',
    category: 'Lead Handling',
    question: 'What happens to a lead that doesn\'t answer the phone?',
    options: scale4([
      'Nothing — we move on',
      'One follow-up call, then we move on',
      'A few follow-up attempts across a few days',
      'A structured multi-touch follow-up sequence (call, text, email)',
    ]),
  },
  {
    id: 'measurement',
    category: 'Measurement',
    question: 'How do you know what your marketing is actually producing in revenue?',
    options: scale4([
      "We don't track it",
      'We track leads, not revenue',
      'We track leads and roughly estimate revenue',
      'We track cost per qualified opportunity, close rate, and revenue by source',
    ]),
  },
];

export interface ScoreBand {
  min: number;
  max: number;
  label: string;
  description: string;
}

export const scoreBands: ScoreBand[] = [
  {
    min: 0,
    max: 39,
    label: 'Growth Infrastructure Missing',
    description: 'The core pieces of a customer-acquisition system aren\'t in place yet.',
  },
  {
    min: 40,
    max: 59,
    label: 'Growth Is Fragmented',
    description: 'Some pieces exist, but they aren\'t connected into a system.',
  },
  {
    min: 60,
    max: 79,
    label: 'Strong Foundation, Significant Leaks',
    description: 'The foundation is solid — a few specific leaks are limiting growth.',
  },
  {
    min: 80,
    max: 100,
    label: 'Strong Local Position',
    description: 'You\'re well-positioned locally. The opportunity now is expansion and optimization.',
  },
];

export function getBand(score: number): ScoreBand {
  return scoreBands.find((b) => score >= b.min && score <= b.max) ?? scoreBands[0];
}
