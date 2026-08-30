# Public Framework Originality Audit

Scope: narrow IP/originality cleanup only. No redesign, no new Field Guides, no offer/pricing change, no unrelated SEO change. Branch: `fix/framework-originality-audit`.

Standard applied throughout:

`Source knowledge → Lusso analysis → home-service application → independent framework → original visual/explanation`

## Summary

| Public Asset | Framework / Concept | Closest Source Risk | Classification | Action |
| ------------ | -------------------- | -------------------- | --------------- | ------ |
| Field Guide #3 — `why-10-percent-off-isnt-an-offer` | "Outcome ↑ + Certainty ↑ + Time/Friction ↓ + Effort/Risk ↓ + Reason to Act" equation | Hormozi's Value Equation (`$100M Offers`) | **CHANGE** | Replaced with an independent six-driver diagnostic ("What Makes an Offer Easier to Say Yes To?"), rendered as six numbered blocks — no addition, no ↑/↓ notation, no equation layout. URL/title/premise/examples/CTA unchanged. |
| Field Guide #3 — "Quick Offer Check" scorecard | 0–5 scoring tied to the four-driver formula | Same source risk, carried into the self-check tool | **CHANGE** | Renamed "Offer Decision Check," rebuilt around the six drivers, STRONG/NEEDS WORK labeling, explicitly stated as a planning diagnostic, not a validated model. |
| Field Guide #6 — `home-service-advertising-awareness-levels` | "Unaware → Problem Aware → Solution Aware → Product Aware → Most Aware" presented together as a five-stage taxonomy | Schwartz's Awareness Levels (`Breakthrough Advertising`) | **CHANGE** | Full rebuild as "Match the Message to Buyer Readiness": an independent buyer-readiness progression (Notices the Symptom → Understands the Problem → Explores Options → Compares Providers → Ready to Move) plus a message-job ladder (Recognize → Clarify → Evaluate → Trust → Act). Re-slugged to `/resources/home-service-buyer-readiness` with a 301. |
| Field Guide #2 — `one-market-one-service-one-offer` | "One Market × One Service × One Problem × One Offer × One CTA" naming/visual | Overlaps common Hormozi one-offer/one-market language (not a direct copy, but close enough to want distance) | **CHANGE** | Retitled "How to Build a Focused Home Service Campaign," framework renamed "The Focused Campaign Chain" (Target Customer → Priority Service → Buying Problem → Offer → Next Step), rendered as an arrow/continuity chain, not a multiplication formula. Re-slugged to `/resources/focused-home-service-campaign` with a 301 (see URL Redirects/decision note below). Underlying campaign-concentration principle, problem statement, examples, actions, and CTA preserved. |
| Downloadable 90-Day Playbook PDF, p.46 "Offer Architecture" | Four-quadrant grid (bigger desired outcome / more confidence / less time / less effort-risk) + "Desired outcome + specific deliverable + risk reduction + honest reason to act now" formula | Hormozi's Value Equation, reproduced near-verbatim | **CHANGE — blocked, needs human action** | See **Playbook Changes** below. No editable source file exists in this repository; the PDF is a static binary asset with no accompanying design source, so it cannot be safely regenerated here. |
| Downloadable 90-Day Playbook PDF, p.60 "Framework references" | "Alex Hormozi's $100M Offers for offer-value concepts and $100M Leads for lead-magnet and acquisition principles" | Attribution used to justify a source-identical framework | **CHANGE — blocked, needs human action** | Per the audit standard, attribution is not a substitute for independent synthesis. Once p.46 is rebuilt around Lusso's six-driver model, the "$100M Offers ... offer-value concepts" clause is no longer accurate and should be removed; the `$100M Leads` acquisition-principles reference can stay only if the surrounding page content is itself independently expressed (not verified in this pass — the guide's lead-acquisition sections did not surface any Core Four/More-Better-New taxonomy in the extracted text). |
| System page — Offer Engineering component | Related-guide title/link | Followed Guide #2's old title | **CHANGE** | Updated to "How to Build a Focused Home Service Campaign" / new URL. |
| System page — Demand Engine component | Related-guide title/link | Followed Guide #6's old title | **CHANGE** | Updated to "Match the Message to Buyer Readiness" / new URL. |
| Field Guide #1 — `why-more-leads-wont-fix-growth` | Constraint/lead diagnostic | General systems-thinking (theory of constraints is a broad business concept) | SAFE — general principle | No change. |
| Field Guide #4 — `stop-sending-paid-traffic-to-your-homepage` | Campaign-to-landing-page message continuity | General conversion-rate-optimization principle | SAFE — general principle | No change. |
| Field Guide #5 — `lead-to-booked-job-system` | Lead-to-booked-job operating measurement | General operations/KPI measurement | SAFE — general principle | No change. |
| Field Guide #7 — `job-to-authority-flywheel` | Job-to-Authority Flywheel; "one job → six destinations" `+`-joined distribution list | General content-repurposing principle; the `+` here is a fan-out list, not an equation | SAFE — general principle | No change. Reviewed specifically because it uses the `framework` visual with a `+` connector — confirmed it lists six independent distribution channels, not a value formula. |
| Field Guide #8 — `landscaping-what-to-advertise` | Ticket / Margin / Demand / Capacity / Differentiation / Proof | General service-economics evaluation criteria | SAFE — general principle, explicitly retained per brief | No change. |
| Field Guide #9 — `plumbing-types-of-demand` | Urgent / Planned / Improvement buying-mode framework; `+`-joined `seeIt` list | General buying-urgency segmentation | SAFE — general principle, explicitly retained per brief | No change. Reviewed the `+` connector here too — three buying modes, not an equation. |
| Field Guide #10 — `hvac-demand-calendar` | Pre-Peak / Peak / Shoulder; Demand/Capacity matrix; Create/Capture/Prioritize | General seasonal-demand planning | SAFE — general principle, explicitly retained per brief | No change. |
| Deep Guides (`lib/config/guides.ts`, 10 articles) | Various home-service SEO/AEO long-form content | Scanned for all source-risk terms (Value Equation, Core Four, Awareness Levels, Hormozi, Schwartz, etc.) | SAFE — no matches found | No change. |
| Local Dominance System (`systemComponents.ts`) — 7-component architecture | Market Intelligence / Offer Engineering / Conversion Infrastructure / Authority Engine / Demand Engine / Reputation Engine / Revenue Intelligence | Lusso's own named system | SAFE — explicitly retained per brief | No change beyond the two related-guide link updates above. |
| Local Dominance Score (`score.ts`, `scoreRecommendations.ts`) | Diagnostic scoring across growth-system components | General assessment/diagnostic format | SAFE — general principle | No change. |
| Results / case studies (`caseStudies.ts`, `/results`) | Verified client metrics and narratives | N/A | SAFE | No change. |
| Playbook landing page (`/lead-to-booked-job-playbook`, `components/playbook/*`, `lib/config/playbook.ts`) | Five Systems, Value Stack, Before/After | General lead-operations framing, all Lusso-specific naming | SAFE — web copy contains no source-identical language | No change. (The PDF itself is the flagged item, not this landing page.) |
| Homepage (Hero, FieldGuidesHomeBlock, SystemDeepDive, HomepagePlaybookSection) | General offer/growth copy | "dream outcome" appears only in a code comment (not rendered) | SAFE | No change. |
| About / Founder section, application & qualification copy, navigation/footer, metadata/OG defaults, bonuses (`bonuses.ts`), guarantees (`guarantees.ts`) | General trust, proof, bonus, and guarantee concepts | General business/marketing concepts | SAFE — explicitly not to be rewritten per brief | No change. |

