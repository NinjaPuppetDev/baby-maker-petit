import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { getWorldTerritories } from '@/sanity/lib/fetch';
import { WorldClient } from './WorldClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `World & Future Explorations — ${BRAND.name}`,
  description: `Original platinum silicone sculptures, fantasy archetypes, animatronic pulse, and synthetic presence by artist ${BRAND.fullArtistName}.`,
};

export default async function WorldPage() {
  const territories = await getWorldTerritories();

  return <WorldClient territories={territories} />;
}
