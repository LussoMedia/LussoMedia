# Phase 4K — Resource Ecosystem Audit

Verified against live production data in `lib/config/fieldGuides.ts`, `lib/config/systemComponents.ts`, `lib/config/industryPages.ts`, and a `next build` production run (all 10 Field Guides + hub confirmed generating; both dev-only demo guides confirmed excluded). No new content was written in this phase — this is verification only.

## Part 1–2 — Complete Field Guide Inventory

| # | URL | Title | Category | Industry | Read Time | Primary Visual | Primary CTA | Related FGs | Related Deep Guides | System Rel. | Industry Page Rel. | Home Featured | Hub Featured | ~Words |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/resources/why-more-leads-wont-fix-growth` | Why More Leads Won't Fix a Broken Home Service Growth System | Revenue Intelligence | — | 3 min | `leakMap` | Score | #2, #5 | qualify-leads, speed-to-lead | 07 Revenue Intelligence (paired w/ #5) | — | ✅ | — | ~524 |
| 2 | `/resources/one-market-one-service-one-offer` | The One Market, One Service, One Offer Framework | Offer Engineering | — | 3 min | `beforeAfter` + `framework` | Score | #1, #3 | — | 02 Offer Engineering (paired w/ #3) | — | ✅ | ✅ | ~490 |
| 3 | `/resources/why-10-percent-off-isnt-an-offer` | Why "10% Off" Isn't a Home Service Offer | Offer Engineering | — | 3 min | `beforeAfter` + `scorecard` | Score | #2, #1 | — | 02 Offer Engineering (paired w/ #2) | — | — | — | ~762 |
| 4 | `/resources/stop-sending-paid-traffic-to-your-homepage` | Stop Sending Paid Traffic to Your Homepage | Conversion Infrastructure | — | 3 min | `beforeAfter` + `funnel` | Score | #2, #1 | — | 03 Conversion Infrastructure (sole) | — | — | ✅ | ~538 |
| 5 | `/resources/lead-to-booked-job-system` | The Lead-to-Booked-Job System | Revenue Intelligence | — | 4 min | `funnel` + `metricsSection` | Score | #1, #4 | — | 07 Revenue Intelligence (paired w/ #1) | — | ✅ | — | ~409 |
| 6 | `/resources/home-service-advertising-awareness-levels` | The 5 Awareness Levels in Home Service Advertising | Demand & Advertising | — | 4 min | `timeline` + `framework` | Score | #2, #3 | — | 05 Demand Engine (sole) | — | — | — | ~614 |
| 7 | `/resources/job-to-authority-flywheel` | The Job-to-Authority Flywheel | Authority & Reputation | — | 4 min | `beforeAfter` + `framework` | Score | #3, #4, #6 | — | 04 Authority Engine (sole) | — | — | ✅ | ~517 |
| 8 | `/resources/landscaping-what-to-advertise` | How Landscaping Companies Should Choose What to Advertise | Market Intelligence | Landscaping | 4 min | `beforeAfter` + `metricsSection` | Score | #2, #7, #1 | — | 01 Market Intelligence (sole) | `/landscaping` | — | — | ~736 |
| 9 | `/resources/plumbing-types-of-demand` | The 3 Types of Plumbing Demand | Market Intelligence | Plumbing | 4 min | `framework` + `metricsSection` + `comparison` | Score | #6, #4, #2 | — | — (deliberately) | `/plumbing` | — | — | ~580 |
| 10 | `/resources/hvac-demand-calendar` | The HVAC Demand Calendar | Market Intelligence | HVAC | 4 min | `beforeAfter` + `comparison` | Score | #2, #5 | — | — (deliberately) | `/hvac` | — | — | ~672 |

**Verified for all 10:** 200 response, `index, follow`, self-referencing canonical, unique `metaTitle`/`metaDescription`, `Article` + `BreadcrumbList` JSON-LD, sitemap inclusion, `field_guide_view`/`field_guide_action_click`/`field_guide_score_click`/`field_guide_related_click` wired, server-rendered primary copy (confirmed via `next build` static generation — every guide is a prerendered HTML page, not client-fetched).

