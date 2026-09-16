'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OfferItem } from '@/content/offers';
import { useLanguage } from '@/context/LanguageContext';

type OfferCardProps = {
  offer: OfferItem;
  className?: string;
};

export function OfferCard({ offer, className = '' }: OfferCardProps) {
  const { language } = useLanguage();

  return (
    <article
      className={`group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E8E0D5]/80 hover:border-[#E29578]/50 shadow-[0_4px_20px_rgba(32,29,27,0.02)] hover:shadow-[0_16px_36px_rgba(32,29,27,0.07)] transition-all duration-500 ${className}`}
    >
      {/* Visual Thumbnail */}
      <Link
        href={offer.href}
        className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden bg-[#F3ECE4] block focus:outline-none"
        aria-label={`${offer.title[language]} - ${offer.subtitle[language]}`}
      >
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201D1B]/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

        {/* Floating Top Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/92 backdrop-blur-xs text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-[#A45537] border border-[#E29578]/30 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#E29578]" />
            <span>{offer.badge[language]}</span>
          </span>
        </div>

        {/* Category Pill on Image Bottom */}
        <div className="absolute bottom-3.5 left-3.5 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-[#F9EBE5] uppercase bg-black/45 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
            {offer.category[language]}
          </span>
        </div>
      </Link>

      {/* Structured Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3">
          <div>
            <Link
              href={offer.href}
              className="focus:outline-none group-hover:text-[#A45537] transition-colors inline-block"
            >
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#201D1B] leading-tight">
                {offer.title[language]}
              </h3>
            </Link>
            <p className="text-[11px] font-sans font-medium uppercase tracking-widest text-[#8E847A] mt-1">
              {offer.subtitle[language]}
            </p>
          </div>

          <p className="text-sm text-[#6A635D] font-sans leading-relaxed line-clamp-3">
            {offer.description[language]}
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {offer.features[language].map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[10px] sm:text-[11px] font-mono text-[#6A635D] bg-[#FAF7F2] border border-[#E8E0D5] px-2.5 py-0.5 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="pt-4 border-t border-[#E8E0D5]/70 flex items-center justify-between">
          <Link
            href={offer.href}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#201D1B] group-hover:text-[#A45537] transition-colors"
          >
            <span>{offer.ctaText[language]}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E29578] group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
}
