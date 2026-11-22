import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { getOffers } from '@/sanity/lib/fetch';
import { HomeClient } from './HomeClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BRAND.name} — Hyperrealistic Reborn Baby Sculptures by ${BRAND.fullArtistName}`,
  description: BRAND.tagline,
};

export default async function HomePage() {
  const offers = await getOffers();

  return <HomeClient offers={offers} />;
}
