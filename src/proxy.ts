import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isColombia,
  isHispanicCountry,
  isHispanicAcceptLanguage,
} from '@/config/geo';

export function proxy(request: NextRequest) {
  // Check if user already has an explicit preference or past session cookie
  const existingCookie = request.cookies.get('bmp_language')?.value;

  // Extract geo country from edge or proxy headers
  const country = (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    request.headers.get('x-client-geo-country') ||
    request.headers.get('x-appengine-country')
  )?.trim().toUpperCase();

  const acceptLang = request.headers.get('accept-language');

  // Target language defaults to Spanish ('es') on landing unless user explicitly opted for English
  const targetLanguage = existingCookie === 'en' ? 'en' : 'es';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-bmp-initial-lang', existingCookie || targetLanguage);
  if (country) {
    requestHeaders.set('x-bmp-country', country);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // If no cookie has been set yet, seed Spanish so landing is in Spanish
  if (!existingCookie) {
    response.cookies.set('bmp_language', 'es', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - static assets (.jpg, .png, .svg, etc.)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
