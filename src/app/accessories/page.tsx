'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, ZoomIn, Scissors, Feather, Heart } from 'lucide-react';
import { ACCESSORIES_CATALOG, AccessoryItem } from '@/content/accessories';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Text } from '@/components/primitives/Text';
import { Button } from '@/components/primitives/Button';
import { Badge } from '@/components/primitives/Badge';
import { Lightbox } from '@/components/artwork/Lightbox';

export default function AccessoriesPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'bonnets' | 'knitwear' | 'tailoring' | 'magnetic'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<AccessoryItem | null>(null);

  const filteredItems = ACCESSORIES_CATALOG.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const allGalleryImages = ACCESSORIES_CATALOG.flatMap((item) =>
    item.galleryImages.map((url) => ({
      url,
      title: item.title[language],
      caption: item.materials[language],
      alt: item.title[language],
    }))
  );

  const openItemLightbox = (item: AccessoryItem) => {
    const idx = allGalleryImages.findIndex((img) => img.url === item.coverImage);
    setActiveImageIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col w-full pt-20">
      {/* 01. Page Header */}
      <Section variant="primary" spacing="md" hasBorderBottom>
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30 inline-block">
              {language === 'en' ? 'ATELIER WARDROBE & HEIRLOOM APPAREL' : 'GUARDARROPA DE AUTOR Y VESTUARIO PATRIMONIAL'}
            </span>
            <Text variant="display-l" className="text-[#201D1B]">
              {language === 'en' ? 'Accessories & Clothes' : 'Ropa y Accesorios'}
            </Text>
            <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed">
              {language === 'en'
                ? 'Curated hand-tailored garments, vintage lace bonnets, fine merino knits, and sculpture-safe accessories proportioned with delicate anatomical accuracy.'
                : 'Piezas exclusivas de sastrería a mano, capotas de encaje vintage, tejidos en lana merino y accesorios magnéticos seguros para esculturas hiperrealistas.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-8 flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                filter === 'all'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {language === 'en' ? 'All Pieces' : 'Todas las Piezas'} ({ACCESSORIES_CATALOG.length})
            </button>
            <button
              onClick={() => setFilter('bonnets')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                filter === 'bonnets'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {language === 'en' ? 'Heirloom Bonnets' : 'Capotas'} (
              {ACCESSORIES_CATALOG.filter((i) => i.category === 'bonnets').length})
            </button>
            <button
              onClick={() => setFilter('knitwear')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                filter === 'knitwear'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {language === 'en' ? 'Fine Knitwear' : 'Tejidos Finos'} (
              {ACCESSORIES_CATALOG.filter((i) => i.category === 'knitwear').length})
            </button>
            <button
              onClick={() => setFilter('tailoring')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                filter === 'tailoring'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {language === 'en' ? 'Tailored Apparel' : 'Sastrería'} (
              {ACCESSORIES_CATALOG.filter((i) => i.category === 'tailoring').length})
            </button>
            <button
              onClick={() => setFilter('magnetic')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                filter === 'magnetic'
                  ? 'bg-[#A18C64] text-white shadow-xs'
                  : 'bg-white text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5]'
              }`}
            >
              {language === 'en' ? 'Magnetic Accessories' : 'Accesorios Magnéticos'} (
              {ACCESSORIES_CATALOG.filter((i) => i.category === 'magnetic').length})
            </button>
          </div>
        </Container>
      </Section>

      {/* 02. Gallery & Catalog Grid */}
      <Section variant="primary" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E8E0D5]/80 hover:border-[#E29578]/50 shadow-[0_4px_24px_rgba(32,29,27,0.03)] hover:shadow-[0_16px_40px_rgba(32,29,27,0.08)] transition-all duration-500"
              >
                {/* Visual Thumbnail */}
                <div
                  onClick={() => openItemLightbox(item)}
                  className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-[#F3ECE4] block cursor-pointer"
                >
                  <Image
                    src={item.coverImage}
                    alt={item.title[language]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xs text-xs font-sans font-medium text-[#201D1B] shadow-sm">
                      <ZoomIn className="w-3.5 h-3.5 text-[#E29578]" />
                      <span>{language === 'en' ? 'Inspect Detail' : 'Examinar Detalle'}</span>
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/92 backdrop-blur-xs text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-[#A45537] border border-[#E29578]/30 shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#E29578]" />
                      <span>{item.badge[language]}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#201D1B]/85 text-white backdrop-blur-xs text-[10px] font-mono tracking-wider">
                      {item.status[language]}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest text-[#F9EBE5] uppercase bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                      {item.categoryLabel[language]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#201D1B] group-hover:text-[#A45537] transition-colors leading-snug">
                      {item.title[language]}
                    </h3>

                    <p className="text-xs text-[#8E847A] font-mono">
                      {item.materials[language]}
                    </p>

                    <p className="text-sm text-[#6A635D] font-sans leading-relaxed line-clamp-3">
                      {item.description[language]}
                    </p>

                    {/* Compatibility pill */}
                    <div className="pt-1">
                      <span className="inline-block text-[11px] font-sans text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-md border border-[#E29578]/30">
                        {item.compatibility[language]}
                      </span>
                    </div>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.features[language].map((f, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-[10px] font-mono text-[#6A635D] bg-[#FAF7F2] border border-[#E8E0D5] px-2.5 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#E8E0D5]/70 flex items-center justify-between">
                    <button
                      onClick={() => openItemLightbox(item)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#201D1B] hover:text-[#A45537] transition-colors cursor-pointer"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-[#E29578]" />
                      <span>{language === 'en' ? 'View Photos' : 'Ver Fotos'}</span>
                    </button>

                    <Link
                      href="/contact?inquiry=accessories"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#8E847A] hover:text-[#201D1B] transition-colors"
                    >
                      <span>{language === 'en' ? 'Inquire' : 'Consultar'}</span>
                      <ArrowRight className="w-3 h-3 text-[#E29578]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* 03. Sculpture-Safe Craftsmanship Guarantee */}
      <Section variant="secondary" spacing="md" hasBorderTop hasBorderBottom>
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-[#E8E0D5]">
              <div className="w-10 h-10 rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#201D1B]">
                {language === 'en' ? 'Zero-Abrasion Linings' : 'Forros Cero Abrasión'}
              </h4>
              <p className="text-xs text-[#6A635D] leading-relaxed">
                {language === 'en'
                  ? 'All bonnets and collars feature smooth enclosed interior hems that glide across fragile micro-rooted mohair without catching follicles.'
                  : 'Todas las capotas y cuellos cuentan con costuras francesas lisas que protegen el enraizado delicado de mohair sin provocar tirones.'}
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white border border-[#E8E0D5]">
              <div className="w-10 h-10 rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#201D1B]">
                {language === 'en' ? 'Colorfast Botanical Dyes' : 'Tintes Botánicos Inalterables'}
              </h4>
              <p className="text-xs text-[#6A635D] leading-relaxed">
                {language === 'en'
                  ? 'Textiles undergo double neutralizing wash cycles to ensure zero pigment bleeding onto Genesis heat-set oil skin varnishes.'
                  : 'Los textiles son sometidos a lavados de fijación para garantizar cero transferencia de color al barniz de piel curada al calor.'}
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white border border-[#E8E0D5]">
              <div className="w-10 h-10 rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
                <Scissors className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#201D1B]">
                {language === 'en' ? 'Felt-Shielded Neodymium' : 'Imanes con Protección de Fieltro'}
              </h4>
              <p className="text-xs text-[#6A635D] leading-relaxed">
                {language === 'en'
                  ? 'Magnetic pacifiers are cushioned behind soft medical felt barriers, guarding lips against surface friction and pressure marks.'
                  : 'Los chupetes magnéticos incorporan barrera de fieltro acolchado que preserva la hidratación y el brillo de los labios.'}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 04. Bespoke Commission CTA */}
      <Section variant="primary" spacing="lg">
        <Container size="md" className="text-center space-y-6">
          <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
            {language === 'en' ? 'BESPOKE TAILORING REQUESTS' : 'ENCARGOS A MEDIDA'}
          </span>
          <Text variant="display-m" className="text-[#201D1B]">
            {language === 'en' ? 'Commission a Custom Wardrobe Ensemble' : 'Encarga un Guardarropa Personalizado'}
          </Text>
          <p className="text-base sm:text-lg text-[#6A635D] leading-relaxed max-w-xl mx-auto">
            {language === 'en'
              ? 'Have a specific vintage pattern, antique lace piece, or newborn size requirement for your sculpture? Melissa crafts bespoke sets on request.'
              : '¿Deseas una prenda especial con encaje de época o medidas exclusivas para tu escultura? Melissa elabora conjuntos por encargo.'}
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <Button href="/contact?inquiry=accessories" variant="primary" size="md" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              {language === 'en' ? 'Request Wardrobe Consultation' : 'Solicitar Consulta de Vestuario'}
            </Button>
            <Button href="/work" variant="secondary" size="md">
              {language === 'en' ? 'View Baby Sculptures' : 'Ver Esculturas de Bebés'}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={allGalleryImages}
        currentIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveImageIndex((prev) => (prev + 1) % allGalleryImages.length)}
        onPrev={() => setActiveImageIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length)}
        setCurrentIndex={setActiveImageIndex}
      />
    </div>
  );
}
