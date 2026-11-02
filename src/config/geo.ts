/**
 * Geolocation & Locale Configuration for Baby Maker Petit
 * Specifically handles automatic Spanish landing for Colombia and Hispanic / Spanish-speaking countries.
 */

// ISO 3166-1 alpha-2 country codes for Spanish-speaking / Hispanic countries and territories
export const COLOMBIA_COUNTRY_CODE = 'CO';

export const HISPANIC_COUNTRY_CODES = [
  'CO', // Colombia (Primary atelier location)
  'ES', // Spain (España)
  'MX', // Mexico
  'AR', // Argentina
  'CL', // Chile
  'PE', // Peru
  'VE', // Venezuela
  'EC', // Ecuador
  'GT', // Guatemala
  'CU', // Cuba
  'BO', // Bolivia
  'DO', // Dominican Republic (República Dominicana)
  'HN', // Honduras
  'PY', // Paraguay
  'SV', // El Salvador
  'NI', // Nicaragua
  'CR', // Costa Rica
  'PA', // Panama
  'UY', // Uruguay
  'PR', // Puerto Rico
  'GQ', // Equatorial Guinea (Guinea Ecuatorial)
] as const;

export type HispanicCountryCode = (typeof HISPANIC_COUNTRY_CODES)[number];

// Standard IANA Timezones for Hispanic countries & regions
export const HISPANIC_TIMEZONES = [
  // Colombia
  'America/Bogota',

  // Spain
  'Europe/Madrid',
  'Atlantic/Canary',
  'Africa/Ceuta',

  // Mexico
  'America/Mexico_City',
  'America/Cancun',
  'America/Merida',
  'America/Monterrey',
  'America/Mazatlan',
  'America/Chihuahua',
  'America/Hermosillo',
  'America/Tijuana',
  'America/Bahia_Banderas',
  'America/Matamoros',
  'America/Ojinaga',

  // Argentina
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Cordoba',
  'America/Argentina/Jujuy',
  'America/Argentina/Mendoza',
  'America/Argentina/Catamarca',
  'America/Argentina/La_Rioja',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Buenos_Aires',

  // Chile
  'America/Santiago',
  'America/Punta_Arenas',
  'Pacific/Easter',

  // Peru
  'America/Lima',

  // Venezuela
  'America/Caracas',

  // Ecuador
  'America/Guayaquil',
  'Pacific/Galapagos',

  // Guatemala
  'America/Guatemala',

  // Cuba
  'America/Havana',

  // Bolivia
  'America/La_Paz',

  // Dominican Republic
  'America/Santo_Domingo',

  // Honduras
  'America/Tegucigalpa',

  // Paraguay
  'America/Asuncion',

  // El Salvador
  'America/El_Salvador',

  // Nicaragua
  'America/Managua',

  // Costa Rica
  'America/Costa_Rica',

  // Panama
  'America/Panama',

  // Uruguay
  'America/Montevideo',

  // Puerto Rico
  'America/Puerto_Rico',

  // Equatorial Guinea
  'Africa/Malabo',
] as const;

/**
 * Check if a country code is Colombia
 */
export function isColombia(code?: string | null): boolean {
  if (!code) return false;
  return code.trim().toUpperCase() === COLOMBIA_COUNTRY_CODE;
}

/**
 * Check if a country code corresponds to Colombia or any Hispanic country
 */
export function isHispanicCountry(code?: string | null): boolean {
  if (!code) return false;
  const normalized = code.trim().toUpperCase();
  return HISPANIC_COUNTRY_CODES.includes(normalized as HispanicCountryCode);
}

/**
 * Check if a timezone corresponds to Colombia or any Hispanic country
 */
export function isHispanicTimeZone(tz?: string | null): boolean {
  if (!tz) return false;
  const normalized = tz.trim();
  // Exact match
  if (HISPANIC_TIMEZONES.includes(normalized as (typeof HISPANIC_TIMEZONES)[number])) {
    return true;
  }
  // Prefix / pattern match
  if (
    normalized.startsWith('America/Argentina') ||
    normalized === 'America/Bogota' ||
    normalized.startsWith('Europe/Madrid')
  ) {
    return true;
  }
  return false;
}

/**
 * Check if a locale string (e.g., 'es-CO', 'es-ES', 'en-CO', 'es') is Spanish or from a Hispanic country
 */
export function isHispanicLocale(locale?: string | null): boolean {
  if (!locale) return false;
  const clean = locale.trim().toLowerCase();

  // If primary language is Spanish ('es', 'es-419', 'es-co', etc.)
  if (clean.startsWith('es')) {
    return true;
  }

  // If locale contains a country subtag for Colombia or a Hispanic country (e.g. 'en-CO')
  for (const country of HISPANIC_COUNTRY_CODES) {
    const suffixDash = `-${country.toLowerCase()}`;
    const suffixUnderscore = `_${country.toLowerCase()}`;
    if (clean.endsWith(suffixDash) || clean.includes(suffixDash) || clean.endsWith(suffixUnderscore)) {
      return true;
    }
  }

  return false;
}

/**
 * Inspect an Accept-Language header string (e.g. 'es-CO,es;q=0.9,en;q=0.8')
 */
export function isHispanicAcceptLanguage(acceptLanguage?: string | null): boolean {
  if (!acceptLanguage) return false;
  const tokens = acceptLanguage.split(',').map((t) => t.trim().toLowerCase());
  for (const token of tokens) {
    const langPart = token.split(';')[0]?.trim();
    if (langPart && isHispanicLocale(langPart)) {
      return true;
    }
  }
  return false;
}
