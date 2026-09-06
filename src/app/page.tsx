'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, ZoomIn, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { CREATIONS } from '@/content/creations';
import { ATELIER_STEPS } from '@/content/atelier';
import { WORLD_TERRITORIES } from '@/content/world';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { CreationCard } from '@/components/artwork/CreationCard';
import { Lightbox } from '@/components/artwork/Lightbox';
import { CertificateModal } from '@/components/artwork/CertificateModal';

export default function HomePage() {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // Selected featured artworks for homepage editorial display
  const featuredCreations = CREATIONS.filter((c) => c.featured);

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
      <section className="relative min-h-[100svh] overflow-hidden bg-[#201D1B]">
        <Image
          src="/assets/hero-full-bleed-baby.png"
          alt="Hyperrealistic baby sculpture resting in soft pink knitwear"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_48%] opacity-75 sm:object-[50%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#201D1B]/20 via-[#201D1B]/25 to-[#201D1B]/50" />

        <Container size="xl" className="relative z-10 flex min-h-[100svh] items-center justify-center py-28 sm:py-32">
          <div className="max-w-3xl text-center">
            <Text variant="display-l" as="h1" className="text-white drop-shadow-[0_2px_18px_rgba(32,29,27,0.25)]">
              {language === 'en' ? (
                <>
                  Where lifelike sculpture meets <span className="italic text-[#F9EBE5]">living presence</span>.
                </>
              ) : (
                <>
                  Donde la escultura hiperrealista encuentra <span className="italic text-[#F9EBE5]">presencia viva</span>.
                </>
              )}
            </Text>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {t.hero.manifesto}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/work" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4 text-[#E29578]" />}>
                {t.hero.viewCreations}
              </Button>
              <Button href="/atelier" variant="secondary" size="lg">
                {t.hero.enterAtelier}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. PHILOSOPHY / CENTRAL PRINCIPLE BANNER */}
      <Section variant="secondary" spacing="md" hasBorderTop hasBorderBottom>
        <Container size="md" className="text-center space-y-4">
          <Text variant="label" className="text-[#A45537] block">
            {BRAND.name} · Atelier Axiom
          </Text>
          <Text variant="display-m" voice="serif" className="text-[#201D1B] font-light italic">
            “{t.hero.statement}”
          </Text>
          <div className="pt-2 flex items-center justify-center gap-3 text-xs uppercase tracking-widest text-[#8E847A]">
            <span>Craftsmanship</span>
            <span>×</span>
            <span>Micro-Texture</span>
            <span>×</span>
            <span>Biological Believability</span>
          </div>
        </Container>
      </Section>

      {/* 03. SELECTED CREATIONS SHOWCASE */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <Text variant="label" className="text-[#A45537] mb-2 block">
                {t.home.selectedWorksTitle}
              </Text>
              <Text variant="display-m" className="text-[#201D1B]">
                {language === 'en' ? 'Artworks of Living Tenderness' : 'Obras de Ternura Viva'}
              </Text>
              <p className="text-base text-[#6A635D] mt-2 leading-relaxed">
                {t.home.selectedWorksSubtitle}
              </p>
            </div>
            <Button href="/work" variant="outline" size="md" icon={<ArrowRight className="w-3.5 h-3.5 text-[#E29578]" />}>
              {t.home.viewAllCreations}
            </Button>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredCreations.map((creation, index) => (
              <CreationCard
                key={creation.id}
                creation={creation}
                priority={false}
                aspectRatio={index === 0 ? 'portrait' : 'portrait'}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 04. THE ATELIER / CRAFT PROCESS GLIMPSE */}
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
                    <span>Examine Raw Painted Vinyl</span>
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-mono text-[#6A635D] border border-[#E8E0D5]">
                  Chapter 02 · 25+ Subdermal Glaze Layers
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
                    <span className="text-white text-xs font-sans font-medium">Chapter 04 · Micro-Rooting</span>
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
                    <span className="text-white text-xs font-sans font-medium">Chapter 05 · Tactile Realism</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atelier Narrative (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
                ATELIER DISCIPLINE
              </span>
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
                    <h4 className="text-sm font-semibold text-[#201D1B]">Subdermal Optical Depth</h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      Micro-sponged veining and capillary flushes cured in repeated 130°C cycles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5 text-xs font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#201D1B]">Single-Follicle Implantation</h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      Ethical Angora mohair rooted strand-by-strand with 42G ultra-fine German needles.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5 text-xs font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#201D1B]">Natural Gravitational Weight</h4>
                    <p className="text-xs text-[#6A635D] leading-relaxed">
                      Optical glass micro-beads calibrated so holding the piece requires supporting the neck.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button href="/atelier" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4 text-[#E29578]" />}>
                  {t.home.exploreProcess}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 05. THE ARTIST — MELISSA RENDON */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text & Philosophy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
                {t.home.artistTeaserTitle}
              </span>
              <Text variant="display-m" className="text-[#201D1B]">
                {BRAND.fullArtistName}
              </Text>
              <Text variant="body-large" voice="serif" className="italic text-[#6A635D] border-l-2 border-[#E29578] pl-5 my-4">
                {t.home.artistTeaserQuote}
              </Text>
              <p className="text-base text-[#6A635D] leading-relaxed">
                Operating from her private studio since 2020, Melissa creates works that challenge the boundary between sculpture and tender vulnerability. Every creation is cataloged and issued with a physical, hand-signed Certificate of Authenticity.
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
                  <span>Inspect Certificate</span>
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
                      Official Provenance Record
                    </span>
                  </div>
                  <p className="font-serif text-lg font-light">
                    Certificate of Authenticity · Julien
                  </p>
                  <p className="text-xs text-white/80">
                    Signed & dated by Melissa Rendon (23/07/2021)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 06. THE WORLD / EXPANDING ARTISTIC HORIZONS */}
      <Section variant="dark" spacing="lg">
        <Container size="xl">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="font-mono text-xs tracking-widest text-[#E29578] uppercase">
              {t.home.worldTeaserTitle}
            </span>
            <Text variant="display-m" className="text-[#F8F5F0] mt-2">
              {language === 'en' ? 'An Evolving Universe' : 'Un Universo en Expansión'}
            </Text>
            <p className="text-sm sm:text-base text-[#9D958E] mt-3 leading-relaxed">
              {t.home.worldTeaserSubtitle}
            </p>
          </div>

          {/* 4 Territory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORLD_TERRITORIES.map((territory, idx) => (
              <div
                key={territory.id}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#1E1B19] border border-[#2E2926] hover:border-[#E29578]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#E29578]">
                    <span>0{idx + 1}</span>
                    <Sparkles className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-white group-hover:text-[#E29578] transition-colors">
                    {territory.title[language]}
                  </h3>
                  <p className="text-xs text-[#9D958E] leading-relaxed">
                    {territory.description[language]}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2E2926] flex items-center justify-between text-xs text-[#9D958E]">
                  <span className="text-[11px] uppercase tracking-wider">Horizon</span>
                  <Link
                    href="/world"
                    className="inline-flex items-center gap-1 text-white hover:text-[#E29578] transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 07. AN INVITATION TO CONNECT */}
      <Section variant="primary" spacing="lg" hasBorderTop>
        <Container size="md" className="text-center space-y-6">
          <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
            {t.home.invitationTitle}
          </span>
          <Text variant="display-m" className="text-[#201D1B]">
            {language === 'en' ? 'Welcome to the Atelier' : 'Bienvenidos al Atelier'}
          </Text>
          <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed max-w-xl mx-auto">
            {t.home.invitationSubtitle}
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4 text-[#E29578]" />}>
              {t.home.contactArtist}
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              {t.home.viewAllCreations}
            </Button>
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
