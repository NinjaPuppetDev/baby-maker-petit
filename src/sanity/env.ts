const rawProjectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '').trim();
const isValidProjectId =
  rawProjectId.length > 0 &&
  rawProjectId !== 'your_project_id_here' &&
  /^[-a-z0-9]+$/i.test(rawProjectId);

const rawDataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim();
const isValidDataset = /^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(rawDataset);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset = isValidDataset ? rawDataset : 'production';

export const isSanityConfigured = isValidProjectId;

export const projectId = isSanityConfigured ? rawProjectId : '';
