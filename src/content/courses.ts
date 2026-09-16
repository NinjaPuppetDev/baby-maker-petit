import { LocalizedText, LocalizedList } from '@/types';

export type CourseTrack = {
  id: string;
  badge: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  duration: LocalizedText;
  level: LocalizedText;
  format: LocalizedText;
  description: LocalizedText;
  curriculum: LocalizedList;
  includes: LocalizedList;
  image: string;
  imageAlt: string;
};

export const COURSE_TRACKS: CourseTrack[] = [
  {
    id: 'subdermal-painting',
    badge: {
      en: 'Foundational Masterclass',
      es: 'Masterclass Fundamental',
    },
    title: {
      en: 'Subdermal Glaze & Capillary Mottling',
      es: 'Veladuras Subdérmicas & Veteado Capilar',
    },
    subtitle: {
      en: 'Building organic translucent skin through 25+ heat-cured oil layers',
      es: 'Construcción de piel orgánica translúcida mediante 25+ capas al óleo horneadas',
    },
    duration: {
      en: '4 Weeks · Hands-on Study',
      es: '4 Semanas · Estudio Práctico',
    },
    level: {
      en: 'Intermediate to Advanced',
      es: 'Intermedio a Avanzado',
    },
    format: {
      en: 'Studio Workshop or Private Intensive',
      es: 'Taller de Estudio o Intensivo Privado',
    },
    description: {
      en: 'Master the optical physics of human infant skin. Learn how to map deep blue and lavender subdermal venous networks, apply microscopic capillary flushing with natural Mediterranean sponges, and bake Genesis mineral glazes sequentially without burning or cloudy residue.',
      es: 'Domina la física óptica de la piel infantil. Aprende a trazar redes venosas subdérmicas azules y lavanda, aplicar rubor capilar microscópico con esponjas marinas naturales y curar veladuras minerales Genesis secuencialmente sin turbidez.',
    },
    curriculum: {
      en: [
        'Neutralizing, degreasing, and vinyl matrix surface preparation',
        'Subdermal venous mapping: temporal veins, cranial arteries, and inner wrist branching',
        'Multi-frequency cellular mottling: warm undertones vs. cool capillary depth',
        'Graduated thermal curing schedules at 130°C and matte varnish finishing',
      ],
      es: [
        'Neutralización, desengrasado y preparación de la matriz de vinilo virgen',
        'Mapeo venoso subdérmico: venas temporales, arterias craneales y ramificaciones',
        'Veteado celular multifrecuencia: tonos cálidos vs. profundidad capilar fría',
        'Curva de horneado térmico a 130°C y sellado aterciopelado con barniz mate',
      ],
    },
    includes: {
      en: [
        'Curated 12-color Genesis artist mineral pigment palette',
        'Natural sea sponge set & fine sable wash brushes',
        'Studio curing thermometer & surface inspection lens',
      ],
      es: [
        'Paleta selecta de 12 pigmentos minerales Genesis para artistas',
        'Juego de esponjas marinas naturales y pinceles finos de marta',
        'Termómetro de horneado de estudio y lupa de inspección de superficie',
      ],
    },
    image: '/assets/baby8_head.jpg',
    imageAlt: 'Micro-veining and mottling detail on painted vinyl head',
  },
  {
    id: 'micro-rooting-intensive',
    badge: {
      en: 'Precision Mastery',
      es: 'Maestría en Precisión',
    },
    title: {
      en: 'Micro-Rooting & Natural Follicular Direction',
      es: 'Micro-Enraizado & Dirección Folicular Natural',
    },
    subtitle: {
      en: 'Single-strand Angora mohair implantation with 42G ultra-fine needles',
      es: 'Implantación hebra por hebra de mohair con agujas alemanas de 42G',
    },
    duration: {
      en: '3 Weeks · Precision Technique',
      es: '3 Semanas · Técnica de Precisión',
    },
    level: {
      en: 'All Levels Focused on Patience',
      es: 'Todos los Niveles con Foco en Paciencia',
    },
    format: {
      en: 'Step-by-Step Hands-On Guidance',
      es: 'Instrucción Práctica Paso a Paso',
    },
    description: {
      en: 'Hair defines the soul and realism of a reborn sculpture. This intensive teaches natural infant whorl dynamics, spiral crown crowns, microscopic temple baby-hairs, and feather-light painted/rooted eyebrows using single-strand needle techniques with invisible entry pores.',
      es: 'El cabello define el alma y realismo de una escultura reborn. Este intensivo enseña la dinámica de remolinos infantiles, coronillas en espiral, pelusilla natural en sienes y cejas combinadas con agujas ultrafinas de poro invisible.',
    },
    curriculum: {
      en: [
        'Selecting and grading ethical South African Angora yearling mohair',
        'Needle geometry: 40G vs. 42G barbed German needles and puncture angle physics',
        'The Crown Whorl Architecture: mapping the natural infant spiral growth flow',
        'Internal waterproof vinyl sealing for lifetime brushing and gentle washing',
      ],
      es: [
        'Selección y clasificación de mohair sudafricano de primera esquila',
        'Geometría de aguja: agujas alemanas de 40G vs 42G y física del ángulo de entrada',
        'Arquitectura del remolino: trazado del flujo de crecimiento espiral natural',
        'Sellado interno impermeable para peinado seguro y preservación duradera',
      ],
    },
    includes: {
      en: [
        'Certified premium kid mohair pack (choice of shade)',
        'Set of 30 German 42-gauge ultra-fine micro-needles and ergonomic pin vice',
        'Specialized interior vinyl sealant and styling serum',
      ],
      es: [
        'Pack de mohair premium de cría certificado (a elección de tono)',
        'Set de 30 agujas alemanas ultrafinas calibre 42G y mandril ergonómico',
        'Sellador vinílico interno especializado y sérum de peinado',
      ],
    },
    image: '/assets/baby3_macro.jpg',
    imageAlt: 'Macro view of single-strand micro-rooted mohair on vinyl head',
  },
  {
    id: 'complete-anatomical-sculpture',
    badge: {
      en: 'Comprehensive Studio Course',
      es: 'Curso Integral de Estudio',
    },
    title: {
      en: 'Complete Realism, Tactile Gravitas & Weighting',
      es: 'Realismo Integral, Gravitacional y Montaje Anatómico',
    },
    subtitle: {
      en: 'From vinyl blank to living sculptural presence and provenance certification',
      es: 'Del vinilo virgen a la presencia viva y certificación de autenticidad',
    },
    duration: {
      en: '6 Weeks · Full Artwork Creation',
      es: '6 Semanas · Creación Completa de Obra',
    },
    level: {
      en: 'Beginner to Advanced Artisans',
      es: 'Artesanos Principiantes a Avanzados',
    },
    format: {
      en: 'Full Creation Mentorship (1 Artwork Completed)',
      es: 'Mentoría de Creación Completa (1 Obra Terminada)',
    },
    description: {
      en: 'An immersive journey covering every stage of crafting a museum-grade hyperrealistic newborn sculpture. You will prepare raw vinyl, execute multi-phase oil glazes, align mouth-blown German Lauscha glass eyes, calibrate authentic gravitational weight distribution with glass micro-beads, and issue registered certification.',
      es: 'Un recorrido completo por cada etapa de creación de una escultura de recién nacido con estándar de museo. Prepararás el vinilo, aplicarás las veladuras al óleo, alinearás ojos alemanes de cristal Lauscha soplado a boca, calibrarás el peso gravitacional con microesferas y emitirás el certificado.',
    },
    curriculum: {
      en: [
        'Complete surface painting, mottling, venation, and sealing',
        'Setting Lauscha mouth-blown German glass eyes with realistic eyelid curvature',
        'Calibrating infant weight balance: floppy head tensioning and limb gravitas',
        'Micro-nail lunulas, inner-lip hydration gloss, and archival documentation',
      ],
      es: [
        'Pintura completa de piel, veteado, sonrosado capilar y sellado mate',
        'Colocación de ojos de cristal Lauscha con curvatura natural de párpados',
        'Calibración de peso y balance: tensión de cuello y gravedad de extremidades',
        'Lúnulas microscópicas en uñas, hidratación sutil y registro de procedencia',
      ],
    },
    includes: {
      en: [
        'Original European sculpted vinyl kit of your choice',
        'Pair of genuine mouth-blown German Lauscha glass eyes',
        'High-density optical glass micro-beads and articulated flannel body',
        'Personal 1-on-1 critique sessions with Melissa at each stage',
      ],
      es: [
        'Kit escultórico europeo original en vinilo a elección',
        'Par de ojos alemanes de cristal Lauscha soplados a boca',
        'Microesferas de vidrio óptico de alta densidad y cuerpo textil articulado',
        'Sesiones personalizadas de revisión con Melissa en cada fase',
      ],
    },
    image: '/assets/baby3_process.jpg',
    imageAlt: 'Atelier assembly workbench with weighted newborn parts',
  },
];
