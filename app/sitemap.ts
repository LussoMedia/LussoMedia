import type { MetadataRoute } from 'next';

// Only lists routes that exist today. As /system, /results, vertical pages,
// /local-dominance-score, and /apply are built in later phases, add them
// here — this file is the single source of truth for the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://illussomedia.com';
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/local-dominance-score`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    // /book is intentionally excluded — noindexed, gated behind qualification.
  ];
}
