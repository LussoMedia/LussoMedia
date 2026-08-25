// Best-effort in-memory rate limiter for public lead-capture endpoints.
//
// Limitation: state lives in the serverless function's memory, so it only
// limits requests hitting the same warm instance — a cold start or a
// request routed to a different instance resets the count. That's an
// acceptable tradeoff for "stop a naive script from spamming the inbox";
// it is NOT a guarantee against a determined/distributed attacker. If this
// ever needs to be airtight, replace the Map below with a shared store
// (Vercel KV / Upstash Redis) keyed the same way.

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

// Periodically drop stale entries so the Map doesn't grow unbounded across
// a long-lived warm instance.
const MAX_BUCKETS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    if (buckets.size > MAX_BUCKETS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey) buckets.delete(oldestKey);
    }
    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count };
}

// Best-effort client identifier from standard proxy headers (Vercel sets
// x-forwarded-for). Falls back to a constant so requests without any
// identifying header still share a (very conservative) global bucket
// rather than bypassing the limiter entirely.
export function getClientKey(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
