# Phase 4J — Industry Field Guide Generalization + Field Guide #10

## Industry Integration Refactor (Task A)

**Old field:** `economicsFieldGuide?: { slug: string; label: string }` on `IndustryPage` — named for its original single purpose (a link near the landscaping economics section).

**New field:** `contextualFieldGuide?: { label?: string; title: string; href: string }` — renamed to describe what it actually is (one restrained inline link near contextually relevant copy), not where it originated. Shape changes: `slug` → `href` (now a full path, computed once in the data rather than templated at render time — matches how `relatedGuideSlugs`/other guide references are handled elsewhere) and `label` → `title` (the guide's display text); a new optional `label` was added as an override for the small uppercase prefix (defaults to "Field Guide" in `IndustryPageTemplate.tsx` via `industry.contextualFieldGuide.label ?? 'Field Guide'`), matching the brief's suggested shape.

**Migration:** both existing entries updated in `lib/config/industryPages.ts`:
- Landscaping: `{ slug: 'landscaping-what-to-advertise', label: '...' }` → `{ title: '...', href: '/resources/landscaping-what-to-advertise' }`
- Plumbing: `{ slug: 'plumbing-types-of-demand', label: '...' }` → `{ title: '...', href: '/resources/plumbing-types-of-demand' }`

`components/industry/IndustryPageTemplate.tsx` updated to read the new field/shape; the rendered markup, styling, and analytics event (`field_guide_related_click`, `from: 'industry-{slug}-economics'`) are byte-for-byte unchanged.

**Landscaping regression — verified live:** still links to *"How Landscaping Companies Should Choose What to Advertise"* at the same URL, same placement, same styling.

**Plumbing regression — verified live:** still links to *"The 3 Types of Plumbing Demand — and Why They Need Different Campaigns"* at the same URL, same placement, same styling.

No unnecessary abstraction was introduced — the field is still a single optional object, still rendered by the same 10 lines of JSX, just named and shaped for what it now is.

## Why HVAC Uses a Different Framework

| | Guide #8 (Landscaping) | Guide #9 (Plumbing) | Guide #10 (HVAC) |
|---|---|---|---|
| Decision model | Which service should we advertise? | What buying situation is the customer in? | What demand should we create given current market demand and fulfillment capacity? |
| Core visual | `beforeAfter` + 6-factor `metricsSection` + `framework` sequence | `framework` (+3 buyer types) + `comparison` (3×6 matrix) | `beforeAfter` (Reactive vs. Operated) + `metricsSection` (3 operating windows) + `comparison` (2×2 matrix) |
| Scoring/matrix shape | 1–5 self-rating across 6 factors | 3-column qualitative comparison | 2×2 demand/capacity quadrant |
| Time dimension | None — factors are evaluated once per service | None — buyer states are concurrent, not sequential | Central — Pre-Peak/Peak/Shoulder are sequential operating windows |
| Secondary framework | None | Awareness-vs-buying-mode contrast | The Operating Loop (a repeating weekly cycle) |
| Examples | 4 landscaping services scored | 3 campaign messages for one company | 3 operating conditions for one company across a season |

Guide #10 reuses the `comparison` primitive (built in Phase 4I) but with a genuinely different shape (2×2 quadrant vs. 3-column table) and a completely different subject (capacity vs. buying situation). No scorecard, no buyer-state model, no swapped industry examples, and no copied action sequence — the three action items (map capacity, choose the priority service, match the campaign) share no wording with either prior guide's actions.

## Cannibalization Review

Reviewed against all 10 Deep Guides, Field Guides #1–#9, `/hvac`, `/system`, the existing `hvac-lead-generation-guide` Deep Guide, and any capacity/constraint language on the site.

- **vs. Guide #1** (general constraint diagnosis): Guide #1 asks "where is the system constrained?" in the abstract. Guide #10 applies one specific, named operating constraint — HVAC demand relative to fulfillment capacity — and never uses Guide #1's "constraint" framing (the brief's explicit instruction), instead using "operating condition" language throughout.
- **vs. Guide #8**: service selection (which service to advertise, evaluated once) vs. Guide #10's continuous seasonal operating-condition framework. Different question, different time horizon, different visual.
- **vs. Guide #9**: buyer psychological state (why is this customer buying) vs. Guide #10's operational state (does the business have room to serve more of this demand right now). Orthogonal concerns — a plumbing company could apply Guide #9 to any single job, and an HVAC company could apply Guide #10 regardless of which buyer type it's serving.
- **Deep Guide `hvac-lead-generation-guide`:** covers the general strategic split between reactive service-call demand and considered replacement demand, and the need for seasonal capacity planning ahead of peaks — a good complement, but it doesn't teach an operating framework for deciding what to promote *as* demand and capacity shift; Guide #10 is the operational layer that Deep Guide gestures toward but doesn't build.
- **`/hvac`, `/system`:** no existing copy teaches a demand/capacity decision framework.

**Conclusion:** genuinely distinct from every other page — earns its own URL, and is not a redundant page.

## Guide URL

`https://illussomedia.com/resources/hvac-demand-calendar`

## Industry Metadata

`FieldGuideIndustry` extended to `'landscaping' | 'plumbing' | 'hvac'` — one value at a time, as established in Phase 4H/4I. Still no filter UI at three industries; revisit when industry-specific volume materially increases, per instruction.

## Three Operating Windows

Implemented via `metricsSection` (title: "The 3 Operating Windows"): Pre-Peak, Peak, Shoulder — framed as planning conditions, not fixed calendar months (no "May–August" style dates anywhere). The brief's "More Leads Can Become Less Useful as Capacity Disappears" callout was folded directly into the Peak window's detail text rather than added as a second standalone callout, consistent with how Guide #8 handled its capacity-warning requirement.

## Demand / Capacity Matrix

A 2×2 built on the `ComparisonVisual` primitive (`columns: ['Available Capacity', 'Constrained Capacity']`, rows for High/Low Demand) — the same reusable component from Phase 4I, applied to a genuinely different shape and subject. Explicitly labeled "a planning framework, not a universal media-buying formula," with the frameworkIntro naming the real factors (economics, backlog, lead quality, close rate, market conditions) that still govern the actual decision.

## Example

One hypothetical HVAC company tracked across Early Season, Peak Heat, and Shoulder — no private client data, no invented statistics.

## Actions (exactly 3)

Map your next 30 days of capacity · Choose the service you actually need more of · Match the campaign to the operating condition.

## CTA

Single CTA — "See How I Stack Up Locally" → Local Dominance Score, under "Do You Need More Demand — or Better Control of It?"

## Related Guides

Guide #2 (campaign concentration once priority is chosen) and Guide #5 (operating measurement — capacity decisions shouldn't rest on lead count alone), both genuine relationships named in the brief. Guide #1 and the other two industry guides (#8, #9) were deliberately excluded — the brief explicitly discouraged cross-linking industry guides merely because they share Market Intelligence, and no non-mechanical reason existed to link Guide #1 here without repeating its framing.

## System Page Decision

**Left unchanged, deliberately.** Market Intelligence already has a real guide relationship (Guide #8, which introduced the component's first operating framework). Guide #10 is an HVAC-specific application of the same System component rather than a new universal principle, so it was not added — matching the same reasoning already applied to Guide #9 in Phase 4I. No `systemComponents.ts` file was touched this phase.

## HVAC Industry Integration

Added via the newly generalized `contextualFieldGuide` field on the `/hvac` entry in `lib/config/industryPages.ts`, placed immediately after the existing economics section (which already discusses seasonality and capacity) — verified live.

## Resource Hub

Guide #10 shows "HVAC · Market Intelligence" via the existing `getIndustryLabel()` helper, populating its category section automatically. Hub's featured row (Guide #2, #4, #7) and homepage teaser (Guide #1, #2, #5) both verified unchanged live.

## SEO

- Title: "HVAC Marketing by Season: Match Demand to Capacity | Lusso Media" (chosen over the alternative for clearer search intent)
- Meta description as specified
- Self-referencing canonical, `Article` (with `image`) + `BreadcrumbList` JSON-LD, auto-generated OG image — all via the existing pipeline
- Included automatically in `app/sitemap.ts` (confirmed present after `next build`)
- No invented HVAC seasonality statistics, close-rate/utilization benchmarks, average tickets, or weather-response percentages anywhere in the guide

## Analytics

Reused the existing event set — no new analytics architecture. The `/hvac` inline link fires `field_guide_related_click` with `from: 'industry-hvac-economics'`, consistent with the landscaping/plumbing pattern.

## Mobile QA

Checked at 320px: confirmed `document.documentElement.scrollWidth === window.innerWidth === 320` on the full guide, including the Reactive/Operated before-after, the 3-window metrics section, and — the specific risk called out in the brief — the 2×2 Demand/Capacity matrix, which stacks into single-column cards via the same `Comparison` component verified in Phase 4I, with no horizontal scrolling.

## Technical QA

- `npx tsc --noEmit`, `npx eslint`, `npx next build` all pass clean.
- Production build confirms: all 10 real guides generate as static pages; both dev-only demo guides remain excluded; all 10 existing `/guides/[slug]` URLs unchanged; sitemap includes the hub and all 10 guides.
- `/landscaping` and `/plumbing` verified live showing their original links, unchanged, after the field rename.
- `/hvac` verified live showing the new link.
- Homepage verified live: unchanged (Guides #1, #2, #5).
- Hub featured row verified live: unchanged (Guides #2, #4, #7).
- System page verified unchanged (no mention of Guide #10 anywhere on `/system`).
- Guides #1–#9 confirmed unchanged; all 10 Deep Guides untouched.

## Not Done (By Instruction)

- Field Guide #11 was not started.
- Guide #10 was not added to landscaping, plumbing, roofing, concrete, electrical, remodeling, or general contracting pages.
- No Resource Hub industry-filter UI was built.
- Homepage and hub featured sets were not altered.
- System page was intentionally left unchanged.
