# Phase 3 — Lusso Field Guide System & Resource Architecture

Infrastructure only. No real Field Guides were written or published in this phase — two `draft: true` dev-fixture guides exist purely to exercise the template and are excluded from every production surface (see Draft System below).

## Architecture

- **Route:** `/resources` (hub) and `/resources/[slug]` (individual guides) — a new, separate route tree from the existing `/guides/[slug]` system.
- **Important existing-system note:** `lib/config/guides.ts` / `/guides/[slug]` already exists and is live, indexed, and populated with 10 real long-form SEO/AI-search articles. That is a **different content type** from Field Guides — traditional long-form articles vs. 2–4 minute visual strategy briefs organized by growth-system category instead of publish date. The master prompt for this phase didn't reference `/guides/`, so Phase 3 built `/resources/` as a genuinely separate, coexisting system rather than merging or replacing anything. Flagging this explicitly since it means the site will have two "learn from Lusso" content hubs (`/guides` and `/resources`) once Phase 4 populates both — worth a conscious decision (keep both, or eventually consolidate) rather than an assumption.
- **Content model:** typed local TypeScript objects (`lib/config/fieldGuides.ts`), matching the existing `industryPages.ts`/`caseStudies.ts`/`guides.ts` pattern already proven in this codebase. No MDX pipeline or CMS was introduced — not justified for the current/expected content volume.
- **Rendering:** server-rendered pages (`app/resources/page.tsx`, `app/resources/[slug]/page.tsx`) that pass typed data into a client-enhanced template (`FieldGuideTemplate.tsx`, matching the existing `GuideTemplate.tsx`/`IndustryPageTemplate.tsx` convention of `'use client'` + framer-motion entrance fades over otherwise fully server-rendered content).

## Content Model

`lib/config/fieldGuides.ts` defines:
- `FieldGuideCategorySlug` — the 7 required categories (Market Intelligence, Offer Engineering, Conversion Infrastructure, Demand & Advertising, Authority & Reputation, Revenue Intelligence, Search & Local Discovery), each with a `label` and organizing `question`.
- `FieldGuide` — the full field set from Part 8: slug, title, shortTitle, category, premise, readTimeMinutes (optional — auto-calculated via `getReadTime()` if omitted), publishDate/updatedDate, featured, draft, metaTitle/metaDescription/ogImageAlt, and the six structural sections (problem, seeIt, whyItHappens, frameworkIntro + framework, optional quickDiagnosis, actions, nextStepCTA + nextStepSupporting, relatedGuideSlugs).
- `FieldGuideVisual` — a discriminated union (funnel / beforeAfter / framework / scorecard / decisionTree / leakMap / timeline / metric / screenshot) so a guide's visuals are typed data, not JSX, and can be validated/reasoned about without executing React.
- **Build-time validation** (`validateFieldGuide`, `assertUniqueSlugs`) — runs automatically when the module loads (in `next build` and `next dev`), throwing immediately on: missing/invalid slug, missing title/description, invalid category, wrong action count (must be 1–3), wrong whyItHappens count (must be 2–4), unrealistic read time, or a duplicate slug.
- **Query helpers**: `getPublishedGuides`, `getFieldGuide(slug, includeDrafts?)`, `getFeaturedGuides(max)`, `getGuidesByCategory`, `getRelatedFieldGuides` — every public-facing helper defaults to excluding drafts.
- **Template scaffold**: `lib/config/fieldGuides.template.ts` — never imported anywhere (verified), so it can't be bundled, rendered, or indexed. Pure copy-paste starting point for Phase 4 authors, documented inline.

## Resource Hub (`/resources`)

- Hero: eyebrow "FIELD GUIDES," headline "Practical Growth Strategy. Built for Operators.," supporting copy, "2–4 MIN READS" label — exactly per Part 4.
- **No chronological feed** (Part 2) — organized entirely by category section, each rendered only if it has ≥1 published guide. No dates, no "newest first," no author archive, no tag cloud.
- **Featured guides** (Part 5) — up to 3, via the `featured` flag, rendered by the reusable `FeaturedGuideCard` component (also reused by category sections, related guides, and the homepage teaser — one component, four call sites).
- **Category navigation** (Part 6) — `CategoryNav` is a plain server-rendered `<a href="#category-slug">` list, no client-side filter app, fully crawlable.
- **Empty state** (Part 30) — Option A implemented: the hub is fully built and functional, but right now (zero published guides) it shows one honest sentence ("Field Guide infrastructure is live. Guides publish here starting Phase 4.") instead of a styled fake-empty-state or thin placeholder content, and carries `robots: { index: false, follow: false }` until real content exists. The moment `getPublishedGuides()`/`getFeaturedGuides()` return anything, the hub automatically renders the full featured/category layout and `hasPublishedContent` flips `robots.index` to `true` — no code change required, just publishing guides.

