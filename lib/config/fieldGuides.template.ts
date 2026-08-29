// FIELD GUIDE TEMPLATE — copy-paste starting point for a new guide.
//
// This file is NEVER imported anywhere in the app (grep confirms it — do
// not import it) and is therefore never bundled, never rendered, and never
// indexable. It exists purely as documentation/scaffold, the equivalent of
// the master prompt's `/content/resources/_template.mdx` for this repo's
// typed-config content model (see lib/config/fieldGuides.ts for why typed
// TS was chosen over MDX).
//
// TO CREATE A NEW GUIDE:
//   1. Copy the object below into the `fieldGuides` array in
//      lib/config/fieldGuides.ts (NOT into this file).
//   2. Fill in every placeholder.
//   3. Leave `draft: true` until it passes the QA checklist in
//      /docs/field-guide-editorial-standard.md, then flip to `draft: false`.
//   4. Run `npx tsc --noEmit` — the build-time validation in
//      fieldGuides.ts will throw with a clear error if anything required
//      is missing or malformed.

import type { FieldGuide } from './fieldGuides';

const _template: FieldGuide = {
  // ── Identity ──
  slug: 'your-guide-slug-here', // lowercase, hyphenated, stable
  title: 'The Full, Specific Title', // shown as the page <h1>
  shortTitle: 'Short Card Title', // shown on cards/hub/related-guides
  category: 'revenue-intelligence', // one of the 7 fieldGuideCategories slugs
  premise: 'The one-sentence idea this guide teaches.', // Part 40 — exactly one idea

  // ── Editorial ──
  readTimeMinutes: undefined, // omit to auto-calculate; or set e.g. 3
  publishDate: '2026-01-01', // ISO date, ACCURATE — never fabricated
  updatedDate: '2026-01-01',
  // Independently controllable (Phase 4G) — curating one does not affect
  // the other. Both max 3 total across all guides.
  featuredOnHomepage: false, // true surfaces it in the homepage's 3-guide teaser
  featuredOnHub: false, // true surfaces it in the /resources hub's "Featured" row
  draft: true, // MUST be false before this is publicly reachable

  // ── SEO ──
  metaTitle: 'Guide Title | Lusso Media',
  metaDescription: 'One or two sentences describing what this guide teaches and who it is for.',
  ogImageAlt: 'Descriptive alt text for the auto-generated Open Graph image.',

  // ── 01 — The Problem (75–125 words) ──
  problem: 'What the owner is likely doing, and why it matters, in 75–125 words.',

  // ── 02 — See It (pick ONE visual type; see visuals.tsx for all shapes) ──
  seeIt: {
    type: 'funnel',
    stages: ['Stage One', 'Stage Two', 'Stage Three'],
    highlightIndex: 1, // optional — which stage is the constraint
  },

  // ── 03 — Why It Happens (150–250 words total, 2–4 concepts) ──
  whyItHappens: [
    { label: 'Concept One', detail: 'One or two sentences explaining it.' },
    { label: 'Concept Two', detail: 'One or two sentences explaining it.' },
  ],

  // ── 04 — The Framework ──
  frameworkIntro: 'One sentence introducing Lusso\'s way of thinking about this.',
  framework: {
    type: 'framework',
    terms: ['Term One', 'Term Two', 'Term Three'],
    connector: '→',
  },

  // ── Optional Quick Check — never a lead form, never stored ──
  quickDiagnosis: undefined,
  // quickDiagnosis: {
  //   question: 'A yes/no question the reader can answer about their own business.',
  //   yes: 'What it means if yes.',
  //   no: 'What it means if no.',
  // },

  // ── 05 — Do This This Week (1–3 actions, MAX 3) ──
  actions: [
    { title: 'First specific action.', detail: 'How to actually do it.' },
    { title: 'Second specific action.', detail: 'How to actually do it.' },
  ],

  // ── 06 — Next Step (exactly one CTA) ──
  nextStepCTA: { type: 'score' }, // 'score' | 'playbook' | 'system' | 'results' | 'apply'
  nextStepSupporting: 'One sentence setting up why this CTA is the right next step.',

  // ── Relationships (max 2–3 shown) ──
  relatedGuideSlugs: [],
};

export default _template;
