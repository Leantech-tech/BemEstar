/**
 * Converte os PNGs de uma pasta para WebP otimizado (qualidade 82),
 * mantendo os arquivos originais intactos.
 *
 * Uso:
 *   npm run optimize:images -- "assets/imagens/nossas cachoeiras"
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) {
  console.error('Uso: node scripts/optimize-images.js <pasta-com-pngs>');
  process.exit(1);
}

(async () => {
  const files = fs.readdirSync(dir).filter((f) => /\.png$/i.test(f));
  if (!files.length) {
    console.log('Nenhum PNG encontrado em ' + dir);
    return;
  }
  for (const file of files) {
    const src = path.join(dir, file);
    const out = src.replace(/\.png$/i, '.webp');
    await sharp(src).webp({ quality: 82 }).toFile(out);
    const before = (fs.statSync(src).size / 1024).toFixed(0);
    const after = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`${file}  ->  ${path.basename(out)}   (${before} KB -> ${after} KB)`);
  }
})();
