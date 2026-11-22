import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});
