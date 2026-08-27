import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail, sendApplicationConfirmationEmail } from '@/lib/email';
import { routeApplication } from '@/lib/applicationRouting';
import { applicationRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientKey } from '@/lib/rateLimit';
import { stripControlChars } from '@/lib/sanitizeText';
import { upsertContact, BREVO_LISTS } from '@/lib/brevo';

const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per client

const TIER_LABELS: Record<'A' | 'B' | 'C', string> = {
  A: 'A - Strong Fit',
  B: 'B - Manual Review',
  C: 'C - Not Ready',
};

// The Notion "Local Dominance Applications" database's select options are
// comma-free (see EMAIL_SETUP.md). A few of the application's option
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
  const clientKey = getClientKey(req);
  const { allowed } = checkRateLimit(`application:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = applicationRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const { values, utm, companyFax } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but don't actually send an email or compute/expose a tier.
  if (companyFax) {
    return NextResponse.json({ ok: true, sent: false, tier: 'C' });
  }

  // Routing is recomputed server-side rather than trusting a client-sent
  // tier, so the email always reflects the same rules as the site.
  const { tier, reasons } = routeApplication(values);

  const safeCompanyName = stripControlChars(values.companyName);

  const { sent } = await sendLeadEmail(`New Local Dominance Application (${TIER_LABELS[tier]}) — ${safeCompanyName}`, [
    { label: 'Company', value: safeCompanyName },
    { label: 'Contact Name', value: stripControlChars(values.contactName || '') },
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

  // Syncs the contact into Brevo's "Local Dominance Applications" list,
  // marking APPLICATION_STATUS complete — this also cancels the
  // abandonment-recovery automation for this contact if it was running
  // (Part 17; see BREVO_SETUP.md for the Brevo-side workflow). Awaited
  // (unlike the fire-and-forget pattern used elsewhere) because this is one
  // of the two channels that determine whether the submission actually
  // landed anywhere — see `delivered` below.
  const brevoResult = await upsertContact({
    email: values.email,
    attributes: {
      FIRSTNAME: stripControlChars(values.contactName || ''),
      CONTACT_NAME: stripControlChars(values.contactName || ''),
      COMPANY: safeCompanyName,
      SMS: values.phone || '',
      INDUSTRY: values.industry || '',
      MONTHLY_REVENUE: values.monthlyRevenue || '',
      INVESTMENT_READINESS: sanitizeSelect(values.investmentReadiness || ''),
      TIER: TIER_LABELS[tier],
      APPLICATION_STATUS: 'completed',
    },
    listIds: [BREVO_LISTS.applications],
  }).catch((err) => {
    console.error('[brevo] Application sync failed', err);
    return { ok: false as const };
  });

  // The application only counts as "received" if it actually landed
  // somewhere real — the admin notification email or the CRM record. If
  // both channels are unconfigured or failing, the client must not show a
  // success screen (see app/apply — the review page is not shown unless
  // this is true).
  const delivered = sent || brevoResult.ok;

  if (!delivered) {
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  // Best-effort confirmation to the applicant — never gates the response;
  // a failure here doesn't change what the visitor sees on-page.
  sendApplicationConfirmationEmail(values.email, stripControlChars(values.contactName || '')).catch((err) =>
    console.error('[email] Application confirmation email failed', err)
  );

  return NextResponse.json({ ok: true, sent, tier });
}
