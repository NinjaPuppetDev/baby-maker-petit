'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
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
        style={{ position: 'relative' }}
        aria-label={`${offer.title[language]} - ${offer.subtitle[language]}`}
      >
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Structured Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
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
