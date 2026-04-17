import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'business',
      title: 'Business Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'result',
      title: 'Result Metric',
      type: 'string',
      description: 'e.g. "+40% inbound leads in 90 days"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Client Photo (optional)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'business' },
  },
});