## Field Guide Template — The Six Sections

`components/resources/FieldGuideTemplate.tsx` renders every guide identically:

1. **Header** — breadcrumbs, category eyebrow, title, premise, read time (Part 11).
2. **01 The Problem** — plain paragraph, reading-width column.
3. **02 See It** — `FieldGuideVisualRenderer` dispatches the guide's `seeIt` data to the matching primitive, full diagram-width column.
4. **03 Why It Happens** — 2–4 concepts in a responsive 2-column grid with thin top rules, never a paragraph wall.
5. **04 The Framework** — intro sentence + `framework` visual, diagram-width column, on a contrasting `#111111` band.
6. Optional **Quick Check** — only renders if `quickDiagnosis` is set.
7. **05 Do This This Week** — the `DoThisThisWeek` action block.
8. **06 Next Step** — single CTA resolved by `lib/fieldGuideCTA.ts` from the guide's typed `nextStepCTA`.
9. **Continue Learning** — `RelatedGuides`, only renders if `relatedGuideSlugs` resolves to ≥1 real guide.

Two widths are used throughout (Part 37): `max-w-[1000px]` for visuals/diagrams, `max-w-[700px]` for reading copy.

## Visual Components Built

All in `components/resources/visuals.tsx` (9 primitives + 1 dispatcher), plus two standalone interactive components:

| Component | Purpose |
|---|---|
| `Funnel` | Stage sequence with an optional highlighted constraint |
| `BeforeAfter` | Two-column comparison |
| `Framework` | Term sequence with a connector (→ / × / +) |
| `Scorecard` | Question + pass/warn/fail rows |
| `DecisionTree` | One question, branching results |
| `LeakMap` | Stage sequence with one or more highlighted leak points |
| `Timeline` | Numbered step sequence |
| `MetricCallout` | Before → after metric pairs (same pattern approved for `ProofStrip` in Phase 2) |
| `ScreenshotAnnotation` | Captioned, annotated image container |
| `FieldGuideVisualRenderer` | Dispatches a typed `FieldGuideVisual` to the right component above |
| `DoThisThisWeek` (own file) | The action-block checklist — visual-only state, fires `field_guide_action_click` |
| `QuickDiagnosis` (own file) | Yes/No toggle, zero storage, zero form fields |

All use semantic HTML/CSS/inline SVG only — no charting library was added. Every visual carries a text label or `aria-label` describing what it shows (never color-only meaning), matching Part 44. All verified to stack cleanly at 375px with no horizontal overflow (see Mobile below).

## SEO

- Every published guide gets a self-referencing canonical, unique `metaTitle`/`metaDescription`, `Article` + `BreadcrumbList` JSON-LD (accurate `datePublished`/`dateModified`, `Lusso Media` as `Organization` author/publisher, `mainEntityOfPage`), and a per-guide Open Graph image (`app/resources/[slug]/opengraph-image.tsx`, matching the existing `/guides/[slug]/opengraph-image.tsx` pattern but labeled "FIELD GUIDE" and showing the category).
- `app/sitemap.ts` now includes every **published** (non-draft) guide automatically; the `/resources` hub itself is intentionally excluded from the sitemap until Phase 4 (commented and explained in the file).
- `dynamicParams = false` on `/resources/[slug]` (a literal, Next.js-required static boolean) — only slugs `generateStaticParams` returns are ever reachable. In production that list is `getPublishedGuides()` only; draft guides are structurally impossible to reach or statically generate in a production build (verified: production `next build` produced zero pre-rendered `[slug]` pages and zero sitemap entries under `/resources`).

## Analytics

Five new events added to the existing `AnalyticsEvent` union in `lib/analytics.ts` (Part 53) — no parallel tracking system:

- `field_guide_view` — fires once per guide page view
- `field_guide_action_click` — fires when a "Do This This Week" item is toggled
- `field_guide_related_click` — fires on hub/related-guide/system/industry/homepage links into a guide
- `field_guide_score_click` / `field_guide_playbook_click` — fire from the Next Step CTA when it resolves to the Score or Playbook

