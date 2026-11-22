'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { OfferItem } from '@/content/offers';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { OfferCard } from '@/components/artwork/OfferCard';
import { CertificateModal } from '@/components/artwork/CertificateModal';

type HomeClientProps = {
  offers: OfferItem[];
};

export function HomeClient({ offers }: HomeClientProps) {
  const { language, t } = useLanguage();
  const [certificateOpen, setCertificateOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* 01. HERO / OPENING */}
      <section
        className="relative min-h-[100svh] overflow-hidden bg-[#FAF7F2]"
        style={{ position: 'relative' }}
      >
        <Image
          src="/assets/hero-full-bleed-baby.png"
          alt="Baby Maker Petit Atelier"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-fill"
        />

        <Container size="xl" className="relative z-10 flex min-h-[100svh] items-center justify-center py-28 sm:py-32">
          <div className="max-w-3xl text-center">
            <Text variant="display-l" as="h1" className="text-[#201D1B]">
              {language === 'en' ? (
                <>
                  At BabyMaker®, we create hyperrealistic<span className="italic text-[#A45537]"> reborn babies</span>.
                </>
              ) : (
                <>
                  En BabyMaker® creamos bebés reborn<span className="italic text-[#A45537]"> hiperrealistas</span>.
                </>
              )}
            </Text>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#6A635D] sm:text-lg">
              {t.hero.manifesto}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/work"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                {t.hero.viewCreations}
              </Button>
              <Button
                href="/courses"
                variant="secondary"
                size="md"
                className="bg-white/85 backdrop-blur-xs text-[#201D1B] hover:bg-white border-[#E8E0D5]"
              >
                {language === 'en' ? 'Discover Courses' : 'Conocer Cursos'}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. PRIMARY OFFERS: BABIES, COURSES, ACCESSORIES & CLOTHES */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <Text variant="display-m" className="text-[#201D1B]">
                {language === 'en' ? 'Artworks, Education & Heirloom Wear' : 'Esculturas, Formación y Guardarropa'}
              </Text>
              <p className="text-base text-[#6A635D] mt-3 leading-relaxed">
                {language === 'en'
                  ? 'Explore the three dedicated expressions of the Baby Maker Petit practice: bespoke hyperrealistic baby sculptures, intensive craft education, and heirloom garments.'
                  : 'Explora las tres expresiones dedicadas de la práctica de Baby Maker Petit: esculturas hiperrealistas por encargo, formación artesanal intensiva y vestuario patrimonial.'}
              </p>
            </div>
            <Button href="/work" variant="outline" size="md" icon={<ArrowRight className="w-3.5 h-3.5 text-[#E29578]" />}>
              {t.home.viewAllCreations}
            </Button>
          </div>

          {/* Dynamic Offer Grid from CMS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 03. THE ARTIST — MELISSA RENDON */}
      <Section variant="secondary" spacing="lg" hasBorderTop>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text & Philosophy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Text variant="display-m" className="text-[#201D1B]">
                {BRAND.fullArtistName}
              </Text>
              <Text variant="body-large" voice="serif" className="italic text-[#6A635D] border-l-2 border-[#E29578] pl-5 my-4">
                {t.home.artistTeaserQuote}
              </Text>
              <p className="text-base text-[#6A635D] leading-relaxed">
                {language === 'en'
                  ? 'I am Melissa Rendón, an artist passionate about hyperrealism and the beauty of small details. In reborn art, I found an extraordinary way to unite my artistic sensitivity, my creativity, and my fascination with recreating the delicacy of life.'
                  : 'Soy Melissa Rendón, artista apasionada por el hiperrealismo y la belleza de los pequeños detalles. Encontré en el arte reborn una forma extraordinaria de unir mi sensibilidad artística, mi creatividad y mi fascinación por recrear la delicadeza de la vida.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href="/artist" variant="primary" size="md">
                  {t.home.readBiography}
                </Button>
                <button
                  onClick={() => setCertificateOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8E0D5] bg-white text-xs font-sans font-medium uppercase tracking-wider text-[#201D1B] hover:border-[#A45537] transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                  <span>{language === 'en' ? 'Inspect Certificate' : 'Ver Certificado'}</span>
                </button>
              </div>
            </div>

            {/* Visual: Creation with Certificate (5 cols) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => setCertificateOpen(true)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#F3ECE4] border border-[#E8E0D5] shadow-lg cursor-pointer"
                style={{ position: 'relative' }}
              >
                <Image
                  src="/assets/baby1.jpg"
                  alt="Julien holding the Baby Maker Petit Certificate of Authenticity signed by Melissa Rendon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#F9EBE5]">
                      {language === 'en' ? 'Official Provenance Record' : 'Registro Oficial de Procedencia'}
                    </span>
                  </div>
                  <p className="font-serif text-lg font-light">
                    {language === 'en' ? 'Certificate of Authenticity · Julien' : 'Certificado de Autenticidad · Julien'}
                  </p>
                  <p className="text-xs text-white/80">
                    {language === 'en'
                      ? 'Signed & dated by Melissa Rendon (23/07/2021)'
                      : 'Firmado y fechado por Melissa Rendon (23/07/2021)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Modals */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        creationTitle="Julien"
        certificateDate="23/07/2021"
      />
    </div>
  );
}
