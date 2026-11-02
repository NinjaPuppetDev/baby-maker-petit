import { NextRequest, NextResponse } from 'next/server';
import {
  isColombia,
  isHispanicCountry,
  isHispanicAcceptLanguage,
} from '@/config/geo';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const headers = request.headers;

    // Check standard edge/CDN/cloud geolocation headers
    const countryHeader = (
      headers.get('x-vercel-ip-country') ||
      headers.get('cf-ipcountry') ||
      headers.get('x-country-code') ||
      headers.get('x-client-geo-country') ||
      headers.get('x-appengine-country') ||
      headers.get('geo-country')
    )?.trim().toUpperCase();

    const acceptLang = headers.get('accept-language');

    let resolvedCountry = countryHeader || null;
    let detectionSource = countryHeader ? 'header' : 'none';

    // If country header wasn't provided, try IP lookup if valid public IP is available
    if (!resolvedCountry) {
      const forwarded = headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0]?.trim() : headers.get('x-real-ip');

      const isPrivateOrLocal =
        !ip ||
        ip === '127.0.0.1' ||
        ip === '::1' ||
        ip.startsWith('10.') ||
        ip.startsWith('192.168.') ||
        ip.startsWith('172.16.');

      if (!isPrivateOrLocal) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 1200);

          const res = await fetch(`https://freeipapi.com/api/json/${ip}`, {
            signal: controller.signal,
            headers: { 'User-Agent': 'BabyMakerPetit-GeoResolver' },
            next: { revalidate: 3600 },
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data?.countryCode) {
              resolvedCountry = String(data.countryCode).toUpperCase();
              detectionSource = 'ip_lookup';
            }
          }
        } catch {
          // Non-blocking fallback to accept-language
        }
      }
    }

    const inColombia = isColombia(resolvedCountry);
    const inHispanicCountry = isHispanicCountry(resolvedCountry);
    const hasSpanishAccept = isHispanicAcceptLanguage(acceptLang);

    // If in Colombia, in any Hispanic country, or has Spanish accept language
    const shouldLandInSpanish = inColombia || inHispanicCountry || hasSpanishAccept;
    const detectedLanguage = shouldLandInSpanish ? 'es' : 'en';

    return NextResponse.json({
      country: resolvedCountry,
      isColombia: inColombia,
      isHispanic: inHispanicCountry,
      hasSpanishAcceptLanguage: hasSpanishAccept,
      detectedLanguage,
      source: detectionSource,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json({
      country: null,
      isColombia: false,
      isHispanic: false,
      detectedLanguage: 'en',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
