import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

console.log('--- Jardin WebP Image Conversion Script ---');
console.log('Target directory:', imagesDir);

/**
 * Utility script for image optimization and WebP conversion.
 * To use sharp for conversion, install sharp: `npm install -D sharp`
 */
async function runConversion() {
  try {
    const sharp = (await import('sharp')).default;
    
    function scanAndConvert(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          scanAndConvert(fullPath);
        } else if (/\.(jpe?g|png)$/i.test(file.name)) {
          const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
          if (!fs.existsSync(webpPath)) {
            sharp(fullPath)
              .webp({ quality: 85 })
              .toFile(webpPath)
              .then(() => console.log(`Converted: ${file.name} -> WebP`))
              .catch(err => console.error(`Error converting ${file.name}:`, err.message));
          }
        }
      }
    }

    scanAndConvert(imagesDir);
    console.log('WebP optimization complete.');
  } catch {
    console.log('Sharp is not installed. To convert images automatically:');
    console.log('Run: npm install -D sharp && node scripts/convert-to-webp.mjs');
  }
}

runConversion();
