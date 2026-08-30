import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Public Framework Originality Audit (Changes 3 & 4) — both Field Guides
  // were re-slugged to remove source-derivative naming. Permanent redirects
  // so neither old URL stays indexable. See /docs/public-framework-
  // originality-audit.md.
  async redirects() {
    return [
      {
        source: '/resources/one-market-one-service-one-offer',
        destination: '/resources/focused-home-service-campaign',
        permanent: true,
      },
      {
        source: '/resources/home-service-advertising-awareness-levels',
        destination: '/resources/home-service-buyer-readiness',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
