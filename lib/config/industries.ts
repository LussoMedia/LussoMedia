// Homepage-level industry list (qualification microcopy + Industries section).
// Full vertical landing pages (/hvac, /plumbing, etc.) are a later phase —
// this config is written so those pages can consume the same entries later.

export interface Industry {
  slug: string;
  name: string;
}

export const industries: Industry[] = [
  { slug: 'hvac', name: 'HVAC' },
  { slug: 'plumbing', name: 'Plumbing' },
  { slug: 'roofing', name: 'Roofing' },
  { slug: 'landscaping', name: 'Landscaping' },
  { slug: 'concrete', name: 'Concrete & Hardscaping' },
];

export const industryQualifierLabel = 'High-Value Home Services';
