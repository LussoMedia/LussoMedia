# Phase 4F — Field Guide #6 + Homepage Curation

## Homepage Curation (Task A)

**Previous featured set:** Guide #1 (*Why More Leads Won't Fix Growth*), Guide #2 (*One Market, One Service, One Offer*), Guide #3 (*"10% Off" Isn't an Offer*).

**New featured set:** Guide #1, Guide #2, Guide #5 (*The Lead-to-Booked-Job System*) — verified live in this order (row 01/02/03 matches).

**Mechanism:** the homepage teaser and the `/resources` hub's "Featured" row both read from the same `featured: boolean` flag via `getFeaturedGuides()` (built in Phase 3). Curating the homepage meant flipping Guide #3's flag to `false` and Guide #5's to `true` in `lib/config/fieldGuides.ts`. There is no separate "homepage-only featured" flag in the content model — introducing one purely for this cosmetic distinction would have meant adding infrastructure the brief explicitly said not to rebuild, so the existing shared mechanism was reused. **Side effect, disclosed:** this also changes which guide appears in the hub's own "Featured" row (now #1/#2/#5 there too) — Guide #3 is unaffected everywhere else: still published, indexed, self-canonical, in the sitemap, in its Offer Engineering category section on the hub, and still linked from the System page's Offer Engineering component (its `relatedGuides` entry there was not touched).

**Reason for the swap:** per the brief, the homepage should represent the breadth of Lusso's operating philosophy. Guide #5 (operating measurement — "see what happens between inquiry and revenue") pairs with Guide #1 (diagnosis) as a natural before/after pair and applies to every home-service business regardless of what they currently advertise, which better serves the homepage's authority-demonstration purpose than a second Offer Engineering guide sitting next to Guide #2.

## Retired Planned Guide (Task B)

`/docs/field-guide-phase-4-queue.md` item 6, *"Before Spending Another $1 on Ads, Find Your Growth Constraint,"* is now marked **RETIRED — concept absorbed by Field Guide #1**. The planning note was kept, not deleted, with the reasoning documented inline: Field Guide #1 already owns "find the constraint before increasing demand," and a second short resource built around the identical concept would have produced redundant user value, overlapping search intent, and unnecessary internal competition rather than a stronger content architecture.

## Cannibalization Review (Task C)

Reviewed against all 10 Deep Guides, Guides #1–#5, `/system`'s Demand Engine copy, and every industry page. No existing content teaches awareness-based message segmentation — the closest concepts (Guide #2's campaign focus, Guide #3's offer strength) operate one level below this guide (they assume the message's *objective* is already chosen; this guide teaches what that objective should be based on what the prospect already knows). No Deep Guide addresses ad messaging/creative strategy at all. Genuinely new intent — first resource under Demand & Advertising.

## Guide URL

`https://illussomedia.com/resources/home-service-advertising-awareness-levels`

## Core Idea

The same ad should not be expected to persuade every prospect. Messaging should change based on what the prospect already knows, understands, believes, wants, and recognizes about the problem and solution — adapted from Eugene Schwartz's awareness framework into home-service acquisition language, without making Schwartz the subject of the resource.

## Awareness Levels

Presented in the customer's progression-toward-action order (per the brief, easier for contractors than Schwartz's original numbering): **Unaware → Problem Aware → Solution Aware → Company/Product Aware → Most Aware**, each with a definition, the message's job, and one concise home-service example (water softener buildup). Explicitly framed as a messaging tool, not a claim that real prospects sort neatly into five boxes.

## Visuals

- **See It:** `timeline` — the 5-stage progression with message job + example per stage.
- **The Framework (Message Ladder):** `framework` — Recognize → Understand → Consider → Believe → Act, each mapped to its awareness stage via the reusable `frameworkQuestions` field.
- **Secondary visual — "Same Service, Five Messages":** a second `timeline`, reusing the same primitive, showing one HVAC replacement service with five distinct message objectives — the guide's strongest section, per the brief, demonstrating same-service/different-message directly rather than describing it.
- **Retargeting connection:** the reusable `example` (label/value rows) slot — Cold prospect → Problem education, Engaged visitor → Proof/mechanism, Returning prospect → Objection handling, High-intent prospect → Offer/next step.
- **Key Principle:** "Don't ask the ad to sell more than the prospect is ready to understand." / "The job of the message is to move the prospect one step closer to the decision."

No new component was built — every visual reuses `timeline`, `framework`, or `example`, per the brief's explicit preference for existing editorial rows over a specialized one-off.

## Message Examples

Five conceptual HVAC replacement ad hooks, one per awareness stage — no specific performance or savings claims attached to any of them.

## Actions (exactly 3)

Label your current ads · Create one new message · Change your retargeting message.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Is Your Marketing Meeting the Market Where It Is?"

## Related Guides

Continue Learning links to Guide #2 ("focus the campaign before choosing the message") and Guide #3 ("the offer becomes the reason to act at Most Aware") — both specific relationships named in the brief. Guide #4 intentionally excluded to avoid over-linking, per instruction.

## System Integration

Added to **05 — Demand Engine** only (`lib/config/systemComponents.ts`, singular `relatedGuide` — one guide is relevant here). No other System component was touched.

## Resource Hub Integration

`/resources` now spans four categories automatically: Revenue Intelligence, Offer Engineering, Conversion Infrastructure, and — for the first time — **Demand & Advertising**. No hard-coded hub layout changes were needed; the category section rendered automatically once a published guide existed for it, exactly as designed in Phase 3.

## SEO

- Title: "The 5 Awareness Levels in Home Service Advertising | Lusso Media"
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Reused the existing event set (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`) — no new analytics architecture. Homepage click tracking (`from: 'homepage_teaser'` / `'homepage_teaser_cta'`) is unaffected by the featured-set swap since it reads whichever guides `getFeaturedGuides()` returns dynamically.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on the full guide. The five-stage timeline (both the primary awareness progression and the secondary "Same Service, Five Messages" example) stacks in a single vertical column at this width via the existing `Timeline` primitive's `grid-cols-[2rem_1fr]` layout — no compression, no horizontal scroll.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 6 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 6 guides.
- Homepage verified live to show exactly Guides #1, #2, #5 in that order.
- Guide #3 verified live: still `index, follow`, still self-canonical at its own URL, still in the sitemap, still in its Offer Engineering category section on the hub, still linked from the System page.
- System page's Demand Engine component confirmed linking correctly to Guide #6.

## Not Done (By Instruction)

- Field Guide #7 was not started.
- Guide #6 was not added to the homepage teaser.
- Industry-page Field Guide sections remain inactive.
