import { LocalizedText, LocalizedList } from '@/types';

export type AccessoryItem = {
  id: string;
  title: LocalizedText;
  category: 'bonnets' | 'knitwear' | 'tailoring' | 'magnetic';
  categoryLabel: LocalizedText;
  description: LocalizedText;
  materials: LocalizedText;
  craftsmanshipNotes: LocalizedText;
  compatibility: LocalizedText;
  coverImage: string;
  galleryImages: string[];
  status: LocalizedText;
  badge: LocalizedText;
  features: LocalizedList;
};

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  {
    id: 'heirloom-bonnet-french-lace',
    title: {
      en: 'Heirloom Bonnet & Antique French Lace Set',
      es: 'Capota Patrimonial y Cuello de Encaje Francés',
    },
    category: 'bonnets',
    categoryLabel: {
      en: 'Heirloom Bonnets',
      es: 'Capotas Patrimoniales',
    },
    description: {
      en: 'Classical infant bonnet crafted with hand-dyed cotton batiste and authentic antique French lace, designed to frame hyperrealistic facial contouring without abrading micro-rooted temporal hair.',
      es: 'Capota clásica para bebé confeccionada con batista de algodón teñida a mano y auténtico encaje francés antiguo, diseñada para enmarcar el rostro sin fricción sobre el cabello micro-enraizado.',
    },
    materials: {
      en: '100% Cotton Batiste, Antique French Val Lace, Pure Silk Ties',
      es: '100% Batista de Algodón, Encaje Val Francés Antiguo, Cintas de Seda Pura',
    },
    craftsmanshipNotes: {
      en: 'Every seam is micro-finished by hand with hidden interior stitches so no rough edges contact the vinyl or silicone varnish.',
      es: 'Cada costura está rematada a mano con puntadas interiores ocultas para evitar roces con el barniz protector de la escultura.',
    },
    compatibility: {
      en: 'Suitable for 19–22 in (48–56 cm) baby sculptures',
      es: 'Apto para esculturas de 48 a 56 cm',
    },
    coverImage: '/assets/baby7.png',
    galleryImages: ['/assets/baby7.png', '/assets/baby1_portrait.jpg'],
    status: {
      en: 'Atelier Archive',
      es: 'Archivo del Atelier',
    },
    badge: {
      en: 'Heritage Piece',
      es: 'Pieza Patrimonial',
    },
    features: {
      en: ['Antique French Lace', 'Pure Silk Ribbon Ties', 'Sculpture-Safe Lining'],
      es: ['Encaje Francés Antiguo', 'Cintas de Seda Pura', 'Forro Seguro para Esculturas'],
    },
  },
  {
    id: 'merino-cardigan-booties',
    title: {
      en: 'Hand-Knitted Merino Cardigan & Booties Set',
      es: 'Conjunto de Cárdigan y Patucos en Lana Merino',
    },
    category: 'knitwear',
    categoryLabel: {
      en: 'Knitwear & Sets',
      es: 'Tejidos de Autor',
    },
    description: {
      en: 'Delicate pastel cardigan hand-knitted from extra-fine spun merino wool with seamless raglan sleeves and natural carved river shell buttons.',
      es: 'Cárdigan en tono pastel tejido a mano en lana merino extrafina con mangas raglán sin costuras y botones de concha de nácar natural.',
    },
    materials: {
      en: '100% Extra-Fine Merino Wool, Natural Mother-of-Pearl Buttons',
      es: '100% Lana Merino Extrafina, Botones Naturales de Nácar',
    },
    craftsmanshipNotes: {
      en: 'Knitted with ultra-fine gauge needles to produce realistic infant proportions. Naturally breathable, lint-free yarn prevents fiber transfer to rooted mohair.',
      es: 'Tejido con agujas de calibre ultra fino para reproducir proporciones infantiles verosímiles. Hilado libre de pelusa para proteger el mohair.',
    },
    compatibility: {
      en: 'Newborn to 3-month proportions (0–3M)',
      es: 'Proporciones de recién nacido a 3 meses (0–3M)',
    },
    coverImage: '/assets/baby4_clean.png',
    galleryImages: ['/assets/baby4_clean.png', '/assets/baby2.jpg'],
    status: {
      en: 'Bespoke Order',
      es: 'Encargo Exclusivo',
    },
    badge: {
      en: 'Hand-Knitted',
      es: 'Tejido a Mano',
    },
    features: {
      en: ['Zero-Abrasion Yarn', 'Seamless Raglan Finish', 'River Shell Buttons'],
      es: ['Hilado Cero Abrasión', 'Acabado Raglán sin Costuras', 'Botones de Nácar'],
    },
  },
  {
    id: 'artisan-newsboy-linen-ensemble',
    title: {
      en: 'Tailored Linen Newsboy Cap & Heirloom Ensemble',
      es: 'Conjunto Sastre en Lino y Boina Tradicional',
    },
    category: 'tailoring',
    categoryLabel: {
      en: 'Tailored Apparel',
      es: 'Sastrería Infantil',
    },
    description: {
      en: 'Archival gentleman styling featuring a custom-fitted unbleached linen newsboy cap, collared linen bib shirt, and tailored micro-bowtie with invisible closure.',
      es: 'Estilismo clásico compuesto por boina tradicional en lino natural, camisa de cuello sastre y corbatín miniatura con cierre invisible.',
    },
    materials: {
      en: '100% Washed European Flax Linen, Hand-Sewn Cotton Lining',
      es: '100% Lino Europeo Lavado, Forro Interior en Algodón Pardo',
    },
    craftsmanshipNotes: {
      en: 'Created in collaboration with historical textile restorers. Elastication is encased in soft double-layer cotton to protect rooted hairlines.',
      es: 'Diseñado para proteger la línea del cabello con elásticos envueltos en doble capa de algodón suave.',
    },
    compatibility: {
      en: 'Infant 3-Month proportions (e.g. Julien / Joseph sculpts)',
      es: 'Proporciones de 3 meses (modelos tipo Julien / Joseph)',
    },
    coverImage: '/assets/baby1_portrait.jpg',
    galleryImages: ['/assets/baby1_portrait.jpg', '/assets/baby1.jpg'],
    status: {
      en: 'Atelier Archive',
      es: 'Archivo del Atelier',
    },
    badge: {
      en: 'Tailored Linen',
      es: 'Lino Sastre',
    },
    features: {
      en: ['European Washed Flax', 'Gentle Hairline Crown', 'Miniature Tailored Bowtie'],
      es: ['Lino Europeo Lavado', 'Ajuste Suave para Cabello', 'Corbatín Sastre'],
    },
  },
  {
    id: 'magnetic-pacifiers-macrame-clips',
    title: {
      en: 'Calibrated Magnetic Pacifiers & Keepsake Clips',
      es: 'Chupetes Magnéticos Calibrados y Sujeta-Chupetes',
    },
    category: 'magnetic',
    categoryLabel: {
      en: 'Magnetic Accessories',
      es: 'Accesorios Magnéticos',
    },
    description: {
      en: 'Specially engineered magnetic pacifiers with rare-earth neodymium magnets sealed behind protective medical felt pads, paired with untreated beechwood beads and hand-knotted macramé clips.',
      es: 'Chupetes magnéticos con imanes de neodimio sellados tras una almohadilla de fieltro protector, acompañados de cuentas de haya sin tratar y cordón macramé artesanal.',
    },
    materials: {
      en: 'Neodymium N52 Magnet, Natural Felt Cushion, Untreated Beechwood, Cotton Macramé',
      es: 'Imán de Neodimio N52, Almohadilla de Fieltro, Madera de Haya Natural, Algodón Macramé',
    },
    craftsmanshipNotes: {
      en: 'Calibrated polarity prevents facial scratching. The soft felt barrier protects lip varnish and gloss sealant from direct metal/plastic contact.',
      es: 'Polaridad calibrada con barrera de fieltro acolchada para resguardar el barniz de los labios y el brillo protector de la escultura.',
    },
    compatibility: {
      en: 'Compatible with internal magnet sculptures (standard polarity)',
      es: 'Compatible con esculturas con imán interno (polaridad estándar)',
    },
    coverImage: '/assets/baby5_smile.jpg',
    galleryImages: ['/assets/baby5_smile.jpg', '/assets/baby3.jpg'],
    status: {
      en: 'Available on Order',
      es: 'Disponible por Encargo',
    },
    badge: {
      en: 'Varnish-Safe',
      es: 'Seguro para Barniz',
    },
    features: {
      en: ['Felt Protection Pad', 'Neodymium N52 Core', 'Untreated Beechwood Beads'],
      es: ['Almohadilla de Fieltro', 'Núcleo Neodimio N52', 'Cuentas de Haya Natural'],
    },
  },
  {
    id: 'heirloom-pinafore-dress',
    title: {
      en: 'Hand-Pleated Heirloom Pinafore & Bloomer Set',
      es: 'Pichi Clásico Plisado y Bombachos a Juego',
    },
    category: 'tailoring',
    categoryLabel: {
      en: 'Tailored Apparel',
      es: 'Sastrería Infantil',
    },
    description: {
      en: 'Vintage-inspired pinafore set featuring micro-pintuck yoke detailing, soft ruffled shoulder wings, and matching bloomers in warm unbleached cotton.',
      es: 'Conjunto de pichi de inspiración vintage con pechera de lorzas milimétricas, volantes en los hombros y bombachos a juego en algodón color crudo.',
    },
    materials: {
      en: 'Organic Crinkle Cotton Muslin, Antique Ceramic Buttons',
      es: 'Muselina de Algodón Orgánico, Botones Cerámicos Antiguos',
    },
    craftsmanshipNotes: {
      en: 'Soft-washed twice before cutting to guarantee zero stiffness. Non-staining botanical dye bath tested against silicone and vinyl samples.',
      es: 'Lavado antes del corte para asegurar suavidad absoluta. Teñido botánico no transferible testado contra vinilo y silicona.',
    },
    compatibility: {
      en: 'Toddler proportions 22–24 in (Clara / toddler sculpts)',
      es: 'Proporciones toddler 55–60 cm (tipo Clara / modelos mayores)',
    },
    coverImage: '/assets/baby5.jpg',
    galleryImages: ['/assets/baby5.jpg', '/assets/baby5_smile.jpg'],
    status: {
      en: 'Atelier Archive',
      es: 'Archivo del Atelier',
    },
    badge: {
      en: 'Organic Cotton',
      es: 'Algodón Orgánico',
    },
    features: {
      en: ['Colorfast Botanical Dye', 'Soft Non-Chafing Bands', 'Antique Ceramic Buttons'],
      es: ['Tinte Botánico Inalterable', 'Elásticos Suaves', 'Botones Cerámicos'],
    },
  },
  {
    id: 'tactile-booties-bonnet-ensemble',
    title: {
      en: 'Plantar-Fit Knitted Booties & Ribbed Beanie',
      es: 'Patucos Anatómicos y Gorro Acanalado a Juego',
    },
    category: 'knitwear',
    categoryLabel: {
      en: 'Knitwear & Sets',
      es: 'Tejidos de Autor',
    },
    description: {
      en: 'Form-fitted knitted infant booties designed to contour accurately around newborn soles without flattening plantar crease sculpting.',
      es: 'Patucos anatómicos diseñados para adaptarse a la curvatura de la planta del pie del recién nacido sin aplastar los pliegues de la escultura.',
    },
    materials: {
      en: '70% Fine Merino, 30% Mulberry Silk Blend',
      es: '70% Merino Fino, 30% Mezcla de Seda Mulberry',
    },
    craftsmanshipNotes: {
      en: 'Seamless heel turn ensures an exact glove-like fit around weighted vinyl feet.',
      es: 'Talón sin costuras que garantiza un calce exacto sobre los pies pesados de vinilo.',
    },
    compatibility: {
      en: 'Preemie & Newborn infant sizes (17–20 in)',
      es: 'Tallas prematuro y recién nacido (43–50 cm)',
    },
    coverImage: '/assets/baby2_feet.jpg',
    galleryImages: ['/assets/baby2_feet.jpg', '/assets/baby2.jpg'],
    status: {
      en: 'Available on Order',
      es: 'Disponible por Encargo',
    },
    badge: {
      en: 'Merino & Silk',
      es: 'Merino & Seda',
    },
    features: {
      en: ['Anatomical Sole Fit', 'Silk-Merino Blend', 'Gentle Ribbon Ties'],
      es: ['Calce Anatómico de Planta', 'Mezcla Merino y Seda', 'Cintas de Ajuste Suave'],
    },
  },
];
