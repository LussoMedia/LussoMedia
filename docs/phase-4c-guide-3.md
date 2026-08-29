# Phase 4C — Field Guide #3 + Homepage Field Guides Teaser

## Cannibalization Review

Reviewed against: all 10 Deep Guides, Field Guide #1, Field Guide #2, the System page's Offer Engineering copy, and every industry page's "Offer Examples" section.

- **Deep Guides:** none address the discount-vs-offer distinction. Closest by keyword ("offer") is `landscaping-design-deposit-strategies`, which is about using a design deposit to filter serious clients — a qualification mechanic, not a pricing/value-construction principle. No overlap.
- **Field Guide #2** established the market×service×problem×offer×CTA framework but treats "One Offer" as a single term in a five-part equation, without unpacking what makes an offer strong. This guide is the natural deep-dive on that one term — different depth, not duplicate.
- **System page, Offer Engineering (02):** one sentence ("Generic 'free estimate' positioning...") establishing that offer strength matters generally — never explains the discount/value distinction or the five value levers. No overlap; this guide is what that sentence gestures toward.
- **Industry pages' "Offer Examples":** show illustrative example offers per vertical, not the underlying construction principle. No overlap.

**Conclusion:** genuinely new intent (why price alone is a weak offer, and what actually strengthens one) — earns its own URL rather than folding into Guide #2 or any Deep Guide.

## Guide URL

`https://illussomedia.com/resources/why-10-percent-off-isnt-an-offer`

## Core Idea

A discount changes price. A strong offer changes perceived value. Not an argument against discounts — a discount can be *part* of an offer, but shouldn't have to carry the entire buying decision alone.

## Visuals

- **See It:** `beforeAfter` — "Price Changed" (service + discount + generic CTA) vs. "Decision Changed" (problem → outcome → process → proof → value → specific CTA), captioned "A discount changes one variable. An offer changes the entire buying proposition."
- **The Framework:** `framework` visual — Outcome↑ + Certainty↑ + Time/Friction↓ + Effort/Risk↓ + Reason to Act (`+` connector, since these are independent levers, not a sequence) — plus a one-sentence explanation per lever.
- **Key Principle:** "A discount asks, 'How much less?' An offer asks, 'Why is this worth choosing?'"
- **Example:** a fully genericized plumbing example (weak: "$250 Off..." vs. the stronger structure's six components) — no confidential client offer details used anywhere.

## Scorecard

A `scorecard` secondary visual — "Quick Offer Check," 5 yes/no questions, all rendered as "Worth Checking" (the existing Scorecard component's neutral status label, appropriate here since the reader — not Lusso — is scoring their own offer). A new `interpretationNote` field (added to the content model, backward-compatible) renders the 0–2/3–4/5 interpretation ranges directly below, explicitly framed as "a simple educational self-check, not a validated scoring model" — matching the brief's instruction not to represent it as scientifically validated.

## Actions (exactly 3)

Remove the discount temporarily · Add certainty · Reduce one piece of friction.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "How Strong Is the Rest of Your Growth System?"

## Internal Linking

- **Continue Learning** on Guide #3: links to Guide #2 (natural predecessor — this guide deepens its "One Offer" term) and Guide #1 (diagnostic framing) — both genuine relationships.
- **Guide #2 updated** to also link forward to Guide #3 (its `relatedGuideSlugs` now includes both Guide #1 and Guide #3) — the only change made to Guide #2's content this phase, and it mirrors the same "genuine next step" logic used when Guide #1 was updated to link to Guide #2 in Phase 4B.
- No Deep Guide cross-link — none target this intent closely enough.

## Homepage Integration

Activated `components/FieldGuidesHomeBlock.tsx` and inserted it into `app/page.tsx` immediately after `<SystemDeepDive page="home" />` and before `<NinetyDayRoadmap />` — placed once the System and proof sections have already run, and well before the guarantee/qualification/final-CTA conversion cluster at the bottom of the page, per the brief's positioning guidance.

- **Layout:** rebuilt as numbered editorial rows (01/02/03 — category — title — premise — read time), matching the `DominanceSystemDiagram`/`NinetyDayRoadmap` pattern rather than a third generic 3-card grid.
- **Copy:** exact eyebrow/headline/supporting copy from the brief.
- **CTA hierarchy:** "Explore All Field Guides →" is a plain teal text link (no button styling), deliberately quieter than every `booking-btn--primary` on the page — verified visually, it does not compete with the site's primary CTAs.
- Renders the 3 `featured: true` guides via the existing `getFeaturedGuides()` helper — no hard-coded guide list, no new data source.

## SEO

- Title: "Why 10% Off Isn't a Home Service Offer | Lusso Media"
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image (category + title) — all via the existing Phase 3 pipeline, no changes to the schema/OG code itself
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Reused the existing event set (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`) — no new event type introduced. The homepage teaser's guide links and CTA fire `field_guide_related_click` with `from: 'homepage_teaser'` / `'homepage_teaser_cta'`, consistent with how every other internal Field Guide link on the site is tracked, rather than adding a duplicate `homepage_field_guide_click` event for the same thing.

## Mobile QA

Checked at 320px, 375px, and desktop:
- Guide #3's framework visual, 5-lever explanation list, and Scorecard all confirmed readable and non-overflowing (`scrollWidth === innerWidth` at 320px).
- Homepage teaser's numbered rows stack cleanly on mobile with no overflow (`scrollWidth === innerWidth` at 375px).
- System page's new "Related Field Guides" (plural) block on Offer Engineering confirmed rendering alongside the unchanged singular "Related Field Guide" block on Revenue Intelligence.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 3 real guides (`why-more-leads-wont-fix-growth`, `one-market-one-service-one-offer`, `why-10-percent-off-isnt-an-offer`) generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; the homepage, `/resources` hub, and all 3 guides render with correct canonicals; sitemap includes the hub and all 3 guides.
- System page verified showing both the plural and singular related-guide states correctly.

## Not Done (By Instruction)

- Field Guide #4 was not started.
- Industry-page Field Guide sections remain inactive (3 generic guides isn't sufficient justification per the brief).
- Navigation was not further changed — Growth Tools' Diagnose/Learn/Implement structure from Phase 4A was preserved as-is.
