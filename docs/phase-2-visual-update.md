# Phase 2 — Front-End Visual System & Typography Update

Scope: modernize presentation only. No changes to offer, pricing, guarantees, case-study facts, qualification logic, form logic, tracking, or Phase 1 SEO architecture.

## Typography

**Previous:** Space Grotesk (display/headings) + DM Sans (body), loaded via `next/font/google` with full default weight sets, CSS variables `--font-space-grotesk` / `--font-dm-sans`.

**New:** Inter Tight (display/headings, weights 500/600/700) + Inter (body/interface, weights 400/500/600), loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx). Only the weights actually used are requested. Variables were renamed to `--font-display` / `--font-body-sans` — a pure find-and-replace across all 56 consuming files, so no component markup or visual risk was introduced by the rename itself.

**Implementation notes:**
- `display: "swap"` preserved on both fonts — no FOIT.
- Self-hosted and auto-preloaded by `next/font`, exactly as before — no external `<link>` tag was added anywhere.
- `h1`–`h6` base styles in [app/globals.css](app/globals.css) tightened: `letter-spacing: -0.03em`, `line-height: 1.05`, `font-weight: 700` — replacing the previous `-0.02em` / `1.1`.
- OG-image route handlers (`opengraph-image.tsx`, 4 files) use `system-ui` and were untouched — they don't go through `next/font`.

## Design Tokens

Centralized in `app/globals.css` under `@theme inline` and a new typographic-scale block:
- **Radius system:** `--radius-sm: 6px`, `--radius-card: 12px`, `--radius-media: 16px`, `--radius-btn: 6px` (previously only card/btn existed).
- **Border tokens:** `--color-border`, `--color-border-strong` (restrained, low-opacity platinum) added for the divider-based layouts that replaced several card grids.
- **Spacing rhythm:** `--space-section: 128px` / `--space-section-mobile: 72px` documented (existing `.section-pad` utility already implemented this rhythm; formalized as tokens).
- **Typographic scale:** new utility classes — `.text-hero`, `.text-section-heading`, `.text-subsection-heading`, `.text-body-lg`, `.text-body`, `.text-eyebrow`, `.prose-measure` — give every page a single source of truth for the type ramp specified in the brief (hero: `clamp(2.75rem, 6vw, 5.25rem)`; section headings: `clamp(2rem, 4.2vw, 3.25rem)`; etc.), rather than the previous per-component arbitrary `text-4xl md:text-6xl`-style sizing.
- **Color system:** brand teal (`#008080`) and platinum (`#C5C6C7`) were **not** changed — usage was audited and narrowed to interaction/emphasis/CTA/key-numbers, per the brief. Gradient text (`teal-gradient-text`) was removed from the two places it appeared (Hero, FinalCTA) in favor of solid `#00a8a8` — typography now carries the visual weight instead of a gradient effect.

## Major Homepage Improvements

