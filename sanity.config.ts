import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';
import { projectId, dataset } from './src/sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'baby_maker_petit',
  title: 'Baby Maker Petit — Atelier Studio',
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({
      title: 'CMS Atelier',
      structure: (S) =>
        S.list()
          .title('Contenido del Atelier')
          .items([
            S.listItem()
              .title('👶 Creaciones / Obras Reborn')
              .schemaType('creation')
              .child(S.documentTypeList('creation').title('Creaciones / Artworks')),
            S.listItem()
              .title('⭐ Tarjetas de Ofertas (Home)')
              .schemaType('offer')
              .child(S.documentTypeList('offer').title('Tarjetas de Ofertas Principales')),
            S.listItem()
              .title('🎓 Cursos & Masterclasses')
              .schemaType('courseTrack')
              .child(S.documentTypeList('courseTrack').title('Programas y Cursos')),
            S.listItem()
              .title('🧵 Ropa & Accesorios de Autor')
              .schemaType('accessoryItem')
              .child(S.documentTypeList('accessoryItem').title('Guardarropa & Accesorios')),
            S.listItem()
              .title('🔬 Pasos de Atelier (Técnica)')
              .schemaType('atelierStep')
              .child(S.documentTypeList('atelierStep').title('Fases del Proceso Artesanal')),
            S.listItem()
              .title('🌌 Mundo & Exploraciones Futuras')
              .schemaType('worldTerritory')
              .child(S.documentTypeList('worldTerritory').title('Líneas de Exploración Artística')),
          ]),
    }),
  ],
});
