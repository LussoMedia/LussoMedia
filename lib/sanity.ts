import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-01';

// Only create the client when projectId is present (avoids build errors before Sanity is set up)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;

function getClient() {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: true });
  }
  return _client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): any {
  const c = getClient();
  if (!c) return { url: () => '', width: () => ({ height: () => ({ url: () => '' }) }) };
  return imageUrlBuilder(c).image(source);
}

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  const c = getClient();
  if (!c) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return await (c.fetch(query, params ?? {}) as Promise<T>);
  } catch (error) {
    console.error('[Sanity] Fetch error:', error);
    return null;
  }
}
