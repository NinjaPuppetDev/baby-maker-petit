import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId, isSanityConfigured } from '../env';

const imageBuilder = isSanityConfigured
  ? createImageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

export const urlForImage = (source: Image | string | any) => {
  if (!source) return '';
  // If already a direct string path (e.g. from local fallback /assets/baby.jpg)
  if (typeof source === 'string') return source;
  if (!imageBuilder) return '';
  try {
    return imageBuilder.image(source).auto('format').fit('max').width(1200).quality(85).url() || '';
  } catch {
    return '';
  }
};
