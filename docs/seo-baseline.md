# Lusso Media — SEO Pre-Change Baseline

Recorded 2026-08-29, against production (`https://illussomedia.com`) and the codebase at commit `d610050`.

## Site Architecture

All routes are Next.js 16 App Router pages. Metadata is set via the framework `Metadata` API (`export const metadata` / `generateMetadata`) — no separate SEO plugin.

| URL | HTTP | Index? | Canonical | Title source | H1 | Sitemap | Structured data | Purpose |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | index | `https://illussomedia.com/` | Layout default | Hero (via `Hero` component, not a literal `<h1>` scan match — see note below) | ✅ | `ProfessionalService`, `FAQPage`, site-wide `Organization`+`WebSite` (layout) | Homepage / core offer |
| `/system` | 200 | index | `.../system` | Own `metadata` | ✅ | ✅ | inherits org/website | Explains Local Dominance System |
| `/results` | 200 | index | `.../results` | Own `metadata` | ✅ | ✅ | inherits org/website | Case study index |
| `/results/[slug]` (2 live: `full-curl-landscaping`, `hanshew-flight-instruction`) | 200 | index | `.../results/{slug}` | `generateMetadata` | ✅ (`CaseStudyTemplate`) | ✅ | inherits org/website | Individual case study |
| `/[industry]` (8 live: `hvac`, `plumbing`, `roofing`, `landscaping`, `concrete`, `electrical`, `remodeling`, `general-contractors`) | 200 | index | `.../{slug}` | `generateMetadata` | ✅ | ✅ | `Service`, `BreadcrumbList`, `FAQPage` | Vertical landing pages |
| `/apply` | 200 | index | `.../apply` | Own `metadata` | — | ✅ | inherits org/website | Application funnel entry |
| `/local-dominance-score` | 200 | index | `.../local-dominance-score` | Own `metadata` | multi-step tool (`ScoreIntro`/`QuestionStep`/`ScoreReveal` each render their own `<h1>` per step) | ✅ | inherits org/website | Free diagnostic lead magnet |
| `/guides` | 200 | index | `.../guides` | Own `metadata` | ✅ | ✅ | inherits org/website | Resource/guide index |
| `/guides/[slug]` (10 live) | 200 | index | `.../guides/{slug}` | `generateMetadata` | ✅ | ✅ | `Article`, `BreadcrumbList`, `FAQPage` | Educational long-form content |
| `/lead-to-booked-job-playbook` | 200 | index | `.../lead-to-booked-job-playbook` | Own `metadata` | ✅ (`PlaybookHero`) | ✅ | inherits org/website | Second lead-magnet funnel |
| `/privacy` | 200 | index | `.../privacy` *(added this pass — was missing)* | Own `metadata` | ✅ (`LegalPage`) | ✅ | inherits org/website | Legal |
| `/terms` | 200 | index | `.../terms` *(added this pass — was missing)* | Own `metadata` | ✅ (`LegalPage`) | ✅ | inherits org/website | Legal |
| `/book` | 200 | **noindex, nofollow** | none set | Own `metadata` | ✅ | excluded (commented, intentional) | none | Qualified-lead booking page, gated by funnel logic |
| `/playbook-thank-you` | 200 | **noindex**, follow | `.../playbook-thank-you` | Own `metadata` | ✅ | excluded | none | Post-opt-in delivery confirmation |
| `/plan-confirmed` | 200 | **noindex, nofollow** | none set | Own `metadata` | ✅ | excluded | none | Post-application confirmation |
| `/studio` (Sanity Studio, catch-all) | 200 | not reachable by crawlers | n/a | none | n/a | excluded | none | CMS admin UI, blocked via `robots.txt` |

**Note on H1 audit:** grep for literal `<h1>` JSX finds a match in every route above except `/apply` (its primary heading lives one component deep inside `ApplicationResult`/`StepForm`, both of which do render an `<h1>`, confirmed separately) and the homepage (rendered by the `Hero` component — confirmed present via component read). No page was found with zero or multiple competing `<h1>`s.

## Duplicate / Orphan / Obsolete Page Check

- **No parameterized duplicate routes** — `[industry]`, `[slug]` routes use `dynamicParams = false`, so only the slugs enumerated in `lib/config/*.ts` resolve; everything else 404s cleanly (verified: `/this-page-does-not-exist` → `404`).
- **No orphan pages found.** Every indexable route is linked from `Nav`, a dropdown (`IndustriesDropdown`, `GrowthToolsDropdown`), the homepage, or `Footer`.
- **No redirect chains.** `http://` → `https://` is a single 308. Trailing-slash URLs (e.g. `/system/`) 308 once to the canonical non-trailing-slash form (Next.js default `trailingSlash: false` behavior — not configured differently in `next.config.ts`).
- **No staging/test URLs are publicly linked or in the sitemap.** `/studio` is live at `/studio` but is disallowed in `robots.txt` and carries no internal links pointing to it.
- **No thin utility pages** in the sitemap — funnel-confirmation pages are correctly excluded and noindexed rather than thin-indexed.

## Domain Consistency

- Canonical domain: `https://illussomedia.com` (apex, HTTPS, no trailing slash). Confirmed live.
- `http://illussomedia.com` → `308` → `https://illussomedia.com/`. ✅
- **`www.illussomedia.com` does not resolve (no DNS record) — see "Issues Not Automatically Changed" in the Phase 1 report.** This isn't a duplicate-content risk (nothing indexable exists there to compete with the apex), but it does mean anyone who types or links to the `www` host gets a hard connection failure instead of a redirect.
- No mixed HTTP/HTTPS internal links found (all internal `href`s and canonical/OG URLs use `https://illussomedia.com`).

