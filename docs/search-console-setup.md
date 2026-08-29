# Search Console Setup — Lusso Media

The codebase cannot verify or read Google Search Console directly — this is a manual checklist for the site operator (`admin@illussomedia.com`) to complete in the [Search Console](https://search.google.com/search-console) UI.

1. **Verify the Domain property** for `illussomedia.com` (not just a URL-prefix property) — this covers `http`, `https`, `www`, and non-`www` under one property. Domain verification is done via a DNS TXT record at the registrar.
2. **Submit the XML sitemap** — `Sitemaps` → add `https://illussomedia.com/sitemap.xml`.
3. **Inspect the homepage** (`https://illussomedia.com/`) via URL Inspection — confirm it's indexed and request indexing if not.
4. **Inspect the System page** (`/system`).
5. **Inspect the Results page** (`/results`) and spot-check one case study (`/results/full-curl-landscaping`).
6. **Inspect the major industry pages** — at minimum `/hvac`, `/plumbing`, `/roofing`, `/landscaping` (the four most search-relevant verticals); spot-check the remaining four (`/concrete`, `/electrical`, `/remodeling`, `/general-contractors`) as time allows.
7. **Review Page Indexing** (`Indexing` → `Pages`) — confirm no unexpected "Excluded" or "Discovered — not indexed" pages, and that `/book`, `/playbook-thank-you`, `/plan-confirmed` show as intentionally "Excluded by noindex tag" (not an error).
8. **Review Core Web Vitals** (`Experience` → `Core Web Vitals`) — check both Mobile and Desktop reports for URLs flagged Poor/Needs Improvement.
9. **Review Manual Actions** (`Security & Manual Actions` → `Manual actions`) — confirm none present.
10. **Review Security Issues** (`Security & Manual Actions` → `Security issues`) — confirm none present.
11. **Record baseline Clicks** (`Performance` → `Search results`, last 3 months) for future before/after comparison.
12. **Record baseline Impressions** (same report).
13. **Record baseline Average Position** (same report).
14. **Record baseline CTR** (same report).
15. **Export Top Queries** (`Performance` → filter by Query, export to CSV).
16. **Export Top Landing Pages** (`Performance` → filter by Page, export to CSV).

Keep the exports from #15–16 alongside this file (e.g. `docs/search-console-exports/`) so future SEO work has a real before/after baseline to compare against.
