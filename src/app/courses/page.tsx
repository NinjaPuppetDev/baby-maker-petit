import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { getCourses } from '@/sanity/lib/fetch';
import { CoursesClient } from './CoursesClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Atelier Academy & Masterclasses — ${BRAND.name}`,
  description: `Masterclass curricula and specialized mentorship covering subdermal veining, capillary mottling, and micro-rooting with artist ${BRAND.fullArtistName}.`,
};

export default async function CoursesPage() {
  const tracks = await getCourses();

  return <CoursesClient tracks={tracks} />;
}
