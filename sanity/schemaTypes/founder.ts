import { defineType, defineField } from 'sanity';

export const founder = defineType({
  name: 'founder',
  title: 'Founder Section',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Founder Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          initialValue: 'Pete — Founder, Lusso Media',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph of the founder bio',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value', description: 'e.g. "15+"' }),
            defineField({ name: 'label', type: 'string', title: 'Label', description: 'e.g. "Clients Served"' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'photo.alt', media: 'photo' },
    prepare() {
      return { title: 'Founder Section' };
    },
  },
});
