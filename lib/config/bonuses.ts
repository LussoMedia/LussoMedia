export interface Bonus {
  name: string;
  value: string;
  purpose: string;
  includes: string[];
  // Optional longer explainer, currently only used by the conversion
  // intensive — see components/BonusStack.tsx.
  whyItMatters?: string;
}

// Renamed from "Lead-to-Booked-Job Playbook" — that name now belongs to the
// public DIY lead magnet at /lead-to-booked-job-playbook. This bonus is the
// DWY (done-with-you) counterpart: personalized training delivered inside
// the Local Dominance System, not a document. Keeping both named
// "Lead-to-Booked-Job [X]" was creating exactly the confusion Part 7/12 of
// the playbook-funnel brief flags — never imply these are the same
// deliverable.
export const bonuses: Bonus[] = [
  {
    name: 'Lead-to-Booked-Job Conversion Intensive',
    value: '$2,500',
    purpose:
      'Personalized done-with-you conversion training for the team member responsible for handling incoming opportunities.',
    includes: [
      'Current lead-handling and conversion audit',
      'Company-specific response standards',
      'Qualification and discovery framework',
      'Buyer psychology and homeowner decision behavior',
      'Objection-handling principles',
      'Personalized lead-conversion workflow',
    ],
    whyItMatters:
      'Generating opportunities is only half of the equation. This helps the person responsible for handling those opportunities understand how buyers make decisions, communicate value more effectively, follow up with purpose, and move qualified homeowners toward the appropriate next step.',
  },
  {
    name: 'Past Customer Revenue Reactivation Campaign',
    value: '$1,500',
    purpose: 'For clients with useful historical customer data.',
    includes: [
      'Segmentation',
      'Campaign offer',
      'SMS and email sequence',
      'Call script',
      'Follow-up and tracking approach',
    ],
  },
  {
    name: 'Google Review Accelerator',
    value: '$750',
    purpose: 'Systematize getting more of the reviews you\'ve already earned.',
    includes: [
      'Direct review link',
      'SMS and email templates',
      'Staff ask script',
      'QR assets',
      'Job-completion process',
      'Review response guidance',
    ],
  },
];

export const totalAdditionalValue = '$4,750';
