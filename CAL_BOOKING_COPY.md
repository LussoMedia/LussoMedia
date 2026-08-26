# Recommended Cal.com Confirmation & Reminder Copy (Part 22)

This isn't code — it's copy to paste into Cal.com's own event-type settings
for the "45min" event type (the one `BookingButton`/`/book` triggers). Cal.com
controls confirmation emails/SMS and reminder messages itself; nothing in
this repo can override that, so it has to be set there directly.

**Where to set it:** Cal.com dashboard → Event Types → the 45-minute event
→ **Advanced** tab → **Email/SMS notifications** (confirmation and reminder
templates are configured per event type, with placeholders like
`{ATTENDEE}` / `{EVENT_NAME}` / `{EVENT_DATE}` that Cal.com fills in).

## Confirmation message

Sent immediately when someone books. Recommended body:

```
Your Local Dominance Review is confirmed. We'll look at your current
acquisition system, service economics, capacity, and growth goals to
determine where the strongest opportunity exists.
```

## Reminder message

Sent ahead of the call (Cal.com lets you set how far in advance — 24 hours
and/or 1 hour before is typical). Recommended body:

```
Have rough numbers for average ticket, gross margin, close rate, current
lead sources, and available capacity if possible. These numbers don't
need to be exact.
```

This mirrors the "Come Prepared With Rough Numbers" section already live
on [`/plan-confirmed`](https://illussomedia.com/plan-confirmed), so the
messaging stays consistent whether someone reads it on the site or in
Cal.com's email/SMS.

## Note on scope

Cal.com's reminder/confirmation copy is separate from `/plan-confirmed` —
the site page fires the moment the booking succeeds (via the embed's
`bookingSuccessful` event), while Cal.com's own emails/SMS are a second,
independent touchpoint on their infrastructure. Both saying the same thing
is intentional reinforcement, not a duplicate you need to reconcile.
