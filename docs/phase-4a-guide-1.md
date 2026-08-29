# Phase 4A — Guides Reconciliation & Field Guide #1

## Existing Guides Decision

All 10 existing `/guides/[slug]` pages were preserved exactly as-is: no changes to `lib/config/guides.ts`, no redirects, no canonical changes, no deletions, no noindexing, no rewriting. Full inventory and classification in [docs/existing-guides-audit.md](existing-guides-audit.md).

**Why preserved:** these pages carry real, accumulating SEO equity (indexed, in the sitemap, internally linked, genuinely useful long-form content per the audit's usefulness-based classification — 9 of 10 classified as Deep Guide, 1 flagged for a later positioning review with no action taken). Moving, merging, or shortening them into `/resources/` for URL/format consistency would have been consistency for its own sake at the cost of real, working search assets — explicitly prohibited by the Phase 4A brief.

**Public distinction adopted:** *Field Guides* (`/resources/[slug]`) are short (2–4 min), visual, one-idea strategy briefs organized by growth-system category. *Deep Guides* (`/guides/[slug]`, unchanged) are comprehensive, search-oriented educational articles. Neither is positioned as better — they serve different reader intents, stated plainly on the `/resources` hub ("Short Field Guides when you need an answer quickly. Deeper Guides when you want the full framework.").

## Resource Hub

`/resources` ([app/resources/page.tsx](../app/resources/page.tsx)) is now the primary public educational hub — indexed (`robots: index, follow`, confirmed live), self-canonical, and in the sitemap, now that Field Guide #1 is real content:

- **Hero:** eyebrow "Growth Resources," H1 "Practical Growth Strategy for Home Service Operators.," the two-format supporting line.
- **Field Guides section:** description line, Featured cards (1 today — Field Guide #1, marked `featured: true`), then category sections (only categories with ≥1 published guide render; today that's Revenue Intelligence only).
- **Deep Guides section:** description line, then a card grid of all 10 existing `/guides/[slug]` entries, linking straight to their real, unchanged URLs — no content duplicated, no new copy written for them.
- A restrained cross-link was added to the top of `/guides` ([app/guides/page.tsx](../app/guides/page.tsx)): *"Looking for Lusso's short, actionable Field Guides? Explore Growth Resources →"* — no redesign of that page otherwise.

## Field Guide Published

**URL:** `https://illussomedia.com/resources/why-more-leads-wont-fix-growth`

**Core Idea:** Find the constraint before increasing demand — a business can generate more opportunities and still fail to grow if those opportunities leak elsewhere in the customer journey. The guide does not argue businesses never need more leads; it teaches owners to determine whether demand is actually their next constraint.

**Visual Used:**
- **See It:** `leakMap` — Attention → Lead → Contacted → Qualified → Estimate → Booked Job → Revenue, with Contacted and Estimate flagged as common leak points, plus the caption "More traffic enters at the top. Revenue only comes out at the bottom."
- **Illustrative example:** a clearly labeled hypothetical `funnel` (100 Inquiries → 82 Reached → 55 Qualified → 34 Estimates → 14 Jobs) with an explicit "hypothetical numbers for illustration only, not an industry benchmark" note — no claim these are real Lusso/client/industry figures.
- **The Framework:** `framework` visual (Demand → Capture → Qualify → Respond → Estimate → Close → Revenue) plus a 7-item diagnostic question list (one question per stage) and a highlighted Key Principle callout ("Don't increase traffic until you know what happens to the traffic you already have.").

**Actions (exactly 3):** Map your last 30 days · Find the biggest drop · Fix one constraint first.

**CTA:** Single CTA in Next Step — "Find My Biggest Growth Leak" → `/local-dominance-score`, under the headline "Not Sure Where the Constraint Is?"

**SEO:**
- Title: "Why More Home Service Leads Won't Fix a Broken Growth System | Lusso Media"
- Meta description: as specified in the brief, unchanged
- Self-referencing canonical, `Article` + `BreadcrumbList` JSON-LD (verified via `fetch` + `JSON.parse` in-browser — both valid, headline/description/dates/author/publisher/image/mainEntityOfPage all accurate, no fabricated fields)
- Open Graph image auto-generated (`/resources/why-more-leads-wont-fix-growth/opengraph-image`) — verified visually: logo, "FIELD GUIDE" label, category, title, clean and legible
- Included in `app/sitemap.ts` automatically (confirmed present after `next build`)

**Internal Links:**
- Deep Guide cross-link ("Want the Complete Framework?") to `how-to-qualify-home-service-leads` and `speed-to-lead-for-contractors` — the two existing Deep Guides most relevant to the funnel-stage concepts this guide references
- Fallback "Go Deeper" block (since no other Field Guide exists yet) linking to `/system` and the 90-Day Playbook — not labeled as Field Guides
- System page: the Revenue Intelligence component (07) now shows a "Related Field Guide" link to this guide — the only System component touched, per the brief's "do not add it to unrelated components"
- Industry pages: intentionally **not** touched, per the brief's explicit instruction to wait until the relationship is strategically useful

**Analytics:** `field_guide_view` fires on page load; `field_guide_action_click` fires from each "Do This This Week" checkbox toggle; `field_guide_score_click` fires from the Next Step CTA; `field_guide_related_click` fires from the Deep Guide links, the System-page related-guide link, the "Go Deeper" links, and the new footer/nav Field Guides links. All carry `slug`/`category`/`destination` only — no PII.

## Navigation Activated

- **Growth Tools dropdown** ([components/nav/GrowthToolsDropdown.tsx](../components/nav/GrowthToolsDropdown.tsx)) restructured into DIAGNOSE / LEARN / IMPLEMENT groups. LEARN links only to `/resources` (not a separate Deep Guides entry) — the hub itself surfaces both formats, per the brief's "prefer simplicity" instruction. Mobile drawer ([components/Nav.tsx](../components/Nav.tsx)) mirrors the same structure.
- **Footer** ([lib/config/navigation.ts](../lib/config/navigation.ts)): added "Field Guides" → `/resources`; renamed the existing "Guides" entry to "Deep Guides" (same `/guides` destination, no URL change) so the two formats read consistently everywhere. Not redundant — each points to a genuinely different destination.
- **Homepage:** left inactive. Only one Field Guide exists; the brief explicitly says wait for ~3 before showing the homepage teaser block (`components/FieldGuidesHomeBlock.tsx` remains built, unused).

## QA

- Desktop, 375px, and 320px all checked in-browser: leak map, illustrative funnel, framework diagnostic grid, and action checklist all stack/reflow correctly with **zero horizontal overflow** (confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` at the narrowest width).
- Breadcrumbs, CTA, and all internal links resolve correctly (verified via accessibility-tree read of the rendered page).
- `Article`/`BreadcrumbList` JSON-LD parsed and validated in-browser.
- Sitemap confirmed to include the new guide and the `/resources` hub, and to still include all 10 unchanged `/guides/[slug]` URLs.
- Draft guides (`dev-demo-lead-leak`, `dev-demo-visual-gallery`) confirmed still excluded from the production build (only `why-more-leads-wont-fix-growth` appears under `/resources/[slug]` in the build output).
- `npx tsc --noEmit`, `npx eslint`, and `npx next build` all pass clean.

## Search Cannibalization Review

Compared against all 10 Deep Guides (full comparison in [existing-guides-audit.md](existing-guides-audit.md)). The two closest by subject matter are `how-to-qualify-home-service-leads` (qualification framework) and `speed-to-lead-for-contractors` (response-speed framework) — both are real overlap **candidates** since they touch lead conversion.

**Conclusion: no meaningful cannibalization.** Both existing Deep Guides are single-stage, tactical how-tos ("how do I qualify a lead," "how fast should I respond"). Field Guide #1 operates one level up — it's a whole-chain diagnostic framework (Demand → Capture → Qualify → Respond → Estimate → Close → Revenue) whose point is *deciding which stage to fix first*, not teaching any one stage in depth. This is Option B from the brief (the intent already differs — diagnostic/systems framing vs. tactical execution) rather than a shorter rewrite of either existing guide. Because the relationship is genuine, the guide links to both as "the complete framework" for whichever stage a reader identifies as their constraint, rather than ignoring the overlap or duplicating their content.

## Not Done (By Instruction)

- Field Guide #2 was not started.
- Industry-page Field Guide sections were not added.
- The homepage teaser block was not activated.
- The `st-george-contractor-marketing` "Legacy/Review" flag was documented only — no restructuring performed.
