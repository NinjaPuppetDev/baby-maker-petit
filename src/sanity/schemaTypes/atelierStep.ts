import { defineType, defineField } from 'sanity';

export const atelierStep = defineType({
  name: 'atelierStep',
  title: 'Paso de Atelier / Craft Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number / Número de Paso',
      type: 'string',
      description: 'e.g. 01, 02, 03',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order / Orden',
      type: 'number',
      initialValue: 1,
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
      name: 'description',
      title: 'Description / Descripción',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Technical Details / Detalles Técnicos',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Process Image / Imagen del Proceso',
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
      stepNumber: 'stepNumber',
      media: 'image',
    },
    prepare({ title, subtitle, stepNumber, media }) {
      return {
        title: `${stepNumber ? `Paso ${stepNumber}: ` : ''}${title || 'Untitled Step'}`,
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
