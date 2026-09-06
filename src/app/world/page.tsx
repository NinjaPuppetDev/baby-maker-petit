'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers, Cpu, HeartHandshake, Wand2, ShieldAlert } from 'lucide-react';
import { WORLD_TERRITORIES } from '@/content/world';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';

export default function WorldPage() {
  const { language, t } = useLanguage();

  const territoryIcons = [
    <Layers key="layers" className="w-6 h-6 text-[#E29578]" />,
    <Wand2 key="wand" className="w-6 h-6 text-[#E29578]" />,
    <HeartHandshake key="heart" className="w-6 h-6 text-[#E29578]" />,
    <Cpu key="cpu" className="w-6 h-6 text-[#E29578]" />,
  ];

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header in Deep Atmosphere */}
      <Section variant="dark" spacing="lg" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs tracking-widest text-[#E29578] uppercase">
              ARTISTIC HORIZON
            </span>
            <Text variant="display-l" className="text-white">
              {t.world.title}
            </Text>
            <p className="font-serif italic text-xl text-[#E29578]">
              {t.world.subtitle}
            </p>
            <Text variant="body-large" className="text-[#9D958E] leading-relaxed">
              {t.world.intro}
            </Text>

            {/* Artistic Integrity Note */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-[#9D958E]">
              <ShieldAlert className="w-4 h-4 text-[#E29578] shrink-0 mt-0.5" />
              <p>{t.world.disclaimer}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Conceptual Territories */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="mb-12">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              EXPLORATORY PATHWAYS
            </span>
            <Text variant="display-m" className="text-[#201D1B] mt-3">
              {t.world.territoriesTitle}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {WORLD_TERRITORIES.map((territory, idx) => (
              <article
                key={territory.id}
                className="group p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E0D5] hover:border-[#E29578]/50 shadow-[0_4px_24px_rgba(32,29,27,0.03)] hover:shadow-[0_12px_36px_rgba(32,29,27,0.06)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center">
                      {territoryIcons[idx % territoryIcons.length]}
                    </div>
                    <span className="font-mono text-xs text-[#8E847A]">
                      0{idx + 1} / 04
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#201D1B] group-hover:text-[#A45537] transition-colors">
                      {territory.title[language]}
                    </h3>
                    <p className="font-serif italic text-sm text-[#8E847A] mt-1">
                      {territory.tagline[language]}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#6A635D] leading-relaxed">
                    {territory.description[language]}
                  </p>

                  {/* Focus Areas */}
                  <div className="pt-2 space-y-2">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#201D1B]">
                      Active Investigation Vectors:
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#6A635D]">
                      {territory.focusAreas[language].map((area, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E29578] mt-1.5 shrink-0" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="p-4 rounded-xl bg-[#FAF7F2] border-l-2 border-[#E29578] text-xs sm:text-sm italic font-serif text-[#201D1B]">
                    “{territory.artisticConcept[language]}”
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Invitation to Collaborate */}
      <Section variant="secondary" spacing="lg" hasBorderTop>
        <Container size="md" className="text-center space-y-6">
          <Text variant="h2" className="text-3xl font-light text-[#201D1B]">
            {language === 'en' ? 'Collaborate on Future Horizons' : 'Colaborar en Futuros Horizontes'}
          </Text>
          <p className="text-base text-[#6A635D] leading-relaxed">
            The studio actively welcomes dialogues with materials engineers, kinetic sculptors, animatronic innovators, and gallery curators.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4 text-[#E29578]" />}>
              Open an Artistic Dialogue
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
