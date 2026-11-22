import { defineType, defineField } from 'sanity';

export const worldTerritory = defineType({
  name: 'worldTerritory',
  title: 'Mundo & Horizontes / World Exploration Territory',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order / Orden',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'idKey',
      title: 'Identifier Key',
      type: 'string',
      description: 'e.g. silicone-sculpture, fantasy-mythos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Subtítulo',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description / Descripción',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus Areas / Vectores de Investigación',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artisticConcept',
      title: 'Artistic Concept / Concepto Artístico',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'tagline.es',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ? `#${order} · ` : ''}${title || 'Untitled Territory'}`,
        subtitle: subtitle || '',
      };
    },
  },
});
