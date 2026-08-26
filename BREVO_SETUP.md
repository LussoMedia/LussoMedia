# Nurture Sequence & Abandonment Recovery (Brevo)

This app's job is narrow: get contacts into Brevo, correctly tagged, at the
right moments. **The actual sequencing/delays are built as Automations in
Brevo's dashboard** — that's genuinely the better tool for it (no cron job
to maintain, visual editor, built-in send-time optimization) rather than
something to duplicate in this codebase.

```
Score funnel submit        → Brevo contact → "Local Dominance Score Leads" list (ID 4)
Application step 1 done    → Brevo contact → "Local Dominance Applications" list (ID 5), APPLICATION_STATUS=started
Application final submit   → same contact  → APPLICATION_STATUS=completed
```

## ⚠️ Confirmed broken in production right now: Brevo's IP restriction

**This is not theoretical — it was reproduced live.** Three identical
requests to the production API within seconds of each other: two were
silently rejected by Brevo, one succeeded. Same code, same env vars, same
deployment. The only variable is which of Vercel's many rotating egress
IPs happened to handle each request — and Brevo's account has **IP
authorization** enabled (Settings → Security → Authorized IPs), which
blocks any IP not on its allowlist.

Adding individual IPs (what we did to get setup working) cannot fix this —
Vercel doesn't give you a finite list of IPs to allowlist; it's a large,
changing pool. **Until IP authorization is fully disabled in Brevo (not
just "add more IPs"), expect roughly random failures** — some contacts
will sync, some won't, with no pattern a user would notice (the site never
shows an error either way, by design, so leads still convert normally —
this only affects whether they land in Brevo).

**What to try:**
1. Brevo → Settings → Security → Authorized IPs → look for a toggle to
   disable the feature entirely for API keys (an earlier attempt at this
   hit an error — worth retrying, possibly in a different browser or after
   a page refresh).
2. If that keeps failing, contact Brevo support directly and ask them to
   disable IP-based restriction for API keys on this account — you're
   still protected by the API key itself, which is the standard setup for
   apps calling from serverless/dynamic infrastructure like Vercel.
3. Once disabled, re-test: submit a real entry through `/apply` or
   `/local-dominance-score` and confirm the contact appears in Brevo.

## What's already set up

- **Folder:** "Local Dominance Website" in Contacts
- **Lists:** "Local Dominance Score Leads" (id `4`), "Local Dominance
  Applications" (id `5`)
