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

// Application confirmation email (Part 17) — sent to the applicant after a
// successful submission. Best-effort and non-blocking: called after the
// admin notification / CRM sync already determined the submission was
// delivered, so a failure here never changes what the visitor sees on-page.
export async function sendApplicationConfirmationEmail(to: string, contactName: string) {
  const greeting = contactName ? `${contactName}, thanks` : 'Thanks';
  return sendLeadEmail(
    'We Received Your Lusso Application',
    [
      {
        label: 'What Happens Next',
        value: `${greeting} for the detail. We received the information you submitted. We'll review your market, service economics, capacity, and growth goals before recommending the next step. If there's a clear fit, we'll send you the next step; if we need more context first, we'll reach out with a few focused questions.`,
      },
      {
        label: 'While You Wait',
        value: 'It helps to have rough numbers ready for average job value, gross margin, close rate, current lead volume, and available capacity.',
      },
      { label: 'Full Curl Landscaping Case Study', value: 'https://illussomedia.com/results/full-curl-landscaping' },
      { label: 'The Local Dominance System', value: 'https://illussomedia.com/system' },
    ],
    to
  );
}

// Playbook delivery email — sent after a successful lead-capture submission
// on /lead-to-booked-job-playbook. The thank-you page already offers an
// immediate in-browser download (Part 5 — never make the visitor wait on
// email for the file itself); this email is the supplementary copy so they
// have the link in their inbox too. Best-effort/non-blocking, same pattern
// as sendApplicationConfirmationEmail.
export async function sendPlaybookDeliveryEmail(to: string, firstName: string) {
  const greeting = firstName ? `${firstName}, your` : 'Your';
  return sendLeadEmail(
    'Your 90-Day Lead-to-Booked-Job Playbook',
    [
      {
        label: 'Ready',
        value: `${greeting} playbook is ready. The 90-Day Home Service Lead-to-Booked-Job Playbook walks through the systems for capturing, qualifying, responding to, following up with, and converting more local opportunities. Start with the section that matches the biggest constraint in your current lead process.`,
      },
      { label: 'Download the Playbook', value: 'https://illussomedia.com/resources/90-day-home-service-lead-to-booked-job-playbook.pdf' },
      {
        label: 'Next',
        value: "Once you've gone through it, the next question is whether the rest of your growth system is working together.",
      },
      { label: 'Take the 2-Minute Local Dominance Score', value: 'https://illussomedia.com/local-dominance-score' },
    ],
    to
  );
}
