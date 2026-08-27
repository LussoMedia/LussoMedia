import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail, sendPlaybookDeliveryEmail } from '@/lib/email';
import { playbookRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientKey } from '@/lib/rateLimit';
import { stripControlChars } from '@/lib/sanitizeText';
import { upsertContact, BREVO_LISTS } from '@/lib/brevo';

const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour, per client

export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req);
  const { allowed } = checkRateLimit(`playbook:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = playbookRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const { firstName, email, utm, companyFax } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but don't actually send an email or sync a contact.
  if (companyFax) {
    return NextResponse.json({ ok: true, sent: false });
  }

  const safeFirstName = stripControlChars(firstName);

  const { sent } = await sendLeadEmail(`New Playbook Lead — ${safeFirstName}`, [
    { label: 'First Name', value: safeFirstName },
    { label: 'Email', value: email },
    { label: 'UTM Source', value: utm.utm_source || '' },
    { label: 'UTM Medium', value: utm.utm_medium || '' },
    { label: 'UTM Campaign', value: utm.utm_campaign || '' },
    { label: 'Submitted At', value: new Date().toISOString() },
  ]);

  // Syncs the contact into Brevo's playbook-leads list. Awaited (not
  // fire-and-forget) so `delivered` below reflects whether the submission
  // actually landed somewhere real, matching the application funnel's
  // delivery-verification pattern.
  const brevoResult = await upsertContact({
    email,
    attributes: {
      FIRSTNAME: safeFirstName,
      LEAD_SOURCE: 'playbook',
    },
    listIds: [BREVO_LISTS.playbookLeads],
  }).catch((err) => {
    console.error('[brevo] Playbook lead sync failed', err);
    return { ok: false as const };
  });

  const delivered = sent || brevoResult.ok;

  if (!delivered) {
    return NextResponse.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
  }

  // Best-effort — the thank-you page's direct download link is the primary
  // delivery path and never waits on this.
  sendPlaybookDeliveryEmail(email, safeFirstName).catch((err) =>
    console.error('[email] Playbook delivery email failed', err)
  );

  return NextResponse.json({ ok: true, sent });
}
