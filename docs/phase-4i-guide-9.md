# Phase 4I — Field Guide #9 (Second Industry-Specific Guide)

## Why Plumbing Did Not Reuse the Landscaping Framework

Guide #8 (landscaping) and Guide #9 (plumbing) share nothing but the template shell (header, six-part structure) and category (Market Intelligence). Concretely:

| | Guide #8 (Landscaping) | Guide #9 (Plumbing) |
|---|---|---|
| Core question | *Which service* should get the marketing budget? | *How does the customer's buying situation* change how a chosen service should be marketed? |
| Core concept | Economic opportunity evaluation (ticket, margin, demand, capacity, differentiation, proof) | Buyer state (Urgent / Planned / Improvement) and campaign architecture |
| Primary visual | `beforeAfter` (business-centered vs. growth-centered) + a `framework` sequence (Economics → Market → Operations → Authority → Campaign Candidate) | `framework` (+-joined 3 buyer types) + a brand-new `comparison` visual (3-column matrix) |
| Scoring mechanism | 1–5 self-rating across 6 factors (reused Guide #3's Scorecard pattern) | None — deliberately no scorecard, per instruction not to duplicate Guide #8's matrix |
| Examples | 4 landscaping services compared on the same 6 factors | 3 campaign messages for the *same* company across 3 buyer states |
| Actions | List top 5 services, score each, pick one to investigate | Label top services by dominant buying mode, check the message fits, check the CTA fits |

No sentence, structure, or example from Guide #8 was reused. A new visual primitive (`comparison`, see below) was built specifically because Guide #9's core matrix has a genuinely different shape (3 buyer types × 6 dimensions) than Guide #8's 1–5 scorecard — reusing the Scorecard here would have been the exact template-swap the brief warned against.

## Cannibalization Review

Reviewed against all 10 Deep Guides, Field Guides #1–#8, `/plumbing`, `/system`, and every existing plumbing-specific Deep Guide (`plumbing-lead-follow-up-systems`).

**Specifically against Guide #6** (*The 5 Awareness Levels*): Guide #6 teaches a general-purpose spectrum of what a prospect *knows* (Unaware → Most Aware), applicable to any service. Guide #9 teaches plumbing-specific buyer *situations* (Urgent/Planned/Improvement) that drive campaign architecture — message job, CTA style, and conversion-path length — a different axis entirely. The guide includes a dedicated section, "Buying Mode and Awareness Are Related — But Not the Same," making this distinction explicit rather than leaving it implicit, with a worked example (two homeowners who both understand water heaters but are in different buying situations) and a link to Guide #6 for the awareness dimension specifically.

**Specifically against Guide #8:** see the table above — different core concept, different visual model, different diagnostic, different examples, different actions, as required.

**Deep Guide `plumbing-lead-follow-up-systems`:** covers post-lead follow-up cadence for higher-ticket plumbing work — a downstream operational concern, not campaign/message architecture. No overlap.

**Conclusion:** genuinely distinct intent from every other page on the site — earns its own URL.

## Guide URL

`https://illussomedia.com/resources/plumbing-types-of-demand`

## Industry Metadata

`FieldGuideIndustry` extended from `'landscaping'` to `'landscaping' | 'plumbing'` (one value at a time, still no filter UI — two industries doesn't justify one, per instruction).

## Three Demand Types

Implemented via `metricsSection` (title: "The 3 Types of Plumbing Demand") — Urgent, Planned, Improvement — each with mindset, examples, message job, and CTA style in `detail`, plus the conversion-path chain in the `formula` field (a natural fit for a short arrow sequence, e.g. `Problem → Trust → Action`).

## Demand Matrix

A new, genuinely reusable visual primitive was added: `ComparisonVisual` (`{ type: 'comparison', columns: string[], rows: { label, values }[] }`), rendered by a new `Comparison` component in `components/resources/visuals.tsx`. It renders each row as a card with a `sm:grid-cols-3` layout that collapses to a single column below `sm:` — verified at 320px to stack cleanly with zero horizontal overflow, satisfying the brief's explicit "do not force a wide table that scrolls horizontally" requirement. The matrix compares Urgent/Planned/Improvement across Customer Mindset, Education Needed, Research Depth, Proof Requirement, Conversion Path Length, and CTA Style, using only qualitative labels (Lower/Medium/Higher, Short/Medium/Longer) — no invented percentages or benchmarks.

## Example Campaigns

Three fully genericized messages for one hypothetical plumbing company (active-problem, water-heater-replacement, hard-water-improvement) — no confidential client data, no specific discounts or pricing.

## Actions (exactly 3)

Label your top services · Check the message · Check the next step.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Is Your Campaign Built Around How Customers Actually Buy?"

## Related Guides

Guide #6 (awareness vs. buying mode, distinguished explicitly), Guide #4 (destination architecture varies by demand type), Guide #2 (campaign concentration) — all three named in the brief, each linked once, no repeated emphasis.

## System Page Decision

**Left unchanged, deliberately.** Per the brief, Guide #9 is more vertical-specific than Guide #8 was (Guide #8 introduced Market Intelligence's *first* operating framework and earned that slot; Guide #9 is a second, narrower application of a component that already has a real guide). Adding it would not teach a new reusable Lusso principle at the System level — it would just be a second link crowding one component. No `relatedGuide`/`relatedGuides` field was touched on any `systemComponents.ts` entry this phase.

## Plumbing Industry Integration

Reused the exact `economicsFieldGuide` field and rendering built for landscaping in Phase 4H — no rename to `contextualFieldGuide` or similar was needed; the field was already generic enough for a second industry (a single `{ slug, label }` pair rendered as one plain-text link under the economics section). Verified live on `/plumbing`.

## Landscaping Regression Check

Verified live: `/landscaping` renders identically to before this phase — same content, same single Field Guide link to Guide #8, no visual or functional change, since no shared component was modified (only new data was added to `/plumbing`'s own config entry).

## Resource Hub

Guide #9 now shows "Plumbing · Market Intelligence" (via the existing `getIndustryLabel()` helper from Phase 4H) in its own category section. No industry filter was added — two industry-specific guides remains premature, per instruction. Hub's featured row (Guide #2, #4, #7) verified unchanged.

## SEO

- Title: "3 Types of Plumbing Demand and How to Market Each | Lusso Media"
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)
- No universal benchmarks, close-rate claims, or unsupported performance comparisons anywhere in the guide

## Analytics

Reused the existing event set — no new analytics architecture. The plumbing-page inline link fires `field_guide_related_click` with `from: 'industry-plumbing-economics'`, consistent with the landscaping pattern from Phase 4H.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on the full guide. The new `Comparison` visual was the specific risk called out in the brief — verified visually that all 6 rows stack into single-column cards with clear URGENT/PLANNED/IMPROVEMENT labels, no table element, no horizontal scroll.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 9 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 9 guides.
- Homepage verified live: unchanged (Guides #1, #2, #5).
- Hub featured row verified live: unchanged (Guides #2, #4, #7).
- System page verified unchanged (no mention of Guide #9 anywhere on `/system`).
- `/plumbing` verified showing the new inline link; `/landscaping` verified unchanged (regression check passed).
- Guides #1–#8 confirmed unchanged; all 10 Deep Guides untouched.

## Not Done (By Instruction)

- Field Guide #10 was not started.
- Guide #9 was not added to HVAC, roofing, concrete, electrical, remodeling, or general contracting pages.
- No Resource Hub industry-filter UI was built.
- Homepage and hub featured sets were not altered.
- System page was intentionally left unchanged.
