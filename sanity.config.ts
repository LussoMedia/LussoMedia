'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'lusso-media',
  title: 'Lusso Media — Content Studio',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('clientLogo').title('Client Logos'),
            S.divider(),
            S.documentTypeListItem('founder').title('Founder Section'),
            S.documentTypeListItem('siteSettings').title('Site Settings'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
