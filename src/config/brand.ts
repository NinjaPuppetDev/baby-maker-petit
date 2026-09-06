export const BRAND = {
  name: "Baby Maker Petit",
  shortName: "Baby Maker",
  tagline: "Hyperrealistic Baby Sculpture & Atelier",
  artist: "Melissa",
  fullArtistName: "Melissa Rosales",
  yearEstablished: 2020,
  positioning: "Hyperrealism × Craft × Fantasy × Emotion × Technology",
  philosophy: "Treat the dolls as artworks. Treat the website as a gallery. Treat the interface as atmosphere.",
  contactEmail: "atelier@babymakerpetit.com",
  instagramHandle: "@babymakerpetit",
  instagramUrl: "https://instagram.com/babymakerpetit",
  location: "Artisan Atelier, Chile",
  certificateTitle: "Certificate of Authenticity",
} as const;

export type BrandConfig = typeof BRAND;
