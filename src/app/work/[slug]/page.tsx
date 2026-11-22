import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { CreationDetailClient } from '@/components/artwork/CreationDetailClient';
import {
  getCreationBySlug,
  getCreationSlugs,
  getCreations,
} from '@/sanity/lib/fetch';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCreationSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creation = await getCreationBySlug(slug);

  if (!creation) {
    return {
      title: `Artwork Not Found — ${BRAND.name}`,
    };
  }

  const description =
    creation.description.es || creation.description.en || 'Hyperrealistic baby sculpture';

  return {
    title: `${creation.title} (${creation.year}) — ${BRAND.name}`,
    description: `${description} By ${BRAND.fullArtistName}.`,
    openGraph: {
      title: `${creation.title} — ${BRAND.name}`,
      description,
      images: [
        {
          url: creation.coverImage,
          alt: creation.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creation = await getCreationBySlug(slug);

  if (!creation) {
    notFound();
  }

  const allCreations = await getCreations();
  const relatedCreations = allCreations
    .filter((c) => c.id !== creation.id)
    .slice(0, 3);

  return (
    <CreationDetailClient
      creation={creation}
      relatedCreations={relatedCreations}
    />
  );
}
