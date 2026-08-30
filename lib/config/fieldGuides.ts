// Lusso Field Guide content model (Phase 3).
//
// Field Guides are a DIFFERENT content type from lib/config/guides.ts.
// Guides (/guides/[slug]) are traditional long-form SEO/AI-search articles.
// Field Guides (/resources/[slug]) are short (2–4 min), visual, framework-
// driven strategy briefs organized by growth-system category rather than
// publish date. See /docs/field-guide-editorial-standard.md for the full
// editorial rules this model enforces.
//
// Simplest-maintainable-solution choice (Part 8): typed local TypeScript
// data, matching the existing lib/config/*.ts pattern used by industries,
// guides, and case studies. No MDX pipeline or CMS was introduced — the
// stack has no content-authoring need beyond what typed objects + this
// file's validation already covers.

export type FieldGuideCategorySlug =
  | 'market-intelligence'
  | 'offer-engineering'
  | 'conversion-infrastructure'
  | 'demand-advertising'
  | 'authority-reputation'
  | 'revenue-intelligence'
  | 'search-local-discovery';

export interface FieldGuideCategoryDef {
  slug: FieldGuideCategorySlug;
  label: string;
  /** The organizing question shown under the category label on the hub. */
  question: string;
}

// Part 3 — the seven primary categories. Order here is the display order
// on the /resources hub.
export const fieldGuideCategories: FieldGuideCategoryDef[] = [
  { slug: 'market-intelligence', label: 'Market Intelligence', question: 'Where should the business compete?' },
  { slug: 'offer-engineering', label: 'Offer Engineering', question: 'What should the business sell, and why should someone act?' },
  { slug: 'conversion-infrastructure', label: 'Conversion Infrastructure', question: 'How does attention become a qualified opportunity?' },
  { slug: 'demand-advertising', label: 'Demand & Advertising', question: 'How does the right message reach the right market?' },
  { slug: 'authority-reputation', label: 'Authority & Reputation', question: 'Why should the market trust this company?' },
  { slug: 'revenue-intelligence', label: 'Revenue Intelligence', question: 'Where is money being lost after the lead?' },
  { slug: 'search-local-discovery', label: 'Search & Local Discovery', question: 'How does the company get found organically?' },
];

export function getCategory(slug: FieldGuideCategorySlug): FieldGuideCategoryDef {
  const cat = fieldGuideCategories.find((c) => c.slug === slug);
  if (!cat) throw new Error(`Unknown field guide category: ${slug}`);
  return cat;
}

// Phase 4H/4I/4J — industry metadata for industry-specific guides.
// Deliberately a small, explicit union rather than every possible vertical
// (Part "RESOURCE HUB": "Do NOT prematurely build every possible industry
// enum unless needed") — extend one value at a time as real industry-
// specific guides publish. Still no filter UI at three industries (Phase 4J
// — revisit once industry-specific volume materially increases).
export type FieldGuideIndustry = 'landscaping' | 'plumbing' | 'hvac';

const industryLabels: Record<FieldGuideIndustry, string> = {
  landscaping: 'Landscaping',
  plumbing: 'Plumbing',
  hvac: 'HVAC',
};

export function getIndustryLabel(industry: FieldGuideIndustry): string {
  return industryLabels[industry];
}

// ── Visual primitives (Part 13) ──
// Each guide's "See It" (Part 10, section 02) and "Framework" (section 04)
// visuals are typed data, rendered by the matching component in
// components/resources/visuals.tsx. Keeping the visual as data (not JSX)
// in the content model is what lets validation/tooling reason about guides
// without executing React.

export interface FunnelVisual {
  type: 'funnel';
  /** Ordered left-to-right/top-to-bottom stages, e.g. Traffic → Lead → Qualified → Estimate → Booked. */
  stages: string[];
  /** Optional stage index (0-based) to visually flag as the constraint. */
  highlightIndex?: number;
}

export interface BeforeAfterVisual {
  type: 'beforeAfter';
  beforeLabel: string;
  beforeItems: string[];
  afterLabel: string;
  afterItems: string[];
}

export interface FrameworkVisual {
  type: 'framework';
  /** Short terms joined with a connector, e.g. ["Demand","Offer","Conversion","Sales","Revenue"]. */
  terms: string[];
  connector?: '→' | '×' | '+';
}

export interface ScorecardVisual {
  type: 'scorecard';
  items: { question: string; status: 'pass' | 'warn' | 'fail' }[];
  /** Optional override for the status labels shown next to each item — the
   * default wording ("On track" / "Worth checking" / "Likely a leak")
   * assumes a funnel-leak diagnostic, which doesn't fit every guide (e.g.
   * an offer decision check). Every guide that omits this keeps the
   * existing default text. */
  statusLabels?: { pass?: string; warn?: string; fail?: string };
}

export interface DecisionTreeVisual {
  type: 'decisionTree';
  question: string;
  branches: { label: string; result: string }[];
}

export interface LeakMapVisual {
  type: 'leakMap';
  stages: string[];
  /** Stage indexes (0-based) where the guide asserts a common leak occurs. */
  leakIndexes: number[];
}

export interface TimelineVisual {
  type: 'timeline';
  steps: { label: string; detail: string }[];
}

export interface MetricVisual {
  type: 'metric';
  metrics: { before: string; after: string; label: string }[];
}

export interface ScreenshotVisual {
  type: 'screenshot';
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  annotations?: { label: string }[];
}

// Phase 4I — a qualitative N-column comparison (e.g. 3 buyer types × 6
// dimensions) that stacks cleanly on mobile instead of a horizontally-
// scrolling table. Generic and reusable for future guides, not a one-off.
export interface ComparisonVisual {
  type: 'comparison';
  columns: string[];
  rows: { label: string; values: string[] }[];
}

export type FieldGuideVisual =
  | FunnelVisual
  | BeforeAfterVisual
  | FrameworkVisual
  | ScorecardVisual
  | DecisionTreeVisual
  | LeakMapVisual
  | TimelineVisual
  | MetricVisual
  | ScreenshotVisual
  | ComparisonVisual;

// ── Structural content (Part 10 — the six-part standard structure) ──

export interface FieldGuideConcept {
  label: string;
  detail: string;
}

export interface FieldGuideAction {
  title: string;
  detail: string;
}

export interface QuickDiagnosis {
  question: string;
  yes: string;
  no: string;
}

export type FieldGuideCTA =
  | { type: 'score' }
  | { type: 'playbook' }
  | { type: 'system' }
  | { type: 'results' }
  | { type: 'apply' };

export interface FieldGuide {
  // Identity
  slug: string;
  title: string;
  /** Short form used in cards/nav where the full title is too long. */
  shortTitle: string;
  category: FieldGuideCategorySlug;
  /** Optional industry designation (Phase 4H) — shown as "Industry · Category" and prepares the architecture for future industry filtering without building a filter UI yet. */
  industry?: FieldGuideIndustry;
  /** One-sentence premise — the single idea this guide teaches (Part 40). */
  premise: string;

  // Editorial
  /** Manual override. If omitted, computed from body word count (Part 34). */
  readTimeMinutes?: number;
  publishDate: string; // ISO
  updatedDate: string; // ISO
  // Phase 4G: the homepage teaser and the /resources hub's "Featured" row
  // are independently controllable — curating one no longer silently
  // changes the other. (Previously both read a single shared `featured`
  // flag, which meant Phase 4F's homepage curation moved in lockstep with
  // the hub. Migrated cleanly since only 6 real + 2 demo guides existed;
  // no `featured` property remains anywhere in this file.)
  featuredOnHomepage?: boolean;
  featuredOnHub?: boolean;
  /** Drafts never appear in /resources, the sitemap, or internal links (Part 48). */
  draft: boolean;

  // SEO
  metaTitle: string;
  metaDescription: string;
  ogImageAlt: string;

  // Section 01 — The Problem (75–125 words)
  problem: string;

  // Section 02 — See It
  seeIt: FieldGuideVisual;
  /** One-line statement under the main visual (Phase 4A, e.g. "More traffic enters at the top..."). */
  seeItCaption?: string;
  /** Optional labeled hypothetical walkthrough — never presented as a benchmark. */
  illustrativeExample?: { note: string; visual: FieldGuideVisual; conclusion?: string };

  // Section 03 — Why It Happens (150–250 words, 2–4 concepts). Optional
  // when `metricsSection` is provided instead (Phase 4E) — a guide must
  // have exactly one of the two (enforced in validateFieldGuide).
  whyItHappens?: FieldGuideConcept[];
  /** Alternative to whyItHappens for measurement-focused guides (Phase 4E) — an editorial numbered list of metrics instead of "why it happens" concepts. */
  metricsSection?: { title: string; metrics: { label: string; detail: string; formula?: string }[] };

  // Section 04 — The Framework
  /** Overrides the section's default "The Framework" heading (Public
   * Framework Originality Audit, Change 1) — used when a guide's own
   * question/name is stronger than the generic label. */
  frameworkSectionTitle?: string;
  frameworkIntro: string;
  framework: FieldGuideVisual;
  /** Optional one-line-per-term list under the framework visual (a diagnostic question per stage, or a short component explanation — whichever the guide needs). */
  frameworkQuestions?: { stage: string; question: string }[];
  /** Optional second visual showing continuity/flow through the framework (Phase 4B), or a self-check tool (Phase 4C). */
  secondaryVisual?: { label: string; visual: FieldGuideVisual };
  /** Optional short interpretation note rendered under secondaryVisual (Phase 4C — e.g. how to read a self-check scorecard). Never framed as a validated score. */
  interpretationNote?: string;
  /** Optional highlighted single-statement callout (Phase 4A "Key Principle"). */
  keyPrinciple?: { statement: string; supporting: string };
  /** Optional single concrete walkthrough applying the framework (Phase 4B). */
  example?: { label: string; rows: { label: string; value: string }[] };

  // Optional Quick Diagnosis (Part 18) — never a lead form, never stored.
  quickDiagnosis?: QuickDiagnosis;

  // Section 05 — Do This This Week (max 3 actions — Part 9/17)
  actions: FieldGuideAction[];

  // Section 06 — Next Step (single CTA — Part 10)
  nextStepCTA: FieldGuideCTA;
  /** Overrides the CTA's default label when a guide-specific phrasing is stronger. */
  nextStepCTALabel?: string;
  nextStepHeadline?: string;
  nextStepSupporting: string;

  // Relationships
  relatedGuideSlugs?: string[]; // max 2–3 shown (Part 25)
  /** Deep Guides (lib/config/guides.ts) worth linking to from this Field Guide (Phase 4A). */
  relatedDeepGuideSlugs?: string[];
}

