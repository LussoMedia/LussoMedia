# Phase 4B — Field Guide #2

## Guide

**Title:** The One Market, One Service, One Offer Framework
**URL:** `https://illussomedia.com/resources/one-market-one-service-one-offer`
**Category:** Offer Engineering

## Existing Content Comparison

Reviewed before writing anything:

- **All 10 existing `/guides/*` Deep Guides** (see [existing-guides-audit.md](existing-guides-audit.md)). None address campaign-level message concentration. The closest by subject area is `how-to-qualify-home-service-leads` (a post-click qualification framework, not a pre-click messaging framework) — different stage of the funnel entirely.
- **Field Guide #1** (`why-more-leads-wont-fix-growth`) — diagnoses *where* an existing system leaks between demand and revenue. It does not address *how to structure a single campaign's message*, which is this guide's entire subject.
- **System page, Offer Engineering component (02)** — its on-page copy is one sentence ("Generic 'free estimate' positioning makes a strong contractor look identical to a weak one") establishing that offer strength matters, but never teaches the market×service×problem×offer×CTA structure. No overlap; this guide is a natural expansion of that component, which is exactly why it's now linked from there.
- **Industry-page "Offer Examples" sections** — these show illustrative example offers per vertical (e.g. "Growth Strategies for X Companies"-adjacent content), not the campaign-concentration principle itself. No overlap.

## Search Intent Difference

No existing page teaches "why a business offering many services should still run single-focus campaigns." This is genuinely new intent — closer to "how to structure a home-service ad campaign" than anything currently on the site — so it earns a standalone URL rather than folding into an existing page.

## Core Idea

Concentrated messaging beats diluted advertising. **Not** "only sell one service" — a contractor can offer everything it already offers; each individual *campaign* should have one dominant conversion objective (one market, one service, one problem, one offer, one CTA).

## Visuals

- **See It:** `beforeAfter` — "Too Many Decisions" (7 mixed services + a generic CTA) vs. "One Clear Path" (market → problem → service → offer → specific CTA), with the caption "The service list didn't get smaller. The campaign got clearer."
- **The Framework:** `framework` visual — One Market × One Service × One Problem × One Offer × One CTA — plus a one-sentence explanation per term (reusing the Phase 4A `frameworkQuestions` field generically) and a "Key Principle" callout ("The company can be broad. The campaign should be narrow.").
- **Secondary continuity visual** (new, Phase 4B addition to the content model): a `funnel` — Market → Problem → Service → Offer → Action — showing the framework as a flow, not just a static equation.
- **Example walkthrough** (new, Phase 4B addition): a generic plumbing-company example (Market/Service/Problem/Offer/CTA rows) — fully genericized, no confidential client campaign details used.

Two small, backward-compatible optional fields (`secondaryVisual`, `example`) were added to `lib/config/fieldGuides.ts`'s `FieldGuide` interface to support this — no existing guide's data or rendering was affected, and no new visual *component* was built (the funnel example reuses the existing `Funnel` primitive; the example table is a simple new label/value row list in the template).

## Actions (exactly 3)

Pick one economic opportunity · Write one sentence ("We are helping [market] solve [problem] with [service] through [offer]") · Audit the conversion path.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under the headline "How Focused Is Your Growth System?"

## Internal Links

- **Continue Learning:** links to Field Guide #1 — a genuine next-step relationship (Guide #1 finds the constraint; Guide #2 explains how to concentrate the campaign that removes it), not a mechanical reciprocal link. Guide #1's `relatedGuideSlugs` was updated to link forward to Guide #2 for the same reason — the only change made to Guide #1's content in this phase.
- No Deep Guide cross-link was added — none of the 10 existing Deep Guides target this intent closely enough to be a genuinely useful link (documented rather than forced).

## System Integration

Activated only under **02 — Offer Engineering** (`lib/config/systemComponents.ts`), matching the guide's actual subject. No other System component was touched.

## SEO

- Title: "One Market, One Service, One Offer: Home Service Campaign Framework | Lusso Media"
- Meta description as specified in the brief
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD — verified via `fetch` + `JSON.parse` in-browser, all fields accurate
- OG image auto-generated via the existing per-guide template, showing category + title
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)

## Analytics

Same event set as Guide #1 (`field_guide_view`, `field_guide_action_click`, `field_guide_score_click`, `field_guide_related_click`), all firing from the existing template/CTA infrastructure with no new tracking code. No PII.

## QA

- Desktop, 375px, and 320px checked in-browser. The 5-term framework visual (`One Market × One Service × One Problem × One Offer × One CTA`) was the specific mobile risk called out in the brief — confirmed it wraps into readable 2-per-line groups at 375px rather than squeezing into one unreadable row, and `document.documentElement.scrollWidth === window.innerWidth === 320` at the narrowest width (no horizontal overflow).
- Both System-page related-guide links (Offer Engineering → Guide #2, Revenue Intelligence → Guide #1) confirmed rendering.
- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: both real guides (`why-more-leads-wont-fix-growth`, `one-market-one-service-one-offer`) generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; the `/resources` hub and both guides appear correctly in `sitemap.xml`.

## Not Done (By Instruction)

- Field Guide #3 was not started.
- The homepage Field Guides teaser block was not activated (2 real guides exist; brief specifies waiting for ~3).
- Industry-page Field Guide sections were not activated.