## Part 3 — Category Coverage

| Category | Guides | Assessment |
|---|---|---|
| Revenue Intelligence | #1, #5 | Healthy — diagnosis + measurement, distinct roles |
| Offer Engineering | #2, #3 | Healthy — concentration + value construction, distinct roles |
| Conversion Infrastructure | #4 | Adequate — one guide, one clear job |
| Demand & Advertising | #6 | Adequate — one guide, one clear job |
| Authority & Reputation | #7 | Adequate — one guide, one clear job |
| Market Intelligence | #8, #9, #10 | Most populated (3), but justified — this is where all three industry-specific guides live, each teaching a genuinely different decision model |
| Search & Local Discovery | 0 | **Empty — intentionally, not a gap.** See below. |

No category is overrepresented in a way that reads as padding — Market Intelligence's 3 guides are the three industry verticals, not three generic guides competing for the same slot. No category naming is confusing; all seven read clearly against the System's actual components.

**Search & Local Discovery is empty.** This is not a gap: Phase 1's technical SEO pass already gave the site strong on-page local-search signals (structured data, industry pages, `/guides/*` Deep Guides covering local market share, St. George-specific positioning, and per-industry search intent). A Field Guide teaching "how to think about local SEO" would either restate what the Deep Guides already cover or compete with them for the same query intent. **Recommendation: leave empty until Search Console data (Phase 5) reveals a genuine, distinct local-discovery question none of the existing Deep Guides answer.**

## Part 4 — System Page Relationship Audit

