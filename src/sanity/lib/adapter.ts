import { Creation, ArtworkDetailImage, AtelierStep, WorldTerritory } from '@/types';
import { OfferItem } from '@/content/offers';
import { CourseTrack } from '@/content/courses';
import { AccessoryItem } from '@/content/accessories';
import { urlForImage } from './image';

export function adaptSanityCreation(doc: any): Creation {
  if (!doc) return null as any;

  const coverUrl = doc.coverImage ? urlForImage(doc.coverImage) : '/assets/baby3.jpg';

  const images: string[] = Array.isArray(doc.images)
    ? doc.images.map((img: any) => urlForImage(img)).filter(Boolean)
    : [coverUrl];

  const detailImages: ArtworkDetailImage[] = Array.isArray(doc.detailImages)
    ? doc.detailImages
        .map((d: any) => {
          const url = d.image ? urlForImage(d.image) : '';
          if (!url) return null;
          return {
            url,
            alt: d.alt || doc.title || 'Artwork detail',
            title: {
              en: d.title?.en || '',
              es: d.title?.es || '',
            },
            caption: {
              en: d.caption?.en || '',
              es: d.caption?.es || '',
            },
          };
        })
        .filter(Boolean) as ArtworkDetailImage[]
    : [];

  return {
    id: doc._id || doc.id || doc.slug,
    title: doc.title || 'Untitled Creation',
    slug: typeof doc.slug === 'string' ? doc.slug : doc.slug?.current || '',
    year: doc.year || new Date().getFullYear(),
    dateCreated: doc.dateCreated,
    sculptorKit: doc.sculptorKit,
    originalSculptor: doc.originalSculptor,
    medium: doc.medium || '',
    technique: doc.technique || '',
    weight: doc.weight,
    length: doc.length,
    eyeDetails: doc.eyeDetails,
    hairDetails: doc.hairDetails,
    coverImage: coverUrl,
    images: images.length > 0 ? images : [coverUrl],
    detailImages: detailImages.length > 0 ? detailImages : undefined,
    status: doc.status || 'Private Collection',
    featured: Boolean(doc.featured),
    hasCertificate: Boolean(doc.hasCertificate),
    certificateDate: doc.certificateDate,
    series: doc.series || 'Reborn Hyperrealism',
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    story: {
      en: doc.story?.en || '',
      es: doc.story?.es || '',
    },
    craftNotes: {
      en: doc.craftNotes?.en || '',
      es: doc.craftNotes?.es || '',
    },
  };
}

export function adaptSanityOffer(doc: any): OfferItem {
  if (!doc) return null as any;

  return {
    id: doc.idKey || doc._id,
    category: {
      en: doc.category?.en || '',
      es: doc.category?.es || '',
    },
    title: {
      en: doc.title?.en || '',
      es: doc.title?.es || '',
    },
    subtitle: {
      en: doc.subtitle?.en || '',
      es: doc.subtitle?.es || '',
    },
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    badge: {
      en: doc.badge?.en || '',
      es: doc.badge?.es || '',
    },
    features: {
      en: Array.isArray(doc.features?.en) ? doc.features.en : [],
      es: Array.isArray(doc.features?.es) ? doc.features.es : [],
    },
    image: doc.image ? urlForImage(doc.image) : '/assets/baby3.jpg',
    imageAlt: doc.imageAlt || doc.title?.en || '',
    href: doc.href || '/work',
    ctaText: {
      en: doc.ctaText?.en || 'Explore',
      es: doc.ctaText?.es || 'Explorar',
    },
  };
}

