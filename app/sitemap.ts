import type { MetadataRoute } from 'next';
import { caseStudies } from '@/lib/config/caseStudies';
import { industryPages } from '@/lib/config/industryPages';
import { playbook } from '@/lib/config/playbook';
import { guides } from '@/lib/config/guides';

// Single source of truth for the sitemap — pulls case studies and
// vertical pages from their config so new entries there show up here
// automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://illussomedia.com';
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/system`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/results`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...caseStudies.map((cs) => ({
      url: `${base}/results/${cs.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...industryPages.map((i) => ({
      url: `${base}/${i.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${base}/apply`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/local-dominance-score`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}${playbook.href}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/guides`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...guides.map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: new Date(g.updatedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    // /book is intentionally excluded — noindexed, gated behind qualification.
  ];
}
