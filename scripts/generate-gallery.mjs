import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const worksDir = path.join(projectRoot, 'public', 'images', 'works');
const galleryDataFile = path.join(projectRoot, 'src', 'data', 'gallery.ts');

console.log('--- Jardin Auto Gallery Generator ---');

if (!fs.existsSync(worksDir)) {
  fs.mkdirSync(worksDir, { recursive: true });
}

const files = fs.readdirSync(worksDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));

console.log(`Found ${files.length} images in public/images/works`);

const items = files.map((file, idx) => {
  const id = `work-${idx + 1}`;
  const titleRu = `Работа №${idx + 1}`;
  const titleEn = `Artwork #${idx + 1}`;
  const titleEs = `Obra #${idx + 1}`;
  return `  {
    id: '${id}',
    imageUrl: '/images/works/${file}',
    title: {
      ru: '${titleRu}',
      en: '${titleEn}',
      es: '${titleEs}',
    },
    category: 'custom',
    description: {
      ru: 'Индивидуальное постижерное изделие ручной работы.',
      en: 'Custom handcrafted postiche hairpiece.',
      es: 'Pieza de posticería artesanal personalizada.',
    },
  }`;
});

const content = `import { GalleryItem } from '../types';

export const galleryItems: GalleryItem[] = [
${items.join(',\n')}
];
`;

if (files.length > 0) {
  fs.writeFileSync(galleryDataFile, content, 'utf-8');
  console.log(`Updated ${galleryDataFile} with ${files.length} items.`);
} else {
  console.log('No images found in public/images/works to auto-generate. Keeping existing gallery.');
}
