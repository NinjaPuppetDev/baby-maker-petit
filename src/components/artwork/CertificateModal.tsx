'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ShieldCheck, Award } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';

type CertificateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  creationTitle?: string;
  certificateDate?: string;
};

export function CertificateModal({
  isOpen,
  onClose,
  creationTitle = 'Julien',
  certificateDate = '23/07/2021',
}: CertificateModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141211]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate of Authenticity"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E0D5] shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E0D5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9EBE5] flex items-center justify-center text-[#A45537]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#201D1B] font-normal">
                {BRAND.certificateTitle}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#8E847A]">
                Official Atelier Document · {BRAND.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F3ECE4] text-[#201D1B] transition-colors cursor-pointer"
            aria-label="Close certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Image View */}
        <div className="relative p-4 sm:p-8 bg-[#F3ECE4] overflow-y-auto flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-[#D8CEC4]">
            <Image
              src="/assets/baby1_certificate.jpg"
              alt="Baby Maker Petit Certificate of Authenticity signed by Mel Rendon"
              fill
              className="object-contain bg-white"
              priority
            />
          </div>

          <div className="mt-6 max-w-xl text-center space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-[#A45537]">
              Document Transcript & Provenance Record
            </p>
            <p className="font-serif text-sm italic text-[#201D1B] leading-relaxed">
              “This document certifies that your reborn doll is painted by the artist Mel Rendon from Baby Maker Petit.”
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-[#6A635D] pt-1">
              <span>Date: {certificateDate}</span>
              <span>·</span>
              <span>Artist: {BRAND.fullArtistName}</span>
              <span>·</span>
              <span>Studio Seal: Embossed</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E0D5] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-[#201D1B] text-white hover:bg-[#342F2C] transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}
