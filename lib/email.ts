// Server-only helper for emailing lead notifications (Score + Application
// funnels). Replaces the earlier Zapier→Notion plan — simpler for now:
// every submission lands in your inbox, formatted for easy copy/paste into
// Notion. See EMAIL_SETUP.md for the one-time Resend account setup.

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'admin@illussomedia.com';
// Must be an address on a domain verified in Resend — see EMAIL_SETUP.md.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Lusso Media Leads <leads@illussomedia.com>';

export interface EmailField {
  label: string;
  value: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendLeadEmail(subject: string, fields: EmailField[], to: string = NOTIFICATION_EMAIL) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not configured — notification email not sent.', { subject });
    return { sent: false as const };
  }

  const text = fields.map((f) => `${f.label}: ${f.value || '—'}`).join('\n');
  const html = `
    <div style="font-family: -apple-system, sans-serif; font-size: 14px; color: #111;">
      <h2 style="font-size: 16px; margin-bottom: 16px;">${escapeHtml(subject)}</h2>
      <table cellpadding="4" cellspacing="0" style="border-collapse: collapse;">
        ${fields
          .map(
            (f) => `
          <tr>
            <td style="font-weight: 600; padding-right: 12px; vertical-align: top; white-space: nowrap;">${escapeHtml(f.label)}</td>
            <td style="vertical-align: top;">${escapeHtml(f.value || '—')}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error('[email] Resend returned an error', result.error);
      return { sent: false as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error('[email] Failed to send lead notification email', err);
    return { sent: false as const };
  }
}

// Sends a friendlier version of the results straight to the visitor who
// requested them (Part 15 — "Email My Results"), separate from the
// internal admin notification sendLeadEmail() already handles.
export async function sendVisitorResultsEmail(to: string, subject: string, fields: EmailField[]) {
  return sendLeadEmail(subject, fields, to);
}