- **Hero** ([components/Hero.tsx](components/Hero.tsx)): eyebrow badge converted from a heavy rounded-pill/border/background treatment to a restrained uppercase label with a small dot (matches the brief's "use sparingly" eyebrow guidance). Headline switched from gradient text to solid teal — typography alone now carries the impact. Supporting paragraphs constrained to a readable measure (`.prose-measure`, ~62ch) instead of stretching to `max-w-2xl` centered blocks. Message, CTA copy, CTA hierarchy, and industry list were **not** changed.
- **The Lusso Local Dominance System** ([components/DominanceSystemDiagram.tsx](components/DominanceSystemDiagram.tsx)): rebuilt from a 4-column grid of 7 identical bordered cards into an editorial numbered sequence — large teal number, name, one-line purpose, thin divider — left-aligned. Directly addresses the "seven identical cards" AI-template pattern called out in the brief.
- **You Don't Need More Random Marketing** ([components/FragmentedMarketing.tsx](components/FragmentedMarketing.tsx)): rebuilt from two separate pill/badge grids into a left-aligned two-column "Fragmented vs. Connected" comparison using plain divided rows and simple arrow glyphs — no pill badges, no icon library.
- **What the First 90 Days Look Like** ([components/NinetyDayRoadmap.tsx](components/NinetyDayRoadmap.tsx)): rebuilt from 4 identical cards into the number-led editorial sequence specified in the brief (`01 Activate`, `02 Install`, …) with the day-range as a secondary label under the phase name, not the headline.
- **Referrals**, **Guarantee**, **Qualification**, **7-Day Activation**, **Results/Proof**, **Final CTA**: headings converted to left-aligned `.text-section-heading` / `.text-eyebrow` (previously centered `text-3xl md:text-5xl` ad hoc sizing); paragraphs constrained to `.prose-measure`. The existing two-card comparisons in these sections (Referrals, Guarantee, Qualification, 7-Day Activation) were preserved as cards — per the brief, comparisons/distinct choices are one of the cases cards remain justified.

## System-Page Improvements

- [app/system/page.tsx](app/system/page.tsx): hero and closing CTA converted to the new type scale.
- [components/SystemDeepDive.tsx](components/SystemDeepDive.tsx): rebuilt from bordered cards with a small side-by-side number+name into the brief's literal target pattern — `"02 — OFFER ENGINEERING"` as an eyebrow-style line, the component's actual value proposition (`c.purpose`) promoted to a visible subheading, followed by the existing Problem / What We Install / Why It Matters three-column breakdown. Content (problem text, install lists, "why it matters" copy, objection notes) is unchanged — only hierarchy and framing.

## Industry-Page Improvements

All 8 industry pages (`/hvac`, `/plumbing`, `/roofing`, `/landscaping`, `/concrete`, `/electrical`, `/remodeling`, `/general-contractors`) render through one shared component, [components/industry/IndustryPageTemplate.tsx](components/industry/IndustryPageTemplate.tsx) — so a single edit cascades consistently to every vertical, satisfying the brief's "don't redesign each industry page independently" requirement:
- Hero eyebrow/heading/copy converted to the new restrained-label + editorial-heading + measured-paragraph pattern (same treatment as the homepage hero).
- "Primary pain" statement left-aligned; the three economics points changed from bordered cards to a simple top-rule column layout (less "card-itis" for what are single sentences, not distinct choices).
- FAQ converted from individually bordered/backgrounded cards to a divided list, consistent with the homepage FAQ treatment.
- Final CTA heading converted to the new type scale.
- Offer-examples / project-types two-card comparison and the case-study proof block were left as-is (justified cards / already-appropriate centered proof block).

## Other Pages Touched

- [components/Founder.tsx](components/Founder.tsx): eyebrow/heading converted to new type scale. Layout (two-column image + content, restrained stats row) was already correctly avoiding an oversized personal-brand hero — no structural change needed.
- [components/FAQ.tsx](components/FAQ.tsx) (homepage FAQ): removed the single large rounded card (`bg-[#141414] rounded-2xl ... border`) wrapping all questions in favor of a plain top-divided list — matches the brief's "avoid giant rounded accordion cards" instruction. Expand/collapse behavior, keyboard operation (native `<button aria-expanded>`), and touch targets were unchanged.
- [app/privacy/page.tsx](app/privacy/page.tsx), [app/terms/page.tsx](app/terms/page.tsx): inherit the new fonts and base typography automatically via `globals.css`; no structural redesign performed, per the brief. Their Phase 1 canonical tags are untouched.
- **Nav** ([components/Nav.tsx](components/Nav.tsx)): reviewed against the AI-template checklist — already restrained (no gradients, no oversized pills, functional dropdowns and mobile drawer, visible focus states). No changes made; architecture, links, and logo-to-homepage behavior are unchanged.

## Mobile Improvements

Verified at 375×812 (iPhone-class viewport) via the in-browser preview:
- Homepage hero: headline wraps cleanly across 3 lines with no orphaned words or clipped characters; buttons stack full-width/outlined with clear primary/secondary distinction.
- Proof section (real business imagery + narrative outcome copy): no overflow, image and text both readable at width.
- Fragmented-vs-Connected and the numbered System sequence: verified rendering as single-column stacks with no card-grid breakage, confirming the divider-row pattern degrades gracefully on narrow viewports (this was a specific risk with the old card-grid approach at `sm:` breakpoints).
- HVAC industry page (representative of the shared template): hero, eyebrow, and CTA stack cleanly with no horizontal scroll.
- No horizontal overflow was observed on any checked page/section.

## Components Created/Refactored

No new component files were added — the brief's suggested primitives (`SectionLabel`, `DisplayHeading`, etc.) were implemented as **CSS utility classes** (`.text-eyebrow`, `.text-section-heading`, `.text-subsection-heading`, `.text-body-lg`, `.text-body`, `.prose-measure`) rather than new React components. This gives every page the same centralized scale the brief asks for, while avoiding a large mechanical refactor of 50+ files' JSX structure in a single pass — lower risk, same visual outcome. Existing components were edited in place:

`Hero`, `DominanceSystemDiagram`, `FragmentedMarketing`, `ReferralCeiling`, `NinetyDayRoadmap`, `GuaranteeSection`, `QualificationSection`, `FastWinTimeline`, `CaseStudies`, `FinalCTA`, `SystemDeepDive`, `FAQ`, `Founder`, `IndustryPageTemplate`, plus `app/system/page.tsx`.

## Performance Impact

- Font payload: fewer distinct weight files than before is not guaranteed (Inter Tight/Inter vs. Space Grotesk/DM Sans have different weight counts natively), but only 3 weights per family were explicitly requested for both — no unused variants shipped.
- No new npm dependencies were added; no animation/charting libraries introduced. `framer-motion` usage is unchanged (same fade/slide-in patterns already in use).
- `npx next build` completes successfully; all 43 static/SSG routes generate without error.
- No JavaScript logic was added for the visual changes — all of it is markup/className changes plus the CSS token additions.

## Accessibility Impact

- Heading hierarchy preserved and in several cases clarified (e.g., `SystemDeepDive` now surfaces `c.purpose` as a visible `<h3>`-adjacent subheading rather than only inside body copy).
- FAQ accordion retains native `<button aria-expanded>` semantics; removing the surrounding card container did not touch the interactive markup.
- Color contrast: no foreground/background color pairs were changed (teal `#008080`/`#00a8a8` on `#0D0D0D`/`#141414`, platinum `#C5C6C7`, white on dark — all pre-existing, already-verified pairs). Letter-spacing tightened slightly (`-0.02em` → `-0.03em`) at typical heading weights/sizes, which does not create a WCAG contrast or legibility issue.
- No changes to focus states, touch target sizes, or keyboard navigation.

## SEO Preservation

Confirmed intact — no code in this phase touched metadata, canonical tags, `robots.ts`, `sitemap.ts`, or structured data:
- `npx tsc --noEmit` — clean.
- `npx next build` — all Phase 1 routes (`/`, `/system`, `/results`, `/results/[slug]`, `/[industry]` ×8, `/apply`, `/local-dominance-score`, `/guides`, `/guides/[slug]` ×10, `/lead-to-booked-job-playbook`, `/privacy`, `/terms`, `/book`, `/playbook-thank-you`, `/plan-confirmed`, `robots.txt`, `sitemap.xml`) generated successfully with unchanged route structure.
- No heading text, canonical URL, `alternates`, or `robots` metadata field was edited anywhere in this phase. The one behavioral change worth flagging: `SystemDeepDive`'s markup order changed (eyebrow → subheading → three-column breakdown, vs. previously number+name → three-column breakdown directly) — the semantic content is the same, just reordered/relabeled, so this does not affect what search engines can read.

## Analytics/Conversion Preservation

- `Analytics.tsx` (GTM/GA4/Meta Pixel) was not touched.
- Every `trackEvent(...)` call in edited components (`Hero`, `QualificationSection`, `FinalCTA`, `IndustryPageTemplate`, `CaseStudies`, etc.) was preserved verbatim — only surrounding `className` and JSX structure changed, never the `onClick` handlers or event names/params.
- CTA hrefs, labels, and hierarchy (primary solid-teal button vs. secondary outlined button) are unchanged everywhere.
- Local Dominance Score multi-step logic and its intentional per-step `<h1>` pattern were **not touched**, per explicit instruction.
- No form component (`StepForm`, `LeadCaptureForm`, application/playbook flows) was edited in this phase — the font-variable rename reached these files (56 files touched) but only as a CSS variable name change with zero effect on logic, validation, or submission behavior.

## Human Approvals

Both items flagged above were reviewed and approved:

1. **Homepage "Real Businesses" proof section metrics — approved and implemented.** [components/ProofStrip.tsx](components/ProofStrip.tsx) now surfaces visual metric callouts (`2 → ~14` Crew Size, `<$500K → 7-Figure Run Rate` Annual Revenue for Full Curl Landscaping; `Part-Time → Full-Time` for Hanshew Flight Instruction) above the existing outcome paragraph, using a new local `proofMetrics` lookup keyed by case-study slug. Every figure is copied verbatim from `lib/config/caseStudies.ts` (`snapshot.before`/`snapshot.today` and `outcome`) — no new numbers were introduced. The section heading was also converted to the standard left-aligned `.text-section-heading`/`.text-eyebrow` treatment for consistency with the rest of the page. Verified with `tsc --noEmit` and `next build` (clean).
2. **Font change (Inter Tight / Inter) — approved.** No further action needed.

## Phase 3 Readiness

**Yes.** The typographic scale, eyebrow/number-sequence editorial pattern (used identically now on the homepage system overview, `/system` deep-dive, and the 90-day roadmap), and card-vs-divider-row conventions established in this phase are exactly the primitives the Field Guide system will need to inherit. No `/resources/` routes, Field Guide template, or content-relationship architecture was built in this phase, per instruction.
