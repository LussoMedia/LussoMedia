import { industries } from './industries';

export type FieldType = 'text' | 'url' | 'tel' | 'email' | 'select' | 'radio';

export interface ApplicationField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface ApplicationStep {
  id: string;
  title: string;
  description?: string;
  fields: ApplicationField[];
}

export const REVENUE_RANGES = [
  'Under $500K',
  '$500K–$1M',
  '$1M–$2.5M',
  '$2.5M–$5M',
  '$5M+',
];

export const JOB_VALUE_RANGES = [
  'Under $1,000',
  '$1,000–$5,000',
  '$5,000–$15,000',
  '$15,000–$50,000',
  '$50,000+',
];

export const MARGIN_RANGES = ['Under 20%', '20–35%', '35–50%', '50%+', 'Not sure'];

export const TEAM_SIZE_RANGES = ['1–3', '4–9', '10–24', '25+'];

export const LEAD_VOLUME_RANGES = ['0–10', '11–30', '31–75', '75+'];

export const MEDIA_SPEND_RANGES = ['$0 (none currently)', 'Under $2,500/mo', '$2,500–$10,000/mo', '$10,000+/mo'];

export const applicationSteps: ApplicationStep[] = [
  {
    id: 'business',
    title: 'Your Business',
    fields: [
      { id: 'contactName', label: 'Your Name', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'tel', required: true },
      { id: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'website', label: 'Website', type: 'url', placeholder: 'https://', required: false },
      {
        id: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        options: [...industries.map((i) => i.name), 'Other home-service business'],
      },
      { id: 'serviceArea', label: 'Primary Service Area', type: 'text', required: true, placeholder: 'City, State' },
    ],
  },
  {
    id: 'economics',
    title: 'Business Economics',
    fields: [
      { id: 'monthlyRevenue', label: 'Approximate Monthly Revenue', type: 'select', required: true, options: REVENUE_RANGES },
      { id: 'primaryServiceToGrow', label: 'Primary Service You Want to Grow', type: 'text', required: true },
      { id: 'avgJobValue', label: 'Average Job Value', type: 'select', required: true, options: JOB_VALUE_RANGES },
      { id: 'grossMargin', label: 'Approximate Gross Margin', type: 'select', required: true, options: MARGIN_RANGES },
      { id: 'teamSize', label: 'Number of Crews / Technicians / Team Members', type: 'select', required: true, options: TEAM_SIZE_RANGES },
    ],
  },
  {
    id: 'acquisition',
    title: 'Current Customer Acquisition',
    fields: [
      {
        id: 'primarySource',
        label: 'Primary Customer Source Today',
        type: 'select',
        required: true,
        options: ['Referrals / word of mouth', 'Paid ads', 'Organic search / SEO', 'Repeat customers', 'A mix, fairly even'],
      },
      { id: 'monthlyLeadVolume', label: 'Approximate Monthly Lead Volume', type: 'select', required: true, options: LEAD_VOLUME_RANGES },
      { id: 'currentMediaSpend', label: 'Current Paid Media Spend', type: 'select', required: true, options: MEDIA_SPEND_RANGES },
      {
        id: 'websiteStatus',
        label: 'Website / Funnel Status',
        type: 'select',
        required: true,
        options: ['No real website', 'Basic website, not built to convert', 'Decent website', 'Strong, converting website'],
      },
      {
        id: 'leadFollowUp',
        label: 'Who Follows Up With Leads?',
        type: 'select',
        required: true,
        options: ['No one consistently', 'Owner/operator', 'A dedicated salesperson', 'A sales team with a process'],
      },
    ],
  },
  {
    id: 'capacity',
    title: 'Capacity & Goals',
    fields: [
      {
        id: 'capacity',
        label: 'Current Capacity for Additional Work',
        type: 'select',
        required: true,
        options: ['No additional capacity right now', 'Some room', 'Significant room', 'Actively trying to fill capacity'],
      },
      { id: 'growthConstraint', label: 'Biggest Growth Constraint', type: 'text', required: true },
      { id: 'ninetyDayGoal', label: '90-Day Goal', type: 'text', required: true },
      {
        id: 'startTimeframe',
        label: 'Desired Start Timeframe',
        type: 'select',
        required: true,
        options: ['Immediately', 'Within 30 days', 'Within 90 days', 'Just exploring'],
      },
    ],
  },
  {
    id: 'investment',
    title: 'Investment Readiness',
    description:
      'If the economics make sense, are you prepared to invest $7,000+/month plus advertising into building and operating your acquisition system?',
    fields: [
      {
        id: 'investmentReadiness',
        label: '',
        type: 'radio',
        required: true,
        options: ['Yes', 'Potentially, if the numbers make sense', 'No'],
      },
    ],
  },
];

export const totalSteps = applicationSteps.length;
