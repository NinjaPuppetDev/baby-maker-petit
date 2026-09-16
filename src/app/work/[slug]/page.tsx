import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CREATIONS } from '@/content/creations';
import { BRAND } from '@/config/brand';
import { CreationDetailClient } from '@/components/artwork/CreationDetailClient';

export async function generateStaticParams() {
  return CREATIONS.map((creation) => ({
    slug: creation.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creation = CREATIONS.find((c) => c.slug === slug);

  if (!creation) {
    return {
      title: `Artwork Not Found — ${BRAND.name}`,
    };
  }

  return {
    title: `${creation.title} (${creation.year}) — ${BRAND.name}`,
    description: `${creation.description.en} Hyperrealistic baby sculpture by ${BRAND.fullArtistName}.`,
    openGraph: {
      title: `${creation.title} — ${BRAND.name}`,
      description: creation.description.en,
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
  const creation = CREATIONS.find((c) => c.slug === slug);

  if (!creation) {
    notFound();
  }

  const relatedCreations = CREATIONS.filter((c) => c.id !== creation.id).slice(0, 3);

  return (
    <CreationDetailClient
      creation={creation}
      relatedCreations={relatedCreations}
    />
  );
}
