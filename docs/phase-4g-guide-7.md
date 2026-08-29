# Phase 4G — Decouple Featured Controls + Field Guide #7

## Featured Architecture Fix (Task A)

**Prior shared behavior:** a single `featured?: boolean` field on `FieldGuide` drove both `getFeaturedGuides()` consumers — the homepage teaser (`components/FieldGuidesHomeBlock.tsx`) and the `/resources` hub's "Featured" row (`app/resources/page.tsx`). Phase 4F's homepage curation (swapping Guide #3 for Guide #5) therefore silently changed the hub's featured row too, since both surfaces read the same flag.

**New independent fields**, added to `FieldGuide` in `lib/config/fieldGuides.ts`:
```ts
featuredOnHomepage?: boolean;
featuredOnHub?: boolean;
```
The old `featured` property was removed entirely rather than deprecated — safe to do cleanly since only 6 real guides and 2 dev-only draft guides existed, all migrated in this same change (see Migration below). No ambiguous or competing logic was left in place.

**Query helpers:** `getFeaturedGuides()` was split into `getHomepageFeaturedGuides(max)` and `getHubFeaturedGuides(max)`, each filtering on its own field. `FieldGuidesHomeBlock.tsx` now calls `getHomepageFeaturedGuides(3)`; `app/resources/page.tsx` now calls `getHubFeaturedGuides(3)` for its Featured row. The hub's `hasPublishedContent` indexability gate was simplified to `getPublishedGuides().length > 0` (it no longer needs to reference featured guides at all — it only cares whether *any* guide is published).

**Template scaffold** (`lib/config/fieldGuides.template.ts`) updated to show both new fields with their distinct purposes documented inline, so a future guide author sets each deliberately instead of assuming one flag does both jobs.

**Validation:** no changes needed — neither field is required, and nothing in `validateFieldGuide` referenced `featured`.

### Migration

| Guide | Homepage (preserved from Phase 4F) | Hub (newly, independently selected) |
|---|---|---|
| #1 Why More Leads Won't Fix Growth | ✅ | — |
| #2 One Market, One Service, One Offer | ✅ | ✅ |
| #3 "10% Off" Isn't an Offer | — | — |
| #4 Stop Sending Traffic to Your Homepage | — | ✅ |
| #5 The Lead-to-Booked-Job System | ✅ | — |
| #6 The 5 Awareness Levels | — | — |
| #7 The Job-to-Authority Flywheel | — | ✅ |

**Homepage selection:** unchanged from Phase 4F — verified live, still exactly Guides #1, #2, #5 in that order.

**Hub selection:** chosen from the brief's Option B (Guide #2 — Offer Engineering, Guide #4 — Conversion Infrastructure, Guide #7 — Authority & Reputation) rather than Option A, and rather than simply repeating the homepage's set. Reasoning: the homepage and hub serve different visitors at different points in the funnel, so showing the *same* three guides in both places wastes half of Lusso's total "first impression" surface area. Guide #1 (Revenue Intelligence) is already prominent on the homepage; giving the hub's featured row three *different* categories — Offer Engineering, Conversion Infrastructure, and the newly-active Authority & Reputation — maximizes the total number of distinct concepts a visitor sees across the two surfaces combined, and gives Guide #7 real discovery visibility on its publish day without featuring it "because it's new" (Revenue Intelligence and Demand & Advertising are left uncovered by the hub's featured row, but both are still one click away in their own category sections directly below).

## Cannibalization Review (Task B)

Reviewed against all 10 Deep Guides, Guides #1–#6, `/system`'s Authority Engine and Reputation Engine copy, and every industry page. No existing content teaches the capture→package→distribute→reuse cycle for completed-job evidence. The closest concepts — Guide #3 (offer certainty), Guide #4 (landing-page proof), Guide #6 (Company-Aware messaging needs proof) — all *reference* proof as a supporting element within a different primary lesson; none teach how to systematically produce it. Genuinely new intent — first resource under Authority & Reputation.

## Guide URL

`https://illussomedia.com/resources/job-to-authority-flywheel`

## Core Idea

A completed job should not be treated as the end of the marketing cycle. It can produce project photography, video, reviews, testimonials, case studies, before/after proof, educational content, and sales/advertising collateral — assets that increase confidence for the next prospect, distributed across the website, Google, ads, sales, social, and email, not just "post more on social media."

## The Flywheel

**See It:** `beforeAfter` — "Value Stops Here" (Job → Invoice → Done) vs. "Value Compounds" (Job → Capture → Proof → Distribute → Trust → Next Job → More Proof), captioned "One version ends at the invoice. The other feeds the next sale."

**The Lusso Authority Flywheel (framework):** Deliver → Capture → Package → Distribute → Reuse → Compound, each with a one-sentence job description.

**Proof Distribution Map (secondary visual):** since no branching visual primitive exists — and none was built, per instruction — a `+`-joined `framework` list (Website + Landing Page + Google + Ads + Sales + Social) communicates "one completed job, six destinations" without a graph library.

## Proof Types

"What One Job Can Create" replaces the standard "Why It Happens" section using the `metricsSection` content-model addition (built in Phase 4E) — an editorial numbered sequence of five proof categories (Project, Customer, Educational, Sales, Advertising) rather than five cards, with no invented asset-count claim ("30 pieces" etc.) anywhere.

**Reviews and permission/privacy**, both required by the brief, were combined into one compact supplementary note (reusing the `interpretationNote` field generically, rendered under the distribution map) rather than two separate subsections — kept the guide within its word-count target while still covering both: request reviews from real customers only (never buy/script/incentivize), and get appropriate permission before using names, faces, homes, or project details.

## Example

A fully genericized outdoor living/landscaping installation — capture list and package-into list — with no client-specific data.

## Actions (exactly 3)

Pick your last five jobs · Create a job-closeout checklist · Put one piece of proof where a sale happens.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Is Your Reputation Actually Working for You?"

## Related Guides

All three guides named in the brief were included (each carries an individually reasoned, non-mechanical connection, and 3 is the documented maximum): Guide #3 (proof increases offer certainty), Guide #4 (landing pages need relevant proof), Guide #6 (Company-Aware prospects need proof before acting).

## System Integration

Added to **04 — Authority Engine**, not 06 — Reputation Engine. Authority Engine's actual definition ("8–12 finished short-form content assets per month," "make the company's online presence match the quality of the operation") is exactly what this guide teaches how to source; Reputation Engine is narrower — specifically reviews/Google Business Profile — and this guide is not duplicated there, per instruction to choose one primary home.

## Resource Hub

Publishing Guide #7 activates **Authority & Reputation** as a live category on `/resources` — the hub now spans five categories with at least one guide each except Market Intelligence and Search & Local Discovery. Guide #7 is also part of the hub's newly-independent featured set (see Task A above).

## SEO

- Title: "The Job-to-Authority Flywheel for Home Service Businesses | Lusso Media"
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Reused the existing event set (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`). Homepage click tracking is unaffected by the featured-flag split — it still fires from the same component, now reading `getHomepageFeaturedGuides()` instead of the old shared helper, with identical event names/params.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on the full guide — the flywheel before/after, the 5-item proof-types sequence, the 6-stage framework, the distribution map, and the 3-action checklist all render without overflow.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 7 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 7 guides.
- Homepage verified live: still exactly Guides #1, #2, #5, unchanged.
- Hub's Featured row verified live: now independently shows Guides #2 and #4 (and #7, confirmed in the category section below), decoupled from the homepage set as intended.
- Guide #1 spot-checked: still `index, follow`, self-canonical, fully functional — only its stored field name changed (`featured` → `featuredOnHomepage`), no content or behavior change.
- System page's Authority Engine component confirmed linking correctly to Guide #7.

## Not Done (By Instruction)

- Field Guide #8 was not started.
- Guide #7 was not added to the homepage teaser.
- Industry-page Field Guide sections remain inactive.
