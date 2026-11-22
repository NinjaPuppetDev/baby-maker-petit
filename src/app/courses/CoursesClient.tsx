'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Clock,
  GraduationCap,
  CheckCircle2,
  Package,
  ZoomIn,
} from 'lucide-react';
import { CourseTrack } from '@/content/courses';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Lightbox } from '@/components/artwork/Lightbox';

type CoursesClientProps = {
  tracks: CourseTrack[];
};

export function CoursesClient({ tracks }: CoursesClientProps) {
  const { language, t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const processImages = [
    {
      url: '/assets/baby8.png',
      title: 'Chapter 02 · 25+ Subdermal Glaze Layers',
      caption: 'Raw painted vinyl parts in the studio showing multi-layer mottling and veins.',
      alt: 'Raw painted vinyl head and limbs in atelier',
    },
    {
      url: '/assets/baby3_macro.jpg',
      title: 'Chapter 04 · Micro-Rooting',
      caption: 'Detail of single-strand micro-rooted eyelashes and hairline with 42G needle.',
      alt: 'Micro-rooted eyelashes close-up',
    },
    {
      url: '/assets/baby2_feet.jpg',
      title: 'Chapter 05 · Tactile Realism',
      caption: 'Plantar sole crease realism, translucent skin depth, and micro-blushing.',
      alt: 'Plantar sole crease realism',
    },
  ];

  const openLightboxAt = (idx: number) => {
    setActiveImageIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header Section */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <Text variant="display-l" className="text-[#201D1B]">
              {t.courses?.title || (language === 'en' ? 'Courses' : 'Cursos')}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.courses?.subtitle ||
                'Hands-on atelier training and specialized mentorship covering subdermal veining, capillary mottling, 42G fine needle micro-rooting, and anatomical balance.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                href="/contact?inquiry=course"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-3.5 h-3.5 text-[#201D1B]/80" />}
              >
                {t.courses?.inquireCourse || 'Inquire About Enrollment'}
              </Button>
              <Button href="#tracks" variant="secondary" size="md">
                {t.courses?.exploreCatalog || 'Explore Masterclass Tracks'}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* The Atelier / Craft Process Glimpse */}
      <Section variant="secondary" spacing="lg" hasBorderBottom>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Process Visual Montage (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div
                onClick={() => openLightboxAt(0)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8E0D5] shadow-md cursor-pointer"
                style={{ position: 'relative' }}
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
                  onClick={() => openLightboxAt(1)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#E8E0D5] cursor-pointer"
                  style={{ position: 'relative' }}
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
                  style={{ position: 'relative' }}
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
                {language === 'en'
                  ? 'Specialized Hyperrealistic Techniques'
                  : 'Técnicas hiperrealistas especializadas'}
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
                <Button href="#tracks" variant="primary" size="md" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  {language === 'en' ? 'Explore Masterclass Tracks' : 'Explorar Masterclasses'}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Course Tracks Catalog from CMS */}
      <Section id="tracks" variant="primary" spacing="lg" hasBorderBottom>
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#A45537] uppercase">
              {language === 'en' ? 'Specialized Training Tracks' : 'Programas de Especialización'}
            </span>
            <Text variant="h2" className="text-3xl font-serif font-light text-[#201D1B]">
              {language === 'en' ? 'Masterclass Offerings' : 'Oferta de Masterclasses'}
            </Text>
            <p className="text-sm text-[#6A635D]">
              {language === 'en'
                ? 'Curated studio curricula designed for artisans seeking microscopic hyperrealism, anatomical integrity, and gallery-worthy finishing.'
                : 'Planes de estudio de taller diseñados para artistas que buscan hiperrealismo microscópico, integridad anatómica y acabado de galería.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex flex-col rounded-3xl bg-[#FAF7F2] border border-[#E8E0D5] overflow-hidden hover:border-[#E29578]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(32,29,27,0.03)]"
              >
                {/* Image Cover */}
                <div
                  className="relative aspect-[16/10] w-full bg-[#EAE2D8] overflow-hidden"
                  style={{ position: 'relative' }}
                >
                  <Image
                    src={track.image}
                    alt={track.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#201D1B] leading-snug">
                        {track.title[language]}
                      </h3>
                      <p className="text-xs text-[#A45537] font-medium mt-1">
                        {track.subtitle[language]}
                      </p>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#6A635D]">
                      <span className="inline-flex items-center gap-1 bg-[#F3ECE4] px-2.5 py-1 rounded-md">
                        <Clock className="w-3 h-3 text-[#E29578]" />
                        {track.duration[language]}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-[#F3ECE4] px-2.5 py-1 rounded-md">
                        <GraduationCap className="w-3 h-3 text-[#E29578]" />
                        {track.level[language]}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#6A635D] leading-relaxed">
                      {track.description[language]}
                    </p>

                    {/* Curriculum Highlights */}
                    <div className="space-y-2 pt-2 border-t border-[#E8E0D5]">
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#8E847A] block">
                        {language === 'en' ? 'Core Curriculum' : 'Módulos Clave'}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#504A45]">
                        {track.curriculum[language].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E29578] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What's Included */}
                    <div className="space-y-2 pt-2 border-t border-[#E8E0D5]">
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#8E847A] block">
                        {language === 'en' ? 'Course Materials Included' : 'Materiales Incluidos'}
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#504A45]">
                        {track.includes[language].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Package className="w-3.5 h-3.5 text-[#A45537] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E0D5]">
                    <Button
                      href={`/contact?inquiry=course&track=${track.id}`}
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {language === 'en' ? 'Inquire for Track' : 'Consultar Disponibilidad'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 1-on-1 Mentorship Banner */}
      <Section variant="secondary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="rounded-3xl bg-[#FAF7F2] border border-[#E8E0D5] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#201D1B]">
                {t.courses?.oneOnOneTitle || '1-on-1 Artist Mentorship'}
              </h3>
              <p className="text-sm md:text-base text-[#6A635D] leading-relaxed">
                {language === 'en'
                  ? 'For dedicated sculptors and collectors seeking direct, customized guidance with Melissa Rendon. Includes comprehensive portfolio critiques, live video technique adjustments, and direct real-time feedback on your current piece in progress.'
                  : 'Para escultores y artistas que buscan asesoría personalizada con Melissa Rendon. Incluye revisiones técnicas de portafolio, ajustes en vivo por videollamada y retroalimentación directa sobre tu obra en progreso.'}
              </p>
            </div>
            <div className="shrink-0">
              <Button
                href="/contact?inquiry=course&track=mentorship"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-3.5 h-3.5 text-white/90" />}
              >
                {language === 'en' ? 'Request Mentorship' : 'Solicitar Mentoría'}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox for Process Inspection */}
      <Lightbox
        isOpen={lightboxOpen}
        images={processImages}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIndex((prev) => (prev + 1) % processImages.length)}
        onPrev={() => setActiveImageIndex((prev) => (prev - 1 + processImages.length) % processImages.length)}
        setCurrentIndex={setActiveImageIndex}
      />
    </div>
  );
}
