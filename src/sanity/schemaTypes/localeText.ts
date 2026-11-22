import { defineType, defineField } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fieldsets: [
    {
      name: 'translations',
      title: 'Translations',
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: 'es',
      title: 'Español (ES)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
