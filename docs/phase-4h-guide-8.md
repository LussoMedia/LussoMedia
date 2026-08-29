# Phase 4H — Field Guide #8 (First Industry-Specific Guide)

## Why Industry-Specific Content Starts Here

Landscaping was chosen because it's the vertical with the widest realistic service mix on the site (design, install, pavers, irrigation, turf, outdoor kitchens, fire features, planting, maintenance, grading, lighting) and therefore the clearest illustration of "which service deserves the campaign" — a decision that matters far less for a narrower trade. It's also the industry with Lusso's strongest existing public proof (Full Curl Landscaping), which the guide's Proof factor and its link to Guide #7 can point to without fabricating anything new.

## Cannibalization Review

Reviewed against all 10 Deep Guides, Field Guides #1–#7, `/landscaping`, `/system`, and the Playbook.

**Specifically against Guide #2** (*The One Market, One Service, One Offer Framework*) — the review this phase was built around:

| | Guide #2 | Guide #8 |
|---|---|---|
| Teaches | Focus one campaign around one market/service/problem/offer/CTA | How to choose *which* service is worth that focus in the first place |
| Assumes | The service to advertise is already decided | Nothing is decided yet — the business offers many services |
| Core mechanism | Message concentration | Economic opportunity evaluation (ticket, margin, demand, capacity, differentiation, proof) |
| Where it sits in the sequence | Second | First |

Guide #8 never instructs the reader to "focus the campaign" — that instruction is deliberately left to Guide #2, referenced only via a contextual link ("Once you've chosen the economic opportunity, focus the campaign around it") once the reader has already done Guide #8's actual job: picking the service. No sentence in Guide #8 restates Guide #2's content.

**Other content reviewed:** no Deep Guide, other Field Guide, or `/landscaping`'s existing copy teaches a multi-factor service-selection framework — `/landscaping`'s "economics" bullets state that design/build carries the real margin (a conclusion), not a method for evaluating options generally. Genuinely new intent — earns its own URL.

## Guide URL

`https://illussomedia.com/resources/landscaping-what-to-advertise`

## Industry Metadata

Added `FieldGuideIndustry` (currently just `'landscaping'` — deliberately not a full enum of every vertical, per instruction) and an optional `industry?: FieldGuideIndustry` field on `FieldGuide`. Where set, the guide's eyebrow and its `FeaturedGuideCard` both render `"{Industry} · {Category}"` (e.g. "Landscaping · Market Intelligence") via a new `getIndustryLabel()` helper — implemented in both `FieldGuideTemplate.tsx` and `FeaturedGuideCard.tsx`. No industry-filter UI was built; this only prepares the architecture, per instruction.

## Core Idea

A landscaping company offering many services should not advertise all of them equally. Evaluate each candidate service across six factors — ticket, margin, demand, capacity, differentiation, proof — before deciding which one earns a focused campaign.

## Six Factors

Implemented via the `metricsSection` field (built in Phase 4E), titled "The 6 Factors to Score": Average Ticket, Gross Margin, Market Demand, Fulfillment Capacity, Differentiation, Proof — each with a one-sentence explanation and an embedded diagnostic question. The brief's separate "Capacity Warning" callout ("Demand isn't helpful if you can't fulfill it") was folded directly into the Fulfillment Capacity metric's detail rather than added as a second standalone callout slot, keeping the guide within its word-count target while still delivering the same point — and it reinforces Guide #1 without restating it, exactly as intended.

## Opportunity Matrix

The Lusso Service Opportunity Matrix (`framework`): Economics → Market → Operations → Authority → Campaign Candidate, with `frameworkQuestions` clarifying what rolls up into each category (Economics = Ticket + Margin; Market = Demand + Differentiation; Operations = Capacity; Authority = Proof). Explicitly labeled a "strategic decision framework, not a scientifically validated model."

## Scorecard Disclaimer

The 1–5 self-scoring exercise reuses the `Scorecard` primitive exactly as Guide #3's Quick Offer Check did (six factors, each rendered as "Worth Checking"), with the scoring scale and interpretation ranges (6–14 / 15–23 / 24–30) placed in `interpretationNote`, which explicitly states: *"This is a simple planning tool, not a validated financial model."* No range is presented as industry research.

## Example

A fully generalized four-service comparison (weekly maintenance, irrigation repair, paver installation, full design/build) showing that the largest-ticket service isn't automatically the strongest campaign candidate — no universal winner is declared, per instruction.

## Actions (exactly 3)

List your top five services · Score each one · Pick one to investigate.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Is the Market the Problem — or Something Else?"

## Related Guides

Guide #2 (focus the campaign once chosen), Guide #7 (the Proof factor references it directly), and Guide #1 (the capacity-warning theme echoes its diagnosis) — all three genuinely reasoned, at the documented maximum of 3.

## Market Intelligence Integration

Added to **01 — Market Intelligence** (`lib/config/systemComponents.ts`) — the first guide tied to this component. Not added to Offer Engineering, since the guide is about *which* service to pursue, a decision that precedes offer creation rather than being part of it.

## Landscaping Page Integration

Per instruction, the full `relatedFieldGuideSlugs` module (a 3-column "Growth Strategies for Landscaping Companies" grid) was **not** activated — one guide doesn't justify that module. Instead, a new, more restrained field was added: `economicsFieldGuide?: { slug, label }` on `IndustryPage`, rendered as a single plain-text "FIELD GUIDE →" link directly under the existing economics section on `/landscaping` only. Verified live: no other industry page (plumbing spot-checked) shows this link — the field is `undefined` everywhere except landscaping.

## Resource Hub

Guide #8 populates **Market Intelligence** — the first guide in that category — automatically, with no hard-coded hub changes. The hub's featured set (Guide #2, #4, #7) and the homepage teaser (Guide #1, #2, #5) were both verified unchanged, per instruction not to alter either just because a new guide published.

## SEO

- Title: "How Landscaping Companies Should Choose What to Advertise | Lusso Media" (chosen over the alternative for exact match to the H1 and clearer intent)
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)
- No confidential client economics used anywhere — all figures in the example are generic and explicitly not tied to any real business

## Analytics

Reused the existing event set — no new analytics architecture. `field_guide_related_click` fires from the new `/landscaping` inline link with `from: 'industry-landscaping-economics'`, consistent with the existing industry-page tracking pattern.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on both the guide itself (six-factor list, opportunity matrix, scorecard, example, actions) and on `/landscaping` (inline Field Guide link renders inline, no overflow).

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 8 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 8 guides.
- Homepage verified live: unchanged (Guides #1, #2, #5).
- Hub featured row verified live: unchanged (Guides #2, #4, #7).
- `/landscaping` verified showing the new inline link; `/plumbing` spot-checked and confirmed showing no such link.
- System page's Market Intelligence component confirmed linking correctly to Guide #8.
- Guides #1–#7 confirmed unchanged; all 10 Deep Guides untouched.

## Not Done (By Instruction)

- Field Guide #9 was not started.
- The full industry Field Guide module (`relatedFieldGuideSlugs`) was not activated on any industry page.
- Guide #8 was not added to plumbing, HVAC, roofing, concrete, electrical, remodeling, or general contracting pages.
- Homepage and hub featured sets were not altered.
- No Resource Hub industry-filter UI was built.
