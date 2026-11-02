'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, ZoomIn, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { PRIMARY_OFFERS } from '@/content/offers';
import { ATELIER_STEPS } from '@/content/atelier';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { OfferCard } from '@/components/artwork/OfferCard';
import { Lightbox } from '@/components/artwork/Lightbox';
import { CertificateModal } from '@/components/artwork/CertificateModal';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // Gallery images for hero/detail lightbox
  const galleryImages = [
    {
      url: '/assets/baby3.jpg',
      title: 'Aurelia (2021)',
      caption: 'Detail of single-strand micro-rooted eyelashes and translucent lip moisture.',
      alt: 'Macro sleeping baby portrait',
    },
    {
      url: '/assets/baby7.png',
      title: 'Vesper (2022)',
      caption: 'Classical portrait study in hand-tailored heirloom bonnet and vintage lace.',
      alt: 'Sleeping baby in yellow and blue bonnet',
    },
    {
      url: '/assets/baby1.jpg',
      title: 'Julien (2021)',
      caption: 'Holding the official Baby Maker Petit Certificate of Authenticity.',
      alt: 'Julien holding signed certificate',
    },
    {
      url: '/assets/baby5.jpg',
      title: 'Clara (2021)',
      caption: 'Radiant toddler sculpture with open smile, milk teeth, and auburn pigtails.',
      alt: 'Clara smiling with teeth and pigtails',
    },
    {
      url: '/assets/baby8.png',
      title: 'Atelier Study No. 01',
      caption: 'Raw painted vinyl head and limbs showing 25+ layers of heat-cured mottling.',
      alt: 'Painted vinyl head and limbs in atelier',
    },
  ];

  const openLightboxAt = (idx: number) => {
    setActiveImageIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 01. HERO / OPENING */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#FAF7F2]">
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

          {/* 3-Card Offer Grid: Babies, Courses, Accessories & Clothes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">
            {PRIMARY_OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 03. THE ATELIER / CRAFT PROCESS GLIMPSE */}
      <Section variant="secondary" spacing="lg" hasBorderTop hasBorderBottom>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Process Visual Montage (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div
                onClick={() => openLightboxAt(4)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8E0D5] shadow-md cursor-pointer"
              >
                <Image
                  src="/assets/baby8.png"
                  alt="Raw painted vinyl parts in the studio showing multi-layer mottling and veins"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xs text-xs font-sans font-medium text-[#201D1B]">
                    <ZoomIn className="w-3.5 h-3.5 text-[#E29578]" />
                    <span>{language === 'en' ? 'Examine Raw Painted Vinyl' : 'Examinar Vinilo Pintado en Crudo'}</span>
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-mono text-[#6A635D] border border-[#E8E0D5]">
                  {language === 'en' ? 'Chapter 02 · 25+ Subdermal Glaze Layers' : 'Capítulo 02 · +25 Capas de Veladuras Subdérmicas'}
                </div>
              </div>

              {/* Secondary Process Detail */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => openLightboxAt(0)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E8E0D5] cursor-pointer"
                >
                  <Image
                    src="/assets/baby3_macro.jpg"
                    alt="Micro-rooted eyelashes close-up"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-sans font-medium">
                      {language === 'en' ? 'Chapter 04 · Micro-Rooting' : 'Capítulo 04 · Micro-Enraizado'}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => openLightboxAt(2)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E8E0D5] cursor-pointer"
                >
                  <Image
                    src="/assets/baby2_feet.jpg"
                    alt="Plantar sole crease realism"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-sans font-medium">
                      {language === 'en' ? 'Chapter 05 · Tactile Realism' : 'Capítulo 05 · Realismo Táctil'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Narrative (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <Text variant="display-m" className="text-[#201D1B]">
                {t.home.atelierTeaserTitle}
              </Text>
              <p className="font-serif italic text-lg text-[#8E847A]">
                {t.home.atelierTeaserSubtitle}
              </p>
              <Text variant="body" className="text-[#6A635D] leading-relaxed">
                {t.home.atelierTeaserText}
              </Text>

              {/* Atelier Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5 text-xs font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#201D1B]">
                      {language === 'en' ? 'Subdermal Optical Depth' : 'Profundidad Óptica Subdérmica'}
                    </h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      {language === 'en'
                        ? 'Micro-sponged veining and capillary flushes cured in repeated 130°C cycles.'
                        : 'Veteado micro-esponjado y rubores capilares curados en múltiples ciclos de horneado a 130°C.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5 text-xs font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#201D1B]">
                      {language === 'en' ? 'Single-Follicle Implantation' : 'Implantación Folicular Individual'}
                    </h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      {language === 'en'
                        ? 'Ethical Angora mohair rooted strand-by-strand with 42G ultra-fine German needles.'
                        : 'Mohair de angora ético implantado hebra por hebra con agujas alemanas ultrafinas de calibre 42G.'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5 text-xs font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#201D1B]">
                      {language === 'en' ? 'Natural Gravitational Weight' : 'Peso Gravitacional Natural'}
                    </h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      {language === 'en'
                        ? 'Optical glass micro-beads calibrated so holding the piece requires supporting the neck.'
                        : 'Microesferas de vidrio óptico calibradas para que sostener la obra exija apoyar la cabecita.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button href="/courses" variant="primary" size="md" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  {t.home.exploreProcess}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 04. THE ARTIST — MELISSA RENDON */}
      <Section variant="primary" spacing="lg">
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
                  ? 'Operating from her private studio since 2020, Melissa creates works that challenge the boundary between sculpture and tender vulnerability. Every creation is cataloged and issued with a physical, hand-signed Certificate of Authenticity.'
                  : 'Desde su taller privado fundado en 2020 en Colombia, Melissa crea obras que desafían la frontera entre la escultura y la ternura viva. Cada creación está catalogada y se entrega con su Certificado de Autenticidad físico firmado a mano.'}
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
      <Lightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
        onPrev={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
        setCurrentIndex={setActiveImageIndex}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        creationTitle="Julien"
        certificateDate="23/07/2021"
      />
    </div>
  );
}
