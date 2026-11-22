'use client';

import React, { useState } from 'react';
import { Creation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { CreationCard } from '@/components/artwork/CreationCard';

type WorkGalleryClientProps = {
  creations: Creation[];
};

export function WorkGalleryClient({ creations }: WorkGalleryClientProps) {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'reborn' | 'studies'>('all');

  const filteredCreations = creations.filter((c) => {
    if (filter === 'reborn') return c.series === 'Reborn Hyperrealism';
    if (filter === 'studies') return c.series === 'Atelier Studies';
    return true;
  });

  const rebornCount = creations.filter((c) => c.series === 'Reborn Hyperrealism').length;
  const studiesCount = creations.filter((c) => c.series === 'Atelier Studies').length;

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Page Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              {language === 'en' ? 'ARTWORK ARCHIVE' : 'ARCHIVO DE OBRAS'}
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.work.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.work.subtitle}
            </p>
          </div>

          {/* Series Filters */}
          <div className="pt-8 flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterAll} ({creations.length})
            </button>
            <button
              onClick={() => setFilter('reborn')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'reborn'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterReborn} ({rebornCount})
            </button>
            <button
              onClick={() => setFilter('studies')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'studies'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterStudies} ({studiesCount})
            </button>
          </div>
        </Container>
      </Section>

      {/* Gallery Grid */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          {filteredCreations.length === 0 ? (
            <div className="py-16 text-center text-[#6A635D]">
              <p className="text-lg font-serif">
                {language === 'en'
                  ? 'No artworks found in this category.'
                  : 'No se encontraron obras en esta categoría.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredCreations.map((creation, idx) => (
                <CreationCard
                  key={creation.id}
                  creation={creation}
                  priority={idx === 0}
                  loading={idx < 6 ? 'eager' : 'lazy'}
                  aspectRatio="portrait"
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