// ── Validation (Part 43) — lightweight, native TypeScript, build-time. ──
// Thrown errors surface immediately in `next build` / `next dev` rather
// than silently shipping a broken guide.

function validateFieldGuide(g: FieldGuide): void {
  const errors: string[] = [];
  if (!g.slug || !/^[a-z0-9-]+$/.test(g.slug)) errors.push(`invalid slug "${g.slug}"`);
  if (!g.title) errors.push(`${g.slug}: title required`);
  if (!g.metaDescription) errors.push(`${g.slug}: metaDescription required`);
  if (!fieldGuideCategories.some((c) => c.slug === g.category)) {
    errors.push(`${g.slug}: invalid category "${g.category}"`);
  }
  if (g.actions.length === 0 || g.actions.length > 3) {
    errors.push(`${g.slug}: must have 1–3 actions (has ${g.actions.length})`);
  }
  if (!g.whyItHappens && !g.metricsSection) {
    errors.push(`${g.slug}: must have either whyItHappens or metricsSection`);
  }
  if (g.whyItHappens && (g.whyItHappens.length < 2 || g.whyItHappens.length > 4)) {
    errors.push(`${g.slug}: whyItHappens should have 2–4 concepts (has ${g.whyItHappens.length})`);
  }
  if (g.metricsSection && g.metricsSection.metrics.length < 2) {
    errors.push(`${g.slug}: metricsSection should have at least 2 metrics`);
  }
  if (g.readTimeMinutes !== undefined && (g.readTimeMinutes < 1 || g.readTimeMinutes > 6)) {
    errors.push(`${g.slug}: readTimeMinutes out of realistic 1–6 range`);
  }
  if (errors.length) throw new Error(`Field Guide validation failed:\n${errors.join('\n')}`);
}

function assertUniqueSlugs(list: FieldGuide[]): void {
  const seen = new Set<string>();
  for (const g of list) {
    if (seen.has(g.slug)) throw new Error(`Duplicate field guide slug: "${g.slug}"`);
    seen.add(g.slug);
  }
}

