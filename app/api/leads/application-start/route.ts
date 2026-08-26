import { NextRequest, NextResponse } from 'next/server';
import { applicationStartSchema } from '@/lib/validation';
import { checkRateLimit, getClientKey } from '@/lib/rateLimit';
import { stripControlChars } from '@/lib/sanitizeText';
import { upsertContact, BREVO_LISTS } from '@/lib/brevo';

const RATE_LIMIT = 8; // slightly higher than the submit endpoints — this
const RATE_WINDOW_MS = 60 * 60 * 1000; // fires once per step-1 completion, not once per full application.

// Part 17 — application abandonment recovery. Marks a contact
// APPLICATION_STATUS=started as soon as we have their email (end of
// step 1), *without* emailing the admin or computing a tier — this is
// intentionally silent and only exists to seed Brevo's recovery
// automation. The application/route.ts POST on final submit overwrites
// this to APPLICATION_STATUS=completed, which stops the recovery
// automation for that contact.
export async function POST(req: NextRequest) {
  const clientKey = getClientKey(req);
  const { allowed } = checkRateLimit(`application-start:${clientKey}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = applicationStartSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const { contactName, email, companyName, companyFax } = parsed.data;

  if (companyFax) {
    return NextResponse.json({ ok: true });
  }

  upsertContact({
    email,
    attributes: {
      FIRSTNAME: stripControlChars(contactName || ''),
      CONTACT_NAME: stripControlChars(contactName || ''),
      COMPANY: stripControlChars(companyName),
      APPLICATION_STATUS: 'started',
    },
    listIds: [BREVO_LISTS.applications],
  }).catch((err) => console.error('[brevo] Application-start sync failed', err));

  return NextResponse.json({ ok: true });
}
