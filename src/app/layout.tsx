import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/config/brand';
import { isHispanicCountry, isHispanicAcceptLanguage } from '@/config/geo';
import { Language } from '@/types';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://babymakerpetit.com'),
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: `The fine art practice of ${BRAND.fullArtistName}. Hyperrealistic baby sculptures, meticulous atelier craftsmanship, and evolving sculptural universe.`,
  keywords: [
    'Baby Maker Petit',
    'Melissa Rendon',
    'Hyperrealistic baby sculpture',
    'Reborn art gallery',
    'Fine art dolls',
    'Original silicone sculpture',
    'Artisan atelier',
    'Escultura hiperrealista',
    'Bebés reborn Colombia',
  ],
  authors: [{ name: BRAND.fullArtistName }],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: `Treat the dolls as artworks. Treat the website as a gallery. Treat the interface as atmosphere.`,
    url: 'https://babymakerpetit.com',
    siteName: BRAND.name,
    images: [
      {
        url: '/assets/baby3.jpg',
        width: 1080,
        height: 1050,
        alt: 'Aurelia — Hyperrealistic Newborn Sculpture by Melissa Rendon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/assets/logo-circle.png',
    apple: '/assets/logo-circle.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine server-side initial language from cookies and geo headers
  const cookieStore = await cookies();
  const savedLang = cookieStore.get('bmp_language')?.value as Language | undefined;

  let initialLanguage: Language = 'en';

  if (savedLang === 'en' || savedLang === 'es') {
    initialLanguage = savedLang;
  } else {
    const headersList = await headers();
    const initialHeader = headersList.get('x-bmp-initial-lang');

    if (initialHeader === 'es') {
      initialLanguage = 'es';
    } else {
      const geoCountry = (
        headersList.get('x-bmp-country') ||
        headersList.get('x-vercel-ip-country') ||
        headersList.get('cf-ipcountry') ||
        headersList.get('x-country-code') ||
        headersList.get('x-client-geo-country') ||
        headersList.get('x-appengine-country')
      )?.trim().toUpperCase();

      const acceptLang = headersList.get('accept-language');

      if (isHispanicCountry(geoCountry) || isHispanicAcceptLanguage(acceptLang)) {
        initialLanguage = 'es';
      }
    }
  }

  return (
    <html lang={initialLanguage} className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#201D1B] antialiased selection:bg-[#F9EBE5] selection:text-[#201D1B]">
        <LanguageProvider initialLanguage={initialLanguage}>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
