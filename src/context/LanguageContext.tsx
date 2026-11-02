'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language } from '@/types';
import { TRANSLATIONS, TranslationSchema } from '@/content/translations';
import { isHispanicLocale, isHispanicTimeZone } from '@/config/geo';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  toggleLanguage: () => void;
  isColombiaUser?: boolean;
  detectedCountry?: string | null;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isColombiaUser, setIsColombiaUser] = useState<boolean>(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  // Sync document attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Primary Regional & Geolocation Detection
  useEffect(() => {
    const manualPreference = localStorage.getItem('bmp_language_manual');
    const saved = localStorage.getItem('bmp_language') as Language | null;

    // 1. If user explicitly selected a language in the past, always respect their choice
    if (manualPreference === 'true' && (saved === 'en' || saved === 'es')) {
      setLanguageState(saved);
      return;
    }

    // 2. Client-side Instant TimeZone Detection (0ms latency, high accuracy)
    // Detects visitors whose device is in Colombia (America/Bogota) or any Hispanic country
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTimeZone === 'America/Bogota') {
        setIsColombiaUser(true);
      }
      if (isHispanicTimeZone(userTimeZone)) {
        setLanguageState('es');
        localStorage.setItem('bmp_language', 'es');
        document.cookie = 'bmp_language=es; path=/; max-age=31536000; SameSite=Lax';
        return;
      }
    } catch {
      // TimeZone lookup failure fallback
    }

    // 3. Client-side Instant Browser Locale Detection
    // Checks both language and regional locale tags (e.g. es, es-CO, en-CO, es-MX, etc.)
    try {
      const locales = navigator.languages || [navigator.language];
      for (const loc of locales) {
        if (loc.toLowerCase().includes('co')) {
          setIsColombiaUser(true);
        }
        if (isHispanicLocale(loc)) {
          setLanguageState('es');
          localStorage.setItem('bmp_language', 'es');
          document.cookie = 'bmp_language=es; path=/; max-age=31536000; SameSite=Lax';
          return;
        }
      }
    } catch {
      // Locale lookup failure fallback
    }

    // 4. Server-Assisted GeoIP Check (for cases where browser locale/timeZone are inconclusive or generic)
    let isMounted = true;
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data) return;

        if (data.country) {
          setDetectedCountry(data.country);
        }
        if (data.isColombia) {
          setIsColombiaUser(true);
        }

        // If server confirms visitor is in Colombia or any Hispanic country
        if (data.isColombia || data.isHispanic || data.detectedLanguage === 'es') {
          setLanguageState('es');
          localStorage.setItem('bmp_language', 'es');
          document.cookie = 'bmp_language=es; path=/; max-age=31536000; SameSite=Lax';
        }
      })
      .catch(() => {
        // Silent catch: app continues gracefully
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bmp_language', lang);
    localStorage.setItem('bmp_language_manual', 'true'); // Flag that user deliberately made this choice
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.cookie = `bmp_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'es' : 'en');
  }, [language, setLanguage]);

  const t = TRANSLATIONS[language] as TranslationSchema;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toggleLanguage,
        isColombiaUser,
        detectedCountry,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
