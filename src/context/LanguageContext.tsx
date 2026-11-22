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

export function LanguageProvider({ children, initialLanguage = 'es' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isColombiaUser, setIsColombiaUser] = useState<boolean>(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  // Sync document attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Primary Regional & Landing Detection
  useEffect(() => {
    const manualPreference = localStorage.getItem('bmp_language_manual');
    const saved = localStorage.getItem('bmp_language') as Language | null;

    // 1. If user explicitly selected a language in the past, respect their deliberate choice
    if (manualPreference === 'true' && (saved === 'en' || saved === 'es')) {
      setLanguageState(saved);
      return;
    }

    // 2. Default landing language is Spanish
    setLanguageState('es');
    localStorage.setItem('bmp_language', 'es');
    document.cookie = 'bmp_language=es; path=/; max-age=31536000; SameSite=Lax';

    // Check Colombia localization flag
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTimeZone === 'America/Bogota') {
        setIsColombiaUser(true);
      }
    } catch {
      // TimeZone lookup fallback
    }

    // Server-Assisted GeoIP Check
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
      })
      .catch(() => {
        // Silent catch
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
