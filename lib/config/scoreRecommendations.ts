import { ScoreCategory } from './score';

export interface Recommendation {
  priority: string;
  actions: string[];
}

export const recommendations: Record<ScoreCategory, Recommendation> = {
  'Local Visibility': {
    priority: 'Close the gap between your reputation and your search presence.',
    actions: [
      'Optimize your Google Business Profile with real service categories and service-area coverage',
      'Build or clean up dedicated pages for each core service',
      'Get consistent citations across the directories your market actually uses',
    ],
  },
  'Offer Strength': {
    priority: 'Give the market a clearer reason to choose you over the next search result.',
    actions: [
      'Define one specific, differentiated offer instead of a generic "free estimate"',
      'State the offer clearly on your homepage and every landing page',
      'Test the offer in a single campaign before rolling it out everywhere',
    ],
  },
  'Conversion Infrastructure': {
    priority: 'Turn more of your existing traffic into qualified inquiries.',
    actions: [
      'Replace generic "Contact Us" CTAs with a real qualification path',
      'Add tracked, multiple ways to convert (form, call, text)',
      'Rebuild the pages your ads actually land on',
    ],
  },
  Authority: {
    priority: 'Make your online presence match the quality of your work.',
    actions: [
      'Establish a consistent monthly content production system',
      'Show real jobs, real team, and real before/after proof',
      'Repurpose content across the platforms your customers actually use',
    ],
  },
  Reputation: {
    priority: 'Systematize getting the reviews you\'ve already earned.',
    actions: [
      'Install a review-request process for every completed job',
      'Respond to every review, positive or negative',
      'Make review requests part of your job-completion workflow, not an afterthought',
    ],
  },
  'Demand Generation': {
    priority: 'Put your offer in front of more of the right people, on purpose.',
    actions: [
      'Move from boosted posts to a real paid-acquisition strategy',
      'Add retargeting for everyone who visits but doesn\'t convert',
      'Set a media budget tied to your ticket size and close rate, not a guess',
    ],
  },
  'Lead Handling': {
    priority: 'Stop losing opportunities you already paid to generate.',
    actions: [
      'Set a response-time standard for new leads',
      'Build a structured, multi-touch follow-up sequence for no-answers',
      'Track where leads fall out of your pipeline',
    ],
  },
  Measurement: {
    priority: 'Know what your marketing is actually producing, not just what it costs.',
    actions: [
      'Track leads through to estimates, customers, and revenue by source',
      'Calculate cost per qualified opportunity, not just cost per lead',
      'Review the numbers on a fixed cadence, not only when something feels off',
    ],
  },
};
