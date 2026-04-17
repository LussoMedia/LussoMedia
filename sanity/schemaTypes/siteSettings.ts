import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'e.g. hello@illussomedia.com',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'e.g. illussomedia (no @)',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok Handle',
      type: 'string',
      description: 'e.g. illussomedia (no @)',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Company Slug',
      type: 'string',
      description: 'e.g. illussomedia',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
