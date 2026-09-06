'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BRAND } from '@/config/brand';
import { Container } from '@/components/primitives/Container';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/work', label: t.nav.work },
    { href: '/atelier', label: t.nav.atelier },
    { href: '/artist', label: t.nav.artist },
    { href: '/world', label: t.nav.world },
    { href: '/archive', label: t.nav.archive },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/88 backdrop-blur-md py-3 shadow-[0_2px_12px_rgba(32,29,27,0.03)] border-b border-[#E8E0D5]/70'
          : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <Container size="xl" className="flex items-center justify-between">
        {/* Brand Link */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578] rounded-full pr-3 py-1"
          aria-label={BRAND.name}
        >
          <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-[#E29578]/30 bg-[#F9EBE5] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/logo-circle.png"
              alt={BRAND.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-serif text-lg md:text-xl font-light tracking-wide text-[#201D1B] group-hover:text-[#A45537] transition-colors">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label={t.nav.ariaMenu}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.14em] transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#201D1B] font-semibold'
                    : 'text-[#6A635D] hover:text-[#201D1B] font-normal'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E29578] rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Quiet Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium tracking-wider text-[#6A635D] hover:text-[#201D1B] border border-[#E8E0D5] hover:border-[#201D1B]/30 bg-[#FAF7F2]/60 hover:bg-white transition-all cursor-pointer"
            aria-label={`${t.nav.language}: ${language.toUpperCase()}`}
          >
            <Globe className="w-3 h-3 text-[#E29578]" />
            <span className={language === 'en' ? 'text-[#201D1B] font-bold' : 'opacity-60'}>EN</span>
            <span className="opacity-30">/</span>
            <span className={language === 'es' ? 'text-[#201D1B] font-bold' : 'opacity-60'}>ES</span>
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-sans font-medium tracking-wider text-[#6A635D] border border-[#E8E0D5] bg-[#FAF7F2]"
            aria-label={t.nav.language}
          >
            <span className={language === 'en' ? 'font-bold text-[#201D1B]' : 'opacity-60'}>EN</span>
            <span className="opacity-30">/</span>
            <span className={language === 'es' ? 'font-bold text-[#201D1B]' : 'opacity-60'}>ES</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#201D1B] rounded-full hover:bg-[#F3ECE4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E29578]"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-[#FAF7F2] z-50 flex flex-col px-6 py-8 md:hidden overflow-y-auto animate-fade-in border-t border-[#E8E0D5]"
        >
          <nav className="flex flex-col gap-5 my-auto" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl font-serif tracking-wide py-2 transition-colors flex items-center justify-between border-b border-[#E8E0D5]/50 ${
                    isActive ? 'text-[#A45537] font-medium' : 'text-[#201D1B]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E29578]" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#E8E0D5] mt-auto text-center">
            <p className="font-serif text-sm italic text-[#6A635D]">
              {BRAND.tagline}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-[#968F87] mt-2">
              {BRAND.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
