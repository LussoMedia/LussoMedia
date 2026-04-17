import { defineType, defineField } from 'sanity';

const tags = [
  { title: 'Launch Campaign', value: 'Launch Campaign' },
  { title: 'Lead Generation', value: 'Lead Generation' },
  { title: 'Brand Authority', value: 'Brand Authority' },
  { title: 'Audience Growth', value: 'Audience Growth' },
];

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Client / Business Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'e.g. "HVAC / Home Services"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Category Tag',
      type: 'string',
      options: { list: tags, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'built',
      title: 'What We Built',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'result',
      title: 'Key Result',
      type: 'string',
      description: 'e.g. "67% reduction in cost-per-lead"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Client / Project Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'industry', media: 'image' },
  },
});