No PII is sent with any event — only slug, category, and destination.

## Draft System

- `draft: boolean` on every `FieldGuide`. `true` (the two current dev-fixture guides) means: excluded from `/resources` and every category/featured list (`getPublishedGuides`/`getGuidesByCategory`/`getFeaturedGuides` all filter it out unconditionally, in every environment), excluded from the sitemap, never linked from System/Industry/homepage integration points (which only resolve real guide slugs).
- The **only** place a draft is ever reachable is `/resources/[slug]` directly by URL, and only outside production (`generateStaticParams` includes drafts only when `NODE_ENV !== 'production'`; `dynamicParams = false` always). Verified via a full production `next build`: zero static pages were generated under `/resources/[slug]`, confirming drafts are unreachable in a production deploy.
- The two dev fixtures (`dev-demo-lead-leak`, `dev-demo-visual-gallery`) exist solely to exercise every visual primitive and the full six-part template during this phase's development; they carry a `[DEV DEMO]` title prefix and a placeholder `metaTitle` that would look obviously wrong if it ever leaked. They should stay `draft: true` permanently or be deleted once Phase 4 has real guides to test against.

## Mobile

Verified in-browser at 375×812 on both dev-fixture guides:
- Header/breadcrumbs wrap cleanly, no overflow.
- `Funnel` stacks to a single vertical column below `sm:`, with the highlighted stage still visually distinct.
- `Why It Happens`'s 2-column concept grid collapses to one column, dividers intact.
- `Framework`'s term sequence wraps via `flex-wrap` with no clipped text.
- `BeforeAfter` and `LeakMap` (second fixture) both confirmed rendering correctly with accessible labels.
- `Do This This Week` checkboxes and text stack with a comfortable touch target (24px control + generous row padding).
No horizontal overflow was observed anywhere in the template.

## Performance

- No new npm dependencies were added — no chart/animation library, no icon library, no CMS SDK.
- All visuals are semantic HTML + Tailwind + a handful of inline SVG arrows/checkmarks — no client-side rendering cost beyond the two small interactive components (`DoThisThisWeek`, `QuickDiagnosis`), both trivial `useState` toggles.
- `npx next build` succeeds; `/resources` is a fully static page, `/resources/[slug]` is SSG-ready (currently generating zero pages since there's no published content yet — this will generate real static HTML per guide starting Phase 4).

## Integration Readiness

All four integration points from Parts 26–29 are **built but inactive**, each requiring a one-line change once Phase 4 publishes real guides:

| Integration | Status | Activation |
|---|---|---|
| Homepage | `components/FieldGuidesHomeBlock.tsx` built, self-hides if no featured guides exist | Add `<FieldGuidesHomeBlock />` to `app/page.tsx` |
| System page | `SystemComponent.relatedGuide?` field added; `SystemDeepDive.tsx` renders "Related Field Guide" only when set | Set `relatedGuide` on the relevant entries in `lib/config/systemComponents.ts` |
| Industry pages | `IndustryPage.relatedFieldGuideSlugs?` field added; `IndustryPageTemplate.tsx` renders "Growth Strategies for [Industry] Companies" only when ≥1 slug resolves | Set `relatedFieldGuideSlugs` on the relevant entries in `lib/config/industryPages.ts` |
| Growth Tools nav / Footer | `fieldGuides` nav config added to `lib/config/navigation.ts`; commented, ready-to-uncomment blocks left in `components/nav/GrowthToolsDropdown.tsx` and `lib/config/navigation.ts`'s `footerNavLinks` | Uncomment both once `/resources` has real published content |

None of these were activated in this phase, per Part 30's "do not publish placeholder content" and the explicit instruction not to create dead links.

## Phase 4 Readiness

**Yes.** A Field Guide can be created by supplying exactly the 9 inputs the master prompt's Final Success Test lists (title, category, one core idea, short explanation, primary visual, framework, three action items, CTA, SEO metadata) as a `FieldGuide` object (using `lib/config/fieldGuides.template.ts` as the starting point) — the system automatically handles layout, typography, URL, metadata, canonical, schema, sitemap inclusion, related content, mobile design, analytics, Open Graph, and visual consistency with zero additional engineering. Flipping `draft: false` is the only publish step.

**Open item for a product decision, not an architectural blocker:** whether `/guides/` and `/resources/` should coexist long-term as two distinct content types, or whether Phase 4+ should plan to fold one into the other. Both are technically independent and neither blocks the other.
