# Content Intent Map — Field Guides × Deep Guides

Search-intent comparison across all 20 educational pages on the site (10 Field Guides + 10 Deep Guides). Built for Phase 5 Search Console observation — no merges, redirects, or canonical changes were made based on this map. Decisions on genuine overlap should wait for real query data.

## Field Guides

| URL | Primary Intent | Secondary Intent | Content Type | Likely Search-Topic Family | Closest Related Page | Competes? |
|---|---|---|---|---|---|---|
| `/resources/why-more-leads-wont-fix-growth` | Diagnostic: "why isn't more marketing working" | Funnel-stage measurement | Field Guide (short, visual) | "more leads not converting," "home service growth stuck" | Deep Guide `how-to-qualify-home-service-leads` | **Safe cluster** — Field Guide is the whole-funnel diagnosis; Deep Guide is one stage's tactic |
| `/resources/one-market-one-service-one-offer` | "how to structure an ad campaign" | Message concentration | Field Guide | "home service advertising strategy," "contractor ad focus" | None on site | **Safe cluster** — no existing page targets this |
| `/resources/why-10-percent-off-isnt-an-offer` | "should I discount to get more leads" | Offer/value construction | Field Guide | "home service offer ideas," "contractor discount marketing" | None on site | **Safe cluster** |
| `/resources/stop-sending-paid-traffic-to-your-homepage` | "where should my ads land" | Landing page vs. homepage | Field Guide | "landing page for contractors," "should ads go to homepage" | None on site | **Safe cluster** |
| `/resources/lead-to-booked-job-system` | "what metrics should I track after a lead comes in" | Operating visibility | Field Guide | "lead to booked job," "contractor sales metrics" | Deep Guide `speed-to-lead-for-contractors`, `how-to-qualify-home-service-leads` | **Safe cluster** — Field Guide is the full operating map; Deep Guides are single-stage tactics it references conceptually but doesn't compete with |
| `/resources/home-service-advertising-awareness-levels` | "why doesn't my ad work for everyone" | Message/creative strategy | Field Guide | "advertising awareness levels," "contractor ad messaging" | None on site | **Safe cluster** |
| `/resources/job-to-authority-flywheel` | "how to get more proof/reviews from completed jobs" | Content/reputation systemization | Field Guide | "contractor content strategy," "home service project photography" | None on site | **Safe cluster** |
| `/resources/landscaping-what-to-advertise` | "what landscaping service should I advertise" | Service-line economics | Field Guide, industry-specific | "landscaping marketing strategy," "what to advertise landscaping" | Deep Guide `landscaping-design-deposit-strategies` | **Safe cluster** — Deep Guide covers one specific offer tactic (design deposits); Field Guide covers service-selection strategy generally. Different questions. |
| `/resources/plumbing-types-of-demand` | "how to market different plumbing situations" | Buyer-state segmentation | Field Guide, industry-specific | "plumbing marketing campaigns," "plumbing customer intent" | Deep Guide `plumbing-lead-follow-up-systems` | **Safe cluster** — Deep Guide covers post-lead follow-up; Field Guide covers pre-click campaign/message architecture. Different funnel stages. |
| `/resources/hvac-demand-calendar` | "how to market HVAC by season/capacity" | Operating-capacity planning | Field Guide, industry-specific | "HVAC seasonal marketing," "HVAC capacity planning" | Deep Guide `hvac-lead-generation-guide` | **Possible overlap, monitor** — both discuss seasonality and capacity, but the Deep Guide is a general strategic overview while the Field Guide is a specific decision framework (the demand/capacity matrix). Flagged for Search Console observation once both have query data. |

## Deep Guides

| URL | Primary Intent | Secondary Intent | Content Type | Likely Search-Topic Family | Closest Related Page | Competes? |
|---|---|---|---|---|---|---|
| `/guides/how-to-qualify-home-service-leads` | "how to qualify leads" | Fit/urgency/budget filtering | Deep Guide (long-form) | "lead qualification," "home service lead qualification" | Field Guide `why-more-leads-wont-fix-growth` | **Safe cluster** (see above) |
| `/guides/speed-to-lead-for-contractors` | "how fast to respond to leads" | Response-time systems | Deep Guide | "speed to lead," "contractor response time" | Field Guide `lead-to-booked-job-system` | **Safe cluster** (see above) |
| `/guides/hvac-lead-generation-guide` | "HVAC lead generation strategy" | Replacement vs. service-call demand | Deep Guide, industry-specific | "HVAC lead generation," "HVAC marketing" | Field Guide `hvac-demand-calendar` | **Possible overlap, monitor** (see above) |
| `/guides/plumbing-lead-follow-up-systems` | "plumbing follow-up systems" | Post-estimate follow-up cadence | Deep Guide, industry-specific | "plumbing lead follow-up," "plumbing follow-up system" | Field Guide `plumbing-types-of-demand` | **Safe cluster** (see above) |
| `/guides/how-contractors-gain-local-market-share` | "how to gain local market share" | Visibility/reputation compounding loop | Deep Guide | "contractor market share," "how to grow local market share" | Deep Guide `referral-dependence-limits-contractor-growth` | **Safe cluster** — complementary angles (compounding loop vs. referral ceiling), not redundant |
| `/guides/roofing-lead-qualification` | "roofing lead qualification" | Urgency/insurance/ownership filtering | Deep Guide, industry-specific | "roofing lead qualification" | None on site | **Safe cluster** |
| `/guides/st-george-contractor-marketing` | "St. George / Southern Utah contractor marketing" | Local geo market conditions | Deep Guide, geo-targeted | "St. George contractor marketing," "Southern Utah marketing" | Deep Guide `how-contractors-gain-local-market-share` | **Safe cluster**, but flagged separately in Part 17 as a positioning (not intent) question — see `/docs/existing-guides-audit.md` and `/docs/phase-4k-resource-audit.md` |
| `/guides/landscaping-design-deposit-strategies` | "landscaping design deposit" | Qualification via deposit mechanism | Deep Guide, industry-specific | "landscaping design deposit," "qualify landscaping leads" | Field Guide `landscaping-what-to-advertise` | **Safe cluster** (see above) |
| `/guides/referral-dependence-limits-contractor-growth` | "why referrals aren't enough" | Demand-source diversification | Deep Guide | "referral dependence," "contractor growth beyond referrals" | Deep Guide `how-contractors-gain-local-market-share` | **Safe cluster** — complementary |
| `/guides/ev-charger-marketing-for-electricians` | "EV charger marketing" | Emerging-category demand generation | Deep Guide, industry-specific | "EV charger marketing," "electrician EV charger leads" | None on site | **Safe cluster** |

## Summary

- **17 of 20 pages: safe clusters** — clearly complementary, different depth, different funnel stage, or no comparable page exists.
- **2 pages (1 pair): possible overlap flagged for monitoring** — `hvac-demand-calendar` (Field Guide) and `hvac-lead-generation-guide` (Deep Guide). Both are legitimate, non-redundant content today (one is a specific decision framework, the other a strategic overview), but they're the closest topical pair on the site and should be the first thing checked once Search Console has enough HVAC-related query data to see whether they're splitting the same search demand.
- **0 pages found truly redundant.** No merge, redirect, or canonicalization action is recommended. This map should be revisited with real Search Console data in Phase 5, per `/docs/phase-5-measurement-plan.md`.
