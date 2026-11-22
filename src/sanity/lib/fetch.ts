import { client } from './client';
import { isSanityConfigured } from '../env';
import {
  creationsQuery,
  creationBySlugQuery,
  creationSlugsQuery,
  offersQuery,
  coursesQuery,
  accessoriesQuery,
  atelierStepsQuery,
  worldTerritoriesQuery,
} from './queries';
import {
  adaptSanityCreation,
  adaptSanityOffer,
  adaptSanityCourseTrack,
  adaptSanityAccessoryItem,
  adaptSanityAtelierStep,
  adaptSanityWorldTerritory,
} from './adapter';
import { CREATIONS } from '@/content/creations';
import { PRIMARY_OFFERS, OfferItem } from '@/content/offers';
import { COURSE_TRACKS, CourseTrack } from '@/content/courses';
import { ACCESSORIES_CATALOG, AccessoryItem } from '@/content/accessories';
import { ATELIER_STEPS } from '@/content/atelier';
import { WORLD_TERRITORIES } from '@/content/world';
import { Creation, AtelierStep, WorldTerritory } from '@/types';

// ==========================================
// 1. CREATIONS / ARTWORKS
// ==========================================

export async function getCreations(): Promise<Creation[]> {
  if (!isSanityConfigured) return CREATIONS;

  try {
    const docs = await client.fetch<any[]>(
      creationsQuery,
      {},
      {
        next: {
          tags: ['creations', 'artwork'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityCreation);
    }
    return CREATIONS;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch creations, falling back to local content:', error);
    return CREATIONS;
  }
}

export async function getCreationBySlug(slug: string): Promise<Creation | null> {
  if (!isSanityConfigured) {
    return CREATIONS.find((c) => c.slug === slug) || null;
  }

  try {
    const doc = await client.fetch<any>(
      creationBySlugQuery,
      { slug },
      {
        next: {
          tags: ['creations', `creation:${slug}`],
          revalidate: 60,
        },
      }
    );

    if (doc) return adaptSanityCreation(doc);
    return CREATIONS.find((c) => c.slug === slug) || null;
  } catch (error) {
    console.warn(`[Sanity] Failed to fetch creation ${slug}, falling back to local content:`, error);
    return CREATIONS.find((c) => c.slug === slug) || null;
  }
}

export async function getCreationSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return CREATIONS.map((c) => c.slug);
  }

  try {
    const slugs = await client.fetch<string[]>(
      creationSlugsQuery,
      {},
      { next: { revalidate: 300 } }
    );

    if (Array.isArray(slugs) && slugs.length > 0) return slugs;
    return CREATIONS.map((c) => c.slug);
  } catch (error) {
    console.warn('[Sanity] Failed to fetch slugs, falling back to local content:', error);
    return CREATIONS.map((c) => c.slug);
  }
}

// ==========================================
// 2. PRIMARY OFFERS (HOME PAGE CARDS)
// ==========================================

export async function getOffers(): Promise<OfferItem[]> {
  if (!isSanityConfigured) return PRIMARY_OFFERS;

  try {
    const docs = await client.fetch<any[]>(
      offersQuery,
      {},
      {
        next: {
          tags: ['offers', 'home'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityOffer);
    }
    return PRIMARY_OFFERS;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch offers, falling back to local content:', error);
    return PRIMARY_OFFERS;
  }
}

// ==========================================
// 3. COURSES & MASTERCLASSES
// ==========================================

export async function getCourses(): Promise<CourseTrack[]> {
  if (!isSanityConfigured) return COURSE_TRACKS;

  try {
    const docs = await client.fetch<any[]>(
      coursesQuery,
      {},
      {
        next: {
          tags: ['courses', 'academy'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityCourseTrack);
    }
    return COURSE_TRACKS;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch courses, falling back to local content:', error);
    return COURSE_TRACKS;
  }
}

// ==========================================
// 4. WARDROBE & ACCESSORIES
// ==========================================

export async function getAccessories(): Promise<AccessoryItem[]> {
  if (!isSanityConfigured) return ACCESSORIES_CATALOG;

  try {
    const docs = await client.fetch<any[]>(
      accessoriesQuery,
      {},
      {
        next: {
          tags: ['accessories', 'wardrobe'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityAccessoryItem);
    }
    return ACCESSORIES_CATALOG;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch accessories, falling back to local content:', error);
    return ACCESSORIES_CATALOG;
  }
}

// ==========================================
// 5. ATELIER PROCESS STEPS
// ==========================================

export async function getAtelierSteps(): Promise<AtelierStep[]> {
  if (!isSanityConfigured) return ATELIER_STEPS;

  try {
    const docs = await client.fetch<any[]>(
      atelierStepsQuery,
      {},
      {
        next: {
          tags: ['atelier', 'process'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityAtelierStep);
    }
    return ATELIER_STEPS;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch atelier steps, falling back to local content:', error);
    return ATELIER_STEPS;
  }
}

// ==========================================
// 6. WORLD & FUTURE HORIZONS
// ==========================================

export async function getWorldTerritories(): Promise<WorldTerritory[]> {
  if (!isSanityConfigured) return WORLD_TERRITORIES;

  try {
    const docs = await client.fetch<any[]>(
      worldTerritoriesQuery,
      {},
      {
        next: {
          tags: ['world', 'horizons'],
          revalidate: 60,
        },
      }
    );

    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(adaptSanityWorldTerritory);
    }
    return WORLD_TERRITORIES;
  } catch (error) {
    console.warn('[Sanity] Failed to fetch world territories, falling back to local content:', error);
    return WORLD_TERRITORIES;
  }
}
