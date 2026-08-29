# Phase 4E — Field Guide #5

## Cannibalization Review

Reviewed against all 10 Deep Guides, Field Guide #1 (specifically, in detail), Guides #2–#4, `/system`'s Revenue Intelligence copy, the Playbook landing page, and every lead-management/speed-to-lead/qualification Deep Guide.

**Critical differentiation from Guide #1** (the reason this whole review existed):

| | Guide #1 | Guide #5 |
|---|---|---|
| Question it answers | "Where is the system constrained?" | "What stages and numbers should I track so a constraint becomes visible?" |
| Framing | Diagnostic — assumes something is already wrong and points at it | Operational — a measurement map to install regardless of whether anything is currently wrong |
| Visual | `leakMap` with pre-identified leak points at Contacted/Estimate | Plain `funnel` with **no** leak points marked — this guide doesn't diagnose, it instruments |
| Core sentence | "Find the constraint before increasing demand." | "Growth becomes manageable when you can see what happens between inquiry and revenue." |
| Action | Map 30 days, find the biggest drop, fix that one thing | Build the scoreboard, calculate handoff rates, assign ownership for every open opportunity |

The problem statement was written specifically to avoid restating Guide #1: it never uses the word "constraint" or implies something is broken — it argues that *marketing performance is being evaluated before the business outcome is even known*, a visibility gap, not a diagnosis. No rewrite was needed; the differentiation was designed in from the first draft.

**Other content reviewed:**
- **Deep Guides** — `how-to-qualify-home-service-leads` and `speed-to-lead-for-contractors` each cover one stage of this guide's 7-stage chain in isolation. Guide #5 references the same concepts (contact rate, qualification) but as part of one connected operating system, not a deep dive on either single stage. No duplication; genuinely complementary (hence the relationship documented below).
- **Guides #2–#4** — none address post-lead measurement. No overlap.
- **System page, Revenue Intelligence (07)** — one sentence about vanity metrics; this guide is the natural expansion, which is why it's now linked there.
- **Playbook** — the 90-Day Lead-to-Booked-Job Playbook is a paid/gated implementation resource; this Field Guide teaches the underlying operating map for free, at a conceptual level, without duplicating the Playbook's implementation detail.

**Conclusion:** genuinely distinct from Guide #1 and everything else on the site — earns its own URL.

## Guide URL

`https://illussomedia.com/resources/lead-to-booked-job-system`

## Core Idea

A lead is not the outcome. The business must manage and measure the stages between inquiry and revenue — Lead → Contacted → Qualified → Estimate → Followed Up → Booked Job → Revenue.

## Seven Metrics

Implemented as a new, reusable content-model addition (`metricsSection`, an alternative to `whyItHappens` for measurement-focused guides — validated as mutually exclusive with `whyItHappens` in `lib/config/fieldGuides.ts`) rendered as an editorial numbered sequence, never seven cards: Leads, Contact Rate, Qualification Rate, Estimate/Appointment Rate, Follow-Up Rate, Close Rate, Revenue per Lead — each with a one-sentence explanation and a formula where one applies (e.g. `Contacted ÷ Leads`). No arbitrary benchmark numbers attached to any metric.

## Visuals

- **See It:** a plain 7-stage `funnel` (Lead → Contacted → Qualified → Estimate → Followed Up → Booked Job → Revenue) with no highlighted leak points — deliberately, to avoid echoing Guide #1's diagnostic framing.
- **Illustrative example:** a clearly labeled hypothetical funnel (60 Leads → 49 Contacted → 35 Qualified → 24 Estimates → 21 Followed Up → 10 Booked Jobs), with a new `conclusion` field (added to `illustrativeExample`) rendering the closing line "Without the stages in between, '60 leads' tells only a small part of the story."
- **The Framework:** Acquire → Respond → Qualify → Sell → Follow Up → Close → Measure, with three generic operating questions underneath (Who Owns It? / What Happens Next? / How Do We Know?) — reusing the existing `frameworkQuestions` field for 3 whole-framework questions rather than one per stage, a legitimate variant already supported by that field's generic shape.
- **Secondary visual (handoff map):** a `timeline` — Advertising → Front Office/Sales → Estimating → Follow-Up → Operations → Reporting, each with a one-line role description, using generic role labels since business structures differ.
- **Key Principle:** "Marketing can create the opportunity. The business still has to convert it." / "Advertising performance and sales performance meet in the same customer journey." Does not imply Lusso performs the client's sales function.

## Actions (exactly 3)

Build the scoreboard · Calculate the handoff rates · Assign the next action.

## CTA

Single CTA — "Find My Biggest Growth Leak" → Local Dominance Score, under "Can You See Where Growth Is Breaking Down?"

## Related Guides

- **Guide #5's Continue Learning:** links to Guide #1 (diagnostic predecessor) and Guide #4 (conversion-infrastructure relationship — the front half of this guide's operating chain). Guide #2 intentionally excluded — no genuine, non-mechanical reason to link a campaign-focus guide from an operating-measurement guide.
- **Guide #1 updated:** its `relatedGuideSlugs` now also includes Guide #5 — "Ready to build the actual scoreboard?" is a genuine next step once a reader has diagnosed that visibility is the gap. This is the only change made to Guide #1's content this phase.

## System Integration

Revenue Intelligence (07) changed from the singular `relatedGuide` to the plural `relatedGuides` field (the mechanism already built in Phase 4C for Offer Engineering) — now shows both Guide #1 (diagnosis) and Guide #5 (measurement) as two distinct, genuinely different roles. Guide #1's link was not removed, per instruction.

## Homepage Recommendation

**The homepage teaser was not changed** — confirmed still showing exactly Guides #1, #2, #3 (verified live: the teaser's 3 links are unchanged; 5 additional `/resources/*` links present elsewhere on the homepage come from the System deep-dive's per-component related-guide feature, a separate mechanism unaffected by this instruction).

**Documented recommendation, not acted on:** Guide #5 is arguably a stronger long-term third seat than Guide #3. Guide #3 (offer construction) presupposes a campaign already exists; Guide #5 (operating visibility) applies to every home-service business regardless of what they're currently advertising, and pairs more tightly with Guide #1 as a diagnose-then-measure pair. Of the two future sets suggested in the brief, **{#1, #2, #5}** reads as the stronger set to me if/when this is revisited — it keeps the campaign-focus guide (#2) and swaps the narrower offer-construction guide (#3) for the more universally applicable measurement guide (#5) — but this is a recommendation only. No change was made to `featured` flags for the homepage selection.

## SEO

- Title: "The Lead-to-Booked-Job System for Home Service Businesses | Lusso Media"
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline, unchanged
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Reused the existing event set (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`) — no new analytics infrastructure.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on the full guide, including the 7-stage funnel, the metrics section's monospace formula text (`Contacted ÷ Leads`, etc. — wrapped with `break-words`, no overflow), the framework, the handoff-map timeline, and the 3-action checklist.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 5 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 5 guides; `/resources` hub now spans Revenue Intelligence, Offer Engineering, and Conversion Infrastructure.
- Guides #1–#4 confirmed still functional; Guide #1's content unchanged apart from the intentional `relatedGuideSlugs` addition documented above; Guides #2–#4 untouched.
- System page verified showing the new plural "Related Field Guides" on both Offer Engineering and Revenue Intelligence.
- Homepage teaser verified live to still show exactly Guides #1–#3.

## Not Done (By Instruction)

- Field Guide #6 was not started.
- Homepage teaser was not expanded or changed (recommendation documented above only).
- Industry-page Field Guide sections remain inactive.
