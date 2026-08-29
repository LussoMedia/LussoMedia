# Phase 5 Measurement Plan

No external APIs were connected to produce this document — it's a manual measurement plan for Peter (`admin@illussomedia.com`) to execute in Google Search Console once enough post-Phase-4 data accumulates (Phase 1's `/docs/search-console-setup.md` covers initial verification/submission; this extends it for the now-live resource library).

## Baseline Metrics to Record

### Site-Wide
From Search Console → Performance → Search Results (last 3 months once available): clicks, impressions, CTR, average position. Compare against the Phase 1 baseline already recorded in `/docs/search-console-exports/` if that was completed.

### Resources (`/resources/*`)
Filter Performance by page path `/resources/`. Track, per guide and for the hub overall:
- Which of the 10 guides are receiving impressions at all (some may take weeks to be indexed/crawled meaningfully)
- Which are receiving clicks
- The actual queries driving both
- CTR and average position per guide
- Trend over time (is a guide gaining or losing position?)

### Deep Guides (`/guides/*`)
Filter Performance by page path `/guides/`. Compare behavior against Field Guides side by side — Deep Guides have a head start (live since Phase 1) so this comparison is most useful after Field Guides have had a comparable amount of time indexed.

## Query Opportunity Rules

Apply these once query-level data exists — don't act on assumptions before then.

**High impressions + low CTR** → the page is being shown but not clicked. Review: does the title match the actual search intent? Is the meta description compelling? Is a competitor's snippet (rich results, ratings, sitelinks) outcompeting the plain listing?

**Position 5–20** → the page is being crawled and considered relevant but isn't winning. Review: does the content match the query's actual intent depth? Is there a missing section a competitor's top-ranking page has? Are there enough genuinely relevant internal links pointing to it (see the link graph in `/docs/phase-4k-resource-audit.md` Part 11 as the current baseline)?

**New/unexpected queries** → a query appears that no current page directly targets. This is a potential source of a new Field Guide, a new Deep Guide, a new industry-specific resource, or an FAQ addition — but **do not automatically create a page**. Cross-reference against the expansion rules in Part 25 below first.

**Cannibalization** → multiple Lusso URLs receiving impressions for the same meaningful query family. Investigate before touching any URL, canonical, or redirect. Start with the two pages flagged as "possible overlap" in `/docs/content-intent-map.md` (`hvac-demand-calendar` vs. `hvac-lead-generation-guide`) — check whether they're actually splitting demand or serving genuinely different searcher intents once real query data exists.

## Business Funnel (Beyond Search Traffic)

Search performance alone doesn't tell Lusso whether the resource library is working commercially. Track the fuller funnel where attribution allows:

```
Impressions
  ↓
Organic Clicks
  ↓
Field Guide Engagement (field_guide_view, action clicks — already instrumented)
  ↓
Local Dominance Score Starts
  ↓
Score Completions
  ↓
Playbook / Application Actions
  ↓
Sales Conversations
  ↓
Clients
```

Every step from "Field Guide Engagement" downward is already instrumented via the existing `AnalyticsEvent` taxonomy in `lib/analytics.ts` (`field_guide_*` events feed into `dominance_score_start`/`dominance_score_complete`/`application_*` events already in place). No new tracking needs to be built to observe this funnel — it needs GA4/GTM reporting configured to chain these events, which is a reporting task, not an engineering one.

## Content Expansion Rules (Not "Publish X Per Week")

**Create a new Field Guide when:**
- Search Console reveals meaningful, sustained query demand not covered by an existing page
- Sales conversations repeatedly surface the same unanswered problem
- An outbound prospect needs a specific educational asset that doesn't exist yet
- Existing content doesn't adequately answer the question at Field Guide depth
- Lusso has a genuinely distinct framework to teach (not a repackaging of an existing guide)
- Industry-specific knowledge would create unique value (see Part 26 discipline — never a generic template swap)

**Create a Deep Guide when:**
- Search intent requires comprehensive, long-form coverage
- The topic cannot be responsibly answered in a 2–4 minute Field Guide
- Sustained query demand justifies the depth investment

**Update existing content when:**
- A page ranks but underperforms (low CTR, weak position, per the rules above)
- Search intent for its topic has visibly evolved
- Better proof (a new case study, verified result) becomes available to strengthen it
- Lusso's actual strategy has improved since the page was written
- Search Console or user behavior reveals a missing section

**Do nothing when:**
- No evidence supports expansion — this is a valid, expected outcome, not a failure to find work. Phase 4 intentionally stopped at 10 Field Guides rather than continuing to publish speculatively; Phase 5 should hold that same discipline until data says otherwise.