## Changes Made

1. **Field Guide #3** (`why-10-percent-off-isnt-an-offer`) — Replaced the four-variable, ↑/↓, `+`-joined "Value Equation" cosmetic relabel with an independent six-driver diagnostic: Customer Priority, Service Fit, Proof & Confidence, Ease to Start, Risk & Uncertainty, Reason to Act. New section heading "What Makes an Offer Easier to Say Yes To?" Visual changed from an equation-style `framework` block to six numbered diagnostic blocks (the `timeline` primitive, reused rather than adding a new component). The self-check tool was renamed "Offer Decision Check" and rebuilt around the same six drivers with STRONG/NEEDS WORK language and an explicit "planning diagnostic, not a validated model" disclaimer. Title, URL, premise, problem statement, before/after visual, examples, actions, and CTA are all unchanged.
2. **Field Guide #6** — Rebuilt from "The 5 Awareness Levels in Home Service Advertising" into "Match the Message to Buyer Readiness." Replaced the Schwartz taxonomy (Unaware / Problem Aware / Solution Aware / Product Aware / Most Aware) with an independent buyer-readiness progression (Notices the Symptom / Understands the Problem / Explores Options / Compares Providers / Ready to Move) and a message-job ladder (Recognize → Clarify → Evaluate → Trust → Act). Re-slugged `home-service-advertising-awareness-levels` → `home-service-buyer-readiness` with a permanent redirect. The "same service, five messages" example and the retargeting section were preserved as concepts and rewritten in the new language.
3. **Field Guide #2** — Retitled "The One Market, One Service, One Offer Framework" to "How to Build a Focused Home Service Campaign." Framework renamed "The Focused Campaign Chain" (Target Customer → Priority Service → Buying Problem → Offer → Next Step), rendered as an arrow/continuity chain (no `×`, no equation styling). Re-slugged `one-market-one-service-one-offer` → `focused-home-service-campaign` with a permanent redirect. Underlying concentration principle, problem statement, before/after visual, actions, and CTA preserved.
4. **`lib/config/systemComponents.ts`** — Updated the Offer Engineering and Demand Engine related-guide entries (title + href) to match the two renamed/re-slugged guides.
5. **`next.config.ts`** — Added two permanent (308) redirects, old slug → new slug, for Guides #2 and #6.
6. **`lib/config/fieldGuides.ts` (schema)** — Added two small, generic, backward-compatible fields to support the above without a new one-off component: `FieldGuide.frameworkSectionTitle?` (overrides the default "The Framework" heading) and `ScorecardVisual.statusLabels?` (overrides the default pass/warn/fail wording, since the existing default text — "On track / Worth checking / Likely a leak" — assumes a funnel-leak diagnostic that doesn't fit an offer decision check). Both default to prior behavior; every other guide is unaffected.
7. **`docs/field-guide-editorial-standard.md`** — Added a permanent "Source Synthesis Rule" (10-point standard) and a corresponding QA checklist line, so this discipline applies to every future guide, not just this cleanup.

## Items Reviewed and Kept

Everything in the "SAFE" rows above. In every case the concept is a broad marketing/business/psychology principle (proof, urgency, risk reduction, offers, qualification, buying-mode segmentation, seasonal demand, service economics, systems architecture) expressed in Lusso's own terminology, structure, and home-service examples — not a source's distinctive name, taxonomy, or diagram. Per the brief, these were **not** touched even though they use general concepts also discussed in marketing books:

- Local Dominance System's seven-component architecture
- Guide #1's constraint/lead diagnostic
- Guide #4's campaign-page message continuity
- Guide #5's Lead-to-Booked-Job operating measurement
- Guide #7's Job-to-Authority Flywheel
- Landscaping guide's Ticket/Margin/Demand/Capacity/Differentiation/Proof framework
- Plumbing guide's Urgent/Planned/Improvement buying-mode framework
- HVAC guide's Pre-Peak/Peak/Shoulder, Demand/Capacity matrix, and Create/Capture/Prioritize
- All 10 Deep Guides (scanned, no source-identical language found)
- Guarantees, bonuses, reviews, proof, risk reduction, CTAs, qualification, funnels, and follow-up as general concepts throughout the site

## URL Redirects

| Old URL | New URL | Type | Status |
| ------- | ------- | ---- | ------ |
| `/resources/one-market-one-service-one-offer` | `/resources/focused-home-service-campaign` | 308 permanent (`next.config.ts` → `redirects()`) | Verified locally: single-hop redirect, no chain, sitemap contains only the new URL, canonical/OG/schema/System-page/hub/homepage links all updated. |
| `/resources/home-service-advertising-awareness-levels` | `/resources/home-service-buyer-readiness` | 308 permanent (`next.config.ts` → `redirects()`) | Verified locally: single-hop redirect, no chain, sitemap contains only the new URL, canonical/OG/schema/System-page/hub/homepage links all updated. |

**Decision note on Guide #2's URL change:** the brief allowed keeping the existing URL if changing it "introduces materially unnecessary risk." It doesn't here: the guide only launched 2026-08-29 (same day as this audit), Search Console was only just connected, there is exactly one clean redirect hop to manage, and every internal reference (System page, hub, homepage, `relatedGuideSlugs` across five other guides, Article schema, sitemap) is generated from the single `slug` field in `lib/config/fieldGuides.ts` rather than hand-typed elsewhere — so the rename was mechanical and low-risk to verify. Proceeded with the change rather than keeping the old URL.

## Playbook Changes

**Website-facing playbook copy** (`/lead-to-booked-job-playbook`, `components/playbook/*.tsx`, `lib/config/playbook.ts`, `lib/emailTemplates/playbookDelivery.ts`) was scanned for the same risk terms — **no source-derived language found**. No changes made there.

**The PDF itself** (`public/resources/90-day-home-service-lead-to-booked-job-playbook.pdf`, 61 pages) does contain source-derived language, confirmed by extracting its text:

- **Page 46, "Offer Architecture"**: a four-quadrant visual (bigger desired outcome / more confidence it will work / less time to the result / less effort, risk, or sacrifice) plus the explicit formula "Desired outcome + specific deliverable + risk reduction + honest reason to act now" — a near-verbatim reproduction of Hormozi's Value Equation, including its numerator/denominator-style "AND" divider.
- **Page 60, "Framework references used in shaping this edition"**: explicitly cites "Alex Hormozi's $100M Offers for offer-value concepts and $100M Leads for lead-magnet and acquisition principles."

**This could not be fixed in this pass.** The brief instructs: *"Do NOT attempt a destructive binary PDF text replacement if an editable source exists."* The reverse situation applies here — **no editable source exists in this repository** (no InDesign/Figma/Canva file, no markdown/HTML-to-PDF generator, no page-preview design source — only the exported 1.9MB PDF binary and its JPEG page-preview exports). Directly patching text into the compressed PDF content streams would be exactly the kind of destructive binary edit the brief prohibits, and it would also leave page 46's four-box graphic layout broken (the six-driver replacement model needs a different grid, not a text swap inside the existing four boxes).

**Requires human action:** open the original design source for this PDF (wherever it was produced — Canva, Figma, InDesign, or similar; not present in this repo) and:

1. Replace page 46's heading/visual: **"Offer Decision Drivers + Architecture"** with the six-driver Lusso model (Customer Priority, Service Fit, Proof & Confidence, Ease to Start, Risk & Uncertainty, Reason to Act), presented as a checklist ("PRESSURE-TEST THE OFFER": Customer priority / Service fit / Proof / Next-step clarity / Uncertainty / Timing) rather than a formula or quadrant grid.
2. Remove the four-quadrant "bigger desired outcome / more confidence / less time / less effort-risk" graphic and the "Desired outcome + specific deliverable + risk reduction + honest reason to act now" formula.
3. On page 60, remove the "$100M Offers for offer-value concepts" clause once the offer section above is independently rebuilt (attribution is not a substitute for rewriting the content — see the Source Synthesis Rule).
4. Re-export the PDF, confirm the page count and any page-number cross-references still line up (checked: `lib/config/playbook.ts`'s `pageCount: 61` and `previewPages` reference pages 4, 8, 12, 19, 22, 53 — none of which are affected), replace the file at the existing path (`public/resources/90-day-home-service-lead-to-booked-job-playbook.pdf`) so the download link, email delivery, and cover/preview images keep working without any website code change, and confirm no old copy of the file is left reachable elsewhere.

No PDF binary was modified in this pass.

## Remaining Review Items

- **The Playbook PDF changes above** — flagged as requiring the original design source, which is outside this repository/session. Everything else in this audit was fully implemented.
- **Page 60's `$100M Leads` acquisition-principles citation** — left as a lower-priority note. It wasn't the guide's primary risk (the lead-generation sections of the extracted PDF text did not surface a Core Four/More-Better-New-style taxonomy), but if it is kept, it should be re-verified against the final page content once page 46 is rebuilt, since removing one framework claim from a shared credits page is a good moment to re-check the other.

## Originality Standard Going Forward

Codified as the **Source Synthesis Rule** in `docs/field-guide-editorial-standard.md` (10-point checklist + QA line), summarized: extract the principle, don't copy the source's name/taxonomy/diagram, translate it into the home-service operating problem, combine it with Lusso's own experience, create independent terminology and visuals, use Lusso/client examples, don't claim to have invented universal principles, and flag rather than publish (or attribute-and-ship) anything that can't be meaningfully re-expressed. This applies to every Field Guide, Deep Guide, and downloadable resource published after this audit.
