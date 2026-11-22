import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from 'next-sanity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env.local safely across any Node version
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  if (process.loadEnvFile) {
    process.loadEnvFile(envLocalPath);
  } else {
    const lines = fs.readFileSync(envLocalPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_READ_TOKEN;

console.log('----------------------------------------------------');
console.log(' Baby Maker Petit — Sanity CMS Migration / Seed');
console.log('----------------------------------------------------\n');

if (!projectId || projectId === 'your_project_id_here' || !token) {
  console.error('❌ Sanity write token not configured in .env.local!');
  console.log('Ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are set.\n');
  process.exit(1);
}

console.log(`Connecting to Sanity: project ${projectId}, dataset "${dataset}"...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const uploadedAssetsMap = new Map();

async function uploadLocalImage(relativePath) {
  if (!relativePath) return null;
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  const fullPath = path.join(rootDir, 'public', cleanPath);

  if (uploadedAssetsMap.has(fullPath)) {
    return uploadedAssetsMap.get(fullPath);
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️ Image not found at ${fullPath}, skipping upload.`);
    return null;
  }

  const filename = path.basename(fullPath);
  const buffer = fs.readFileSync(fullPath);

  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
    });
    const imageRef = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
    uploadedAssetsMap.set(fullPath, imageRef);
    console.log(`  📸 Uploaded asset: ${filename} (id: ${asset._id})`);
    return imageRef;
  } catch (err) {
    console.error(`  ❌ Failed to upload ${filename}:`, err?.message || err);
    return null;
  }
}

