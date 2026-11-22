'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Creation } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Badge } from '@/components/primitives/Badge';
import { Text } from '@/components/primitives/Text';
import { WhatsAppIcon } from '@/components/ui/Icons';

type CreationCardProps = {
  creation: Creation;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  aspectRatio?: 'square' | 'portrait' | 'wide';
  className?: string;
};

export function CreationCard({
  creation,
  priority = false,
  loading,
  aspectRatio = 'portrait',
  className = '',
}: CreationCardProps) {
  const { language, t } = useLanguage();

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5] sm:aspect-[3/4]',
    wide: 'aspect-[16/10]',
  }[aspectRatio];

  const statusVariant = {
    'Private Collection': 'neutral' as const,
    'Atelier Archive': 'status' as const,
    'Atelier Study': 'provenance' as const,
    'Available on Inquiry': 'accent' as const,
  }[creation.status];

  return (
    <article
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8E0D5]/80 hover:border-[#E29578]/50 shadow-[0_4px_20px_rgba(32,29,27,0.02)] hover:shadow-[0_12px_32px_rgba(32,29,27,0.06)] transition-all duration-500 ${className}`}
    >
      {/* Artwork Image Link */}
      <Link
        href={`/work/${creation.slug}`}
        className={`relative w-full ${aspectClasses} overflow-hidden bg-[#F3ECE4] block focus:outline-none`}
        style={{ position: 'relative' }}
        aria-label={`${creation.title} (${creation.year})`}
      >
        <Image
          src={creation.coverImage}
          alt={creation.title}
          fill
          priority={priority}
          loading={priority ? undefined : loading}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <Badge variant={statusVariant} className="shadow-xs">
            {creation.status}
          </Badge>
          {creation.hasCertificate && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-sans font-medium tracking-wider text-[#A45537] border border-[#E29578]/30 shadow-xs"
              title="Official Certificate of Authenticity Issued"
            >
              <ShieldCheck className="w-3 h-3 text-[#E29578]" />
              <span>COA</span>
            </span>
          )}
        </div>

        {/* Quiet Hover prompt */}
        <div className="absolute bottom-3.5 right-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-xs font-sans font-medium text-[#201D1B] shadow-sm">
            <span>{t.work.creationDetail}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E29578]" />
          </span>
        </div>
      </Link>

      {/* Structured Editorial Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <Link
              href={`/work/${creation.slug}`}
              className="focus:outline-none group-hover:text-[#A45537] transition-colors"
            >
              <Text variant="h2" className="text-xl sm:text-2xl font-light text-[#201D1B]">
                {creation.title}
              </Text>
            </Link>
            <span className="text-xs font-sans text-[#8E847A] tracking-wider shrink-0">
              {creation.year}
            </span>
          </div>

          <p className="text-xs text-[#8E847A] font-sans line-clamp-1 mb-2.5">
            {creation.medium}
          </p>

          <p className="text-sm text-[#6A635D] font-sans line-clamp-2 leading-relaxed">
            {creation.description[language]}
          </p>
        </div>

        {/* Action & Metadata Area */}
        <div className="space-y-3 pt-3 border-t border-[#E8E0D5]/60">
          <div className="flex items-center justify-between text-xs text-[#8E847A]">
            <span className="truncate max-w-[180px]">
              {creation.weight ? `${creation.weight} · ${creation.length}` : creation.series}
            </span>
            <Link
              href={`/work/${creation.slug}`}
              className="inline-flex items-center gap-1 text-[#201D1B] hover:text-[#A45537] font-medium transition-colors shrink-0"
            >
              <span>{t.work.creationDetail}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E29578]" />
            </Link>
          </div>

          {/* WhatsApp Checkout Button */}
          <a
            href={`https://wa.me/${BRAND.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'en'
                ? `Hello Melissa, I am interested in adopting the creation "${creation.title}" (${creation.year}, ${creation.series}). Could you please share the availability and adoption details?`
                : `Hola Melissa, estoy interesado(a) en adoptar la creación "${creation.title}" (${creation.year}, ${creation.series}). ¿Me podrías brindar información sobre su disponibilidad y proceso de adopción?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#128C7E] hover:text-[#075E54] text-xs font-sans font-semibold tracking-wide transition-all duration-200 group/wa shadow-2xs"
            aria-label={`${t.work.adoptMe}: ${creation.title}`}
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] transition-transform group-hover/wa:scale-110" />
            <span>{t.work.adoptMe}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
