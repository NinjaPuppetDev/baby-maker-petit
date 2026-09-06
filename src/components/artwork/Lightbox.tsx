'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type LightboxImage = {
  url: string;
  title?: string;
  caption?: string;
  alt?: string;
};

type LightboxProps = {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  setCurrentIndex?: (index: number) => void;
};

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  setCurrentIndex,
}: LightboxProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141211]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fade-in text-white select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork Lightbox Gallery"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#FAF7F2]/70 uppercase">
            {currentIndex + 1} {t.lightbox.counter} {images.length}
          </span>
          {current.title && (
            <span className="hidden sm:inline-block text-xs font-serif italic text-white/80 border-l border-white/20 pl-3">
              {current.title}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578] cursor-pointer"
          aria-label={t.lightbox.close}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 active:bg-black text-white/80 hover:text-white transition-all backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578] cursor-pointer"
            aria-label={t.lightbox.previous}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Dominant Artwork */}
        <div className="relative max-w-full max-h-full w-full h-[75vh] flex items-center justify-center">
          <Image
            src={current.url}
            alt={current.alt || current.title || 'Artwork detail view'}
            fill
            className="object-contain transition-opacity duration-300"
            priority
            sizes="100vw"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 active:bg-black text-white/80 hover:text-white transition-all backdrop-blur-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578] cursor-pointer"
            aria-label={t.lightbox.next}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Thumbnails Bar */}
      <div className="flex flex-col items-center gap-3 z-10 max-w-2xl mx-auto text-center">
        {current.caption && (
          <p className="text-xs sm:text-sm font-sans text-white/80 leading-relaxed max-w-xl">
            {current.caption}
          </p>
        )}

        {/* Thumbnails if multiple images */}
        {images.length > 1 && setCurrentIndex && (
          <div className="flex items-center gap-2 overflow-x-auto p-1 max-w-full">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'border-[#E29578] scale-105 ring-1 ring-[#E29578]'
                    : 'border-white/20 opacity-50 hover:opacity-90'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || ''}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
