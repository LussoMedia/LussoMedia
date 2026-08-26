import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — makes several rapid Brevo API calls per
// request to surface the exact current failure reason (e.g. IP
// restriction) across multiple underlying serverless instances in one
// shot. Delete this file once the Brevo issue is resolved.
export async function GET() {
  const key = process.env.BREVO_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'BREVO_API_KEY not set' });
  }

  const attempts = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      try {
        const res = await fetch('https://api.brevo.com/v3/account', {
          headers: { 'api-key': key, Accept: 'application/json' },
        });
        const body = await res.text();
        return { attempt: i + 1, status: res.status, ok: res.ok, body: body.slice(0, 300) };
      } catch (err) {
        return { attempt: i + 1, error: String(err) };
      }
    })
  );

  return NextResponse.json({ attempts, deployedAt: new Date().toISOString() });
}
