'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Clock,
  GraduationCap,
  CheckCircle2,
  Package,
  HeartHandshake,
} from 'lucide-react';
import { COURSE_TRACKS } from '@/content/courses';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';

export default function CoursesPage() {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header Section */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <Text variant="display-l" className="text-[#201D1B]">
              {t.courses?.title || 'Courses & Masterclasses'}
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

      {/* Academy Philosophy Intro */}
      <Section variant="secondary" spacing="md" hasBorderBottom>
        <Container size="md" className="space-y-6 text-center">
          <Text variant="h2" className="text-2xl sm:text-3xl font-light text-[#201D1B]">
            {language === 'en' ? 'Radical Manual Patience as a Discipline' : 'Paciencia Manual Radical como Disciplina'}
          </Text>
          <Text variant="body-large" className="text-[#6A635D] leading-relaxed">
            {t.courses?.intro ||
              'In an era of disposable digital objects and rapid automation, Baby Maker Petit opens its master atelier techniques. Learn the rigorous manual patience, optical layering, and micro-rooting precision directly from Melissa Rendon.'}
          </Text>
        </Container>
      </Section>

      {/* Course Tracks Catalog */}
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
            {COURSE_TRACKS.map((track) => (
              <div
                key={track.id}
                className="flex flex-col rounded-3xl bg-[#FAF7F2] border border-[#E8E0D5] overflow-hidden hover:border-[#E29578]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(32,29,27,0.03)]"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] w-full bg-[#EAE2D8] overflow-hidden">
                  <Image
                    src={track.image}
                    alt={track.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-mono tracking-wider text-[#A45537] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#E29578]/30 shadow-xs">
                      {track.badge[language]}
                    </span>
                  </div>
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
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A45537] bg-[#F9EBE5] px-3 py-1 rounded-full border border-[#E29578]/30">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'PRIVATE APPRENTICESHIP' : 'APRENDIZAJE PRIVADO'}</span>
              </div>
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


    </div>
  );
}
