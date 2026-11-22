import { defineQuery } from 'next-sanity';

export const creationsQuery = defineQuery(`
  *[_type == "creation"] | order(featured desc, year desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    year,
    dateCreated,
    sculptorKit,
    originalSculptor,
    medium,
    technique,
    weight,
    length,
    eyeDetails,
    hairDetails,
    coverImage,
    images,
    detailImages[] {
      _key,
      image,
      alt,
      title,
      caption
    },
    status,
    featured,
    hasCertificate,
    certificateDate,
    series,
    description,
    story,
    craftNotes
  }
`);

export const creationBySlugQuery = defineQuery(`
  *[_type == "creation" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    year,
    dateCreated,
    sculptorKit,
    originalSculptor,
    medium,
    technique,
    weight,
    length,
    eyeDetails,
    hairDetails,
    coverImage,
    images,
    detailImages[] {
      _key,
      image,
      alt,
      title,
      caption
    },
    status,
    featured,
    hasCertificate,
    certificateDate,
    series,
    description,
    story,
    craftNotes
  }
`);

export const creationSlugsQuery = defineQuery(`
  *[_type == "creation" && defined(slug.current)].slug.current
`);

export const offersQuery = defineQuery(`
  *[_type == "offer"] | order(order asc, _createdAt asc) {
    _id,
    idKey,
    order,
    category,
    title,
    subtitle,
    description,
    badge,
    features,
    image,
    imageAlt,
    href,
    ctaText
  }
`);

export const coursesQuery = defineQuery(`
  *[_type == "courseTrack"] | order(order asc, _createdAt asc) {
    _id,
    "slug": slug.current,
    order,
    badge,
    title,
    subtitle,
    duration,
    level,
    format,
    description,
    curriculum,
    includes,
    image,
    imageAlt
  }
`);

export const accessoriesQuery = defineQuery(`
  *[_type == "accessoryItem"] | order(order asc, _createdAt asc) {
    _id,
    "slug": slug.current,
    order,
    title,
    category,
    categoryLabel,
    description,
    materials,
    craftsmanshipNotes,
    compatibility,
    coverImage,
    galleryImages,
    status,
    badge,
    features
  }
`);

export const atelierStepsQuery = defineQuery(`
  *[_type == "atelierStep"] | order(order asc, stepNumber asc) {
    _id,
    stepNumber,
    order,
    title,
    subtitle,
    description,
    technicalDetails,
    image,
    imageAlt
  }
`);

export const worldTerritoriesQuery = defineQuery(`
  *[_type == "worldTerritory"] | order(order asc, _createdAt asc) {
    _id,
    idKey,
    order,
    title,
    tagline,
    description,
    focusAreas,
    artisticConcept
  }
`);
