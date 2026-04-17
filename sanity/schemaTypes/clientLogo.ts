import { defineType, defineField } from 'sanity';

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client Logos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Business Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo (PNG, transparent background)',
      type: 'image',
      options: { hotspot: false },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the marquee',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
});
