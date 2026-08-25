import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/email';
import { routeApplication } from '@/lib/applicationRouting';

const TIER_LABELS: Record<'A' | 'B' | 'C', string> = {
  A: 'A - Strong Fit',
  B: 'B - Manual Review',
  C: 'C - Not Ready',
};

// The Notion "Local Dominance Applications" database's select options are
// comma-free (see NOTION_SETUP.md). A few of the application's option
// labels (chosen for readability on the site) do contain commas — mapping
// them here means what you copy from the email matches an existing Notion
// dropdown option exactly, instead of creating a near-duplicate.
const SELECT_SANITIZE: Record<string, string> = {
  'A mix, fairly even': 'A mix - fairly even',
  'Basic website, not built to convert': 'Basic website - not built to convert',
  'Strong, converting website': 'Strong - converting website',
  'Potentially, if the numbers make sense': 'Potentially - if the numbers make sense',
};

function sanitizeSelect(value: string): string {
  return SELECT_SANITIZE[value] ?? value;
}

export async function POST(req: NextRequest) {
  let body: { values?: Record<string, string>; utm?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const values = body.values ?? {};
  const utm = body.utm ?? {};

  if (!values.companyName?.trim() || !values.email?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Routing is recomputed server-side rather than trusting a client-sent
  // tier, so the email always reflects the same rules as the site.
  const { tier, reasons } = routeApplication(values);

  const { sent } = await sendLeadEmail(`New Local Dominance Application (${TIER_LABELS[tier]}) — ${values.companyName}`, [
    { label: 'Company', value: values.companyName },
    { label: 'Contact Name', value: values.contactName || '' },
    { label: 'Email', value: values.email },
    { label: 'Phone', value: values.phone || '' },
    { label: 'Website', value: values.website || '' },
    { label: 'Industry', value: values.industry || '' },
    { label: 'Service Area', value: values.serviceArea || '' },
    { label: 'Monthly Revenue', value: values.monthlyRevenue || '' },
    { label: 'Primary Service to Grow', value: values.primaryServiceToGrow || '' },
    { label: 'Avg Job Value', value: values.avgJobValue || '' },
    { label: 'Gross Margin', value: values.grossMargin || '' },
    { label: 'Team Size', value: values.teamSize || '' },
    { label: 'Primary Source', value: sanitizeSelect(values.primarySource || '') },
    { label: 'Monthly Lead Volume', value: values.monthlyLeadVolume || '' },
    { label: 'Current Media Spend', value: values.currentMediaSpend || '' },
    { label: 'Website Status', value: sanitizeSelect(values.websiteStatus || '') },
    { label: 'Lead Follow-Up', value: values.leadFollowUp || '' },
    { label: 'Capacity', value: values.capacity || '' },
    { label: 'Growth Constraint', value: values.growthConstraint || '' },
    { label: '90-Day Goal', value: values.ninetyDayGoal || '' },
    { label: 'Start Timeframe', value: values.startTimeframe || '' },
    { label: 'Investment Readiness', value: sanitizeSelect(values.investmentReadiness || '') },
    { label: 'Tier', value: TIER_LABELS[tier] },
    { label: 'Tier Reasons', value: reasons.join('; ') },
    { label: 'UTM Source', value: utm.utm_source || '' },
    { label: 'UTM Medium', value: utm.utm_medium || '' },
    { label: 'UTM Campaign', value: utm.utm_campaign || '' },
    { label: 'Submitted At', value: new Date().toISOString() },
  ]);

  return NextResponse.json({ ok: true, sent, tier });
}
