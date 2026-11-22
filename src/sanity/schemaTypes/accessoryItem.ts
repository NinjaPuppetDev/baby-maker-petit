import { defineType, defineField } from 'sanity';

export const accessoryItem = defineType({
  name: 'accessoryItem',
  title: 'Ropa & Accesorio / Wardrobe Item',
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
      name: 'title',
      title: 'Title / Nombre de la Prenda',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Heirloom Bonnets (Capotas)', value: 'bonnets' },
          { title: 'Fine Knitwear (Tejidos)', value: 'knitwear' },
          { title: 'Tailored Apparel (Sastrería)', value: 'tailoring' },
          { title: 'Magnetic Accessories (Accesorios Magnéticos)', value: 'magnetic' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label / Etiqueta de Categoría',
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
      name: 'materials',
      title: 'Materials / Materiales y Composición',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'craftsmanshipNotes',
      title: 'Craftsmanship Notes / Notas de Confección',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'compatibility',
      title: 'Compatibility / Medidas y Compatibilidad',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Foto de Portada',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images / Fotos Adicionales',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'status',
      title: 'Status / Disponibilidad',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta de Autor',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Atributos Clave',
      type: 'localeStringList',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'categoryLabel.es',
      media: 'coverImage',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ? `#${order} · ` : ''}${title || 'Untitled Accessory'}`,
        subtitle: subtitle || '',
        media,
      };
    },
  },
});
