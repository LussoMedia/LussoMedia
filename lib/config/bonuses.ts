export interface Bonus {
  name: string;
  value: string;
  purpose: string;
  includes: string[];
}

export const bonuses: Bonus[] = [
  {
    name: 'Lead-to-Booked-Job Playbook',
    value: '$1,250',
    purpose: "Help your team capitalize on the opportunities Lusso generates.",
    includes: [
      'Lead response SOP',
      'Call framework',
      'SMS and voicemail follow-up',
      'No-answer follow-up sequence',
      'Estimate follow-up',
      'Pipeline standards',
    ],
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

export const totalAdditionalValue = '$3,500';
