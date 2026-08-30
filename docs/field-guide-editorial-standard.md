# Lusso Field Guide Editorial Standard

## Purpose

Field Guides are Lusso's educational authority layer at `/resources/[slug]`. They exist to help a cold or warm prospect understand Lusso's thinking, spot a weakness in their own business, learn one useful principle, and take an immediate, real action — whether or not they ever become a client. They are not blog content written to rank for keywords; they are strategy briefs written to be genuinely useful in under 4 minutes.

## Target Audience

An established home-service business owner or operator — not a marketer, not a beginner. Assume real operating experience and low patience for fluff. Write the way you'd explain something to a smart operator over coffee, not the way you'd write a blog post for search engines.

## The 2–4 Minute Rule

Target read time: **2–4 minutes**. Maximum: **5 minutes**. Approximate body-copy target: **500–900 words** across the Problem, Why It Happens, Framework intro, Actions, and Next Step supporting copy combined (visuals and headings don't count toward this). This is an operational discipline, not a Google SEO requirement — do not pad a guide to hit a word count, and do not let it run long because the topic "deserves more."

## The One-Idea Rule

**Maximum one primary principle per guide.** If explaining the topic well requires two major ideas, it is two guides, not one with two sections. Test: can you state the guide's core idea in one sentence before writing it? If not, narrow the topic.

- Good: *Why More Leads Won't Fix Growth* — one idea: find the constraint before increasing demand.
- Good: *Why Your Homepage Shouldn't Be Your Landing Page* — one idea: message/conversion continuity.
- Bad: *The Complete Guide to Home Service Marketing* — too broad, no single idea.

## Six-Part Structure

Every Field Guide follows the same six sections, implemented by `components/resources/FieldGuideTemplate.tsx`:

1. **The Problem** (75–125 words) — name what the owner is likely doing, make relevance immediate.
2. **See It** — one primary visual (funnel, before/after, leak map, scorecard, decision tree, timeline, or metric callout) that communicates the main idea in seconds.
3. **Why It Happens** (150–250 words, 2–4 concepts) — short labeled concepts, never a paragraph wall.
4. **The Framework** — Lusso's way of thinking about the problem, usually the guide's core IP, shown as a visual.
5. **Do This This Week** — exactly 1–3 actions, each specific, practical, and doable without hiring Lusso.
6. **Next Step** — exactly one CTA (Score, Playbook, System, Results, or Apply). Never multiple competing CTAs.

An optional **Quick Check** (Yes/No diagnostic, never a data-collecting form) may sit between Framework and Actions when it genuinely aids comprehension.

## Visual Requirement

Every guide must have at least one real visual for "See It" and one for "The Framework" (they may be the same type used differently). A guide with no visual has failed the format — it is not a Field Guide, it is an article. Use the primitives in `components/resources/visuals.tsx`; do not hand-roll a one-off diagram in a single guide's markup.

## Three-Action Maximum

"Do This This Week" never exceeds 3 actions. Fewer is fine. Each action must be:
- specific enough to execute today
- achievable without hiring Lusso
- written as an instruction, not a concept ("Calculate your lead-to-booked-job rate," not "Think about your conversion rate")

## CTA Rules

Exactly one CTA per guide, in the Next Step section, chosen from: Local Dominance Score, 90-Day Playbook, Local Dominance System, Results, or Apply. Never stack two CTAs competing for the same click. Related-guide links in "Continue Learning" are not CTAs — they're internal navigation, capped at 2–3.

## SEO Rules

Every guide needs a unique `metaTitle`, `metaDescription`, self-referencing canonical (handled automatically by the route), Open Graph image (generated automatically per guide), `Article` + `BreadcrumbList` JSON-LD (emitted automatically), and semantic headings (`h1`/`h2` from the template, never manually overridden). No keyword stuffing, no fabricated dates, no invented author expertise. See Part 21/22 of the Phase 3 master prompt for the full list — this content model enforces all of it structurally, so an author only has to fill in real content.

## Voice

Direct, operator-to-operator, confident without hype. No "unlock," "supercharge," "game-changing." Say what's true plainly. Numbers and specifics beat adjectives.

## What We Publish

What/Why/Framework/Diagnosis/Examples/Action steps drawn from: market selection, offer engineering, conversion infrastructure, demand generation, advertising psychology, authority, reputation, revenue intelligence, local SEO, and lead-to-booked-job optimization.

## What Stays Proprietary

Never publish:
- exact client deployment SOPs or internal automation architecture
- internal Claude/AI prompts
- internal optimization thresholds or reporting systems
- private campaign structures or client-confidential information
- detailed implementation playbooks intended only for Lusso operators

A guide should teach the *principle* clearly enough to act on, without handing over the operational manual for running it at Lusso's scale.

## Proof & Claim Discipline

Reference real Lusso/client results only when verified against `lib/config/caseStudies.ts`. Never invent metrics, exaggerate outcomes, imply causation the data doesn't support, or publish confidential business information. If a proof block references a client result, it must trace to an already-approved, on-site claim.

## QA Checklist

Before a guide ships (flip `draft: false`):

- [ ] One core idea, statable in one sentence
- [ ] `problem` is 75–125 words and makes relevance immediate
- [ ] `seeIt` visual communicates the idea in seconds, has an accessible label
- [ ] `whyItHappens` has 2–4 concepts, no paragraph walls
- [ ] `framework` visual shows Lusso's actual thinking, not a generic diagram
- [ ] `actions` has 1–3 items, each executable today without Lusso
- [ ] `nextStepCTA` is exactly one CTA
- [ ] `metaTitle` / `metaDescription` are unique and accurate
- [ ] No proprietary SOPs, prompts, thresholds, or client-confidential detail
- [ ] Every metric/claim traces to verified, already-published data
- [ ] Read time is realistically 2–5 minutes (`getReadTime()` or a manual `readTimeMinutes` reflects this)
- [ ] `relatedGuideSlugs` (if any) resolve to real, published guides
- [ ] Validated via `lib/config/fieldGuides.ts`'s build-time checks (`npx tsc --noEmit` / `next build` must pass)
- [ ] Passes the Source Synthesis Rule below

## Source Synthesis Rule

Added by the Public Framework Originality Audit (`/docs/public-framework-originality-audit.md`) — permanent, applies to every guide going forward.

Lusso is allowed to apply general marketing, sales, advertising, psychology, and business principles. It should never present a framework learned from a book, course, video, or other practitioner through a substantially identical name, taxonomy, diagram, equation, step sequence, or distinctive wording. A matching individual word is not automatically a problem — context decides. Five labels presented together as someone else's named model is a different thing than one of those words appearing in an ordinary sentence.

When an idea originates from books, courses, videos, research, or other practitioners:

1. Extract the underlying principle.
2. Do not copy the source's distinctive framework name.
3. Do not recreate its exact diagram/taxonomy.
4. Translate the principle into the home-service operating problem.
5. Combine it with Lusso's own experience and other relevant principles.
6. Create independent terminology.
7. Create an original visual structure.
8. Use Lusso/client examples rather than source examples.
9. Do not claim Lusso invented universal principles (proof, urgency, risk reduction, offers, qualification, follow-up, and similar broad concepts belong to no one).
10. If the only useful presentation is substantially the source's named framework, flag it for human review rather than publishing it as Lusso IP. Do not add attribution as a substitute for independent synthesis — a source-identical framework plus a citation is still a source-identical framework. The standard is independent expression, not "framework + footnote."