async function runSeed() {
  const creationsFile = path.join(__dirname, 'creations-seed.json');
  const cardsFile = path.join(__dirname, 'cards-seed.json');

  if (!fs.existsSync(creationsFile) || !fs.existsSync(cardsFile)) {
    console.error('❌ Seed JSON files missing!');
    process.exit(1);
  }

  const creations = JSON.parse(fs.readFileSync(creationsFile, 'utf8'));
  const cards = JSON.parse(fs.readFileSync(cardsFile, 'utf8'));

  // 1. Seed Creations
  console.log(`\n=== 1. Migrating Creations (${creations.length} artworks) ===`);
  for (const item of creations) {
    console.log(`⏳ Processing Artwork: "${item.title}" (${item.slug})...`);
    const coverImageAsset = await uploadLocalImage(item.coverImage);

    const galleryAssets = [];
    if (Array.isArray(item.images)) {
      for (const imgPath of item.images) {
        const asset = await uploadLocalImage(imgPath);
        if (asset) galleryAssets.push(asset);
      }
    }

    const detailImages = [];
    if (Array.isArray(item.detailImages)) {
      for (const detail of item.detailImages) {
        const detailAsset = await uploadLocalImage(detail.url);
        if (detailAsset) {
          detailImages.push({
            _key: Math.random().toString(36).substring(2, 9),
            image: detailAsset,
            alt: detail.alt || item.title,
            title: detail.title,
            caption: detail.caption,
          });
        }
      }
    }

    const doc = {
      _id: `creation-${item.slug}`,
      _type: 'creation',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      year: item.year,
      dateCreated: item.dateCreated || undefined,
      sculptorKit: item.sculptorKit || undefined,
      originalSculptor: item.originalSculptor || undefined,
      medium: item.medium,
      technique: item.technique,
      weight: item.weight || undefined,
      length: item.length || undefined,
      eyeDetails: item.eyeDetails || undefined,
      hairDetails: item.hairDetails || undefined,
      status: item.status,
      series: item.series,
      featured: Boolean(item.featured),
      hasCertificate: Boolean(item.hasCertificate),
      certificateDate: item.certificateDate || undefined,
      description: item.description,
      story: item.story,
      craftNotes: item.craftNotes,
      coverImage: coverImageAsset,
      images: galleryAssets,
      detailImages: detailImages.length > 0 ? detailImages : undefined,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Creation synced: "${item.title}"`);
  }

  // 2. Seed Primary Offers
  console.log(`\n=== 2. Migrating Offers (${cards.offers.length} cards) ===`);
  for (const item of cards.offers) {
    console.log(`⏳ Processing Offer: "${item.title.es}" (${item.idKey})...`);
    const imgAsset = await uploadLocalImage(item.image);

    const doc = {
      _id: `offer-${item.idKey}`,
      _type: 'offer',
      order: item.order,
      idKey: item.idKey,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      badge: item.badge,
      features: item.features,
      image: imgAsset,
      imageAlt: item.imageAlt,
      href: item.href,
      ctaText: item.ctaText,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Offer synced: "${item.title.es}"`);
  }

  // 3. Seed Course Tracks
  console.log(`\n=== 3. Migrating Courses (${cards.courses.length} tracks) ===`);
  for (const item of cards.courses) {
    console.log(`⏳ Processing Course: "${item.title.es}" (${item.slug})...`);
    const imgAsset = await uploadLocalImage(item.image);

    const doc = {
      _id: `courseTrack-${item.slug}`,
      _type: 'courseTrack',
      order: item.order,
      slug: { _type: 'slug', current: item.slug },
      badge: item.badge,
      title: item.title,
      subtitle: item.subtitle,
      duration: item.duration,
      level: item.level,
      format: item.format,
      description: item.description,
      curriculum: item.curriculum,
      includes: item.includes,
      image: imgAsset,
      imageAlt: item.imageAlt,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Course synced: "${item.title.es}"`);
  }

  // 4. Seed Accessories
  console.log(`\n=== 4. Migrating Accessories (${cards.accessories.length} items) ===`);
  for (const item of cards.accessories) {
    console.log(`⏳ Processing Accessory: "${item.title.es}" (${item.slug})...`);
    const coverAsset = await uploadLocalImage(item.coverImage);

    const galleryAssets = [];
    if (Array.isArray(item.galleryImages)) {
      for (const imgPath of item.galleryImages) {
        const asset = await uploadLocalImage(imgPath);
        if (asset) galleryAssets.push(asset);
      }
    }

    const doc = {
      _id: `accessoryItem-${item.slug}`,
      _type: 'accessoryItem',
      order: item.order,
      slug: { _type: 'slug', current: item.slug },
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      description: item.description,
      materials: item.materials,
      craftsmanshipNotes: item.craftsmanshipNotes,
      compatibility: item.compatibility,
      coverImage: coverAsset,
      galleryImages: galleryAssets,
      status: item.status,
      badge: item.badge,
      features: item.features,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Accessory synced: "${item.title.es}"`);
  }

  // 5. Seed Atelier Steps
  console.log(`\n=== 5. Migrating Atelier Steps (${cards.atelierSteps.length} steps) ===`);
  for (const item of cards.atelierSteps) {
    console.log(`⏳ Processing Atelier Step: ${item.stepNumber} - "${item.title.es}"...`);
    const imgAsset = await uploadLocalImage(item.image);

    const doc = {
      _id: `atelierStep-${item.stepNumber}`,
      _type: 'atelierStep',
      stepNumber: item.stepNumber,
      order: item.order,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      technicalDetails: item.technicalDetails,
      image: imgAsset,
      imageAlt: item.imageAlt,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Atelier Step synced: ${item.stepNumber}`);
  }

  // 6. Seed World Territories
  console.log(`\n=== 6. Migrating World Territories (${cards.world.length} territories) ===`);
  for (const item of cards.world) {
    console.log(`⏳ Processing Territory: "${item.title.es}" (${item.idKey})...`);

    const doc = {
      _id: `worldTerritory-${item.idKey}`,
      _type: 'worldTerritory',
      order: item.order,
      idKey: item.idKey,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      focusAreas: item.focusAreas,
      artisticConcept: item.artisticConcept,
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ Territory synced: "${item.title.es}"`);
  }

  console.log('\n========================================================');
  console.log('🎉 ALL CONTENT & CARDS SUCCESSFULLY MIGRATED TO SANITY!');
  console.log('========================================================\n');
}

runSeed().catch((err) => {
  console.error('Fatal error during seed:', err);
  process.exit(1);
});
