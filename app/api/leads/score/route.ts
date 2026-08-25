import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/email';
import type { ScoreResult } from '@/lib/scoring';

interface ScoreLeadPayload {
  firstName: string;
  company: string;
  email: string;
  phone?: string;
  result: ScoreResult;
  utm?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  let body: ScoreLeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { firstName, company, email, phone, result, utm } = body;

  if (!firstName?.trim() || !company?.trim() || !email?.trim() || !result) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { sent } = await sendLeadEmail(`New Local Dominance Score Lead — ${company}`, [
    { label: 'Name', value: `${firstName} — ${company}` },
    { label: 'First Name', value: firstName },
    { label: 'Company', value: company },
    { label: 'Email', value: email },
    { label: 'Phone', value: phone || '' },
    { label: 'Overall Score', value: String(result.overall) },
    { label: 'Band', value: result.band.label },
    { label: 'Strongest Area', value: result.strongest },
    { label: 'Weakest Area', value: result.weakest },
    { label: 'Top 3 Growth Leaks', value: result.rankedWeakest.join(', ') },
    { label: 'Category Breakdown', value: result.categoryResults.map((c) => `${c.category}: ${c.score}`).join(' | ') },
    { label: 'UTM Source', value: utm?.utm_source || '' },
    { label: 'UTM Medium', value: utm?.utm_medium || '' },
    { label: 'UTM Campaign', value: utm?.utm_campaign || '' },
    { label: 'Submitted At', value: new Date().toISOString() },
  ]);

  // Always 200 to the client — an email delivery failure shouldn't block
  // the visitor's funnel experience. `sent` is logged server-side for
  // debugging; surfaced in the response only for local/dev visibility.
  return NextResponse.json({ ok: true, sent });
}
