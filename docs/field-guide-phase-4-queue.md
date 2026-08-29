# Field Guide Phase 4 Content Queue

Recommended first batch, per the Phase 3 master prompt. Titles and primary concepts only — Phase 4 writes the actual content against `/docs/field-guide-editorial-standard.md` and the content model in `lib/config/fieldGuides.ts` (see `lib/config/fieldGuides.template.ts` for the copy-paste scaffold).

1. **Why More Leads Won't Fix a Broken Home Service Growth System**
   Category: Revenue Intelligence
   Primary concept: Find the constraint before increasing demand.

2. **The One Market, One Service, One Offer Framework**
   Category: Offer Engineering
   Primary concept: Concentrated messaging beats diluted advertising.

3. **Why "10% Off" Isn't a Home Service Offer**
   Category: Offer Engineering
   Primary concept: Discounting and perceived value are not the same thing.

4. **Stop Sending Paid Traffic to Your Homepage**
   Category: Conversion Infrastructure
   Primary concept: Match campaign traffic to one conversion objective.

5. **The Lead-to-Booked-Job System**
   Category: Revenue Intelligence
   Primary concept: Identify where opportunities stop becoming revenue.

6. ~~**Before Spending Another $1 on Ads, Find Your Growth Constraint**~~
   **RETIRED — concept absorbed by Field Guide #1.**
   Category: Market Intelligence
   Primary concept: Different constraints require different solutions.

   Phase 4F: not published as a standalone guide. Field Guide #1
   (*Why More Leads Won't Fix a Broken Home Service Growth System*,
   `/resources/why-more-leads-wont-fix-growth`) already owns this exact
   concept — "find the constraint before increasing demand." Publishing
   this as a second, separate resource would have created redundant user
   value, overlapping search intent, unnecessary internal competition
   between two Lusso pages, and a weaker overall content architecture.
   This planning note is kept (not deleted) as a historical record of why
   the queue's original item 6 was retired rather than written.

## Notes for Phase 4

- Each of these maps cleanly to an existing visual primitive already built in `components/resources/visuals.tsx`: #1 and #5 suit a `funnel` or `leakMap`; #2 suits `framework`; #3 suits `beforeAfter` or `scorecard`; #4 suits `beforeAfter` (generic homepage vs. dedicated landing page) or `screenshot` annotation; #6 suits `decisionTree`.
- None of these have been written yet — this file is a queue, not a draft.
- Two dev-only demo guides (`dev-demo-lead-leak`, `dev-demo-visual-gallery`) exist in `lib/config/fieldGuides.ts` with `draft: true` purely to exercise the template/visual system. They should stay draft and are excluded from every production surface (see Phase 3 report). Do not treat them as content — replace them with the real guides above when Phase 4 starts, or leave them as permanent dev fixtures.
- Once at least one guide from this queue ships with `draft: false`, flip on: `/resources` hub indexing (`app/resources/page.tsx`), the sitemap entry (automatic), the Growth Tools nav dropdown entry (commented block in `components/nav/GrowthToolsDropdown.tsx`), and the footer link (commented line in `lib/config/navigation.ts`).
