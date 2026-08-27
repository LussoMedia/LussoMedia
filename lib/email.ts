// Server-only helper for emailing lead notifications (Score + Application
// funnels). Replaces the earlier Zapier→Notion plan — simpler for now:
// every submission lands in your inbox, formatted for easy copy/paste into
// Notion. See EMAIL_SETUP.md for the one-time Resend account setup.

import { Resend } from 'resend';
import { buildPlaybookDeliveryHtml, buildPlaybookDeliveryText } from './emailTemplates/playbookDelivery';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || 'admin@illussomedia.com';
// Must be an address on a domain verified in Resend — see EMAIL_SETUP.md.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Lusso Media Leads <leads@illussomedia.com>';
// Visitor-facing resource delivery uses its own sender identity, separate
// from the internal lead-notification address above — same illussomedia.com
// domain (already verified in Resend), just a different, more appropriate
// local part for something a visitor actually reads and clicks through.
const RESOURCES_FROM_EMAIL = process.env.RESEND_RESOURCES_FROM_EMAIL || 'Lusso Media <resources@illussomedia.com>';

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
// immediate in-browser download (never make the visitor wait on email for
// the file itself); this email is the supplementary copy so they have the
// link in their inbox too. Best-effort/non-blocking.
//
// Deliberately bypasses sendLeadEmail's generic label/value table — this is
// the one visitor-facing "premium resource delivery" email, not an internal
// notification, so it gets its own bespoke template and its own sender
// identity (resources@ instead of leads@), while every other email on the
// site is untouched. `firstName` is accepted (kept for call-site parity with
// the other confirmation emails) but intentionally not rendered anywhere in
// the copy — the approved copy never names the recipient, which also
// sidesteps ever showing an empty/placeholder name.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for call-site parity, see comment above
export async function sendPlaybookDeliveryEmail(to: string, _firstName: string) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not configured — playbook delivery email not sent.');
    return { sent: false as const };
  }

  try {
    const result = await resend.emails.send({
      from: RESOURCES_FROM_EMAIL,
      to,
      replyTo: NOTIFICATION_EMAIL,
      subject: 'Your 90-Day Lead-to-Booked-Job Playbook',
      html: buildPlaybookDeliveryHtml(),
      text: buildPlaybookDeliveryText(),
    });
    if (result.error) {
      console.error('[email] Resend returned an error (playbook delivery)', result.error);
      return { sent: false as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error('[email] Failed to send playbook delivery email', err);
    return { sent: false as const };
  }
}
