import { type SchemaTypeDefinition } from 'sanity';
import { localeString } from './localeString';
import { localeText } from './localeText';
import { localeStringList } from './localeStringList';
import { artworkDetailImage } from './artworkDetailImage';
import { creation } from './creation';
import { offer } from './offer';
import { courseTrack } from './courseTrack';
import { accessoryItem } from './accessoryItem';
import { atelierStep } from './atelierStep';
import { worldTerritory } from './worldTerritory';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Shared Types
    localeString,
    localeText,
    localeStringList,
    artworkDetailImage,

    // Document Types
    creation,
    offer,
    courseTrack,
    accessoryItem,
    atelierStep,
    worldTerritory,
  ],
};
