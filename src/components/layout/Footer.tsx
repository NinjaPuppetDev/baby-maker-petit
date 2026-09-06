'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { BRAND } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { Container } from '@/components/primitives/Container';
import { Text } from '@/components/primitives/Text';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F3ECE4] text-[#201D1B] border-t border-[#E8E0D5] pt-16 pb-12 transition-colors">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#E8E0D5]">
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E29578]/40 bg-[#F9EBE5] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/logo-circle.png"
                  alt={BRAND.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal tracking-wide text-[#201D1B]">
                  {BRAND.name}
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-[#8E847A]">
                  {t.footer.artistCredit}
                </span>
              </div>
            </Link>

            <Text variant="body" voice="serif" className="italic text-[#6A635D] max-w-md text-base sm:text-lg">
              {t.footer.quote}
            </Text>

            <div className="pt-2">
              <span className="inline-block text-[11px] font-sans font-medium uppercase tracking-widest text-[#A45537] bg-[#F9EBE5] px-3 py-1 rounded-full border border-[#E29578]/30">
                {BRAND.positioning}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <Text variant="label" className="text-[#8E847A]">
              Navigation
            </Text>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/work" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.work}
                </Link>
              </li>
              <li>
                <Link href="/atelier" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.atelier}
                </Link>
              </li>
              <li>
                <Link href="/artist" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.artist}
                </Link>
              </li>
              <li>
                <Link href="/world" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.world}
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.archive}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#6A635D] hover:text-[#201D1B] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Inquiries (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Text variant="label" className="text-[#8E847A]">
              Atelier Inquiries
            </Text>
            <p className="text-sm text-[#6A635D] leading-relaxed">
              Every creation is documented and issued with an official registered Certificate of Authenticity. For private acquisitions or bespoke commissions:
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-[#201D1B] hover:text-[#A45537] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#E29578]" />
                <span>{BRAND.contactEmail}</span>
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#201D1B] hover:text-[#A45537] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#E29578]" />
                <span>{BRAND.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>
            <p className="text-xs text-[#968F87] pt-2">
              Private Studio · Est. {BRAND.yearEstablished}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E847A]">
          <p>
            © {currentYear} {BRAND.name}. {t.footer.rights}
          </p>
          <p className="tracking-wider uppercase text-[11px]">
            {BRAND.fullArtistName} · Atelier & Sculpture
          </p>
        </div>
      </Container>
    </footer>
  );
}
