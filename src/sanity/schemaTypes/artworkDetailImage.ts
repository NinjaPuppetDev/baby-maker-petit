import { defineType, defineField } from 'sanity';

export const artworkDetailImage = defineType({
  name: 'artworkDetailImage',
  title: 'Artwork Detail Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text (for accessibility)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Detail Title',
      type: 'localeString',
    }),
    defineField({
      name: 'caption',
      title: 'Detail Caption',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'title.es',
      subtitle: 'title.en',
    },
    prepare({ media, title, subtitle }) {
      return {
        title: title || 'Detail image',
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
