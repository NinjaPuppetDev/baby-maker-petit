'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { Creation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { CreationMetadata } from '@/components/artwork/CreationMetadata';
import { Lightbox } from '@/components/artwork/Lightbox';
import { CertificateModal } from '@/components/artwork/CertificateModal';
import { InquiryModal } from '@/components/artwork/InquiryModal';

type CreationDetailClientProps = {
  creation: Creation;
  relatedCreations: Creation[];
};

export function CreationDetailClient({
  creation,
  relatedCreations,
}: CreationDetailClientProps) {
  const { language, t } = useLanguage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Combine cover and detail images for the gallery lightbox
  const allImages = [
    {
      url: creation.coverImage,
      title: `${creation.title} (${creation.year})`,
      caption: creation.description[language],
      alt: creation.title,
    },
    ...(creation.detailImages || []).map((d) => ({
      url: d.url,
      title: d.title[language],
      caption: d.caption[language],
      alt: d.alt,
    })),
  ];

  const openLightbox = (idx: number) => {
    setActiveImageIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#E8E0D5] bg-[#FAF7F2]/80 backdrop-blur-xs py-3.5">
        <Container size="xl" className="flex items-center justify-between text-xs text-[#6A635D]">
          <NextLink
            href="/work"
            className="inline-flex items-center gap-2 hover:text-[#201D1B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E29578]" />
            <span>{t.work.backToWorks}</span>
          </NextLink>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[#8E847A]">{creation.series}</span>
            <span>·</span>
            <span className="font-serif italic text-[#201D1B]">{creation.title}</span>
          </div>
        </Container>
      </div>

      {/* Main Artwork Stage */}
      <Section variant="primary" spacing="md">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left: Dominant Photographic Presentation (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div
                onClick={() => openLightbox(0)}
                className="group relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-[#F3ECE4] border border-[#E8E0D5] shadow-[0_12px_40px_rgba(32,29,27,0.04)] cursor-pointer"
              >
                <Image
                  src={creation.coverImage}
                  alt={creation.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-xs text-xs font-sans font-medium text-[#201D1B] shadow-sm">
                    <ZoomIn className="w-4 h-4 text-[#E29578]" />
                    <span>Enlarge Artwork View</span>
                  </span>
                </div>
              </div>

              {/* Detail Photo Sequence */}
              {creation.detailImages && creation.detailImages.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider font-mono text-[#8E847A]">
                    Macro Detail Studies & Provenance
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {creation.detailImages.map((detail, dIdx) => (
                      <div
                        key={dIdx}
                        onClick={() => openLightbox(dIdx + 1)}
                        className="group relative aspect-square rounded-xl overflow-hidden bg-[#F3ECE4] border border-[#E8E0D5] cursor-pointer"
                      >
                        <Image
                          src={detail.url}
                          alt={detail.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-white px-2 py-1 rounded-full bg-black/40 backdrop-blur-xs">
                            Detail {dIdx + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Editorial Narrative & Specifications (5 cols) */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={creation.status === 'Private Collection' ? 'neutral' : 'provenance'}>
                      {creation.status}
                    </Badge>
                    <span className="text-xs font-mono text-[#8E847A]">
                      {creation.year}
                    </span>
                  </div>
                  <Text variant="display-m" className="text-[#201D1B] tracking-tight">
                    {creation.title}
                  </Text>
                  <p className="font-serif italic text-lg text-[#6A635D] mt-1">
                    {creation.series} · {BRAND.fullArtistName}
                  </p>
                </div>

                <div className="prose text-[#6A635D] leading-relaxed text-sm sm:text-base space-y-3">
                  <p>{creation.description[language]}</p>
                </div>

                {/* Inquiry & Certificate CTA Bar */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E0D5] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#201D1B]">Atelier Availability</span>
                    <span className="text-[#A45537] font-medium">{creation.status}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => setInquiryOpen(true)}
                    icon={<Mail className="w-3.5 h-3.5 text-[#E29578]" />}
                  >
                    {t.work.inquirePiece}
                  </Button>
                  {creation.hasCertificate && (
                    <button
                      onClick={() => setCertificateOpen(true)}
                      className="w-full text-center text-xs font-sans text-[#6A635D] hover:text-[#A45537] transition-colors py-1 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#E29578]" />
                      <span>Inspect Official Certificate of Authenticity</span>
                    </button>
                  )}
                </div>

                {/* Structured Metadata Component */}
                <CreationMetadata
                  creation={creation}
                  onOpenCertificate={() => setCertificateOpen(true)}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Narrative & Craft Section */}
      <Section variant="secondary" spacing="lg" hasBorderTop hasBorderBottom>
        <Container size="md" className="space-y-12">
          {/* The Story */}
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              ARTISTIC INTENT
            </span>
            <Text variant="h1" className="text-3xl sm:text-4xl text-[#201D1B]">
              {t.work.theStoryTitle}
            </Text>
            <Text variant="body-large" className="text-[#6A635D] leading-relaxed">
              {creation.story[language]}
            </Text>
          </div>

          {/* Craft Notes */}
          <div className="pt-8 border-t border-[#E8E0D5] space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              CRAFTSMANSHIP NOTES
            </span>
            <Text variant="h1" className="text-2xl sm:text-3xl text-[#201D1B]">
              {t.work.craftNotesTitle}
            </Text>
            <p className="text-base text-[#6A635D] leading-relaxed">
              {creation.craftNotes[language]}
            </p>
          </div>
        </Container>
      </Section>

      {/* Related Artworks */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="flex items-center justify-between mb-8">
            <Text variant="h2" className="text-2xl font-light text-[#201D1B]">
              {t.work.relatedWorks}
            </Text>
            <NextLink
              href="/work"
              className="text-xs uppercase tracking-wider text-[#A45537] hover:underline"
            >
              {t.work.filterAll}
            </NextLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCreations.map((rel) => (
              <NextLink
                key={rel.id}
                href={`/work/${rel.slug}`}
                className="group block bg-white rounded-2xl p-4 border border-[#E8E0D5] hover:border-[#E29578]/50 transition-all shadow-xs"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F3ECE4] mb-3">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <h4 className="font-serif text-lg text-[#201D1B] group-hover:text-[#A45537] transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-xs font-mono text-[#8E847A]">{rel.year}</span>
                </div>
                <p className="text-xs text-[#6A635D] line-clamp-1 mt-1">{rel.medium}</p>
              </NextLink>
            ))}
          </div>
        </Container>
      </Section>

      {/* Lightbox & Modals */}
      <Lightbox
        isOpen={lightboxOpen}
        images={allImages}
        currentIndex={activeImageIdx}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIdx((prev) => (prev + 1) % allImages.length)}
        onPrev={() => setActiveImageIdx((prev) => (prev - 1 + allImages.length) % allImages.length)}
        setCurrentIndex={setActiveImageIdx}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        creationTitle={creation.title}
        certificateDate={creation.certificateDate || '2021'}
      />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        creationTitle={creation.title}
      />
    </div>
  );
}
