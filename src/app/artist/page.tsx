'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles, Award, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { CertificateModal } from '@/components/artwork/CertificateModal';

export default function ArtistPage() {
  const { language, t } = useLanguage();
  const [certificateOpen, setCertificateOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pt-20">
      {/* Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
              MEET THE MAKER
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {t.artist.title}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {t.artist.subtitle}
            </p>
          </div>
        </Container>
      </Section>

      {/* Artist Philosophy & Portrait Section */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Authentic Studio Photography (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                onClick={() => setCertificateOpen(true)}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#F3ECE4] border border-[#E8E0D5] shadow-lg cursor-pointer"
              >
                <Image
                  src="/assets/baby1.jpg"
                  alt="Baby Maker Petit creation with Certificate of Authenticity signed by Melissa Rendon"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F9EBE5]">
                    Atelier Authenticity
                  </span>
                  <p className="font-serif text-lg">
                    Certified Sculpture & Hand-Signed Provenance
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E0D5] flex items-center justify-between text-xs text-[#6A635D]">
                <span>Artistic Practice Est. {BRAND.yearEstablished}</span>
                <button
                  onClick={() => setCertificateOpen(true)}
                  className="text-[#A45537] font-semibold hover:underline cursor-pointer"
                >
                  Inspect Document
                </button>
              </div>
            </div>

            {/* Right: Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Text variant="display-m" voice="serif" className="italic text-[#201D1B] font-light leading-snug">
                {t.artist.quote}
              </Text>

              <div className="space-y-4 text-base text-[#6A635D] leading-relaxed">
                <p>{t.artist.storyP1}</p>
                <p>{t.artist.storyP2}</p>
                <p>{t.artist.storyP3}</p>
              </div>

              {/* Atelier Values */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#F3ECE4] border border-[#E8E0D5]">
                  <h4 className="font-serif text-lg text-[#201D1B] mb-1">Authenticity</h4>
                  <p className="text-xs text-[#6A635D]">
                    Every artwork registered with its own signed & sealed provenance document.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F3ECE4] border border-[#E8E0D5]">
                  <h4 className="font-serif text-lg text-[#201D1B] mb-1">Patience</h4>
                  <p className="text-xs text-[#6A635D]">
                    Over 80 hours of single-needle rooting and 25+ glaze passes per piece.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F3ECE4] border border-[#E8E0D5]">
                  <h4 className="font-serif text-lg text-[#201D1B] mb-1">Horizon</h4>
                  <p className="text-xs text-[#6A635D]">
                    Advancing actively into original platinum silicone sculptures and fantasy forms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Certificate of Authenticity Feature Section */}
      <Section variant="secondary" spacing="lg" hasBorderTop hasBorderBottom>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
                PROVENANCE & INTEGRITY
              </span>
              <Text variant="display-m" className="text-[#201D1B]">
                {t.artist.provenanceHeading}
              </Text>
              <Text variant="body" className="text-[#6A635D] leading-relaxed">
                {t.artist.provenanceDescription}
              </Text>

              <div className="space-y-3 text-sm text-[#6A635D] pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                  <span>Unique serial number and registered birth date/dimensions.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                  <span>Physical signature of artist Melissa Rendon.</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E29578]" />
                  <span>Embossed circular Baby Maker studio emblem seal.</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCertificateOpen(true)}
                  icon={<Award className="w-4 h-4 text-[#E29578]" />}
                >
                  {t.artist.viewCertificate}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() => setCertificateOpen(true)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#E8E0D5] shadow-md cursor-pointer"
              >
                <Image
                  src="/assets/baby1_certificate.jpg"
                  alt="Detailed crop of the Baby Maker Petit Certificate of Authenticity"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white/95 text-xs font-sans font-medium text-[#201D1B]">
                    Examine Document
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Inquiry Callout */}
      <Section variant="primary" spacing="lg">
        <Container size="md" className="text-center space-y-6">
          <Text variant="h2" className="text-3xl font-light text-[#201D1B]">
            {language === 'en' ? 'Commission an Heirloom Artwork' : 'Encargar una Obra Patrimonial'}
          </Text>
          <p className="text-base text-[#6A635D] max-w-lg mx-auto leading-relaxed">
            Melissa accepts a limited number of bespoke commissions each season. Each piece is crafted in close artistic alignment with the collector.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4 text-[#E29578]" />}>
              Connect with Melissa
            </Button>
          </div>
        </Container>
      </Section>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        creationTitle="Julien"
        certificateDate="23/07/2021"
      />
    </div>
  );
}
