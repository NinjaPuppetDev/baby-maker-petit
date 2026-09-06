import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/config/brand';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#201D1B] antialiased selection:bg-[#F9EBE5] selection:text-[#201D1B]">
        <LanguageProvider>
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
