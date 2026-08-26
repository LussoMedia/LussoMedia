import { NextResponse } from 'next/server';

// TEMPORARY diagnostic route — confirms which env vars the deployed
// function actually sees, without ever exposing values. Delete this file
// once the Brevo env var issue is resolved; it has no reason to exist in
// the shipped app.
export async function GET() {
  const check = (name: string) => {
    const value = process.env[name];
    return {
      present: !!value,
      length: value?.length ?? 0,
      prefix: value ? value.slice(0, 8) : null,
    };
  };

  return NextResponse.json({
    BREVO_API_KEY: check('BREVO_API_KEY'),
    BREVO_SCORE_LIST_ID: check('BREVO_SCORE_LIST_ID'),
    BREVO_APPLICATION_LIST_ID: check('BREVO_APPLICATION_LIST_ID'),
    RESEND_API_KEY: check('RESEND_API_KEY'),
    VERCEL_ENV: process.env.VERCEL_ENV || null,
    deployedAt: new Date().toISOString(),
  });
}
