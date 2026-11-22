import { defineType, defineField } from 'sanity';

export const offer = defineType({
  name: 'offer',
  title: 'Oferta / Primary Offer Card',
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
      title: 'Unique Key / ID',
      type: 'string',
      description: 'e.g. babies, courses, accessories-clothes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Tag / Categoría',
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
      name: 'description',
      title: 'Description / Descripción',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta Destacada',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Feature Highlights / Puntos Destacados',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image / Imagen de Tarjeta',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text / Texto Alternativo',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Destination Link / Enlace de Destino',
      type: 'string',
      description: 'e.g. /work, /courses, /accessories',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text / Texto del Botón',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
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
        title: `${order ? `#${order} · ` : ''}${title || 'Untitled Offer'}`,
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