- **Custom attributes:** `COMPANY`, `SCORE_OVERALL`, `SCORE_BAND`,
  `SCORE_STRONGEST`, `SCORE_WEAKEST`, `SCORE_TOP_LEAKS`, `CONTACT_NAME`,
  `INDUSTRY`, `TIER`, `APPLICATION_STATUS`, `MONTHLY_REVENUE`,
  `INVESTMENT_READINESS` (plus Brevo's built-in `FIRSTNAME`/`SMS`)
- **Env vars** (already in `.env.local`; add to Vercel too):
  ```bash
  BREVO_API_KEY=xkeysib-...
  BREVO_SCORE_LIST_ID=4
  BREVO_APPLICATION_LIST_ID=5
  ```

## Automation 1 — Score Lead Nurture Sequence (Part 16)

1. In Brevo, go to **Automations → Create a workflow → Start from scratch**.
2. **Trigger:** "Contact added to a list" → **Local Dominance Score Leads**.
3. Add a **Send an email** step immediately (Email 0), then **Wait** +
   **Send an email** steps for each of the remaining six, using the delays
   and copy below. Use `{{ contact.FIRSTNAME }}`, `{{ contact.COMPANY }}`,
   `{{ contact.SCORE_OVERALL }}`, `{{ contact.SCORE_STRONGEST }}`,
   `{{ contact.SCORE_WEAKEST }}` as merge fields.
4. **Exit condition (recommended):** add a filter so the sequence stops if
   the contact is later added to the **Local Dominance Applications** list
   (they've already moved forward — no need to keep nurturing).
5. Turn the workflow **on**.

### Email 0 — Immediate

**Subject:** Your Local Dominance Score

```
Hi {{ contact.FIRSTNAME }},

Your Local Dominance Score for {{ contact.COMPANY }}: {{ contact.SCORE_OVERALL }}/100

Strongest area: {{ contact.SCORE_STRONGEST }}
Biggest growth leak: {{ contact.SCORE_WEAKEST }}

See your full breakdown: https://illussomedia.com/local-dominance-score

If you'd rather skip ahead, you can see whether your business qualifies
for the Local Dominance System now:
https://illussomedia.com/apply

— Lusso Media
```

### Email 1 — Day 1

**Subject:** Referrals are powerful. They're also unpredictable.

```
Hi {{ contact.FIRSTNAME }},

Referrals are powerful because they arrive with trust already built in.
But they only grow as fast as your existing customers talk about you —
and homeowners you've never reached are finding and choosing competitors
every day.

The goal isn't replacing referrals. It's expanding your reputation beyond
the people who already know you.

See your Local Dominance Score or explore the plan:
https://illussomedia.com/apply

— Lusso Media
```

### Email 2 — Day 3

**Subject:** How Full Curl grew beyond a 2-person operation

```
Hi {{ contact.FIRSTNAME }},

When Lusso began working with Full Curl Landscaping, the company was
operating with a two-person crew and generating under $500,000 a year.
Today, the team has grown to 14 people, recent performance is tracking
toward a seven-figure annualized run rate, and the business is aiming
for $1.8 million annually.

Read the full story: https://illussomedia.com/results/full-curl-landscaping

See how your business stacks up: https://illussomedia.com/local-dominance-score

— Lusso Media
```

### Email 3 — Day 5

**Subject:** The 7 systems behind Local Dominance

```
Hi {{ contact.FIRSTNAME }},

The Local Dominance System is 7 connected components — not 7 separate
vendors: Market Intelligence, Offer Engineering, Conversion Infrastructure,
Authority Engine, Demand Engine, Reputation Engine, Revenue Intelligence.

Each part makes the next one more effective.

See the full breakdown: https://illussomedia.com/system

— Lusso Media
```

### Email 4 — Day 8

**Subject:** Do you actually need more leads?

```
Hi {{ contact.FIRSTNAME }},

More leads aren't automatically valuable if margins are thin, the service
is unprofitable, capacity is already full, or follow-up is broken. Before
we talk acquisition, it's worth knowing whether more demand is actually
the constraint for {{ contact.COMPANY }}.

See if your business qualifies: https://illussomedia.com/apply

— Lusso Media
```

### Email 5 — Day 12

**Subject:** Why we launch the first campaign in 7 days

```
Hi {{ contact.FIRSTNAME }},

Most agencies take weeks just to onboard. Once we have access, business
information, approvals, and initial payment, we launch the initial
acquisition campaign within seven business days — the 7-Day Market
Activation. If a delay caused by us prevents that, we apply a $1,500
service credit toward your next invoice.

See if your business qualifies: https://illussomedia.com/apply

— Lusso Media
```

### Email 6 — Day 16

**Subject:** Ready to build your Local Dominance Plan?

```
Hi {{ contact.FIRSTNAME }},

You've seen where {{ contact.COMPANY }}'s growth system is strongest and
where it's leaking. If you're ready to see what a plan built around your
economics, market, and capacity would look like:

https://illussomedia.com/apply

— Lusso Media
```

## Automation 2 — Application Abandonment Recovery (Part 17)

1. **Automations → Create a workflow → Start from scratch.**
2. **Trigger:** "Contact attribute is updated" → `APPLICATION_STATUS`
   → equals `started`, list = **Local Dominance Applications**.
3. **Wait:** 2 hours (or whatever feels right — long enough that they've
   genuinely stepped away, short enough to still be relevant).
4. **Condition (If/Else):** `APPLICATION_STATUS` **is not** `completed`
   → only the "if not completed" branch sends anything.
5. **Send an email** (copy below).
6. **End the workflow after one send** — per Part 17, no repeated
   aggressive reminders. Don't loop back.
7. Turn the workflow **on**.

### Recovery Email

**Subject:** Finish Your Local Dominance Plan

```
Hi {{ contact.FIRSTNAME }},

You started the business assessment for {{ contact.COMPANY }} but didn't
finish it. Your previous answers aren't saved server-side yet, but the
application only takes a few minutes:

https://illussomedia.com/apply

— Lusso Media
```

> Note: the application form's in-progress answers currently live only in
> the visitor's browser (React state), not persisted server-side — so this
> recovery email links back to a fresh start rather than a resumed one.
> Building true mid-form resume (save every field as it's typed, restore on
> return) is a larger change than this pass covered; ask if you want it
> built next.

## Testing

1. Set all three `BREVO_*` env vars locally and in Vercel.
2. Submit a test entry through `/local-dominance-score` or `/apply`.
3. Check **Contacts** in Brevo — the contact should appear in the right
   list with the right attributes within a few seconds.
4. Check the automation's **Automation → [workflow] → Statistics** tab to
   confirm it triggered.
