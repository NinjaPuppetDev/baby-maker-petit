import { defineType, defineField } from 'sanity';

export const localeStringList = defineType({
  name: 'localeStringList',
  title: 'Localized String List',
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
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