// ── Read time (Part 34) ──
// Approximates the word count from every prose field a guide renders.
// Manual `readTimeMinutes` always wins when present.
export function getReadTime(g: FieldGuide): number {
  if (g.readTimeMinutes) return g.readTimeMinutes;
  const words = [
    g.problem,
    g.frameworkIntro,
    ...(g.whyItHappens?.map((c) => c.detail) ?? []),
    ...(g.metricsSection?.metrics.map((m) => m.detail) ?? []),
    ...(g.frameworkQuestions?.map((q) => q.question) ?? []),
    g.keyPrinciple?.statement ?? '',
    g.keyPrinciple?.supporting ?? '',
    ...g.actions.map((a) => a.detail),
    g.nextStepSupporting,
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length;
  return Math.min(5, Math.max(2, Math.round(words / 200)));
}

// ── Published Field Guides (Phase 4A) ──
const publishedGuides: FieldGuide[] = [
  {
    slug: 'why-more-leads-wont-fix-growth',
    title: "Why More Leads Won't Fix a Broken Home Service Growth System",
    shortTitle: "Why More Leads Won't Fix Growth",
    category: 'revenue-intelligence',
    premise: 'Before increasing ad spend, find where your existing opportunities stop becoming booked revenue.',
    readTimeMinutes: 3,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Phase 4G: homepage flagship (Task A migration — preserves the
    // Phase 4F selection exactly); not in the hub's featured row, which
    // deliberately showcases different guides than the homepage (Task A).
    featuredOnHomepage: true,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'Why More Home Service Leads Won’t Fix a Broken Growth System | Lusso Media',
    metaDescription:
      "More leads don't always mean more booked jobs. Learn how to identify where your home-service growth system is leaking before increasing ad spend.",
    ogImageAlt: "Lusso Media Field Guide — Why More Leads Won't Fix a Broken Home Service Growth System",

    problem:
      'When growth slows, "we need more leads" is the easiest diagnosis to reach for. Sometimes it’s correct. But a lead problem and a conversion problem are not the same thing, and they don’t have the same fix. If leads are already entering the business — but response is slow, qualification is inconsistent, estimates go unfollowed, sales conversations are weak, or nobody actually knows the close rate — then more traffic just enters the same system and produces the same result, faster. Before increasing ad spend, first identify where the system is actually constrained.',

    seeIt: {
      type: 'leakMap',
      stages: ['Attention', 'Lead', 'Contacted', 'Qualified', 'Estimate', 'Booked Job', 'Revenue'],
      leakIndexes: [2, 4],
    },
    seeItCaption: 'More traffic enters at the top. Revenue only comes out at the bottom.',
    illustrativeExample: {
      note: 'Illustrative example — hypothetical numbers for illustration only, not an industry benchmark.',
      visual: {
        type: 'funnel',
        stages: ['100 Inquiries', '82 Reached', '55 Qualified', '34 Estimates', '14 Jobs'],
      },
    },

    whyItHappens: [
      {
        label: 'Lead count is easy to see',
        detail: 'Ad platforms make lead volume obvious. Downstream conversion is often harder to measure.',
      },
      {
        label: 'The handoff is invisible',
        detail:
          'Marketing may generate the opportunity, but revenue depends on what happens afterward — response, qualification, estimating, follow-up, and sales execution all matter.',
      },
      {
        label: 'More volume feels like the simple fix',
        detail:
          'Increasing advertising is easier than diagnosing an operating constraint. But increasing inputs does not automatically repair the system processing those inputs.',
      },
    ],

    frameworkIntro: "Lusso calls this the lead-to-booked-job chain — and it's the same sequence behind every home-service growth system, regardless of trade.",
    framework: {
      type: 'framework',
      terms: ['Demand', 'Capture', 'Qualify', 'Respond', 'Estimate', 'Close', 'Revenue'],
      connector: '→',
    },
    frameworkQuestions: [
      { stage: 'Demand', question: 'Are enough qualified people entering the system?' },
      { stage: 'Capture', question: 'Are visitors becoming identifiable opportunities?' },
      { stage: 'Qualify', question: 'Are the right prospects moving forward?' },
      { stage: 'Respond', question: 'Is the team reaching them consistently and quickly?' },
      { stage: 'Estimate', question: 'Are qualified prospects getting to the next sales step?' },
      { stage: 'Close', question: 'Are estimates turning into customers?' },
      { stage: 'Revenue', question: 'Do we know which opportunities produced business?' },
    ],
    keyPrinciple: {
      statement: "Don't increase traffic until you know what happens to the traffic you already have.",
      supporting: 'If demand is the constraint, increase demand. If something else is broken, repair that first.',
    },

    actions: [
      {
        title: 'Map your last 30 days.',
        detail: 'Count leads/inquiries, contacted, qualified, estimates, and booked jobs — use whatever data you currently have.',
      },
      {
        title: 'Find the biggest drop.',
        detail: 'Look for the stage where the largest share of opportunities disappears. Do not assume the issue is marketing.',
      },
      {
        title: 'Fix one constraint first.',
        detail:
          'Choose the highest-leverage leak and improve it before automatically increasing traffic — response, qualification, follow-up, offer, landing page, or demand.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'Find My Biggest Growth Leak',
    nextStepHeadline: 'Not Sure Where the Constraint Is?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the major parts of your growth system and helps identify where your biggest opportunity may be.',

    // Field Guide #2 doesn't exist yet — relatedGuideSlugs intentionally
    // empty rather than pointing at the dev-only demo guides (Part 25:
    // "do not create dead related links"). Deep Guide cross-link instead.
    // Phase 4B: Guide #2 exists now and is a genuine next step from this
    // guide's diagnosis, not a mechanical reciprocal link.
    // Phase 4E: Guide #5 is the natural "now build the scoreboard" next
    // step once a reader has diagnosed that visibility is the gap.
    relatedGuideSlugs: ['focused-home-service-campaign', 'lead-to-booked-job-system'],
    relatedDeepGuideSlugs: ['how-to-qualify-home-service-leads', 'speed-to-lead-for-contractors'],
  },
  {
    slug: 'focused-home-service-campaign',
    title: 'How to Build a Focused Home Service Campaign',
    shortTitle: 'Build a Focused Campaign',
    category: 'offer-engineering',
    premise: "Your business can offer everything. Your campaign shouldn't advertise everything at once.",
    readTimeMinutes: 3,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Public Framework Originality Audit — retitled and re-slugged from
    // "one-market-one-service-one-offer" (see /docs/public-framework-
    // originality-audit.md, Change 4). 301 redirect in next.config.ts.
    // Phase 4G: homepage flagship (preserved from Phase 4F) and part of
    // the hub's featured set (Option B — Offer Engineering representation).
    featuredOnHomepage: true,
    featuredOnHub: true,
    draft: false,
    metaTitle: 'How to Build a Focused Home Service Campaign | Lusso Media',
    metaDescription:
      'Learn why focused home-service campaigns outperform diluted messaging, and how to align your target customer, service, problem, offer, and next step.',
    ogImageAlt: 'Lusso Media Field Guide — How to Build a Focused Home Service Campaign',

    problem:
      'Home-service owners often assume that advertising more services increases the chance someone will respond. In practice, it usually creates the opposite problem. When one ad or landing page talks about repairs, replacements, maintenance, financing, and several audiences at once, the prospect has to work out something the campaign should have already answered: is this actually for me? Every extra service or offer folded into one message adds a decision the visitor has to make before they\'ll act — and most people don\'t make it. Focus the campaign before you increase the volume.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Too Many Decisions',
      beforeItems: [
        'Plumbing repair',
        'Water heaters',
        'Water softeners',
        'Drain cleaning',
        'Repiping',
        'Maintenance',
        'Generic "Contact Us" CTA',
      ],
      afterLabel: 'One Clear Path',
      afterItems: [
        'Southern Utah homeowners',
        'Hard water',
        'Water softener installation',
        'A specific offer',
        '"See If Your Home Qualifies"',
      ],
    },
    seeItCaption: 'The service list didn\'t get smaller. The campaign got clearer.',
    secondaryVisual: {
      label: 'How One Decision Flows Into the Next',
      visual: {
        type: 'funnel',
        stages: ['Target Customer', 'Priority Service', 'Buying Problem', 'Offer', 'Next Step'],
      },
    },

    whyItHappens: [
      {
        label: 'Businesses think in services',
        detail:
          'The owner sees the entire company — every truck, technician, service, and capability. The customer usually enters the market because of one immediate problem or desired outcome.',
      },
      {
        label: 'More options feel safer',
        detail:
          "Owners often fear narrowing the message means losing opportunities. But campaign focus doesn't remove other services from the business — it just makes one advertisement easier to understand.",
      },
      {
        label: 'Generic messaging is hard to measure',
        detail:
          "If one campaign sells everything, it's hard to know which service created demand, which offer worked, or where budget should increase. Concentration makes the customer journey and the data easier to interpret.",
      },
    ],

    frameworkIntro:
      'Lusso builds every acquisition campaign around five connected decisions — the Focused Campaign Chain — each one carrying into the next until a single, clear action remains.',
    framework: {
      type: 'framework',
      terms: ['Target Customer', 'Priority Service', 'Buying Problem', 'Offer', 'Next Step'],
      connector: '→',
    },
    frameworkQuestions: [
      {
        stage: 'Target Customer',
        question: 'Who specifically are we trying to reach? "Southern Utah homeowners dealing with hard water" — not "everyone who may need plumbing someday."',
      },
      {
        stage: 'Priority Service',
        question: 'What type of work are we intentionally creating demand for? Example: water softener installation.',
      },
      {
        stage: 'Buying Problem',
        question: 'What situation, frustration, or desired change makes the service relevant? Example: recurring hard-water buildup and frustration.',
      },
      {
        stage: 'Offer',
        question: 'Why should this customer choose to move forward with this opportunity? The offer should increase perceived value, not just restate the service.',
      },
      {
        stage: 'Next Step',
        question: 'What is the single primary action we want them to take? One action — e.g. "See If Your Home Qualifies" — not five simultaneous options.',
      },
    ],
    keyPrinciple: {
      statement: 'The company can be broad. The campaign should be narrow.',
      supporting: 'Focus does not limit what the business sells. It clarifies what the prospect is being asked to buy next.',
    },
    example: {
      label: 'Example — a plumbing company that offers everything',
      rows: [
        { label: 'Target Customer', value: 'Southern Utah homeowner' },
        { label: 'Priority Service', value: 'Water softener installation' },
        { label: 'Buying Problem', value: 'Hard-water frustration' },
        { label: 'Offer', value: 'Installation-focused value package' },
        { label: 'Next Step', value: 'Check eligibility' },
      ],
    },

    actions: [
      {
        title: 'Pick one economic opportunity.',
        detail: 'Choose one service using average ticket, margin, demand, fulfillment capacity, and strategic priority — not simply the easiest service to advertise.',
      },
      {
        title: 'Write one sentence.',
        detail: 'Complete: "We are helping [market] solve [problem] with [service] through [offer]." If it needs several markets, services, problems, or offers, the campaign may still be too broad.',
      },
      {
        title: 'Audit the conversion path.',
        detail: 'Follow your current ad through to the next step. Does every page continue the same promise and move toward the same primary action? If not, find where the message breaks.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'How Focused Is Your Growth System?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the offer, conversion path, authority, demand, and other components behind local growth.',

    // Field Guide #1 diagnoses the constraint; this guide explains how to
    // concentrate one acquisition campaign — a genuine next step, not a
    // mechanical reciprocal link. No existing Deep Guide targets this
    // intent closely enough to warrant a cross-link (Phase 4B review).
    // Phase 4C: Guide #3 goes deeper on this guide's "One Offer" component,
    // so it's added here too — again a real relationship, not reciprocity
    // for its own sake.
    relatedGuideSlugs: ['why-more-leads-wont-fix-growth', 'why-10-percent-off-isnt-an-offer'],
  },
  {
    // Field Guide #3.
    slug: 'why-10-percent-off-isnt-an-offer',
    title: 'Why "10% Off" Isn’t a Home Service Offer',
    shortTitle: '"10% Off" Isn’t an Offer',
    category: 'offer-engineering',
    premise: "Lowering the price doesn't automatically make the decision easier. A strong offer increases the value of saying yes.",
    readTimeMinutes: 3,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Phase 4F: no longer one of the 3 homepage-featured guides (swapped
    // for Guide #5 to better represent the breadth of Lusso's operating
    // philosophy) — still fully published, indexed, and linked; unchanged
    // everywhere else. See docs/phase-4f-guide-6.md.
    // Phase 4G: also not in the hub's independently-curated featured set
    // (see docs/phase-4g-guide-7.md) — still fully published, indexed,
    // linked, and shown in its Offer Engineering category cluster.
    featuredOnHomepage: false,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'Why 10% Off Isn’t a Home Service Offer | Lusso Media',
    metaDescription:
      'A discount changes price, but a strong home-service offer improves value, certainty, convenience, and the reason to act.',
    ogImageAlt: 'Lusso Media Field Guide — Why "10% Off" Isn’t a Home Service Offer',

    problem:
      'When contractors need more response, the default move is often to lower the price — 10% off, $250 off, a spring special. That can feel like an offer, but it usually only answers one part of the buying decision. The homeowner may still be asking: why this company, why this service, why now, will this actually solve my problem, what happens after I submit the form, and what am I risking if it doesn’t work out? Changing the price answers none of those questions directly. Build the decision around value, not just a lower number.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Price Changed',
      beforeItems: ['Water Softener Installation', '10% Off', 'Call Today'],
      afterLabel: 'Decision Changed',
      afterItems: [
        'Specific homeowner problem',
        'Clear desired outcome',
        'Professional diagnosis / process',
        'Proof + certainty',
        'Value components',
        'Clear next step',
      ],
    },
    seeItCaption: 'A discount changes one variable. An offer changes the entire buying proposition.',

    whyItHappens: [
      {
        label: 'Price is easy to change',
        detail:
          'Reducing price takes seconds. Improving the buying proposition means thinking through customer concerns, differentiation, process, proof, risk, and convenience.',
      },
      {
        label: 'Contractors often sell the service',
        detail:
          'The company describes equipment, labor, materials, and technical specs. The homeowner is usually buying relief, confidence, convenience, protection, or certainty — the offer should bridge that gap.',
      },
      {
        label: 'Discounts are easy to copy',
        detail:
          'If the core message is "10% off," a competitor can respond with "15% off." Differentiation built around the actual experience, proof, process, and outcome is harder to reduce to a price comparison.',
      },
    ],

    // Public Framework Originality Audit, Change 1 — the previous framework
    // ("Outcome ↑ + Certainty ↑ + Time/Friction ↓ + Effort/Risk ↓ + Reason
    // to Act") was a cosmetic relabeling of Hormozi's Value Equation. This
    // is a genuinely independent six-driver diagnostic, not a renamed
    // four-variable formula: no addition, no ↑/↓ notation, no equation
    // framing anywhere in the section. See /docs/public-framework-
    // originality-audit.md.
    frameworkSectionTitle: 'What Makes an Offer Easier to Say Yes To?',
    frameworkIntro:
      "When we pressure-test a home-service offer, we evaluate six parts of the buying decision. A strong offer doesn't rely on one gimmick or discount — it makes the right customer's decision clearer, more credible, and easier to act on.",
    // Rendered as six numbered diagnostic blocks (Timeline's existing
    // presentation), deliberately not the `framework` visual — there is no
    // connector, multiplication, or equation-style layout here.
    framework: {
      type: 'timeline',
      steps: [
        {
          label: 'Customer Priority',
          detail: 'Does the problem or desired result matter enough to this customer? An offer cannot manufacture importance where little exists.',
        },
        {
          label: 'Service Fit',
          detail: 'Are we presenting the right solution to the right homeowner? A strong proposition begins with alignment between customer, problem, property, service, and market.',
        },
        {
          label: 'Proof & Confidence',
          detail: 'What gives the homeowner a credible reason to believe this contractor can deliver? Relevant completed work, reviews, process, expertise, and warranties where legitimate all build this.',
        },
        {
          label: 'Ease to Start',
          detail: 'Is the next step obvious, understandable, and reasonably simple? Clear qualification, an understandable process, and simple scheduling remove hesitation.',
        },
        {
          label: 'Risk & Uncertainty',
          detail: 'What concerns, ambiguity, or perceived downside could stop the decision? An unclear price process, scheduling uncertainty, or confusing next steps all raise it.',
        },
        {
          label: 'Reason to Act',
          detail: "Is there a legitimate reason to solve the problem now rather than indefinitely postpone it? Don't manufacture urgency — use a real one.",
        },
      ],
    },
    secondaryVisual: {
      label: 'Offer Decision Check',
      visual: {
        type: 'scorecard',
        statusLabels: { pass: 'Strong', warn: 'Needs Work' },
        items: [
          { question: 'Customer priority — does this matter enough to them?', status: 'warn' },
          { question: 'Service fit — is this the right solution for this homeowner?', status: 'warn' },
          { question: 'Proof & confidence — do they have a reason to believe you?', status: 'warn' },
          { question: 'Ease to start — is the next step simple?', status: 'warn' },
          { question: 'Risk & uncertainty — is anything holding them back?', status: 'warn' },
          { question: 'Reason to act — is there a legitimate reason to move now?', status: 'warn' },
        ],
      },
    },
    interpretationNote:
      "This is a planning diagnostic Lusso uses internally — not a validated psychometric model. If more than one or two of these come back Needs Work, the offer is likely leaning on price instead of the buying decision.",
    keyPrinciple: {
      statement: 'A discount asks, "How much less?" An offer asks, "Why is this worth choosing?"',
      supporting: 'Price can strengthen an offer. It should not have to carry the entire offer.',
    },
    example: {
      label: 'Weak vs. Stronger Offer Construction',
      rows: [
        { label: 'Weak', value: '"$250 Off Water Softener Installation" — only changes price' },
        { label: 'Professional assessment', value: 'Included before install' },
        { label: 'Clear installation outcome', value: 'Soft water throughout the home, defined timeline' },
        { label: 'Verified local proof', value: 'Reviews / completed installs' },
        { label: 'Defined service process', value: 'Diagnosis → recommendation → install → follow-up' },
        { label: 'Relevant added value', value: 'E.g. a water quality test included' },
        { label: 'Clear next step', value: '"Check Eligibility" or similar' },
      ],
    },

    actions: [
      {
        title: 'Remove the discount temporarily.',
        detail: 'Write your current offer without mentioning price. Ask: is there still a compelling reason to choose us? If not, the discount may be carrying too much of the proposition.',
      },
      {
        title: 'Add certainty.',
        detail: 'Choose one legitimate way to increase confidence — proof, reviews, process, warranty, expertise, or project examples. Only use what the business actually has.',
      },
      {
        title: 'Reduce one piece of friction.',
        detail: 'Make the buying process easier — clearer qualification, a simpler next step, or a defined timeline. Do not automatically reduce price.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'How Strong Is the Rest of Your Growth System?',
    nextStepSupporting:
      'An offer is only one part of local growth. The 2-minute Local Dominance Score evaluates the broader system around demand, conversion, authority, reputation, and revenue.',

    // Guide #2 is the natural predecessor (this guide goes deeper on its
    // "One Offer" component); Guide #1's diagnostic framing is also a
    // genuinely useful next/prior step, not forced reciprocity.
    relatedGuideSlugs: ['focused-home-service-campaign', 'why-more-leads-wont-fix-growth'],
  },
  {
    slug: 'stop-sending-paid-traffic-to-your-homepage',
    title: 'Stop Sending Paid Traffic to Your Homepage',
    shortTitle: 'Stop Sending Traffic to Your Homepage',
    category: 'conversion-infrastructure',
    premise: 'Your homepage has to explain the entire company. A campaign page only has to move one prospect toward one next step.',
    readTimeMinutes: 3,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser (Phase 4D — brief said not to
    // automatically expand/alter it; see docs/phase-4d-guide-4.md).
    // Phase 4G: part of the hub's independently-curated featured set —
    // Conversion Infrastructure representation (see docs/phase-4g-guide-7.md).
    featuredOnHomepage: false,
    featuredOnHub: true,
    draft: false,
    metaTitle: 'Stop Sending Home Service Ad Traffic to Your Homepage | Lusso Media',
    metaDescription:
      'A specific home-service ad needs a focused next step. Learn how to maintain message continuity from ad click to proof, qualification, and conversion.',
    ogImageAlt: 'Lusso Media Field Guide — Stop Sending Paid Traffic to Your Homepage',

    problem:
      'A homeowner clicks an ad because something specific caught their attention — "Hard-water problems? See if your home qualifies for a water-softener installation." Then they land on a homepage covering plumbing repairs, water heaters, construction, drain cleaning, company history, careers, several navigation options, and multiple competing CTAs. The advertisement created one intent. The homepage reopened every possible decision, and the visitor has to reconnect the dots themselves — or leave. The destination should continue the conversation the ad already started.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Message Break',
      beforeItems: [
        'Full services list',
        'Company history & careers',
        'Several navigation exits',
        'Multiple competing CTAs',
        'Visitor decides what to do',
      ],
      afterLabel: 'Message Continuity',
      afterItems: ['Problem', 'Offer', 'Proof', 'Qualification', 'One primary CTA'],
    },
    seeItCaption: 'Every extra decision between the click and the intended action creates additional friction.',
    secondaryVisual: {
      label: 'The Visitor’s Internal Monologue',
      visual: {
        type: 'funnel',
        stages: [
          '"What caught my attention?"',
          '"Am I in the right place?"',
          '"Can I trust this?"',
          '"Is this for me?"',
          '"What happens next?"',
        ],
      },
    },

    whyItHappens: [
      {
        label: 'The homepage has a different job',
        detail:
          "It has to introduce the company, multiple services, positioning, proof, navigation, and every visitor intent at once. It can't always prioritize one specific campaign objective.",
      },
      {
        label: 'The ad created an expectation',
        detail:
          'If the ad discusses water softener installation, the destination should immediately confirm you\'re in the right place. If the page suddenly talks broadly about plumbing, the prospect has to reconnect the message themselves.',
      },
      {
        label: 'Too many paths make measurement harder',
        detail:
          'A campaign destination with several services, several CTAs, and navigation exits can make it harder to understand what happened after the click — for the prospect and for the business measuring performance.',
      },
    ],

    frameworkIntro: 'Lusso builds every campaign destination as a continuation of the click, not a fresh introduction to the company.',
    framework: {
      type: 'framework',
      terms: ['Ad Promise', 'Page Promise', 'Proof', 'Qualification', 'Next Step'],
      connector: '→',
    },
    frameworkQuestions: [
      { stage: 'Ad Promise', question: 'What specific problem, desire, service, or offer earned the click?' },
      { stage: 'Page Promise', question: 'Does the destination immediately continue that same message?' },
      { stage: 'Proof', question: 'Why should the visitor believe the company can deliver?' },
      { stage: 'Qualification', question: 'Is this the right prospect, property, need, market, or project?' },
      {
        stage: 'Next Step',
        question: 'What one action should happen next — check eligibility, request a consultation, schedule an assessment — not automatically "Contact Us."',
      },
    ],
    keyPrinciple: {
      statement: "The click shouldn't start a new conversation.",
      supporting: 'The landing page should continue the one the advertisement already started.',
    },
    example: {
      label: 'Example — a water softener campaign',
      rows: [
        { label: 'Ad', value: '"Tired of recurring hard-water buildup?"' },
        { label: 'Homepage destination', value: 'Generic plumbing homepage — visitor has to search for the water-treatment path again' },
        { label: 'Focused destination', value: 'Same problem, then symptoms, solution, local proof, process, qualification, one CTA' },
      ],
    },

    actions: [
      {
        title: 'Click your own ad.',
        detail: 'Follow the exact customer journey from advertisement to destination. Does the first screen continue the same problem, service, and promise?',
      },
      {
        title: 'Count the decisions.',
        detail: "Look at the destination — how many services, CTAs, navigation choices, and competing offers are being presented? Identify anything unrelated to the campaign's primary objective. Audit first; don't remove navigation globally.",
      },
      {
        title: 'Build one continuous path.',
        detail: 'For your highest-priority campaign, align Ad → Landing Page → Proof → Qualification → CTA so each step feels like the logical continuation of the one before it.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Is Your Website Turning Demand Into Opportunity?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the conversion, offer, authority, demand, reputation, and revenue systems behind local growth.',

    // Guide #2 (campaign focus precedes destination focus) and Guide #1
    // (weak conversion infrastructure is a common downstream constraint)
    // are both genuine relationships. Guide #3 intentionally excluded —
    // no direct path improvement from linking it here (Phase 4D review).
    relatedGuideSlugs: ['focused-home-service-campaign', 'why-more-leads-wont-fix-growth'],
  },
  {
    slug: 'lead-to-booked-job-system',
    title: 'The Lead-to-Booked-Job System',
    shortTitle: 'The Lead-to-Booked-Job System',
    category: 'revenue-intelligence',
    premise: 'Generating the lead is only the first handoff. Growth becomes manageable when you can see what happens between inquiry and revenue.',
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Phase 4F: now one of the 3 homepage-featured guides, swapped in for
    // Guide #3 (see docs/phase-4f-guide-6.md) — the Phase 4E recommendation
    // was acted on in Phase 4F once explicitly instructed.
    // Phase 4G: not part of the hub's independently-curated featured set —
    // Revenue Intelligence is already represented there by Guide #1, and
    // the homepage/hub rows are deliberately kept non-identical.
    featuredOnHomepage: true,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'The Lead-to-Booked-Job System for Home Service Businesses | Lusso Media',
    metaDescription:
      'Track what happens after a lead comes in. Learn the key stages from contact and qualification through estimates, booked jobs, and revenue.',
    ogImageAlt: 'Lusso Media Field Guide — The Lead-to-Booked-Job System',

    // Deliberately a measurement/visibility framing, not a repeat of Guide
    // #1's diagnostic framing (Phase 4E cannibalization requirement) — this
    // guide never asks "where is the constraint," only "can you see the
    // stages well enough to find one."
    problem:
      'Advertising dashboards make the top of the funnel easy to see: 47 leads, $86 cost per lead. But that same business may not know how many of those leads were actually reached, how many fit the job, how many received an estimate, how many were followed up, how many closed, or what revenue resulted. That means marketing performance is being evaluated before the business outcome is even known. The lead count tells you what entered the system. The downstream stages tell you what the system did with it.',

    seeIt: {
      type: 'funnel',
      stages: ['Lead', 'Contacted', 'Qualified', 'Estimate', 'Followed Up', 'Booked Job', 'Revenue'],
    },
    illustrativeExample: {
      note: 'Illustrative example — hypothetical numbers for illustration only, not an industry benchmark.',
      visual: {
        type: 'funnel',
        stages: ['60 Leads', '49 Contacted', '35 Qualified', '24 Estimates', '21 Followed Up', '10 Booked Jobs'],
      },
      conclusion: 'Without the stages in between, "60 leads" tells only a small part of the story.',
    },

    // Section 03 — replaces "Why It Happens" with the 7 numbers to know
    // (Phase 4E), an editorial numbered sequence rather than seven cards.
    metricsSection: {
      title: 'The 7 Numbers to Know',
      metrics: [
        { label: 'Leads', detail: 'How many new opportunities entered the business? A lead should have a consistent internal definition.' },
        { label: 'Contact Rate', detail: 'Of the incoming opportunities, how many did the team actually reach?', formula: 'Contacted ÷ Leads' },
        { label: 'Qualification Rate', detail: 'How many reached prospects actually fit the service, geography, budget, project, and timing?', formula: 'Qualified ÷ Contacted' },
        { label: 'Estimate / Appointment Rate', detail: 'How many qualified prospects reached the meaningful sales step — an estimate, inspection, consultation, or design meeting?', formula: 'Estimates ÷ Qualified' },
        { label: 'Follow-Up Rate', detail: 'How many open opportunities actually received the required follow-up? This is operational, not purely marketing.' },
        { label: 'Close Rate', detail: 'How many qualified estimates or opportunities became customers?', formula: 'Booked Jobs ÷ Estimates' },
        { label: 'Revenue per Lead', detail: 'How much actual booked revenue did the original lead volume produce? Revenue is not the same as gross profit.', formula: 'Booked Revenue ÷ Leads' },
      ],
    },

    frameworkIntro: 'Each stage in the operating chain has an owner, an action, and a measurable result.',
    framework: {
      type: 'framework',
      terms: ['Acquire', 'Respond', 'Qualify', 'Sell', 'Follow Up', 'Close', 'Measure'],
      connector: '→',
    },
    // Three generic operating questions applied to the framework as a
    // whole (Phase 4E) — not one question per stage, matching the brief.
    frameworkQuestions: [
      { stage: 'Who Owns It?', question: 'Someone should be accountable for the handoff.' },
      { stage: 'What Happens Next?', question: 'The next action should be defined.' },
      { stage: 'How Do We Know?', question: 'The result should be measurable.' },
    ],
    secondaryVisual: {
      label: 'Who Owns Each Handoff',
      visual: {
        type: 'timeline',
        steps: [
          { label: 'Advertising', detail: 'Lead generated' },
          { label: 'Front Office / Sales', detail: 'Response + qualification' },
          { label: 'Estimating', detail: 'Opportunity evaluated' },
          { label: 'Follow-Up', detail: 'Decision supported' },
          { label: 'Operations', detail: 'Job booked / delivered' },
          { label: 'Reporting', detail: 'Revenue attributed' },
        ],
      },
    },
    keyPrinciple: {
      statement: 'Marketing can create the opportunity. The business still has to convert it.',
      supporting: 'Advertising performance and sales performance meet in the same customer journey.',
    },

    actions: [
      {
        title: 'Build the scoreboard.',
        detail: 'For the last 30 days, record leads, contacted, qualified, estimates/appointments, booked jobs, and booked revenue. Include follow-up if you can measure it reliably. Start with what is available.',
      },
      {
        title: 'Calculate the handoff rates.',
        detail: 'Measure the percentage moving from each stage to the next — Contacted ÷ Leads, Qualified ÷ Contacted, Booked Jobs ÷ Estimates. Compare first against your own baseline, not internet benchmarks.',
      },
      {
        title: 'Assign the next action.',
        detail: 'For every open opportunity, make sure someone knows who owns it, what happens next, and when — so nothing exists in an undefined state.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'Find My Biggest Growth Leak',
    nextStepHeadline: 'Can You See Where Growth Is Breaking Down?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the systems behind demand, conversion, authority, reputation, and revenue — not just lead volume.',

    // Guide #1 is the diagnostic predecessor (this guide is what you build
    // once you know visibility is the gap); Guide #4 is a genuine
    // conversion-infrastructure relationship. Guide #2 excluded — no
    // direct, non-mechanical reason to link a campaign-focus guide here.
    relatedGuideSlugs: ['why-more-leads-wont-fix-growth', 'stop-sending-paid-traffic-to-your-homepage'],
  },
  {
    // Public Framework Originality Audit, Change 3 — re-slugged and rebuilt
    // from "home-service-advertising-awareness-levels" (see /docs/public-
    // framework-originality-audit.md). The prior guide presented Schwartz's
    // Awareness Levels taxonomy (Unaware / Problem Aware / Solution Aware /
    // Product Aware / Most Aware) essentially unchanged. This guide keeps
    // only the underlying insight — different prospects need different
    // information before acting — and replaces the taxonomy with an
    // independent buyer-readiness progression and message-job ladder. 301
    // redirect in next.config.ts.
    slug: 'home-service-buyer-readiness',
    title: 'Match the Message to Buyer Readiness',
    shortTitle: 'Match the Message to Buyer Readiness',
    category: 'demand-advertising',
    premise: "A homeowner who hasn't recognized the problem needs a different message than one already comparing providers.",
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser (Phase 4F). Phase 4G: also not in the
    // hub's featured set — Demand & Advertising is a strong category but
    // the hub's 3 slots went to Offer Engineering, Conversion
    // Infrastructure, and Authority & Reputation instead (see
    // docs/phase-4g-guide-7.md); still fully discoverable in its own
    // category section.
    featuredOnHomepage: false,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'Match the Message to Buyer Readiness | Lusso Media',
    metaDescription:
      'Different homeowners need different information before they act. Learn the five buyer-readiness stages and how to adapt home-service advertising message by message.',
    ogImageAlt: 'Lusso Media Field Guide — Match the Message to Buyer Readiness',

    problem:
      'Many home-service campaigns use one message for every prospect: "Need [service]? Call today." That can work for someone already looking for the service. But another homeowner may only notice a symptom, understand the problem but not the solution, know solutions exist but not know your company, or already know your company and simply need a reason to act. Those are different conversations. Before writing the ad, determine what the homeowner needs to hear next.',

    // A home-service buyer-readiness progression — independent of, and
    // deliberately not placed alongside, any external awareness taxonomy.
    // Each stage: the situation the homeowner is in + one concise example.
    seeIt: {
      type: 'timeline',
      steps: [
        { label: 'Notices the Symptom', detail: '"Why do your faucets look clean — then develop white buildup again a few days later?" The homeowner notices something is off but may not understand the underlying problem yet.' },
        { label: 'Understands the Problem', detail: '"If mineral deposits keep returning, the issue may be the water entering the home — not the cleaning product." Connect symptom to cause to consequence, without exaggerating fear.' },
        { label: 'Explores Options', detail: 'The homeowner understands that solutions exist and wants to know the available approaches, tradeoffs, process, and expected next steps.' },
        { label: 'Compares Providers', detail: 'The homeowner is evaluating companies, proof, process, reviews, experience, warranties, and fit.' },
        { label: 'Ready to Move', detail: 'The homeowner largely understands the problem, the service, and the provider. The campaign should make the next step clear and reduce unnecessary friction.' },
      ],
    },

    whyItHappens: [
      {
        label: 'Different people are at different points',
        detail: 'One homeowner may just be noticing a symptom. Another may already have three estimates. They shouldn\'t necessarily receive identical messages.',
      },
      {
        label: 'Direct offers require existing understanding',
        detail: 'A strong "Book Now" message works when the homeowner already understands the problem and the solution — it can be premature for someone who doesn\'t yet recognize why the service matters.',
      },
      {
        label: 'Creative variety isn\'t message variety',
        detail: "Changing the camera angle, background, music, or editing doesn't automatically create a new advertising angle. The underlying message has to change too.",
      },
    ],

    frameworkIntro: 'Lusso maps each buyer-readiness stage to one job the message has to do — the Message Ladder.',
    framework: {
      type: 'framework',
      terms: ['Recognize', 'Clarify', 'Evaluate', 'Trust', 'Act'],
      connector: '→',
    },
    frameworkQuestions: [
      { stage: 'Recognize', question: 'Notices the Symptom — help the homeowner recognize the situation.' },
      { stage: 'Clarify', question: 'Understands the Problem — explain what is actually happening and why it matters.' },
      { stage: 'Evaluate', question: 'Explores Options — introduce the approach and what evaluating it involves.' },
      { stage: 'Trust', question: 'Compares Providers — build confidence in this company specifically.' },
      { stage: 'Act', question: 'Ready to Move — give a clear reason and a simple path to move forward.' },
    ],
    keyPrinciple: {
      statement: "Don't ask the ad to sell more than the homeowner is ready to understand.",
      supporting: 'The job of the message is to move the homeowner one step closer to the decision.',
    },
    // "Same Service, Five Messages" — the guide's strongest section,
    // reusing the Timeline primitive rather than a new one-off component.
    secondaryVisual: {
      label: 'Same Service, Five Messages — HVAC Replacement',
      visual: {
        type: 'timeline',
        steps: [
          { label: 'Notices the Symptom', detail: '"Why does one side of your house stay warmer even when the AC keeps running?"' },
          { label: 'Understands the Problem', detail: '"If your system runs constantly but comfort keeps getting worse, the issue may be bigger than the thermostat."' },
          { label: 'Explores Options', detail: '"Repair or replace? Here\'s what should be evaluated before deciding."' },
          { label: 'Compares Providers', detail: '"See how our replacement process works — from system sizing through installation and final walkthrough."' },
          { label: 'Ready to Move', detail: '"Ready to replace your system? Check current consultation availability."' },
        ],
      },
    },
    // Retargeting connection, using the reusable label/value `example`
    // slot rather than a new component. Framed as engagement stages, not
    // as movement through an awareness taxonomy.
    example: {
      label: 'What Retargeting Should Say Next',
      rows: [
        { label: 'First interaction', value: 'Problem education' },
        { label: 'Engaged visitor', value: 'Proof / mechanism' },
        { label: 'Returning prospect', value: 'Objection handling' },
        { label: 'High intent', value: 'Offer / next step' },
      ],
    },

    actions: [
      {
        title: 'Label your current ads.',
        detail: 'For each active creative, ask which readiness stage it\'s actually written for. If every ad has the same answer, you may not be covering enough of the customer journey.',
      },
      {
        title: 'Create one new message.',
        detail: "Choose one different readiness stage. Don't simply reshoot the current ad — change the hook, message, proof, and objective to match what that homeowner needs to hear next.",
      },
      {
        title: 'Change your retargeting message.',
        detail: 'If someone already watched, clicked, visited, or engaged, avoid showing the exact same introduction indefinitely. Give them the next useful piece of information.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Is Your Marketing Meeting the Market Where It Is?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the offer, authority, demand, conversion, reputation, and revenue systems behind local growth.',

    // Guide #2 (focus the campaign first) and Guide #3 (the offer matters
    // most once the homeowner is Ready to Move) are both genuine, specific
    // relationships called out in the brief. Guide #4 intentionally left
    // out to avoid over-linking.
    relatedGuideSlugs: ['focused-home-service-campaign', 'why-10-percent-off-isnt-an-offer'],
  },
  {
    slug: 'job-to-authority-flywheel',
    title: 'The Job-to-Authority Flywheel',
    shortTitle: 'The Job-to-Authority Flywheel',
    category: 'authority-reputation',
    premise: "A completed job shouldn't only create revenue. It should create proof that helps win the next one.",
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser (brief says do not add it). Part of the
    // hub's independently-curated featured set — Authority & Reputation
    // representation (Phase 4G, Task A). See docs/phase-4g-guide-7.md.
    featuredOnHomepage: false,
    featuredOnHub: true,
    draft: false,
    metaTitle: 'The Job-to-Authority Flywheel for Home Service Businesses | Lusso Media',
    metaDescription:
      'Turn completed home-service jobs into proof that supports future sales. Learn how to capture, package, distribute, and reuse real project evidence.',
    ogImageAlt: 'Lusso Media Field Guide — The Job-to-Authority Flywheel',

    problem:
      'A contractor finishes excellent work. The customer is satisfied. The crew moves on — and most of the evidence disappears with them. Maybe one photo stays on someone\'s phone. Maybe nobody asks for a review. Maybe the website still shows stock imagery from three years ago. The business did the hard part: delivering the result. But future prospects cannot evaluate work they cannot see. The job creates the proof. The system has to capture it.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Value Stops Here',
      beforeItems: ['Job', 'Invoice', 'Done'],
      afterLabel: 'Value Compounds',
      afterItems: ['Job', 'Capture', 'Proof', 'Distribute', 'Trust', 'Next Job', 'More Proof'],
    },
    seeItCaption: 'One version ends at the invoice. The other feeds the next sale.',

    // "What One Job Can Create" replaces "Why It Happens" — five proof
    // categories as an editorial numbered sequence, not five cards.
    metricsSection: {
      title: 'What One Job Can Create',
      metrics: [
        { label: 'Project Proof', detail: 'Finished photos, before/after, installation detail, workmanship — the visual record of the work itself.' },
        { label: 'Customer Proof', detail: 'A review, testimonial, customer quote, or short story — only with legitimate customer permission where required.' },
        { label: 'Educational Proof', detail: 'Why the problem happened, what was installed, how the process worked, what homeowners should know.' },
        { label: 'Sales Proof', detail: 'A relevant example to reference during estimates, a website case study, a proposal asset, or landing-page proof.' },
        { label: 'Advertising Proof', detail: 'Retargeting creative, project demonstration, and local credibility built from real completed work.' },
      ],
    },

    frameworkIntro: 'One completed job can move through six stages before it becomes reusable authority.',
    framework: {
      type: 'framework',
      terms: ['Deliver', 'Capture', 'Package', 'Distribute', 'Reuse', 'Compound'],
      connector: '→',
    },
    frameworkQuestions: [
      { stage: 'Deliver', question: 'Do work worth showing — the marketing system cannot substitute for poor delivery.' },
      { stage: 'Capture', question: 'Document the real project while the evidence exists — photos, video, customer feedback, project facts.' },
      { stage: 'Package', question: 'Turn raw evidence into useful proof — a testimonial, case study, before/after, or FAQ answer.' },
      { stage: 'Distribute', question: 'Put the proof where prospects make decisions — website, landing pages, Google, advertising, social, sales materials.' },
      { stage: 'Reuse', question: 'One proof asset should not have only one destination — reuse the same evidence in different contexts without distorting it.' },
      { stage: 'Compound', question: 'More completed work creates more evidence, which can strengthen perceived certainty for future prospects.' },
    ],
    // "Proof Distribution Map" — one completed job, several destinations.
    // No branching primitive exists (and none was built, per instruction);
    // a `+`-joined framework list communicates the fan-out cleanly.
    secondaryVisual: {
      label: 'One Completed Job → Six Destinations',
      visual: {
        type: 'framework',
        terms: ['Website', 'Landing Page', 'Google', 'Ads', 'Sales', 'Social'],
        connector: '+',
      },
    },
    // Reviews + customer-permission/privacy notes, combined into one
    // compact supplementary note under the distribution map (Phase 4G) —
    // keeps the guide from ballooning past its word-count target while
    // still covering both required points.
    interpretationNote:
      'Reviews are one part of the flywheel, not the whole system — request them from actual customers, never buy or script them, and never require or incentivize positive sentiment. When using customer names, faces, homes, or project details, get appropriate permission and protect privacy.',
    keyPrinciple: {
      statement: 'Your reputation only helps the prospect if they can see evidence of it.',
      supporting: "The goal isn't more content. The goal is more visible proof.",
    },
    example: {
      label: 'Example — an outdoor living installation',
      rows: [
        { label: 'Capture', value: 'Before photo, finished project, paver detail, crew/process footage, customer feedback' },
        { label: 'Package into', value: 'Project gallery, short case story, customer quote, ad creative, website proof, sales example' },
      ],
    },

    actions: [
      {
        title: 'Pick your last five jobs.',
        detail: 'Identify five recent projects that represent the kind of work you want more of. What evidence do you have from each — photos, reviews, video, project details, customer feedback?',
      },
      {
        title: 'Create a job-closeout checklist.',
        detail: 'Before a job is considered fully closed, define whether the team should capture finished photos, before/after, customer feedback, a review request, or project details — only what\'s relevant to your business.',
      },
      {
        title: 'Put one piece of proof where a sale happens.',
        detail: 'Don\'t start with 20 social posts. Choose one high-value decision point — a service page, landing page, proposal, or estimate presentation — and add one relevant proof asset.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Is Your Reputation Actually Working for You?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates how authority, reputation, demand, conversion, and the rest of your local growth system work together.',

    // All three named in the brief carry a specific, individually reasoned
    // connection (offer certainty, landing-page proof, Compares-Providers
    // messaging) rather than mechanical reciprocity — kept at the 3 max.
    relatedGuideSlugs: [
      'why-10-percent-off-isnt-an-offer',
      'stop-sending-paid-traffic-to-your-homepage',
      'home-service-buyer-readiness',
    ],
  },
  {
    slug: 'landscaping-what-to-advertise',
    title: 'How Landscaping Companies Should Choose What to Advertise',
    shortTitle: 'What Should Landscaping Companies Advertise?',
    category: 'market-intelligence',
    industry: 'landscaping',
    premise: "Don't advertise every service equally. Put your marketing behind the work you actually want more of.",
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser and not in the hub's featured set — the
    // brief explicitly says do not alter either just because this guide is
    // new (Phase 4H).
    featuredOnHomepage: false,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'How Landscaping Companies Should Choose What to Advertise | Lusso Media',
    metaDescription:
      'Use ticket, margin, demand, capacity, differentiation, and proof to decide which landscaping service deserves your next focused marketing campaign.',
    ogImageAlt: 'Lusso Media Field Guide — How Landscaping Companies Should Choose What to Advertise',

    // Deliberately distinct from Guide #2 (Phase 4H cannibalization
    // requirement): Guide #2 teaches "focus one campaign." This guide
    // never repeats that instruction — it only teaches how to choose which
    // service earns that focus, a decision Guide #2 assumes is already made.
    problem:
      'A landscaping company can perform many types of work, which often produces a broad advertising message: Landscape Design, Pavers, Irrigation, Turf, Maintenance, Outdoor Living — Call Today. The campaign may generate inquiries, but the business hasn\'t deliberately chosen what kind of revenue it wants marketing to produce. A repair call, a recurring maintenance account, a mid-size paver project, and a full design/build installation are very different economic opportunities (illustrative only, not industry figures). Start with the business economics, then build the marketing.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Business-Centered',
      beforeItems: ['Design', 'Pavers', 'Turf', 'Irrigation', 'Maintenance', 'Lighting', 'Planting', 'Walls'],
      afterLabel: 'Growth-Centered',
      afterItems: ['Evaluate economics', 'Select priority service', 'Build focused campaign'],
    },
    seeItCaption: "Other services don't disappear — the campaign just gets a clear priority.",

    // "The 6 Factors to Score" replaces "Why It Happens" — an editorial
    // numbered sequence, not six essay sections. The capacity-warning
    // callout the brief asks for is folded into Fulfillment Capacity's
    // detail rather than added as a second standalone callout slot.
    metricsSection: {
      title: 'The 6 Factors to Score',
      metrics: [
        {
          label: 'Average Ticket',
          detail: 'What does a typical completed project produce in revenue? Biggest ticket doesn\'t automatically mean best campaign. Diagnostic: is the value high enough to justify intentionally acquiring more of this work?',
        },
        {
          label: 'Gross Margin',
          detail: 'After direct fulfillment costs, does this service create enough contribution to support acquisition? Diagnostic: does the economics leave room for acquisition cost?',
        },
        {
          label: 'Market Demand',
          detail: 'Are enough qualified homeowners actively interested — considering inquiries, search demand, local development, seasonality, and your historical project mix?',
        },
        {
          label: 'Fulfillment Capacity',
          detail: 'Can the business actually deliver more of this work — crew, equipment, scheduling, design bandwidth, suppliers? Demand isn\'t helpful if you can\'t fulfill it: a strong campaign for a service with no capacity just moves the constraint downstream.',
        },
        {
          label: 'Differentiation',
          detail: 'Can the company demonstrate a legitimate, compelling reason to choose it for this service — specialized process, design capability, craftsmanship, local experience, warranty, or materials?',
        },
        {
          label: 'Proof',
          detail: 'Can the business visibly prove it can perform this type of work — completed projects, before/after, reviews, customer stories, video? This connects directly to the Job-to-Authority Flywheel.',
        },
      ],
    },

    frameworkIntro: 'The Lusso Service Opportunity Matrix — a strategic decision framework, not a scientifically validated model.',
    framework: {
      type: 'framework',
      terms: ['Economics', 'Market', 'Operations', 'Authority', 'Campaign Candidate'],
      connector: '→',
    },
    frameworkQuestions: [
      { stage: 'Economics', question: 'Ticket + Margin' },
      { stage: 'Market', question: 'Demand + Differentiation' },
      { stage: 'Operations', question: 'Capacity' },
      { stage: 'Authority', question: 'Proof' },
      { stage: 'Campaign Candidate', question: 'The service where all four categories hold up together.' },
    ],
    // Simple scoring exercise, reusing the Scorecard primitive exactly as
    // Guide #3 did for its Quick Offer Check — the 1–5 scale and
    // interpretation ranges live in interpretationNote, explicitly marked
    // as a planning tool rather than a validated model.
    secondaryVisual: {
      label: 'Score One Service Yourself',
      visual: {
        type: 'scorecard',
        items: [
          { question: 'Ticket', status: 'warn' },
          { question: 'Margin', status: 'warn' },
          { question: 'Demand', status: 'warn' },
          { question: 'Capacity', status: 'warn' },
          { question: 'Differentiation', status: 'warn' },
          { question: 'Proof', status: 'warn' },
        ],
      },
    },
    interpretationNote:
      'Rate each factor 1 (Weak) to 5 (Strong) for one service, then add them up. 6–14: probably not the first service to put paid acquisition behind. 15–23: worth investigating further. 24–30: a strong candidate for a focused campaign. This is a simple planning tool, not a validated financial model.',
    keyPrinciple: {
      statement: 'Don\'t ask marketing to create "more work." Decide what kind of work you want marketing to create.',
      supporting: 'Marketing becomes more useful when the business objective is specific.',
    },
    example: {
      label: 'Example — choosing between four landscaping services',
      rows: [
        { label: 'Weekly Maintenance', value: 'High demand, moderate margin — but ticket is small and hard to scale through ads alone' },
        { label: 'Irrigation Repair', value: 'Decent ticket, but demand is reactive and seasonal' },
        { label: 'Paver Installation', value: 'Strong ticket and margin, but capacity and current proof are limited' },
        { label: 'Full Design/Build', value: 'Largest ticket, but constrained capacity and long lead times make it the weaker near-term candidate' },
      ],
    },

    actions: [
      {
        title: 'List your top five services.',
        detail: 'Choose the five types of work you would most realistically consider advertising — not every possible service you offer.',
      },
      {
        title: 'Score each one.',
        detail: 'Rate ticket, margin, demand, capacity, differentiation, and proof on the same 1–5 scale. The point is comparison, not mathematical precision.',
      },
      {
        title: 'Pick one to investigate.',
        detail: 'Take the highest-potential service and answer: who is the buyer, what problem/desire creates demand, what offer would move them, and what proof already exists? Don\'t launch advertising solely because it scored highest — validate the opportunity first.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Is the Market the Problem — or Something Else?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the offer, market, authority, conversion, demand, reputation, and revenue systems behind local growth.',

    // Guide #2 (focus the campaign once the service is chosen) and Guide #7
    // (proof, referenced directly in the Proof factor above) are the
    // brief's preferred pair. Guide #1 included as the third — the
    // capacity-warning theme above directly echoes its diagnosis, a
    // genuine link rather than a mechanical one.
    relatedGuideSlugs: [
      'focused-home-service-campaign',
      'job-to-authority-flywheel',
      'why-more-leads-wont-fix-growth',
    ],
  },
  {
    slug: 'plumbing-types-of-demand',
    title: 'The 3 Types of Plumbing Demand — and Why They Need Different Campaigns',
    shortTitle: '3 Types of Plumbing Demand',
    category: 'market-intelligence',
    industry: 'plumbing',
    premise: 'A homeowner with water on the floor should not see the same message as one researching a planned upgrade.',
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser and not in the hub's featured set — the
    // brief explicitly says do not alter either (Phase 4I).
    featuredOnHomepage: false,
    featuredOnHub: false,
    draft: false,
    metaTitle: '3 Types of Plumbing Demand and How to Market Each | Lusso Media',
    metaDescription:
      'Urgent repairs, planned replacements, and home upgrades create different buying situations. Learn how plumbing campaigns should adapt the message, path, and CTA.',
    ogImageAlt: 'Lusso Media Field Guide — The 3 Types of Plumbing Demand',

    // Deliberately NOT a landscaping-template swap (Phase 4I anti-template
    // requirement): different core concept (buyer state, not service
    // selection), different visual model (a 3-way comparison matrix, not
    // a 6-factor scorecard), different examples, different actions.
    problem:
      'Plumbing companies often market dozens of services with one broad message: Fast. Reliable. Local. Call Today. But the person seeing the ad may be in very different situations. One homeowner needs help immediately. Another knows replacement is coming and is researching options. A third has lived with a problem for years and hasn\'t decided fixing it is worth the investment. Those customers don\'t just need different creative — they may need different messages, proof, offers, landing pages, and CTAs. Start with the buying situation, then build the campaign around it.',

    seeIt: {
      type: 'framework',
      terms: ['Urgent', 'Planned', 'Improvement'],
      connector: '+',
    },
    seeItCaption: 'Different urgency → different message → different path.',

    // "The 3 Types of Plumbing Demand" replaces "Why It Happens" —
    // mindset + examples + message job + CTA style per type, with the
    // conversion path chain in the `formula` slot (a natural fit for a
    // short arrow sequence).
    metricsSection: {
      title: 'The 3 Types of Plumbing Demand',
      metrics: [
        {
          label: '01 — Urgent',
          detail: 'Mindset: "I need this handled." Examples: an active leak, a backed-up drain, loss of hot water, a failed fixture. Message job: reduce uncertainty quickly — availability, service area, response process, and trust matter most. CTA: Request Service, Check Availability, or Call for Service.',
          formula: 'Problem → Trust → Action',
        },
        {
          label: '02 — Planned',
          detail: 'Mindset: "I know this project is coming — I want to make the right decision." Examples: an aging water heater, a planned repipe, fixture replacement, remodel-related plumbing. Message job: help the homeowner evaluate — options, process, proof, and legitimate financing. CTA: Request an Assessment, Explore Replacement Options, or Schedule a Consultation.',
          formula: 'Problem → Options → Proof → Assessment',
        },
        {
          label: '03 — Improvement',
          detail: 'Mindset: "This isn\'t an emergency — but I may want the outcome." Examples: water treatment, convenience upgrades, comfort improvements, aesthetic fixture upgrades. Message job: increase problem recognition and desired outcome — what they\'re experiencing, why it happens, and what life looks like after solving it. CTA: See If Your Home Is a Fit, Check Eligibility, or Explore Your Options.',
          formula: 'Recognition → Education → Outcome → Proof → Qualification',
        },
      ],
    },

    // The Lusso Plumbing Demand Matrix — a qualitative comparison, not a
    // scored model. Uses the new `comparison` visual (Phase 4I) rather
    // than reusing Guide #8's Scorecard, per the explicit instruction not
    // to duplicate that service-selection matrix.
    frameworkIntro: 'The same three buying situations show up across nearly every service — here\'s how they compare.',
    framework: {
      type: 'comparison',
      columns: ['Urgent', 'Planned', 'Improvement'],
      rows: [
        { label: 'Customer Mindset', values: ['Solve it now', 'Evaluate it carefully', 'Understand whether it\'s worth solving'] },
        { label: 'Education Needed', values: ['Lower', 'Medium', 'Higher'] },
        { label: 'Typical Research Depth', values: ['Minimal', 'Moderate — compares options', 'Often extensive before deciding'] },
        { label: 'Proof Requirement', values: ['Trust in responsiveness', 'Process and outcome proof', 'Problem + outcome proof'] },
        { label: 'Conversion Path Length', values: ['Short', 'Medium', 'Longer'] },
        { label: 'CTA Style', values: ['Service request', 'Assessment', 'Qualification'] },
      ],
    },
    // "Buying Mode and Awareness Are Related — But Not the Same" — the
    // guide's explicit anti-cannibalization section for Guide #6, reusing
    // BeforeAfter for the two-question contrast.
    secondaryVisual: {
      label: 'Buying Mode and Awareness Are Related — But Not the Same',
      visual: {
        type: 'beforeAfter',
        beforeLabel: 'Awareness Asks',
        beforeItems: ['What does the prospect already know?'],
        afterLabel: 'Buying Mode Asks',
        afterItems: ['What situation is driving the decision right now?'],
      },
    },
    interpretationNote:
      'Two homeowners may both understand water heaters — one has no hot water today, the other is proactively replacing an aging unit. Same service, different buying situation. This guide is about focused acquisition campaigns, not the website itself — the site can still contain comprehensive pages for every service.',
    keyPrinciple: {
      statement: 'Same plumbing company. Different buying situation. Different campaign.',
      supporting: 'The service category alone does not tell you what the customer needs to hear next.',
    },
    example: {
      label: 'Example — one company, three campaigns',
      rows: [
        { label: 'Campaign A — Active Problem', value: '"Need help with [specific immediate issue]?" — relevance, availability, trust, next step' },
        { label: 'Campaign B — Water Heater Replacement', value: '"Planning to replace an aging water heater? Know what to evaluate first." — options, process, proof, assessment' },
        { label: 'Campaign C — Hard-Water Improvement', value: '"Why does mineral buildup keep returning?" — recognition, education, desired outcome, proof, qualification' },
      ],
    },

    actions: [
      {
        title: 'Label your top services.',
        detail: 'For the plumbing services you most want to grow, ask: is the dominant buying situation usually urgent, planned, or improvement? Some services may span more than one — choose the dominant one rather than pretending the categories are absolute.',
      },
      {
        title: 'Check the message.',
        detail: 'Does the campaign match that buying mode? Does urgent demand get to action quickly? Does planned demand provide enough information? Does improvement demand create enough understanding and desire?',
      },
      {
        title: 'Check the next step.',
        detail: 'Compare the CTA against what the homeowner is actually ready to do — don\'t automatically use "Call Now" for every campaign. Make the next step fit the buying situation.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Is Your Campaign Built Around How Customers Actually Buy?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates the market, offer, conversion, authority, demand, reputation, and revenue systems behind local growth.',

    // All three named in the brief, each with a specific, non-mechanical
    // reason: Guide #6 (what the prospect already knows, distinct from
    // buying mode — see the section above), Guide #4 (destination
    // architecture varies by demand type), Guide #2 (campaign concentration).
    relatedGuideSlugs: [
      'home-service-buyer-readiness',
      'stop-sending-paid-traffic-to-your-homepage',
      'focused-home-service-campaign',
    ],
  },
  {
    slug: 'hvac-demand-calendar',
    title: 'The HVAC Demand Calendar — Market Around Capacity, Not Just Weather',
    shortTitle: 'The HVAC Demand Calendar',
    category: 'market-intelligence',
    industry: 'hvac',
    premise: "Peak demand isn't automatically good demand if the schedule, technicians, or install crews are already full.",
    readTimeMinutes: 4,
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    // Not on the homepage teaser and not in the hub's featured set —
    // brief explicitly says do not alter either (Phase 4J).
    featuredOnHomepage: false,
    featuredOnHub: false,
    draft: false,
    metaTitle: 'HVAC Marketing by Season: Match Demand to Capacity | Lusso Media',
    metaDescription:
      'HVAC demand changes with weather, but your marketing should also reflect technician, install, and scheduling capacity. Use this framework to decide when to create, capture, or prioritize demand.',
    ogImageAlt: 'Lusso Media Field Guide — The HVAC Demand Calendar',

    // Anti-template safeguard (Phase 4J): different decision model from
    // both prior industry guides. Guide #8 = "which service?" (economic
    // opportunity scorecard). Guide #9 = "what buying situation?" (buyer
    // state). Guide #10 = "what demand should we create given capacity?"
    // (operating-condition matrix) — no recycled scorecard, no buyer-state
    // model, no swapped examples, no copied action sequence.
    problem:
      'HVAC marketing often becomes reactive. Temperature changes, phones start ringing, demand rises — then marketing either keeps running unchanged, gets shut off completely, or gets restarted once the schedule slows down. That treats advertising like an on/off switch instead of part of the operating system. The better question isn\'t "is demand high or low?" It\'s "what demand do we need relative to the capacity we have right now?" Marketing should respond to both the market and the operation serving it.',

    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Reactive',
      beforeItems: ['Hot / Cold', 'Turn Ads Up', 'Schedule Fills', 'Turn Ads Off', 'Schedule Slows', 'Turn Ads Back On'],
      afterLabel: 'Operated',
      afterItems: ['Demand', 'Available Capacity', 'Service Priority', 'Campaign Decision'],
    },
    seeItCaption: 'One responds only to the thermometer. The other responds to the whole operation.',

    // "The 3 Operating Windows" replaces "Why It Happens" — planning
    // windows, not fixed calendar months (deliberately no universal dates).
    metricsSection: {
      title: 'The 3 Operating Windows',
      metrics: [
        {
          label: 'Pre-Peak',
          detail: 'Demand may be building but capacity hasn\'t reached maximum pressure yet. Job: build useful demand before the schedule gets constrained — planned replacement, maintenance, inspection, educational demand. Ask which crews have capacity, which jobs have longer decision cycles, and what proof should be visible before peak arrives.',
        },
        {
          label: 'Peak',
          detail: 'Organic demand rises while capacity tightens. More leads can become less useful as capacity disappears — evaluate the value of the next opportunity, not just the cost of generating it. Job: protect capacity and prioritize valuable demand, which doesn\'t necessarily mean turning ads off — narrowing geography, increasing qualification, or shifting spend toward higher-value opportunities are all possibilities.',
        },
        {
          label: 'Shoulder',
          detail: 'Reactive demand softens and unused capacity opens up. Job: create demand intentionally — planned replacements, maintenance, upgrades, past-customer reactivation — without discounting merely because demand is lower. Ask: if emergency demand disappeared tomorrow, what would we intentionally create demand for?',
        },
      ],
    },

    // The Lusso HVAC Demand/Capacity Matrix — a 2×2 built on the new
    // `comparison` primitive (Phase 4I), not Guide #8's scorecard or
    // Guide #9's buyer-state model.
    frameworkIntro: 'The Lusso HVAC Demand/Capacity Matrix — a planning framework, not a universal media-buying formula. Actual decisions still depend on economics, backlog, lead quality, close rate, and market conditions.',
    framework: {
      type: 'comparison',
      columns: ['Available Capacity', 'Constrained Capacity'],
      rows: [
        {
          label: 'High Demand',
          values: [
            'Capture Demand — high-intent acquisition, proof, speed, conversion',
            'Prioritize Demand — qualification, geography, service economics, scheduling fit',
          ],
        },
        {
          label: 'Low Demand',
          values: [
            'Create Demand — planned work, education, reactivation, priority services',
            'Fix Operations First — staffing, crews, backlog, and bottlenecks before adding volume',
          ],
        },
      ],
    },
    // "The Operating Loop" — a genuinely different secondary framework
    // from Guide #9's awareness-vs-buying-mode contrast.
    secondaryVisual: {
      label: 'The Operating Loop',
      visual: {
        type: 'framework',
        terms: ['Check Capacity', 'Choose Service Priority', 'Read Market Demand', 'Set Campaign Objective', 'Review Weekly'],
        connector: '→',
      },
    },
    interpretationNote:
      'Capacity is not just "are we busy?" It can mean service technicians, install crews, dispatch availability, estimator bandwidth, equipment, or project scheduling. A company can have capacity for replacement installs while lacking capacity for same-day service calls, or vice versa — this is why service mix matters.',
    keyPrinciple: {
      statement: "Don't market to the weather. Market to the operating condition.",
      supporting: 'Weather influences demand. Capacity determines how much of that demand the business can use.',
    },
    example: {
      label: 'Example — one HVAC company, three operating conditions',
      rows: [
        { label: 'Early Season', value: 'Install crew has availability. Priority: planned replacement opportunities. Campaign objective: education + assessment.' },
        { label: 'Peak Heat', value: 'Service demand surges, schedule tightens. Campaign objective shifts: tighter qualification, higher-priority services, appropriate geography, protect customer experience.' },
        { label: 'Shoulder', value: 'Reactive demand decreases, capacity opens up. Campaign objective: create planned demand rather than waiting for the next temperature spike.' },
      ],
    },

    actions: [
      {
        title: 'Map your next 30 days of capacity.',
        detail: 'Estimate available service capacity, installation capacity, and estimate/consultation capacity. Don\'t aim for perfect forecasting — get directional visibility.',
      },
      {
        title: 'Choose the service you actually need more of.',
        detail: 'Ask which type of booked work would improve the schedule right now, weighing economics, capacity, strategic priority, and demand. Don\'t answer "all of it."',
      },
      {
        title: 'Match the campaign to the operating condition.',
        detail: 'Decide whether the current job is to Create, Capture, or Prioritize demand — then review message, geography, qualification, offer, and CTA accordingly.',
      },
    ],

    nextStepCTA: { type: 'score' },
    nextStepCTALabel: 'See How I Stack Up Locally',
    nextStepHeadline: 'Do You Need More Demand — or Better Control of It?',
    nextStepSupporting:
      'The 2-minute Local Dominance Score evaluates how market, offer, conversion, authority, demand, reputation, and revenue work together.',

    // Guide #2 (campaign concentration once priority is chosen) and Guide
    // #5 (operating measurement — capacity decisions shouldn't rest on
    // lead count alone) are both genuine, specific relationships.
    // Guide #1 and the other industry guides (#8, #9) deliberately
    // excluded — cross-linking industry guides merely because they share
    // Market Intelligence was explicitly discouraged in the brief.
    relatedGuideSlugs: ['focused-home-service-campaign', 'lead-to-booked-job-system'],
  },
];

// ── Demo/dev-only content (Part 57) ──
// Marked `draft: true`. Excluded from /resources, the sitemap, and every
// internal link by the helpers below. The [slug] route only ever renders a
// draft guide outside of production (see app/resources/[slug]/page.tsx) —
// this exists purely to exercise the template/visual-component system
// during Phase 3 development, not as real content.
const demoGuides: FieldGuide[] = [
  {
    slug: 'dev-demo-lead-leak',
    title: '[DEV DEMO] Why More Leads Won’t Fix a Broken Growth System',
    shortTitle: '[DEMO] The Lead Leak',
    category: 'revenue-intelligence',
    premise: 'Find the constraint before increasing demand.',
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    draft: true,
    metaTitle: '[DEV DEMO — not for production]',
    metaDescription: 'Development-only Field Guide used to test the Phase 3 template and visual components.',
    ogImageAlt: 'Development demo Field Guide',
    problem:
      'Most contractors respond to a slow month by spending more on ads. But if the real constraint is what happens after the lead arrives, more traffic just means more leads falling through the same gap — faster.',
    seeIt: {
      type: 'funnel',
      stages: ['Traffic', 'Lead', 'Qualified', 'Estimate', 'Booked'],
      highlightIndex: 2,
    },
    whyItHappens: [
      { label: 'Speed to lead', detail: 'A lead contacted in 5 minutes converts at a very different rate than one contacted in 5 hours.' },
      { label: 'No qualification filter', detail: 'Every lead gets treated the same regardless of fit, urgency, or budget reality.' },
      { label: 'No estimate follow-up cadence', detail: 'Estimates are sent and then left to close themselves.' },
    ],
    frameworkIntro: 'Demand only compounds a healthy system. Diagnose the constraint first.',
    framework: { type: 'framework', terms: ['Demand', 'Offer', 'Conversion', 'Sales', 'Revenue'], connector: '→' },
    quickDiagnosis: {
      question: 'Do more than 1 in 5 leads go untouched for over an hour?',
      yes: 'Speed to lead is likely your constraint — fix that before spending more on traffic.',
      no: 'Speed looks fine — the constraint is probably further down the funnel.',
    },
    actions: [
      { title: 'Calculate your lead-to-booked-job rate.', detail: 'Pull the last 60 days of leads and bookings and divide.' },
      { title: 'Identify the largest percentage drop-off.', detail: 'Walk the funnel stage by stage to find where the rate falls off a cliff.' },
      { title: 'Fix that constraint before increasing traffic.', detail: 'Only add spend once the existing funnel converts what it already gets.' },
    ],
    nextStepCTA: { type: 'score' },
    nextStepSupporting: 'The 2-minute Local Dominance Score evaluates the major parts of your acquisition system.',
    relatedGuideSlugs: [],
  },
  {
    slug: 'dev-demo-visual-gallery',
    title: '[DEV DEMO] Visual Component Gallery',
    shortTitle: '[DEMO] Visual Gallery',
    category: 'offer-engineering',
    premise: 'Internal-only page exercising every remaining visual primitive.',
    publishDate: '2026-08-29',
    updatedDate: '2026-08-29',
    draft: true,
    metaTitle: '[DEV DEMO — not for production]',
    metaDescription: 'Development-only Field Guide used to test remaining Phase 3 visual components.',
    ogImageAlt: 'Development demo Field Guide',
    problem:
      'This guide exists only so every visual primitive (before/after, leak map, timeline, scorecard, screenshot annotation) can be visually QA’d in one place during Phase 3 development.',
    seeIt: {
      type: 'beforeAfter',
      beforeLabel: 'Generic Homepage as Landing Page',
      beforeItems: ['Five competing CTAs', 'No single offer', 'Generic "Contact Us" form'],
      afterLabel: 'Dedicated Campaign Landing Page',
      afterItems: ['One offer', 'One CTA', 'Qualification built into the form'],
    },
    whyItHappens: [
      { label: 'No dedicated conversion path', detail: 'Paid traffic lands on a page built for browsing, not deciding.' },
      { label: 'Message mismatch', detail: 'The ad promises one thing; the page talks about five.' },
    ],
    frameworkIntro: 'Every leak map below highlights a common constraint point.',
    framework: { type: 'leakMap', stages: ['Demand', 'Offer', 'Funnel', 'Sales', 'Revenue'], leakIndexes: [1, 3] },
    actions: [
      { title: 'Audit your current campaign landing destination.', detail: 'Confirm ad traffic lands on a dedicated page, not the homepage.' },
      { title: 'Give that page one offer and one CTA.', detail: 'Remove every competing link and navigation item.' },
    ],
    nextStepCTA: { type: 'system' },
    nextStepSupporting: 'See how conversion infrastructure fits into the full Local Dominance System.',
    relatedGuideSlugs: [],
  },
];

export const fieldGuides: FieldGuide[] = [...publishedGuides, ...demoGuides];

fieldGuides.forEach(validateFieldGuide);
assertUniqueSlugs(fieldGuides);

// ── Query helpers ──
// `includeDrafts` defaults false everywhere it matters for public surfaces;
// the [slug] route is the only caller that ever passes true, and only
// outside production (see app/resources/[slug]/page.tsx).

export function getPublishedGuides(): FieldGuide[] {
  return fieldGuides.filter((g) => !g.draft);
}

export function getFieldGuide(slug: string, includeDrafts = false): FieldGuide | undefined {
  return fieldGuides.find((g) => g.slug === slug && (includeDrafts || !g.draft));
}

// Phase 4G: split from a single getFeaturedGuides() so the homepage
// teaser and the /resources hub's Featured row can be curated
// independently (see docs/phase-4g-guide-7.md for why this changed).
export function getHomepageFeaturedGuides(max = 3): FieldGuide[] {
  return getPublishedGuides().filter((g) => g.featuredOnHomepage).slice(0, max);
}

export function getHubFeaturedGuides(max = 3): FieldGuide[] {
  return getPublishedGuides().filter((g) => g.featuredOnHub).slice(0, max);
}

export function getGuidesByCategory(category: FieldGuideCategorySlug): FieldGuide[] {
  return getPublishedGuides().filter((g) => g.category === category);
}

export function getRelatedFieldGuides(guide: FieldGuide, max = 3): FieldGuide[] {
  if (!guide.relatedGuideSlugs?.length) return [];
  return guide.relatedGuideSlugs
    .map((slug) => getFieldGuide(slug))
    .filter((g): g is FieldGuide => Boolean(g))
    .slice(0, max);
}