| # | Component | Related Guide(s) | Relationship | Universal or Industry-Specific | Genuinely Deepens? |
|---|---|---|---|---|---|
| 01 | Market Intelligence | #8 (Landscaping) only | Introduced this component's *first* real framework | Industry-specific, but the only relationship here | Yes — it's explicitly the example that gave this component real content |
| 02 | Offer Engineering | #2, #3 | Campaign concentration + value construction | Universal | Yes — two genuinely different angles on the same component |
| 03 | Conversion Infrastructure | #4 | Message continuity | Universal | Yes |
| 04 | Authority Engine | #7 | Turning jobs into proof | Universal | Yes |
| 05 | Demand Engine | #6 | Awareness-matched messaging | Universal | Yes |
| 06 | Reputation Engine | none | — | — | N/A — correctly left empty (Guide #7 covers proof/authority broadly and lives at 04; duplicating it at 06 would be forced) |
| 07 | Revenue Intelligence | #1, #5 | Diagnosis + measurement | Universal | Yes — explicitly documented as two different roles when added |

**No over-linking found.** No component has more than 2 guides. **No forced relationships found** — every link was added with a specific, documented reason at publish time (see Phases 4A–4J reports), and two industry-specific guides (#9 plumbing, #10 HVAC) were *deliberately withheld* from System pages specifically to avoid promoting industry-specific content as universal principle, per the standing rule established in Phase 4I/4J. Market Intelligence (01) carrying an industry-specific example rather than a universal one is the one asymmetry — acceptable because it's transparently the first (and so far only) real content that component has, not a claim that landscaping economics are universally true of every business.

## Part 5 — Homepage Featured Guide Audit

Current set: #1 (Revenue Intelligence), #2 (Offer Engineering), #5 (Revenue Intelligence) — verified live, unchanged since Phase 4F/4G.

| Guide | Breadth | Differentiation | Relevance to Ideal Client | Strategic Depth Signal | Connection to Offer |
|---|---|---|---|---|---|
| #1 | High — applies to any business regardless of trade | Diagnosis framing, distinct from #2/#5 | High — "we need more leads" is the exact objection Lusso's sales process hears most | High — reframes the entire conversation | Directly sets up the Score CTA |
| #2 | High — applies to any campaign | Offer/message framing | High — most prospects are running unfocused campaigns | High — shows Lusso thinks in systems, not tactics | Sets up Conversion Infrastructure/Offer Engineering narrative |
| #5 | High — applies to any business | Measurement/operating-visibility framing, distinct from #1's diagnosis | High — pairs naturally with #1 as "diagnose, then measure" | High — demonstrates Lusso thinks operationally, not just about ads | Reinforces the System's Revenue Intelligence component |

**Recommendation: KEEP CURRENT SET.** All three are universally applicable (no industry-specific guide belongs on the homepage — it would imply Lusso is narrower than it is), cover three distinct cognitive angles (diagnose / focus / measure) rather than three variations on one idea, and none competes with another for the same job. No structural or UX problem was found that would justify a change.

## Part 6 — Resource Hub Featured Audit

Current set: #2 (Offer Engineering), #4 (Conversion Infrastructure), #7 (Authority & Reputation) — verified live, unchanged since Phase 4G.

- **Category diversity:** 3 different categories, and none overlap with each other's core idea.
- **Deliberately non-identical to the homepage set** (which is #1/#2/#5) — this was a conscious Phase 4G decision so a visitor who sees both the homepage and the hub encounters 5 distinct guides across the two surfaces, not 3 repeated twice.
- **Quality/clarity/usefulness:** all three are mid-length, visually strong, and none requires reading another guide first to make sense.
- **Redundancy:** none — #2 (message focus), #4 (destination continuity), #7 (proof systems) don't compete.

**Recommendation: KEEP CURRENT SET.** Guide #10 (HVAC) was published most recently and is not being promoted into this set — correctly, since featuring the newest guide "because it's new" was explicitly the anti-pattern this phase was told to avoid, and #10 is industry-specific (the hub's featured row, like the homepage's, benefits more from universal guides that any visitor can immediately see themselves in).

## Part 7 — Resource Hub UX Audit

Walked `/resources` as a first-time visitor (live, verified):

- **Can someone understand what Field Guides are within 5 seconds?** Yes — hero states it directly ("Short Field Guides when you need an answer quickly. Deeper Guides when you want the full framework."), and the Field Guides section restates it once more before any cards appear.
- **Is the Field Guide vs. Deep Guide distinction obvious?** Yes — two visually separated sections, each with its own one-line description, and Deep Guides link out to genuinely different (`/guides/*`) URLs rather than looking like more Field Guide cards.
- **Can someone quickly find something relevant?** Yes — Featured row for a fast start, then a category nav (6 links, since Search & Local Discovery is empty and correctly hidden) jumping straight to any section.
- **Is the page becoming cluttered?** No — 10 Field Guides across 6 populated categories average under 2 cards per category; nothing requires scrolling through a long undifferentiated list.
- **Do industry labels improve discovery?** Yes — "Landscaping · Market Intelligence" etc. immediately tells a landscaping owner which card is for them without opening it.
- **Does it feel like a strategy library rather than a blog feed?** Yes — no dates, no author bylines, no "recent posts" framing anywhere; every card leads with category/industry, title, premise, and read time.

**No UX problems found requiring a fix in this phase.**

### Industry Filter Decision

**NOT YET**, per instruction. Three industry-specific guides (Landscaping, Plumbing, HVAC) sit inside a single category (Market Intelligence) alongside two universal guides — a visitor scanning that one category sees at most 5 cards, all with clear industry labels already doing the filtering job visually. Building filter UI now would be infrastructure built ahead of actual need. **Trigger to revisit:** when any single industry accumulates more than 2–3 guides, or when Market Intelligence's card count makes scanning genuinely harder than reading the labels.

## Part 8 — Field Guide UX Consistency

All 10 guides share: identical header composition (breadcrumb → eyebrow → H1 → premise → read time), identical `Do This This Week` action-block styling and behavior, identical single-CTA "Next Step" section styling, identical `Continue Learning` card styling, identical two content-width system (`700px` reading / `1000px` visual), identical typography tokens, identical mobile stacking behavior (verified at 320px across guides #1, #6, #8, #9, #10 across Phases 4A–4J).

They are **not** identical in composition — by design: #1 uses a `leakMap`, #9 introduces a 3-column `comparison`, #10 uses a 2×2 `comparison`, #7 has no `quickDiagnosis` while #1 does. This is the intended outcome of Part 8's instruction ("consistency should come from visual language and editorial standards, not identical templates") — confirmed achieved, not a defect.

## Part 9 — Editorial Standard Audit

Checked all 10 against `/docs/field-guide-editorial-standard.md`:

- **One primary idea per guide:** confirmed for all 10 — each has a single documented "primary concept" stated in its own phase report, and no guide's problem/framework sections argue two unrelated points.
- **2–4 minute read:** all 10 carry `readTimeMinutes` between 3–4; approximate word counts (Part 1 table) range ~409–762, consistent with the target.
- **Strong primary visual:** all 10 lead their "See It" section with a real visual primitive, never a paragraph standing in for one.
- **Maximum 3 actions:** verified — every guide's `actions` array has exactly 3 entries.
- **One primary CTA:** verified — every guide's Next Step section has exactly one button, always to the Local Dominance Score (see Part 12).
- **No generic intros, no SEO padding, no article bloat:** confirmed — every problem section opens on the specific tension the guide resolves, not a throat-clearing paragraph.

**No guide flagged.** No editorial corrections were needed or made.

## Part 10 — Anti-Template Audit (Vertical Originality Assessment)

| | Landscaping (#8) | Plumbing (#9) | HVAC (#10) |
|---|---|---|---|
| Title structure | "How [X] Companies Should Choose What to Advertise" | "The 3 Types of [X] Demand — and Why They Need Different Campaigns" | "The [X] Demand Calendar — Market Around [Y], Not Just [Z]" |
| Decision question | Which service deserves the campaign? | What buying situation is the customer in? | What demand should we create given capacity? |
| Primary visual | `beforeAfter` + `metricsSection` (6 factors) | `framework` + `metricsSection` (3 types) + `comparison` (3×6) | `beforeAfter` + `metricsSection` (3 windows) + `comparison` (2×2) |
| Scoring mechanism | 1–5 self-rating, 6 factors | None (deliberately) | None (deliberately) |
| Time dimension | None — evaluated once | None — buyer states are concurrent | Central — sequential seasonal windows |
| Actions | List 5 services → score each → investigate | Label services → check message → check CTA | Map capacity → choose priority → match campaign |
| Examples | 4 landscaping services scored | 3 campaign messages, 1 company | 3 operating conditions, 1 company |
| CTA framing | "Is the Market the Problem — or Something Else?" | "Is Your Campaign Built Around How Customers Actually Buy?" | "Do You Need More Demand — or Better Control of It?" |
| Meta description | "Use ticket, margin, demand, capacity, differentiation, and proof to decide..." | "Urgent repairs, planned replacements, and home upgrades create different buying situations..." | "HVAC demand changes with weather, but your marketing should also reflect...capacity..." |
| Internal links | #2, #7, #1 | #6, #4, #2 | #2, #5 |

**No two guides share a scoring mechanism, a visual shape, a title pattern, an action sequence, or an internal-link set.** None reads as `[Industry] + same template`. This table should be treated as the standing reference for any future vertical guide, per Part 26.

## Part 11 — Internal Link Graph

- **Orphans:** none found. Every Field Guide is reachable from the hub (its category section), and 7 of 10 are also reachable from the System page or an industry page.
- **Dead ends:** none — every guide ends in either a `Continue Learning` block (7 guides) or the "Go Deeper" fallback to System/Playbook (used when a guide has no related Field Guide yet — not currently triggered, since all 10 guides now have `relatedGuideSlugs`).
- **Forced reciprocity:** checked every `relatedGuideSlugs` pair — none is a mechanical A→B/B→A pair added purely for link equity; each was individually justified in its phase report (e.g., Guide #9 deliberately excludes Guide #8 from its related list despite sharing a category, specifically to avoid mechanical cross-linking of industry guides).
- **Excessive linking:** maximum related-Field-Guide count on any single guide is 3 (#7, #8), the documented cap; no guide links to more than 2 Deep Guides (#1 links to 2).
- **Broken links:** none found — every `href` in `relatedGuideSlugs`/`relatedDeepGuideSlugs`/System/industry integrations resolves to a real, verified slug (cross-checked against the guide inventory table above).
- **Mismatched anchor text:** none — every internal link's visible text matches its destination's actual title.

**Relationship philosophy confirmed in practice:** the dominant pattern across all 10 guides is Educational Resource → Relevant System Component → Local Dominance Score, exactly as preferred. No attempt was made (or should be made) to fully interconnect all 10 guides with each other.

## Part 12 — CTA Audit

All 10 guides' Next Step sections point to the Local Dominance Score. Verified: this repetition is intentional and acceptable per instruction ("repetition of the destination is acceptable — the framing should reflect the subject"). Headline framing per guide (verified distinct for every single one, no two identical):

| Guide | Headline |
|---|---|
| #1 | (uses `nextStepHeadline`: "Not Sure Where the Constraint Is?") |
| #2 | "How Focused Is Your Growth System?" |
| #3 | "How Strong Is the Rest of Your Growth System?" |
| #4 | "Is Your Website Turning Demand Into Opportunity?" |
| #5 | "Can You See Where Growth Is Breaking Down?" |
| #6 | "Is Your Marketing Meeting the Market Where It Is?" |
| #7 | "Is Your Reputation Actually Working for You?" |
| #8 | "Is the Market the Problem — or Something Else?" |
| #9 | "Is Your Campaign Built Around How Customers Actually Buy?" |
| #10 | "Do You Need More Demand — or Better Control of It?" |

Button copy varies appropriately too ("See How I Stack Up Locally," "Find My Biggest Growth Leak") rather than being identical across all 10. Visual treatment (button style, section background) is identical across all 10 — correct, since that's the "visual language consistency" Part 8 asked for. **No repetitiveness problem found** — the destination repeats by design (there is only one free diagnostic tool), but the framing never does.

## Part 13 — Conversion Path QA

Tested Field Guide → Score, and secondary paths to Playbook/System/Results/Apply (live, in-browser, across multiple phases' verification passes and re-confirmed this phase for guide #10 and the hub):

- Field Guide → `/local-dominance-score`: works, correct URL, `field_guide_score_click` fires with slug (+ now industry, see Part 14 fix below).
- Field Guide → `/guides/[slug]` (Deep Guide cross-links, guides #1–#4): works.
- Field Guide → `/system`, `/lead-to-booked-job-playbook` (fallback "Go Deeper" block): present in template, not currently triggered since every guide now has real related guides.
- Industry page → Field Guide (landscaping/plumbing/hvac): works, verified in Phase 4J regression check.
- System page → Field Guide (7 of 10 guides linked): works, verified across Phases 4A–4J.
- Homepage teaser → Field Guide: works, verified this phase.
- No dead ends, no unexpected redirects, no broken URLs found anywhere in the graph.
- Qualification logic (Score/Apply flows) was not touched in Phase 4 and was not altered in this audit.

## Part 14 — Analytics Audit

Reviewed every `trackEvent` call site across `FieldGuideTemplate.tsx`, `DoThisThisWeek.tsx`, `FeaturedGuideCard.tsx`, `RelatedGuides.tsx`, `FieldGuidesHomeBlock.tsx`, and `Footer.tsx`/`GrowthToolsDropdown.tsx`/`Nav.tsx`.

**Gap found and fixed (safe, in-scope):** `field_guide_view` and the primary CTA click event were firing with `slug`/`category` but not `industry`, even for guides #8–#10. Since `industry` was already a real field on the guide object, this was a one-line enrichment, not new architecture — added `industry: guide.industry` to both events in `FieldGuideTemplate.tsx`. For non-industry guides this pushes `industry: undefined`, which GTM/GA4 treat as an absent property (no malformed payload).

**No other issues found:**
- No duplicate firing — `field_guide_view` fires once per mount via a single `useEffect` with a stable dependency array.
- No missing events — every interactive element (action checkboxes, related-guide links, CTA buttons, Deep Guide cross-links) fires an event.
- No PII anywhere — every event payload is limited to slug/category/industry/destination/placement, never user input.
- Client/server: all tracking fires client-side only (`'use client'` components), consistent with the rest of the site's analytics.

**Homepage:** `FieldGuidesHomeBlock.tsx` verified reading `getHomepageFeaturedGuides()` — confirmed live to show exactly Guide #1/#2/#5, so no stale Guide #3 configuration exists anywhere (the Phase 4G/4F featured-flag migration replaced the old shared `featured` boolean cleanly; grep confirms zero remaining references to it in the codebase).

**Hub:** `getHubFeaturedGuides()` is a pure filter over the same guide array `getPublishedGuides()` already uses everywhere else — featured status changes which guides render, not how any click/view event fires, so there is no interference with basic page-view or click behavior.

## Part 15 — SEO Technical Audit (Content Layer)

Verified via `next build` + live spot checks:

- All 10 Field Guides: 200, `index, follow`, self-canonical, unique title/description, `Article` + `BreadcrumbList` JSON-LD (verified via `fetch`+`JSON.parse` in-browser across Phases 4A–4J), sitemap-included, server-rendered primary copy (confirmed by static HTML generation, not client fetch), crawlable `<a href>` internal links throughout (no click-only navigation), valid Open Graph (auto-generated per-guide image + metadata).
- Drafts (`dev-demo-lead-leak`, `dev-demo-visual-gallery`): confirmed **not** in the production build output (`next build` generates zero static pages for either slug), confirmed absent from the sitemap, confirmed never referenced by any `relatedGuideSlugs`/System/industry integration (drafts are excluded from every query helper by construction — `getPublishedGuides()` filters `!g.draft` unconditionally).

No regressions found; no changes made in this part beyond what's already noted in Part 14.

## Part 17 — Deep Guide Audit (High-Level)

All 10 Deep Guides remain live, indexed, and unchanged since Phase 1 (no Phase 4 work touched `lib/config/guides.ts`). High-level pass:

- **Usefulness/freshness:** all 10 remain accurate and non-time-sensitive (no claims that have aged out).
- **Overlap:** none found beyond what Phase 1's original audit already noted.
- **CTA quality:** each ends with a Score + related-industry-page two-card block — functional, unchanged.
- **Field Guide relationships:** only Guide #1 (`why-more-leads-wont-fix-growth`) currently cross-links to Deep Guides (`how-to-qualify-home-service-leads`, `speed-to-lead-for-contractors`) via `relatedDeepGuideSlugs`. No other Field Guide has a Deep Guide relationship — not a defect; none of the other 9 Field Guides has a Deep Guide close enough in subject to justify one, and forcing one would violate the "genuinely useful, not mechanical" standard applied throughout Phase 4.
- **`st-george-contractor-marketing`:** re-verified this phase — still live, unchanged, still carries the same **LEGACY / REVIEW** flag from the original Phase 1 audit (`/docs/existing-guides-audit.md`): it reads more like a geo-targeted local-SEO/business-development page than a transferable educational resource. **No change made.** Recommendation carried forward unchanged: worth a deliberate future decision on whether it should be repositioned as a location page pattern, but nothing here rises to a technical defect requiring action now.

## Part 18 — Industry Page Integration Audit

The `contextualFieldGuide` field (renamed from `economicsFieldGuide` in Phase 4J) is implemented identically on `/landscaping`, `/plumbing`, and `/hvac` — same component (`IndustryPageTemplate.tsx`), same placement (immediately under the economics section), same understated styling (a small uppercase label + one text link, no card, no icon), same analytics event shape (`field_guide_related_click`, `from: 'industry-{slug}-economics'`), same mobile behavior (plain text wraps naturally, no overflow risk). Verified this phase: all three genuinely improve their page — each links to content written specifically for that industry's actual buying/selection logic, not a generic "learn more" filler link.

### Full Industry Module Decision

**KEEP FULL MODULE INACTIVE**, per instruction. Current state confirmed: Landscaping 1 guide, Plumbing 1 guide, HVAC 1 guide, all other five industries 0. A one-line contextual link per industry remains cleaner than a 3-column "Growth Strategies" grid that would show one real card and two empty/generic ones. **Trigger to revisit:** when any single industry has ≥2–3 genuinely relevant Field Guides.

## Part 19 — Performance

No new client JavaScript was added anywhere in Phase 4 beyond what each guide's interactive elements require (`DoThisThisWeek`'s checkbox state, `QuickDiagnosis`'s Yes/No toggle — both trivial `useState`). No animation/charting library was ever introduced across all of Phase 4 (confirmed: `package.json` unchanged since Phase 2, still just `framer-motion`, already in use site-wide). No new images were added by any Field Guide (all visuals are CSS/SVG/text-based primitives). No font changes. `next build` completes cleanly with no warnings beyond the pre-existing, unrelated `@sanity/image-url` deprecation notice and a Tailwind `z-index` compatibility note, both present before Phase 4 began and outside this phase's scope. No hydration errors observed in any live browser check across Phases 4A–4K.

## Part 20 — Accessibility

Representative primitives re-checked (`components/resources/visuals.tsx`):

- **Color:** every "highlighted" state (leak points, matched terms) pairs a color change with a visible text label (e.g., "Common Leak," "Worth Checking") — never color alone.
- **Semantic text:** `Funnel`/`LeakMap` carry `role="img"` with a full descriptive `aria-label`; `Comparison` carries `role="table"` with an `aria-label` naming its columns.
- **Contrast:** all text uses the existing Phase 2 token palette (verified WCAG-adequate in Phase 2), unchanged by any Field Guide work.
- **Keyboard/interactive:** `DoThisThisWeek` checkboxes and `QuickDiagnosis` Yes/No toggles are real `<button>` elements — natively focusable and operable via keyboard, no custom key handling needed.
- **QuickDiagnosis:** confirmed working correctly (toggles between two pre-written responses, no data stored, no network call).
- **Headings:** every guide follows H1 (title) → H2 (section headings: "Why It Happens"/metricsSection title, "The Framework," "Do This This Week") — logical, never skipped.
- **Touch targets:** action checkboxes are 24px with generous row padding (verified adequate in Phase 3/4A mobile passes).

No accessibility regressions found across any of the 10 guides or the hub.

## Part 21 — Mobile System QA

Re-verified at 320px this phase for `/resources`, and confirmed via each phase's original verification for guides #1, #6, #8, #9, #10, and `/landscaping`, `/plumbing`, `/hvac`: zero horizontal overflow anywhere (`document.documentElement.scrollWidth === window.innerWidth` at 320px in every check performed). Comparison layouts (guides #9, #10) stack into single-column cards. Scorecards (guides #3, #8) remain readable with status labels wrapping cleanly. Timelines (guides #6, #10's secondary visual) stack vertically. CTA blocks and breadcrumbs remain usable at all widths tested. No cramping observed on any card/row layout.

## Part 22 — Resource Hub Future-Scale Assessment (Trigger Conditions, Not Built)

| Feature | Trigger to build | Current state |
|---|---|---|
| Industry filter | An industry accumulates ≥2–3 guides, or Market Intelligence's card count makes scanning harder than reading labels | 3 industries × 1 guide each — not triggered |
| Site search | Resource volume grows enough that category browsing no longer provides easy discovery | 10 guides across 6 populated categories — not triggered |
| Interactive calculators | A specific Field Guide shows strong traffic/engagement and a calculator would materially improve diagnosis | No Search Console data yet — not triggered |
| Additional categories | Actual content/user demand requires them | Search & Local Discovery deliberately empty; no other new category identified — not triggered |
| CMS | Publication volume makes typed local content operationally inefficient | 10 guides, all authored directly in `lib/config/fieldGuides.ts` with build-time validation — still efficient, not triggered |

No infrastructure was added in anticipation of any of these.
