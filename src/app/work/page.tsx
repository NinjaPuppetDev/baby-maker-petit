'use client';

import React, { useState } from 'react';
import { CREATIONS } from '@/content/creations';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { CreationCard } from '@/components/artwork/CreationCard';

export default function WorkPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'reborn' | 'studies'>('all');

  const filteredCreations = CREATIONS.filter((c) => {
    if (filter === 'reborn') return c.series === 'Reborn Hyperrealism';
    if (filter === 'studies') return c.series === 'Atelier Studies';
    return true;
  });

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Page Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              ARTWORK ARCHIVE
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.work.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.work.subtitle}
            </p>
          </div>

          {/* Series Filters */}
          <div className="pt-10 flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#201D1B] text-white'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterAll} ({CREATIONS.length})
            </button>
            <button
              onClick={() => setFilter('reborn')}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'reborn'
                  ? 'bg-[#201D1B] text-white'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterReborn} (
              {CREATIONS.filter((c) => c.series === 'Reborn Hyperrealism').length})
            </button>
            <button
              onClick={() => setFilter('studies')}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'studies'
                  ? 'bg-[#201D1B] text-white'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {t.work.filterStudies} (
              {CREATIONS.filter((c) => c.series === 'Atelier Studies').length})
            </button>
          </div>
        </Container>
      </Section>

      {/* Gallery Grid */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredCreations.map((creation, idx) => (
              <CreationCard
                key={creation.id}
                creation={creation}
                priority={idx === 0}
                aspectRatio="portrait"
              />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
