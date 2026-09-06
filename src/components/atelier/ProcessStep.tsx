'use client';

import React from 'react';
import Image from 'next/image';
import { Check, ZoomIn } from 'lucide-react';
import { AtelierStep } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Text } from '@/components/primitives/Text';

type ProcessStepProps = {
  step: AtelierStep;
  index: number;
  onImageClick?: (image: string, title: string) => void;
};

export function ProcessStep({ step, index, onImageClick }: ProcessStepProps) {
  const { language } = useLanguage();
  const isEven = index % 2 === 1;

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 md:py-20 ${
        index !== 0 ? 'border-t border-[#E8E0D5]/70' : ''
      }`}
    >
      {/* Narrative Col (6 cols) */}
      <div
        className={`lg:col-span-6 space-y-6 ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-[#A45537] bg-[#F9EBE5] px-2.5 py-1 rounded-full border border-[#E29578]/30">
            CHAPTER {step.number}
          </span>
          <div className="h-[1px] w-8 bg-[#E29578]/40" />
        </div>

        <div>
          <Text variant="h2" className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#201D1B] mb-2">
            {step.title[language]}
          </Text>
          <p className="font-serif italic text-base sm:text-lg text-[#6A635D]">
            {step.subtitle[language]}
          </p>
        </div>

        <Text variant="body" className="text-[#6A635D] leading-relaxed text-base sm:text-lg">
          {step.description[language]}
        </Text>

        <div className="pt-2">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#201D1B] mb-3">
            Atelier Technical Protocol
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#6A635D]">
            {step.technicalDetails[language].map((detail, dIdx) => (
              <li key={dIdx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-center text-[#E29578] shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Col (6 cols) */}
      <div
        className={`lg:col-span-6 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div
          onClick={() => onImageClick && onImageClick(step.image, step.title[language])}
          className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F3ECE4] border border-[#E8E0D5] shadow-[0_6px_24px_rgba(32,29,27,0.03)] cursor-pointer"
        >
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xs text-xs font-sans font-medium text-[#201D1B] shadow-sm">
              <ZoomIn className="w-3.5 h-3.5 text-[#E29578]" />
              <span>Inspect Detail</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-mono text-[#6A635D] border border-[#E8E0D5]/60 pointer-events-none">
            {step.imageAlt}
          </div>
        </div>
      </div>
    </div>
  );
}
