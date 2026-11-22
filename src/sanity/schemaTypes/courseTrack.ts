import { defineType, defineField } from 'sanity';

export const courseTrack = defineType({
  name: 'courseTrack',
  title: 'Curso / Masterclass Track',
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
      name: 'slug',
      title: 'Identifier / Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Título',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Subtítulo',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Duración',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level / Nivel',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format / Formato',
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
      name: 'curriculum',
      title: 'Curriculum Points / Módulos del Temario',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'includes',
      title: 'Included Materials / Materiales Incluidos',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image / Imagen de Masterclass',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text / Texto Alternativo',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'subtitle.es',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ? `#${order} · ` : ''}${title || 'Untitled Track'}`,
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
