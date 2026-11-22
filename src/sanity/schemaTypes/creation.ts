import { defineType, defineField } from 'sanity';

export const creation = defineType({
  name: 'creation',
  title: 'Creación / Artwork',
  type: 'document',
  groups: [
    { name: 'general', title: '1. General Info', default: true },
    { name: 'media', title: '2. Images & Gallery' },
    { name: 'editorial', title: '3. Story & Descriptions' },
    { name: 'specs', title: '4. Technical Details' },
    { name: 'provenance', title: '5. Provenance & Certificate' },
  ],
  fields: [
    // --- 1. General Info ---
    defineField({
      name: 'title',
      title: 'Artwork Name / Nombre de la Obra',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL identifier)',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series / Colección',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Reborn Hyperrealism', value: 'Reborn Hyperrealism' },
          { title: 'Atelier Studies', value: 'Atelier Studies' },
          { title: 'Sculptural Exploration', value: 'Sculptural Exploration' },
        ],
        layout: 'radio',
      },
      initialValue: 'Reborn Hyperrealism',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status / Disponibilidad',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Private Collection (Colección Privada)', value: 'Private Collection' },
          { title: 'Available on Inquiry (Disponible bajo consulta)', value: 'Available on Inquiry' },
          { title: 'Atelier Archive (Archivo de Taller)', value: 'Atelier Archive' },
          { title: 'Atelier Study (Estudio de Taller)', value: 'Atelier Study' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Private Collection',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year Created / Año',
      type: 'number',
      group: 'general',
      initialValue: new Date().getFullYear(),
      validation: (Rule) => Rule.required().min(2018).max(2040),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Artwork (Destacado)',
      type: 'boolean',
      group: 'general',
      initialValue: false,
    }),

    // --- 2. Media ---
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Foto de Portada)',
      type: 'image',
      group: 'media',
      description: 'The main portrait shown in the gallery cards and header.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images (Galería Adicional)',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'detailImages',
      title: 'Macro & Detail Studies (Detalles con Explicación)',
      type: 'array',
      group: 'media',
      of: [{ type: 'artworkDetailImage' }],
    }),

    // --- 3. Story & Descriptions ---
    defineField({
      name: 'description',
      title: 'Short Description / Resumen',
      type: 'localeText',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Artistic Story / Narrativa y Concepto',
      type: 'localeText',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'craftNotes',
      title: 'Craft & Atelier Notes / Notas de Taller y Creación',
      type: 'localeText',
      group: 'editorial',
      validation: (Rule) => Rule.required(),
    }),

    // --- 4. Technical Specs ---
    defineField({
      name: 'medium',
      title: 'Medium / Materiales',
      type: 'string',
      group: 'specs',
      description: 'e.g. Genesis Heat-Set Oils on German Soft Vinyl, Micro-Rooted Angora Mohair',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technique',
      title: 'Technique / Técnica',
      type: 'text',
      rows: 2,
      group: 'specs',
      description: 'e.g. Single-strand micro-rooting (42G), 28 translucent subdermal glaze layers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weight',
      title: 'Weight / Peso',
      type: 'string',
      group: 'specs',
      placeholder: '2.7 kg / 5.95 lbs',
    }),
    defineField({
      name: 'length',
      title: 'Length / Longitud',
      type: 'string',
      group: 'specs',
      placeholder: '50.8 cm / 20.0 in',
    }),
    defineField({
      name: 'sculptorKit',
      title: 'Sculptor Kit Name / Kit Base',
      type: 'string',
      group: 'specs',
      placeholder: 'Joseph (3-Month Infant)',
    }),
    defineField({
      name: 'originalSculptor',
      title: 'Original Sculptor / Escultor Original',
      type: 'string',
      group: 'specs',
      placeholder: 'Bountiful Baby Studio',
    }),
    defineField({
      name: 'eyeDetails',
      title: 'Eye Details / Ojos',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'hairDetails',
      title: 'Hair Details / Cabello',
      type: 'string',
      group: 'specs',
    }),
    defineField({
      name: 'dateCreated',
      title: 'Creation Date / Fecha de Creación',
      type: 'date',
      group: 'specs',
    }),

    // --- 5. Provenance & Certificate ---
    defineField({
      name: 'hasCertificate',
      title: 'Certificate of Authenticity Issued?',
      type: 'boolean',
      group: 'provenance',
      initialValue: true,
    }),
    defineField({
      name: 'certificateDate',
      title: 'Certificate Date / Fecha del Certificado',
      type: 'string',
      group: 'provenance',
      placeholder: '23/07/2021',
      hidden: ({ parent }) => !parent?.hasCertificate,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      series: 'series',
      year: 'year',
      media: 'coverImage',
      status: 'status',
    },
    prepare({ title, series, year, media, status }) {
      return {
        title: title || 'Untitled',
        subtitle: `${year ? `${year} · ` : ''}${series || ''} [${status || ''}]`,
        media,
      };
    },
  },
});
