# Lead Notification Emails (via Resend)

Every submission on `/local-dominance-score` and `/apply` sends an email to
`admin@illussomedia.com` with all the details, formatted as a clean
label/value list so it's easy to copy fields straight into Notion.

```
Visitor submits form
  → /api/leads/score  or  /api/leads/application   (this repo)
  → Resend API
  → Email lands in your inbox
  → You copy the details into Notion manually
```

No Zapier, no Notion API integration — the simplest path to "I get notified
and can log it myself."

## The two Notion databases (already created, for reference)

- **Local Dominance Score Leads** — https://app.notion.com/p/42f5e017b3374c10adfccd9bce3ca878
- **Local Dominance Applications** — https://app.notion.com/p/0487925599494073b1e1b8c6454cf869

They're private top-level pages right now — drag them into your SALES hub
page in Notion whenever convenient. The email you receive for each
submission lists every field in the same order/labels as these databases'
columns, so copying one into the other is straightforward.

## Step 1 — Create a Resend account

1. Go to [resend.com](https://resend.com) and sign up (free tier: 3,000
   emails/month, more than enough for lead notifications).
2. **Verify a sending domain.** In Resend, go to **Domains → Add Domain**,
   enter `illussomedia.com` (or a subdomain like `mail.illussomedia.com` if
   you'd rather keep it separate from your regular email). Resend gives you
   a few DNS records (SPF, DKIM, sometimes DMARC) to add wherever
   `illussomedia.com`'s DNS is managed (your domain registrar or DNS host).
   Verification usually completes within a few minutes to an hour after the
   records propagate.
3. Once verified, go to **API Keys → Create API Key**. Copy it — you won't
   see it again.

## Step 2 — Add the environment variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="Lusso Media Leads <leads@illussomedia.com>"
LEAD_NOTIFICATION_EMAIL=admin@illussomedia.com
```

- **Locally:** `.env.local` (placeholders already there).
- **In production (Vercel):** Project Settings → Environment Variables →
  add all three, then redeploy.

`RESEND_FROM_EMAIL` must use a domain you verified in Step 1 — Resend
rejects sends from unverified domains. `LEAD_NOTIFICATION_EMAIL` defaults to
`admin@illussomedia.com` if you don't set it, so it's optional unless you
want notifications to go somewhere else.

## Testing

Until `RESEND_API_KEY` is set, submissions still work fine for the visitor
— nothing breaks — they just aren't emailed anywhere, and a warning is
logged server-side (`[email] RESEND_API_KEY not configured`).

Once it's set:
1. Submit a test entry through `/apply` or `/local-dominance-score`.
2. Check `admin@illussomedia.com` for the notification email.
3. Check Resend's **Logs** tab if an email doesn't arrive — it'll show
   delivery status and any errors.

## What's in the email

**Score leads:** name, company, email, phone, overall score, band,
strongest/weakest area, top 3 growth leaks, full category breakdown, and
UTM source/medium/campaign.

**Applications:** every field from the 5-step form (business, economics,
acquisition, capacity, investment readiness) plus the site's automated
**Tier** (A/B/C) and the reasons behind it — so you know at a glance
whether it's a strong fit, needs review, or isn't ready yet.

## Later: adding Notion or Zapier back in

If you later want submissions to land directly in Notion instead of (or in
addition to) email, two paths, in order of simplicity:

- **Direct Notion API** — create a Notion internal integration (Notion
  Settings → Connections → Develop or manage integrations), share both
  databases with it, and I can wire the API routes to write to Notion
  directly instead of/alongside sending email.
- **Zapier** — the original plan: two Zaps (Webhook → Notion), with the
  option to add a Claude step in between for AI lead summaries. Ask if you
  want to revisit this.
