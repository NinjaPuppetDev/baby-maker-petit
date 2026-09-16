export type Language = 'en' | 'es';

export type LocalizedText = {
  en: string;
  es: string;
};

export type LocalizedList = {
  en: string[];
  es: string[];
};

export type ArtworkDetailImage = {
  url: string;
  title: LocalizedText;
  caption: LocalizedText;
  alt: string;
};

export type Creation = {
  id: string;
  title: string;
  slug: string;
  year: number;
  dateCreated?: string;
  sculptorKit?: string;
  originalSculptor?: string;
  medium: string;
  technique: string;
  weight?: string;
  length?: string;
  eyeDetails?: string;
  hairDetails?: string;
  coverImage: string;
  images: string[];
  detailImages?: ArtworkDetailImage[];
  status: 'Private Collection' | 'Atelier Archive' | 'Atelier Study' | 'Available on Inquiry';
  featured?: boolean;
  hasCertificate?: boolean;
  certificateDate?: string;
  series: 'Reborn Hyperrealism' | 'Atelier Studies' | 'Sculptural Exploration';
  description: LocalizedText;
  story: LocalizedText;
  craftNotes: LocalizedText;
};

export type AtelierStep = {
  number: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  technicalDetails: LocalizedList;
  image: string;
  imageAlt: string;
};

export type WorldTerritory = {
  id: string;
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  focusAreas: LocalizedList;
  artisticConcept: LocalizedText;
};