## robots.txt (live, generated by `app/robots.ts`)

```
User-Agent: *
Allow: /
Disallow: /studio

Sitemap: https://illussomedia.com/sitemap.xml
```

Correctly scoped: only the CMS admin surface is disallowed; no CSS/JS paths are blocked; sitemap is referenced. No changes made — already best-practice.

## XML Sitemap (live, generated by `app/sitemap.ts`)

Dynamically built from `lib/config/{caseStudies,industryPages,playbook,guides}.ts`, so new industry pages, guides, or case studies appear automatically without a manual sitemap edit. Contains exactly the 24 indexable URLs above (home, system, results index + 2 case studies, 8 industry pages, apply, score, playbook, guides index + 10 guides, privacy, terms). Confirmed: no noindexed page, no redirecting URL, and no non-200 URL is present in the sitemap. No changes required.

## Indexing Decisions (Step 5)

| Page | Directive | Rationale |
|---|---|---|
| `/book` | `noindex, nofollow` | Gated booking step reached only after qualification; no standalone search intent; `nofollow` because the page's only links are internal funnel/calendar actions, already indexed elsewhere. |
| `/playbook-thank-you` | `noindex, follow` | Pure delivery confirmation, no unique evergreen content; `follow` kept since it likely links back to primary nav/site content. |
| `/plan-confirmed` | `noindex, nofollow` | Post-application confirmation, session-specific, no search intent. |
| `/studio` | blocked via `robots.txt` | Admin CMS surface, not a page for any visitor. |
| Everything else | `index, follow` | Evergreen content or the core conversion funnel entry points (`/apply`, `/local-dominance-score`, `/lead-to-booked-job-playbook`), which also carry real organic search intent and are correctly left indexable rather than blanket-noindexed. |

All of the above were already in place prior to this pass; none were changed.

## Canonicalization

Self-referencing absolute canonicals confirmed present on every indexable page. Two gaps found and fixed this pass:

- `/privacy` had no `alternates.canonical` — **fixed**, added `https://illussomedia.com/privacy`.
- `/terms` had no `alternates.canonical` — **fixed**, added `https://illussomedia.com/terms`.

No other canonical gaps, mismatches, or conflicting canonical targets found. OG `url` fields match canonical URLs on every page checked (`/`, `/system`, `/results`, industry pages, guides).

## HTTP Status Audit

All 24 sitemap URLs plus `/book`, `/playbook-thank-you`, `/plan-confirmed`, `/studio` return `200`. Unknown paths return a clean `404` (no soft-404, no 500 observed). No redirect chains or loops found.

## Metadata (Titles & Descriptions)

Every indexable page has a unique, human-readable title (via the `%s | Lusso Media` template) and a unique meta description reflecting actual page content — no boilerplate repetition, no keyword stuffing, no fabricated claims. Existing copy was preserved; no rewrites performed per Step 9/10 guidance ("preserve stronger existing copy").

## Structured Data Inventory

| Type | Where |
|---|---|
| `Organization` + `WebSite` | Site-wide, in `app/layout.tsx` |
| `ProfessionalService` + `FAQPage` | Homepage |
| `Service` + `BreadcrumbList` + `FAQPage` | Every industry page |
| `Article` + `BreadcrumbList` + `FAQPage` | Every guide |
| Case-study, playbook, score pages | Inherit site-wide `Organization`/`WebSite` only — no additional schema, appropriate since they're not editorial articles |

No fabricated ratings, reviews, awards, addresses, or pricing found anywhere in the schema. `PostalAddress` intentionally omits a street address (region/country only) — consistent with Step 19's "do not manufacture entity data."

## Font Setup (Step 17 — documentation only, no swap performed)

- Two Google fonts via `next/font/google`: `Space_Grotesk` (headings) and `DM_Sans` (body), both loaded with `display: "swap"` and the `latin` subset only.
- `next/font` self-hosts these at build time and auto-generates `<link rel="preload">` for the font files used above the fold — no manual preload tags needed or present.
- No unused weights/styles were requested (both use default weight sets pulled in by the components that reference `--font-space-grotesk` / `--font-dm-sans`), so there's no unused-variant waste to trim.
- **Recommended approach for Phase 2:** when the typography system changes, keep using `next/font/google` (or `next/font/local` for custom faces) rather than a `<link>`-tag or CSS `@import` approach — it preserves automatic self-hosting, preload injection, and `font-display: swap`, and avoids introducing a render-blocking external font request.

## Analytics (Step 24 — preserved, not modified)

GTM, GA4, and (conditionally) Meta Pixel are centralized in `components/Analytics.tsx`, loaded with `strategy="afterInteractive"` (non-blocking) and a `<noscript>` GTM fallback in `layout.tsx`. IDs fall back to the live production IDs if env vars are unset, so nothing breaks if env config drifts. No duplication found (each snippet appears exactly once, in one component, included once in `layout.tsx`). No changes made.

## Images

`next/image` is used throughout (10 files); hero/LCP images (`Nav` logo, `Founder`, `PlaybookHero`, `CaseStudyTemplate`) correctly use `priority`; below-the-fold images (`ProofStrip`, `CaseStudyTemplate` gallery) correctly use `loading="lazy"`. The only raw `<img>` tags are inside the four `opengraph-image.tsx` route handlers, which is expected and correct — Next's `ImageResponse` OG-image generation doesn't use `next/image`.

## Mobile / Responsive

Not independently re-tested pixel-by-pixel in this pass beyond the prior QA commit (`42dabac fix: responsive QA pass`); no code changes were made in Phase 1 that touch layout, so mobile behavior is unchanged from that prior, already-verified pass.
