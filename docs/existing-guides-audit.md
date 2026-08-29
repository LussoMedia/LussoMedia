# Existing `/guides/` Content Audit

Inventory of all 10 production pages at `/guides/[slug]` prior to any Phase 4 changes. Nothing in this system was modified as part of this audit — see [phase-4a-guide-1.md](phase-4a-guide-1.md) for what (if anything) changed afterward.

All 10 share these platform-level facts, confirmed once here rather than repeated per row:
- **Canonical:** self-referencing absolute URL (`https://illussomedia.com/guides/{slug}`), set in `app/guides/[slug]/page.tsx`.
- **Indexability:** `index: true, follow: true` on every guide (no per-guide override).
- **Sitemap inclusion:** yes — `app/sitemap.ts` maps every entry in `lib/config/guides.ts` automatically.
- **Content type:** long-form educational article (intro + 3–4 sections + optional 2-question FAQ), `Article` + `BreadcrumbList` + conditional `FAQPage` JSON-LD.
- **CTA destination:** every guide ends with a two-card block linking to (a) a related industry page, if `relatedIndustrySlug` is set, and (b) the Local Dominance Score; the final section CTA button routes to `/apply`.

| Slug | H1 / Title | Meta Description | ~Word Count (body+FAQ) | Primary Topic | Primary Search Intent | Likely Target Queries | Internal Links | Overlaps Planned Field Guide? |
|---|---|---|---|---|---|---|---|---|
| `how-to-qualify-home-service-leads` | How to Qualify Home-Service Leads | Practical framework for qualifying leads by fit, urgency, budget | ~400 | Lead qualification framework | Informational / how-to | "how to qualify leads," "home service lead qualification" | → speed-to-lead, → referral-dependence guide | Partial subject overlap (lead conversion) with FG#1, different intent — FG#1 is diagnostic/systems-level, this is a tactical how-to |
| `speed-to-lead-for-contractors` | How Fast Should Home-Service Businesses Follow Up With Leads? | Response speed's effect on conversion, realistic follow-up standard | ~350 | Speed-to-lead | Informational / benchmark-seeking | "speed to lead," "how fast to respond to leads" | → qualification guide, → plumbing follow-up guide | Partial subject overlap (funnel stage), different intent — this is single-stage tactical, FG#1 is whole-chain diagnostic |
| `hvac-lead-generation-guide` | HVAC Lead Generation: What Actually Drives Replacement Revenue | How HVAC lead gen works when replacement/install jobs matter most | ~300 | Vertical-specific lead gen strategy | Informational, industry-specific | "HVAC lead generation," "HVAC marketing" | → qualification guide, → speed-to-lead guide, → /hvac | No meaningful overlap — vertical-specific, not a general funnel-diagnosis piece |
| `plumbing-lead-follow-up-systems` | Plumbing Lead Follow-Up Systems That Actually Get Used | Why plumbing leads go cold, what a follow-up system needs | ~280 | Vertical-specific follow-up systems | Informational, industry-specific | "plumbing lead follow-up," "plumbing follow-up system" | → speed-to-lead, → qualification guide, → /plumbing | No meaningful overlap — narrower, vertical + single-stage |
| `how-contractors-gain-local-market-share` | How Contractors Gain Local Market Share | Market share as a system outcome, not a single tactic | ~300 | Growth strategy / market share | Informational / strategic | "how to gain market share," "contractor market share" | → referral-dependence guide, → qualification guide | No — this is about visibility/reputation compounding, not lead-to-revenue conversion diagnosis |
| `roofing-lead-qualification` | Roofing Lead Qualification: Separating Real Buyers From Researchers | Qualifying roofing leads by urgency, ownership, insurance status | ~270 | Vertical-specific qualification | Informational, industry-specific | "roofing lead qualification," "qualifying roofing leads" | → qualification guide, → speed-to-lead guide, → /roofing | No meaningful overlap — vertical-specific single-stage |
| `st-george-contractor-marketing` | Contractor Marketing in St. George & Southern Utah | What makes Southern Utah contractor marketing different | ~330 | Local/geo market conditions | Local/geo informational, quasi-commercial | "St. George contractor marketing," "Southern Utah marketing" | → market-share guide | No overlap with FG#1 |
| `landscaping-design-deposit-strategies` | Landscaping Design Deposit Strategies That Qualify Real Projects | How a design deposit filters serious clients | ~260 | Vertical-specific qualification/offer tactic | Informational, industry-specific | "landscaping design deposit," "qualify landscaping leads" | → qualification guide, → /landscaping | No meaningful overlap |
| `referral-dependence-limits-contractor-growth` | Why Referral Dependence Limits Contractor Growth | Why referral-only growth plateaus, what to add alongside it | ~320 | Growth strategy / demand generation | Informational / strategic | "referral dependence," "contractor growth beyond referrals" | → market-share guide, → qualification guide | No — about demand-source diversification, not lead-to-revenue diagnosis |
| `ev-charger-marketing-for-electricians` | EV Charger Marketing for Electricians | Building demand for EV charger installs specifically | ~310 | Vertical-specific emerging-category demand gen | Informational, industry-specific, forward-looking | "EV charger marketing," "electrician EV charger leads" | → qualification guide, → /electrical | No overlap |

## Classification

Classified on actual usefulness/positioning, not length or word count alone (per Phase 4A instructions).

**DEEP GUIDE** (comprehensive, genuinely useful educational/search resource — keep as-is, no action needed):
`how-to-qualify-home-service-leads`, `speed-to-lead-for-contractors`, `hvac-lead-generation-guide`, `plumbing-lead-follow-up-systems`, `how-contractors-gain-local-market-share`, `roofing-lead-qualification`, `landscaping-design-deposit-strategies`, `referral-dependence-limits-contractor-growth`, `ev-charger-marketing-for-electricians` — 9 of 10.

**LEGACY / REVIEW** (usefulness/positioning worth a later strategic look — not a length judgment):
- `st-george-contractor-marketing` — This page reads more like a geo-targeted local-SEO/business-development page (Southern Utah market conditions, why-us-locally positioning) wearing a "Guide" wrapper than a transferable educational resource for the site's broader audience. It isn't thin or low-quality, and nothing here recommends changing, redirecting, or removing it — but its *category* (educational guide vs. local landing page) is worth a deliberate decision in a future phase, rather than assuming "Deep Guide" is the right permanent home for it. No action taken in Phase 4A.

## No Changes Made

Per the Phase 4A brief, nothing in `lib/config/guides.ts`, `app/guides/*`, or any existing `/guides/[slug]` URL was modified, deleted, redirected, canonicalized away, or rewritten as part of this audit or the reconciliation work that followed it.
