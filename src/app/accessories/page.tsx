import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { getAccessories } from '@/sanity/lib/fetch';
import { AccessoriesClient } from './AccessoriesClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Wardrobe & Heirloom Accessories — ${BRAND.name}`,
  description: `Bespoke tailored heirloom outfits, delicate hand-knitted cardigans, vintage bonnets, and custom magnetic pacifiers tailored for collectible sculptures by ${BRAND.fullArtistName}.`,
};

export default async function AccessoriesPage() {
  const items = await getAccessories();

  return <AccessoriesClient items={items} />;
}
