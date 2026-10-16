// scripts/convert-to-webp.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Список папок, где искать изображения для конвертации.
 * Каждая будет рекурсивно обработана.
 */
const TARGET_DIRS = [
  path.join(projectRoot, 'public', 'images'),
  path.join(projectRoot, 'public', 'videos'),
];

console.log('--- Jardin WebP Image Conversion Script ---');
TARGET_DIRS.forEach((dir) => console.log('Target directory:', dir));

/**
 * Быстрый рекурсивный поиск файлов, требующих конвертации.
 */
function needsConversion(dir) {
  if (!fs.existsSync(dir)) return false;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (needsConversion(path.join(dir, entry.name))) return true;
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      return true;
    }
  }

  return false;
}

async function runConversion() {
  // Быстрая проверка — если конвертировать нечего, выходим без загрузки sharp
  const hasWork = TARGET_DIRS.some((dir) => needsConversion(dir));
  if (!hasWork) {
    console.log('✅ Нет файлов для конвертации. Все изображения уже в WebP.');
    return;
  }

  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('');
    console.log('❌ Sharp не установлен.');
    console.log('   Установи: npm install -D sharp');
    console.log('');
    return;
  }

  let totalConverted = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  async function scanAndConvert(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await scanAndConvert(fullPath);
        continue;
      }

      if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;

      const lowerName = entry.name.toLowerCase();
      const webpName = lowerName.replace(/\.(jpe?g|png)$/i, '.webp');
      const webpPath = path.join(dir, webpName);

      if (fs.existsSync(webpPath)) {
        console.log(`⏭  Уже есть: ${path.relative(projectRoot, webpPath)}`);
        totalSkipped++;
        continue;
      }

      try {
        const stats = fs.statSync(fullPath);
        const sizeKb = Math.round(stats.size / 1024);

        await sharp(fullPath)
          .webp({ quality: 85, effort: 4 })
          .toFile(webpPath);

        const newStats = fs.statSync(webpPath);
        const newSizeKb = Math.round(newStats.size / 1024);
        const ratio = Math.round((1 - newStats.size / stats.size) * 100);

        console.log(
          `✅ ${path.relative(projectRoot, fullPath)} (${sizeKb} КБ) → ` +
          `${webpName} (${newSizeKb} КБ, −${ratio}%)`
        );

        fs.unlinkSync(fullPath);
        totalConverted++;
      } catch (err) {
        console.error(`❌ Ошибка с ${entry.name}:`, err.message);
        totalErrors++;
      }
    }
  }

  for (const dir of TARGET_DIRS) {
    await scanAndConvert(dir);
  }

  console.log('');
  console.log('--- Итог ---');
  console.log(`Сконвертировано: ${totalConverted}`);
  console.log(`Пропущено (уже есть WebP): ${totalSkipped}`);
  console.log(`Ошибок: ${totalErrors}`);
  console.log('Готово.');
}

runConversion();