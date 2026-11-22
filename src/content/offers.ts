import { LocalizedText, LocalizedList } from '@/types';

export type OfferItem = {
  id: string;
  category: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  badge: LocalizedText;
  features: LocalizedList;
  image: string;
  imageAlt: string;
  href: string;
  ctaText: LocalizedText;
};

export const PRIMARY_OFFERS: OfferItem[] = [
  {
    id: 'babies',
    category: {
      en: 'Sculpture Collection',
      es: 'Colección de Escultura',
    },
    title: {
      en: 'Babies',
      es: 'Bebés',
    },
    subtitle: {
      en: 'Hyperrealistic Reborn Artworks',
      es: 'Obras Hiperrealistas Reborn',
    },
    description: {
      en: 'One-of-a-kind lifelike baby sculptures with authentic anatomical weight, micro-rooted mohair, and over 25 oven-cured translucent skin washes.',
      es: 'Esculturas hiperrealistas únicas con peso anatómico natural, enraizado de mohair hebra por hebra y más de 25 veladuras translúcidas horneadas.',
    },
    badge: {
      en: 'Original Artworks',
      es: 'Obras Originales',
    },
    features: {
      en: ['Micro-Rooted Mohair', 'Anatomical Weighting', 'Official Signed COA'],
      es: ['Micro-Enraizado Mohair', 'Peso Anatómico Real', 'Certificado COA Firmado'],
    },
    image: '/assets/baby3.jpg',
    imageAlt: 'Aurelia — hyperrealistic newborn baby sculpture by Melissa Rendon',
    href: '/work',
    ctaText: {
      en: 'Explore Babies',
      es: 'Explorar Bebés',
    },
  },
  {
    id: 'courses',
    category: {
      en: 'Atelier Academy',
      es: 'Academia del Atelier',
    },
    title: {
      en: 'Courses',
      es: 'Cursos',
    },
    subtitle: {
      en: 'Technique & Mentorship',
      es: 'Técnica & Mentoría',
    },
    description: {
      en: 'Hands-on atelier training and specialized mentorship covering subdermal veining, capillary mottling, 42G fine needle implantation, and anatomical balance.',
      es: 'Formación práctica de atelier y mentoría personalizada en veladuras subdérmicas, veteado capilar, implantación con aguja fina y balance anatómico.',
    },
    badge: {
      en: 'Masterclasses',
      es: 'Masterclasses',
    },
    features: {
      en: ['Subdermal Vein Mapping', 'Single-Strand Rooting', 'Artist Mentorship'],
      es: ['Mapeo Venoso Subdérmico', 'Enraizado Individual', 'Mentoría Personalizada'],
    },
    image: '/assets/baby8.png',
    imageAlt: 'Atelier study vinyl sculpture parts undergoing multi-layer painting',
    href: '/courses',
    ctaText: {
      en: 'Discover Courses',
      es: 'Conocer Cursos',
    },
  },
  {
    id: 'accessories-clothes',
    category: {
      en: 'Curated Wardrobe',
      es: 'Guardarropa de Autor',
    },
    title: {
      en: 'Accessories & Clothes',
      es: 'Ropa & Accesorios',
    },
    subtitle: {
      en: 'Handcrafted Heirlooms',
      es: 'Confección Patrimonial',
    },
    description: {
      en: 'Bespoke tailored heirloom outfits, delicate hand-knitted cardigans, vintage bonnets, and custom magnetic pacifiers tailored for collectible sculptures.',
      es: 'Conjuntos patrimoniales a medida, cárdigans de lana tejidos a mano, capotas vintage y chupetes imantados hechos a mano para esculturas de colección.',
    },
    badge: {
      en: 'Handmade Couture',
      es: 'Alta Costura Artesanal',
    },
    features: {
      en: ['Hand-Knitted Wool', 'Heirloom Bonnets & Lace', 'Sculpture-Safe Accents'],
      es: ['Lana Natural Tejida', 'Capotas y Encajes Vintage', 'Materiales Seguros'],
    },
    image: '/assets/baby7.png',
    imageAlt: 'Vesper wearing hand-tailored heirloom bonnet and vintage lace clothing',
    href: '/accessories',
    ctaText: {
      en: 'Explore Collection',
      es: 'Explorar Colección',
    },
  },
];
