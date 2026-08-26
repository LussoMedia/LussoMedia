import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — confirms which env vars the deployed
// function actually sees, and makes a real Brevo API call to surface the
// exact error (e.g. IP restriction) without exposing secret values.
// Delete this file once the Brevo issue is resolved.
export async function GET() {
  const check = (name: string) => {
    const value = process.env[name];
    return {
      present: !!value,
      length: value?.length ?? 0,
      prefix: value ? value.slice(0, 8) : null,
    };
  };

  let brevoTest: unknown = null;
  const key = process.env.BREVO_API_KEY;
  if (key) {
    try {
      const res = await fetch('https://api.brevo.com/v3/account', {
        headers: { 'api-key': key, Accept: 'application/json' },
      });
      const body = await res.text();
      brevoTest = { status: res.status, ok: res.ok, body: body.slice(0, 500) };
    } catch (err) {
      brevoTest = { error: String(err) };
    }
  }

  return NextResponse.json({
    BREVO_API_KEY: check('BREVO_API_KEY'),
    BREVO_SCORE_LIST_ID: check('BREVO_SCORE_LIST_ID'),
    BREVO_APPLICATION_LIST_ID: check('BREVO_APPLICATION_LIST_ID'),
    RESEND_API_KEY: check('RESEND_API_KEY'),
    VERCEL_ENV: process.env.VERCEL_ENV || null,
    brevoTest,
    deployedAt: new Date().toISOString(),
  });
}
