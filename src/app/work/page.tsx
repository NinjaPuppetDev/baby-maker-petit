import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { getCreations } from '@/sanity/lib/fetch';
import { WorkGalleryClient } from './WorkGalleryClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Artwork Archive & Creaciones — ${BRAND.name}`,
  description: `Explore the hyperrealistic reborn baby sculptures and atelier studies by artist ${BRAND.fullArtistName}.`,
  openGraph: {
    title: `Artwork Archive — ${BRAND.name}`,
    description: `Treat the dolls as artworks. Treat the website as a gallery.`,
  },
};

export default async function WorkPage() {
  const creations = await getCreations();

  return <WorkGalleryClient creations={creations} />;
}
