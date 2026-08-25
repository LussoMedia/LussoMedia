import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/email';
import { computeScore } from '@/lib/scoring';
import { scoreRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientKey } from '@/lib/rateLimit';
import { stripControlChars } from '@/lib/sanitizeText';

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

  const { sent } = await sendLeadEmail(`New Local Dominance Score Lead — ${safeCompany}`, [
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

  // Always 200 to the client — an email delivery failure shouldn't block
  // the visitor's funnel experience. `sent` is logged server-side for
  // debugging; surfaced in the response only for local/dev visibility.
  return NextResponse.json({ ok: true, sent });
}
