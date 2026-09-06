'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CREATIONS } from '@/content/creations';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Badge } from '@/components/primitives/Badge';

export default function ArchivePage() {
  const { language, t } = useLanguage();

  // Group creations chronologically: 2022, 2021, 2020
  const years = [2022, 2021, 2020];

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              HISTORICAL CONTINUITY
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.archive.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.archive.subtitle}
            </p>
          </div>
        </Container>
      </Section>

      {/* Intro Note */}
      <Section variant="secondary" spacing="sm" hasBorderBottom>
        <Container size="md" className="text-center">
          <p className="text-sm sm:text-base text-[#6A635D] leading-relaxed">
            {t.archive.intro}
          </p>
        </Container>
      </Section>

      {/* Chronological Archive Timeline */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="space-y-16">
            {years.map((year) => {
              const yearCreations = CREATIONS.filter((c) => c.year === year);
              if (yearCreations.length === 0) return null;

              return (
                <div key={year} className="space-y-8">
                  {/* Year Marker */}
                  <div className="flex items-center gap-4 border-b border-[#E8E0D5] pb-4">
                    <span className="font-serif text-3xl sm:text-4xl text-[#201D1B] font-light">
                      {year}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#8E847A] font-mono">
                      Catalog Cohort · {yearCreations.length} Documented Works
                    </span>
                  </div>

                  {/* Year Works Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {yearCreations.map((creation) => (
                      <Link
                        key={creation.id}
                        href={`/work/${creation.slug}`}
                        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8E0D5] hover:border-[#E29578]/50 shadow-xs hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] bg-[#F3ECE4] overflow-hidden">
                          <Image
                            src={creation.coverImage}
                            alt={creation.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge variant="status">{creation.status}</Badge>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-baseline justify-between mb-1">
                              <h3 className="font-serif text-xl font-light text-[#201D1B] group-hover:text-[#A45537] transition-colors">
                                {creation.title}
                              </h3>
                              <span className="text-xs font-mono text-[#8E847A]">
                                {creation.dateCreated || creation.year}
                              </span>
                            </div>
                            <p className="text-xs text-[#8E847A] line-clamp-1 mb-2">
                              {creation.medium}
                            </p>
                            <p className="text-xs text-[#6A635D] line-clamp-2">
                              {creation.description[language]}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#E8E0D5]/60 flex items-center justify-between text-xs text-[#8E847A]">
                            <span className="text-[11px] font-mono">{creation.series}</span>
                            <span className="inline-flex items-center gap-1 text-[#201D1B] font-medium group-hover:text-[#A45537]">
                              <span>Inspect</span>
                              <ArrowRight className="w-3 h-3 text-[#E29578]" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
