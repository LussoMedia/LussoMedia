import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail, sendVisitorResultsEmail } from '@/lib/email';
import { computeScore } from '@/lib/scoring';
import { scoreRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientKey } from '@/lib/rateLimit';
import { stripControlChars } from '@/lib/sanitizeText';
import { recommendations } from '@/lib/config/scoreRecommendations';
import { buildInterpretation } from '@/lib/scoreInterpretation';
import { upsertContact, BREVO_LISTS } from '@/lib/brevo';

const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per client

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req);
  const { allowed } = checkRateLimit(`score:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = scoreRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const { firstName, company, email, phone, answers, utm, companyFax } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but don't actually send an email.
  if (companyFax) {
    return NextResponse.json({ ok: true, sent: false });
  }

  // Recomputed server-side from raw answers rather than trusting a
  // client-provided score, for the same reason application tier is
  // recomputed server-side: a client can send anything in a JSON body.
  const result = computeScore(answers);

  const safeFirstName = stripControlChars(firstName);
  const safeCompany = stripControlChars(company);
  // Company is now optional at capture (reduced-friction ascension flow) —
  // fall back to something readable in the admin-notification subject line
  // rather than a blank/dash.
  const companyLabel = safeCompany || 'Unknown Company';

  const { sent } = await sendLeadEmail(`New Local Dominance Score Lead — ${companyLabel}`, [
    { label: 'Name', value: `${safeFirstName} — ${safeCompany}` },
    { label: 'First Name', value: safeFirstName },
    { label: 'Company', value: safeCompany },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone || '' },
    { label: 'Overall Score', value: String(result.overall) },
    { label: 'Band', value: result.band.label },
    { label: 'Strongest Area', value: result.strongest },
    { label: 'Weakest Area', value: result.weakest },
    { label: 'Top 3 Growth Leaks', value: result.rankedWeakest.join(', ') },
    { label: 'Category Breakdown', value: result.categoryResults.map((c) => `${c.category}: ${c.score}`).join(' | ') },
    { label: 'UTM Source', value: utm.utm_source || '' },
    { label: 'UTM Medium', value: utm.utm_medium || '' },
    { label: 'UTM Campaign', value: utm.utm_campaign || '' },
    { label: 'Submitted At', value: new Date().toISOString() },
  ]);

  // Best-effort copy to the visitor themselves (Part 15 — "Email My
  // Results"), separate from and non-blocking on the admin notification.
  const topLeak = recommendations[result.weakest];
  sendVisitorResultsEmail(
    email,
    `${safeFirstName ? `${safeFirstName}, y` : 'Y'}our Local Dominance Score: ${result.overall}/100`,
    [
      { label: 'Overall Score', value: `${result.overall} / 100 — ${result.band.label}` },
      { label: 'Strongest Area', value: result.strongest },
      { label: 'Biggest Growth Leak', value: result.weakest },
      { label: 'What This Means', value: buildInterpretation(result) },
      { label: 'Recommended Priority', value: topLeak.priority },
      { label: 'Immediate Action', value: topLeak.actions[0] },
      { label: 'Full Breakdown', value: 'https://illussomedia.com/local-dominance-score' },
      // The email-capture step now promises "your score, biggest growth
      // constraints, and the 90-Day Lead-to-Booked-Job Playbook" — keep
      // that promise honest by actually including the playbook link here,
      // not just a generic "Next Step".
      { label: 'Get the 90-Day Lead-to-Booked-Job Playbook', value: 'https://illussomedia.com/lead-to-booked-job-playbook' },
      { label: 'See If Your Market Qualifies', value: 'https://illussomedia.com/apply' },
    ]
  ).catch((err) => console.error('[email] Visitor results email failed', err));

  // Syncs the contact into Brevo's "Local Dominance Score Leads" list —
  // this is the data side of the nurture sequence (Part 16); the actual
  // 7-email automation is built in Brevo itself. See BREVO_SETUP.md.
  upsertContact({
    email,
    attributes: {
      FIRSTNAME: safeFirstName,
      COMPANY: safeCompany,
      SMS: phone || '',
      SCORE_OVERALL: result.overall,
      SCORE_BAND: result.band.label,
      SCORE_STRONGEST: result.strongest,
      SCORE_WEAKEST: result.weakest,
      SCORE_TOP_LEAKS: result.rankedWeakest.join(', '),
    },
    listIds: [BREVO_LISTS.scoreLeads],
  }).catch((err) => console.error('[brevo] Score lead sync failed', err));

  // Always 200 to the client — an email delivery failure shouldn't block
  // the visitor's funnel experience. `sent` is logged server-side for
  // debugging; surfaced in the response only for local/dev visibility.
  return NextResponse.json({ ok: true, sent });
}
