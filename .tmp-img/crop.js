const sharp = require('sharp');
const path = require('path');

const DIR = path.join(__dirname, '..', 'assets', 'imagens', 'nossas praias');

// arquivo: altura final após remover a faixa com o nome embutido
const CROPS = [
  ['Enseada.png', 855],
  ['Itamambuca.png', 715],
  ['Ubatumirim.png', 675],
  ['Praia Grande.png', 665],
  ['Toninhas.png', 655],
  ['Praia do Português.png', 620],
];

(async () => {
  for (const [file, height] of CROPS) {
    const input = path.join(DIR, file);
    const img = sharp(input);
    const meta = await img.metadata();
    const out = path.join(DIR, '_cropped_' + file);
    await img.extract({ left: 0, top: 0, width: meta.width, height }).toFile(out);
    console.log(`${file}: ${meta.width}x${meta.height} -> ${meta.width}x${height} (ratio ${(meta.width / height).toFixed(3)})`);
  }
})().catch((e) => { console.error(e); process.exit(1); });
