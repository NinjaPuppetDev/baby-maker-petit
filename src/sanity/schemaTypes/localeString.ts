import { defineType, defineField } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
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
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
