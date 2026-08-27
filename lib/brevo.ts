// Server-only Brevo (marketing automation / email) integration.
//
// This module's job is narrow and deliberate: get contacts into Brevo with
// the right attributes and list membership so the actual nurture sequence
// (Part 16) and abandonment-recovery automation (Part 17) can be built as
// no-code Automations in Brevo's own dashboard, triggered off list-entry
// and the APPLICATION_STATUS attribute. This file does not send any
// sequenced/delayed emails itself — Brevo's automation engine does that;
// see BREVO_SETUP.md for the two workflows to build.

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BASE_URL = 'https://api.brevo.com/v3';

export const BREVO_LISTS = {
  scoreLeads: Number(process.env.BREVO_SCORE_LIST_ID) || 4,
  applications: Number(process.env.BREVO_APPLICATION_LIST_ID) || 5,
  playbookLeads: Number(process.env.BREVO_PLAYBOOK_LIST_ID) || 6,
};

interface UpsertContactArgs {
  email: string;
  attributes: Record<string, string | number | boolean>;
  listIds: number[];
}

async function brevoRequest(path: string, init: RequestInit) {
  if (!BREVO_API_KEY) {
    console.warn('[brevo] BREVO_API_KEY not configured — contact not synced.', { path });
    return { ok: false as const };
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });
    if (!res.ok && res.status !== 400) {
      const body = await res.text().catch(() => '');
      console.error('[brevo] Request failed', res.status, body);
      return { ok: false as const };
    }
    return { ok: true as const };
  } catch (err) {
    console.error('[brevo] Request threw', err);
    return { ok: false as const };
  }
}

// Creates the contact if new, updates attributes/list membership if they
// already exist (updateEnabled: true) — safe to call on every submission,
// including repeat ones from the same email.
export async function upsertContact({ email, attributes, listIds }: UpsertContactArgs) {
  return brevoRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email,
      attributes,
      listIds,
      updateEnabled: true,
    }),
  });
}
