'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { ATELIER_STEPS } from '@/content/atelier';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { ProcessStep } from '@/components/atelier/ProcessStep';
import { Lightbox } from '@/components/artwork/Lightbox';

export default function AtelierPage() {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const processImages = ATELIER_STEPS.map((s) => ({
    url: s.image,
    title: `${s.title[language]} (${s.subtitle[language]})`,
    caption: s.description[language],
    alt: s.imageAlt,
  }));

  const handleImageClick = (imageUrl: string, title: string) => {
    const idx = processImages.findIndex((p) => p.url === imageUrl);
    setActiveImageIdx(idx !== -1 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header Section */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              ATELIER CRAFTSMANSHIP
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.atelier.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.atelier.subtitle}
            </p>
          </div>
        </Container>
      </Section>

      {/* Atelier Philosophy Introduction */}
      <Section variant="secondary" spacing="md" hasBorderBottom>
        <Container size="md" className="space-y-6 text-center">
          <Text variant="h2" className="text-2xl sm:text-3xl font-light text-[#201D1B]">
            {language === 'en' ? 'Radical Manual Patience' : 'Paciencia Manual Radical'}
          </Text>
          <Text variant="body-large" className="text-[#6A635D] leading-relaxed">
            {t.atelier.intro}
          </Text>
        </Container>
      </Section>

      {/* The 6 Chapters of Creation */}
      <Section variant="primary" spacing="none">
        <Container size="xl">
          <div className="py-8">
            {ATELIER_STEPS.map((step, idx) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={idx}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* The Silicone Horizon Section */}
      <Section variant="dark" spacing="lg" hasBorderTop>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#E29578] uppercase">
                THE NEXT MEDIUM
              </span>
              <Text variant="display-m" className="text-white">
                {t.atelier.siliconeTransitionTitle}
              </Text>
              <Text variant="body-large" className="text-[#9D958E] leading-relaxed">
                {t.atelier.siliconeTransitionText}
              </Text>
              <div className="space-y-3 pt-2 text-sm text-[#9D958E]">
                <p>
                  • Moving from commercial kit painting to sculpting unique original forms in fine artist clay.
                </p>
                <p>
                  • Custom two-part silicone and fiberglass mold creation for seamless monolithic pours.
                </p>
                <p>
                  • Medical-grade platinum silicone formulation replicating human skin compliance and movement.
                </p>
              </div>
              <div className="pt-4">
                <Button href="/world" variant="secondary" size="md" icon={<ArrowRight className="w-3.5 h-3.5 text-[#E29578]" />}>
                  Explore the Evolving World
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#1E1B19] border border-[#2E2926] p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E29578]/10 flex items-center justify-center text-[#E29578]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-white">
                    {language === 'en' ? 'Original Authorship' : 'Autoría Original'}
                  </h3>
                  <p className="text-sm text-[#9D958E] leading-relaxed">
                    “The jump to platinum silicone is about having total command of facial structure, cranial balance, and weight. It transforms the atelier into a true sculptural studio.”
                  </p>
                </div>
                <div className="pt-6 border-t border-[#2E2926] text-xs font-mono text-[#E29578]">
                  Melissa Rosales · Studio Practice 2024–Future
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={processImages}
        currentIndex={activeImageIdx}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIdx((prev) => (prev + 1) % processImages.length)}
        onPrev={() => setActiveImageIdx((prev) => (prev - 1 + processImages.length) % processImages.length)}
        setCurrentIndex={setActiveImageIdx}
      />
    </div>
  );
}
