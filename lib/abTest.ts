'use client';

// Lightweight, reusable A/B test assignment (Part 21 — modular so tests
// don't require a rebuild). Assignment is deterministic per visitor via
// localStorage so they see the same variant on repeat visits, and fires an
// `ab_test_assigned` dataLayer event the first time so GA4/GTM can segment
// conversion by variant (join on the existing CTA-click events' variant
// property for the actual comparison).

import { trackEvent } from './analytics';

const STORAGE_PREFIX = 'lusso_ab_';

export function getVariant(testName: string, variants: readonly string[]): string {
  if (typeof window === 'undefined' || variants.length === 0) return variants[0];

  const key = `${STORAGE_PREFIX}${testName}`;
  try {
    const stored = localStorage.getItem(key);
    if (stored && variants.includes(stored)) return stored;

    const assigned = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(key, assigned);
    trackEvent('ab_test_assigned', { test_name: testName, variant: assigned });
    return assigned;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall back to the
    // first variant rather than breaking the page.
    return variants[0];
  }
}
