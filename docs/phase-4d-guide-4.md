# Phase 4D — Field Guide #4

## Cannibalization Review

Reviewed against: all 10 Deep Guides, Field Guides #1–#3, `/system`'s Conversion Infrastructure copy, every industry page, and the Playbook landing page.

- **Deep Guides:** none address ad-to-landing-page message continuity. `how-to-qualify-home-service-leads` covers form-level qualification (after arrival), not destination selection (where traffic should land). No overlap.
- **Field Guides #1–#3:** Guide #1 diagnoses funnel constraints generally; Guide #2 concentrates the campaign's message; Guide #3 strengthens the offer itself. None address the specific destination-matching problem (does the click's promise survive the landing page). Guide #4 is the natural "what happens right after the click" layer these three don't cover.
- **System page, Conversion Infrastructure (03):** one sentence ("Traffic arriving at a generic homepage with a 'Contact Us' button converts a fraction of what it could") states the premise but never explains why or what to do about it — this guide is exactly the expansion that sentence points toward, which is why it's now linked from there.
- **Industry pages / Playbook:** no existing content addresses homepage-vs-landing-page destination selection specifically.

**Conclusion:** genuinely new intent — earns its own URL.

## Guide URL

`https://illussomedia.com/resources/stop-sending-paid-traffic-to-your-homepage`

## Core Idea

Match one campaign promise to one conversion path. Not "homepages are bad" — a homepage can be the right destination for branded search, direct navigation, or general discovery. The narrower claim: when a paid campaign makes a specific promise, the destination should usually continue that same promise.

## Visuals

- **See It:** `beforeAfter` — "Message Break" (full services list, company history/careers, several nav exits, multiple competing CTAs) vs. "Message Continuity" (Problem → Offer → Proof → Qualification → one primary CTA), captioned "Every extra decision between the click and the intended action creates additional friction."
- **The Framework:** `framework` — Ad Promise → Page Promise → Proof → Qualification → Next Step, with one explanatory sentence per stage (explicitly noting the next step shouldn't default to "Contact Us").
- **Secondary visual:** a `funnel` presenting the same continuity psychologically — the visitor's internal monologue ("What caught my attention?" → "Am I in the right place?" → "Can I trust this?" → "Is this for me?" → "What happens next?") — distinct framing from the structural framework above, not a redundant repeat of it.
- **Key Principle:** "The click shouldn't start a new conversation." / "The landing page should continue the one the advertisement already started."

No screenshot/annotation visual was added — the brief said only to use one if usable public/current screenshots already existed in the codebase; none did, and the Before/After visual is sufficient on its own, per the brief's fallback instruction.

## Example

Fully genericized water-softener campaign example (ad copy → generic homepage destination vs. focused destination) — no confidential client campaign details used.

## Actions (exactly 3)

Click your own ad · Count the decisions · Build one continuous path.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Is Your Website Turning Demand Into Opportunity?"

## Related Guides

Continue Learning links to Guide #2 (campaign focus precedes destination focus) and Guide #1 (weak conversion infrastructure is a common downstream constraint) — both genuine relationships. Guide #3 intentionally excluded: reviewed and found no direct path improvement from linking an offer-construction guide here, matching the brief's "do not mechanically include Guide #3 unless it truly improves the path."

## System Integration

Added to **03 — Conversion Infrastructure** only (`lib/config/systemComponents.ts`, singular `relatedGuide` field — only one guide is relevant here, so the plural `relatedGuides` mechanism built for Offer Engineering in Phase 4C wasn't needed). No other System component was touched.

## Homepage Decision

**The homepage teaser remains capped at exactly 3 guides — confirmed unchanged and verified visually** (Guide #4 was deliberately left `featured: false`, so `getFeaturedGuides(3)` in `FieldGuidesHomeBlock.tsx` still returns only Guides #1–#3). No human approval was sought or required since the brief's instruction was unambiguous: do not expand the teaser this phase.

**Recommendation for a future phase (not acted on automatically):** Guide #4 addresses a more universally applicable problem (destination-matching applies to literally every paid campaign, regardless of trade) than Guide #3 (offer construction, which assumes a campaign already exists to build an offer for). If Lusso wants the homepage teaser to lead with its most broadly resonant guides, swapping Guide #4 in for Guide #3 — or waiting for a 4th slot if the teaser format is ever revisited — is worth considering. This is a documented suggestion only; no change was made.

## SEO

- Title: "Stop Sending Home Service Ad Traffic to Your Homepage | Lusso Media" (chosen over the alternative suggestion for directness and closer match to the guide's actual content)
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Reused the existing event set (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`) — no new event architecture introduced, per instruction.

## Mobile QA

Checked at 320px (confirmed `scrollWidth === innerWidth === 320`, no overflow) and reviewed the full accessibility tree at that width — Before/After lists, the 5-stage framework with per-stage explanations, the internal-monologue funnel, and the 3-action checklist all render correctly with no overflow. Homepage teaser re-verified visually at desktop width to still show exactly 3 numbered rows.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 4 real guides (`why-more-leads-wont-fix-growth`, `one-market-one-service-one-offer`, `why-10-percent-off-isnt-an-offer`, `stop-sending-paid-traffic-to-your-homepage`) generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 4 guides; `/resources` hub now spans all three live categories (Revenue Intelligence, Offer Engineering, Conversion Infrastructure) with no hard-coded layout changes required.
- Guides #1–#3 confirmed still functional and unchanged in content (Guide #2's `relatedGuideSlugs` was not touched this phase — no reason to link it to Guide #4).

## Not Done (By Instruction)

- Field Guide #5 was not started.
- Homepage teaser was not expanded or altered beyond its existing 3 guides.
- Industry-page Field Guide sections remain inactive.
