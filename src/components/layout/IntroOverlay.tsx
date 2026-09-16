'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/config/brand';

export function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    // Trigger entrance animation immediately on load/mount
    const enterTimer = setTimeout(() => {
      setIsAnimationActive(true);
    }, 50);

    // Fade out after 2.7s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2700);

    // Remove from DOM after fade finishes (3.4s)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3400);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const dismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      id="intro-overlay"
      style={{
        zIndex: 999999,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#FAF7F2] select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Atelier Entrance"
    >
      {/* Ambient Radial Warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(249, 235, 229, 0.85) 0%, rgba(250, 247, 242, 0.95) 55%, #FAF7F2 100%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative Atelier Framing Rules */}
      <div
        style={{
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease',
          transform: isAnimationActive ? 'scaleX(1)' : 'scaleX(0)',
          opacity: isAnimationActive ? 0.2 : 0,
        }}
        className="absolute top-10 left-8 right-8 md:top-14 md:left-14 md:right-14 h-px bg-[#201D1B] origin-center pointer-events-none"
      />
      <div
        style={{
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 1.2s ease 0.1s',
          transform: isAnimationActive ? 'scaleX(1)' : 'scaleX(0)',
          opacity: isAnimationActive ? 0.2 : 0,
        }}
        className="absolute bottom-10 left-8 right-8 md:bottom-14 md:left-14 md:right-14 h-px bg-[#201D1B] origin-center pointer-events-none"
      />

      {/* Centerpiece Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-sm">
        {/* Breathing Logo Medallion */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Peach Aura Pulse */}
          <div
            style={{
              transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isAnimationActive ? 'scale(1.1)' : 'scale(0.7)',
              opacity: isAnimationActive ? 0.35 : 0,
            }}
            className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#E29578] blur-2xl pointer-events-none"
          />

          {/* Medallion Circle */}
          <div
            style={{
              transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease',
              transform: isAnimationActive ? 'scale(1) translateY(0)' : 'scale(0.82) translateY(12px)',
              opacity: isAnimationActive ? 1 : 0,
            }}
            className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-2 bg-white/95 shadow-[0_16px_48px_rgba(32,29,27,0.1)] border border-[#E8E0D5]"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border border-[#E29578]/30 bg-[#FAF7F2]">
              <Image
                src="/assets/logo-circle.png"
                alt={BRAND.name}
                fill
                priority
                sizes="(max-width: 768px) 128px, 144px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Brand Headline and Atelier Subtitle */}
        <div
          style={{
            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 0.9s ease 0.3s',
            transform: isAnimationActive ? 'translateY(0)' : 'translateY(16px)',
            opacity: isAnimationActive ? 1 : 0,
          }}
          className="mt-6 space-y-2.5"
        >
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#201D1B]">
            {BRAND.name}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#A18C64]/40" />
            <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#A18C64] font-semibold">
              {BRAND.fullArtistName} · Atelier
            </p>
            <span className="h-px w-6 bg-[#A18C64]/40" />
          </div>
        </div>

        {/* Skip / Enter Action */}
        <button
          onClick={dismiss}
          style={{
            transition: 'opacity 0.6s ease 0.7s',
            opacity: isAnimationActive ? 1 : 0,
          }}
          className="mt-7 text-[11px] font-sans tracking-[0.2em] uppercase text-[#8F7B54] hover:text-[#201D1B] transition-colors cursor-pointer py-1.5 px-4 rounded-full border border-transparent hover:border-[#E8E0D5] bg-transparent hover:bg-white/60"
        >
          Enter Atelier &rarr;
        </button>
      </div>
    </div>
  );
}