export function adaptSanityCourseTrack(doc: any): CourseTrack {
  if (!doc) return null as any;

  return {
    id: doc.slug || doc._id,
    badge: {
      en: doc.badge?.en || '',
      es: doc.badge?.es || '',
    },
    title: {
      en: doc.title?.en || '',
      es: doc.title?.es || '',
    },
    subtitle: {
      en: doc.subtitle?.en || '',
      es: doc.subtitle?.es || '',
    },
    duration: {
      en: doc.duration?.en || '',
      es: doc.duration?.es || '',
    },
    level: {
      en: doc.level?.en || '',
      es: doc.level?.es || '',
    },
    format: {
      en: doc.format?.en || '',
      es: doc.format?.es || '',
    },
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    curriculum: {
      en: Array.isArray(doc.curriculum?.en) ? doc.curriculum.en : [],
      es: Array.isArray(doc.curriculum?.es) ? doc.curriculum.es : [],
    },
    includes: {
      en: Array.isArray(doc.includes?.en) ? doc.includes.en : [],
      es: Array.isArray(doc.includes?.es) ? doc.includes.es : [],
    },
    image: doc.image ? urlForImage(doc.image) : '/assets/baby8.png',
    imageAlt: doc.imageAlt || doc.title?.en || '',
  };
}

export function adaptSanityAccessoryItem(doc: any): AccessoryItem {
  if (!doc) return null as any;

  const coverUrl = doc.coverImage ? urlForImage(doc.coverImage) : '/assets/baby7.png';
  const galleryImages: string[] = Array.isArray(doc.galleryImages)
    ? doc.galleryImages.map((img: any) => urlForImage(img)).filter(Boolean)
    : [coverUrl];

  return {
    id: doc.slug || doc._id,
    title: {
      en: doc.title?.en || '',
      es: doc.title?.es || '',
    },
    category: doc.category || 'bonnets',
    categoryLabel: {
      en: doc.categoryLabel?.en || '',
      es: doc.categoryLabel?.es || '',
    },
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    materials: {
      en: doc.materials?.en || '',
      es: doc.materials?.es || '',
    },
    craftsmanshipNotes: {
      en: doc.craftsmanshipNotes?.en || '',
      es: doc.craftsmanshipNotes?.es || '',
    },
    compatibility: {
      en: doc.compatibility?.en || '',
      es: doc.compatibility?.es || '',
    },
    coverImage: coverUrl,
    galleryImages: galleryImages.length > 0 ? galleryImages : [coverUrl],
    status: {
      en: doc.status?.en || '',
      es: doc.status?.es || '',
    },
    badge: {
      en: doc.badge?.en || '',
      es: doc.badge?.es || '',
    },
    features: {
      en: Array.isArray(doc.features?.en) ? doc.features.en : [],
      es: Array.isArray(doc.features?.es) ? doc.features.es : [],
    },
  };
}

export function adaptSanityAtelierStep(doc: any): AtelierStep {
  if (!doc) return null as any;

  return {
    number: doc.stepNumber || '01',
    title: {
      en: doc.title?.en || '',
      es: doc.title?.es || '',
    },
    subtitle: {
      en: doc.subtitle?.en || '',
      es: doc.subtitle?.es || '',
    },
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    technicalDetails: {
      en: Array.isArray(doc.technicalDetails?.en) ? doc.technicalDetails.en : [],
      es: Array.isArray(doc.technicalDetails?.es) ? doc.technicalDetails.es : [],
    },
    image: doc.image ? urlForImage(doc.image) : '/assets/baby8.png',
    imageAlt: doc.imageAlt || doc.title?.en || '',
  };
}

export function adaptSanityWorldTerritory(doc: any): WorldTerritory {
  if (!doc) return null as any;

  return {
    id: doc.idKey || doc._id,
    title: {
      en: doc.title?.en || '',
      es: doc.title?.es || '',
    },
    tagline: {
      en: doc.tagline?.en || '',
      es: doc.tagline?.es || '',
    },
    description: {
      en: doc.description?.en || '',
      es: doc.description?.es || '',
    },
    focusAreas: {
      en: Array.isArray(doc.focusAreas?.en) ? doc.focusAreas.en : [],
      es: Array.isArray(doc.focusAreas?.es) ? doc.focusAreas.es : [],
    },
    artisticConcept: {
      en: doc.artisticConcept?.en || '',
      es: doc.artisticConcept?.es || '',
    },
  };
}
