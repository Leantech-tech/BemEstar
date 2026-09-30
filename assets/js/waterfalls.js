import { renderPlaceTiles } from './place-tiles.js';

/**
 * ============================================================
 *  NOSSAS CACHOEIRAS — DADOS
 * ------------------------------------------------------------
 *  Cada cachoeira referencia a foto em `assets/imagens/nossas cachoeiras`.
 *
 *  ⚠️  As imagens exibidas são as versões otimizadas `.webp`,
 *  geradas a partir dos PNGs originais da pasta. Ao trocar uma
 *  foto, substitua o PNG (mantendo o nome) e rode:
 *
 *      npm run optimize:images -- "assets/imagens/nossas cachoeiras"
 *
 *  Se a nova imagem tiver proporção diferente, atualize `ratio`
 *  (largura ÷ altura, ex.: 1920×1080 → 1.777) para que ela se
 *  encaixe sem cortes.
 *
 *  A ordem do array define as fileiras (duas por linha).
 * ============================================================ */

const IMG = '/assets/imagens/nossas cachoeiras';

/* Nota exibida no modal de cada cachoeira. */
const NOTE =
  'O acesso às cachoeiras pode incluir trilhas e, em alguns pontos, taxa de conservação ' +
  'local. Evite dias de chuva, use calçado fechado e confirme as condições antes da visita.';

export const WATERFALLS = [
  {
    id: 'dos-macacos',
    name: 'Cachoeira dos Macacos',
    context: 'Poço amplo em meio à mata',
    category: 'Cachoeira',
    description:
      'A queda desce por degraus de rocha até um poço grande e profundo, cercado por ' +
      'Mata Atlântica preservada. O nome é uma homenagem aos macacos-prego que costumam ' +
      'aparecer na copa das árvores ao redor.',
    tags: ['Piscina natural', 'Mata preservada'],
    ratio: 1.0, // 1254 × 1254
    images: [`${IMG}/Dos Macacos.webp`],
  },
  {
    id: 'agua-branca',
    name: 'Cachoeira da Água Branca',
    context: 'Sequência de quedas e poços',
    category: 'Cachoeira',
    description:
      'Uma sequência de pequenas quedas que descem pela pedra formando poços de água ' +
      'cristalina. Dá para escolher entre banho de queda, piscinas rasas para as crianças ' +
      'e a sombra generosa da mata.',
    tags: ['Poços rasos', 'Ideal para famílias'],
    ratio: 1.776, // 1671 × 941
    images: [`${IMG}/Água Branca.webp`],
  },
  {
    id: 'escada',
    name: 'Cachoeira da Escada',
    context: 'Degraus naturais e escorregadores',
    category: 'Cachoeira',
    description:
      'Como o nome sugere, a água desce por degraus sucessivos, formando escorregadores ' +
      'naturais e piscinas entre um nível e outro. Diversão garantida — com a dose certa ' +
      'de frescor.',
    tags: ['Escorregador natural', 'Banho de queda'],
    ratio: 1.777, // 1672 × 941
    images: [`${IMG}/Escada.webp`],
  },
  {
    id: 'prumirim',
    name: 'Cachoeira do Prumirim',
    context: 'Pertinho da Praia do Prumirim',
    category: 'Cachoeira',
    description:
      'A poucos minutos da Praia do Prumirim, combina trilha curta na mata com poços ' +
      'esverdeados de água doce. O programa perfeito é unir os dois: manhã de cachoeira, ' +
      'tarde de praia.',
    tags: ['Trilha curta', 'Combina com a praia'],
    ratio: 1.777, // 1672 × 941
    images: [`${IMG}/Prumirim.webp`],
  },
  {
    id: 'renata',
    name: 'Cachoeira da Renata',
    context: 'Um dos poços mais bonitos da região',
    category: 'Cachoeira',
    description:
      'Poço amplo de águas esverdeadas com faixa de areia na borda — cenário de piscina ' +
      'natural de revista. Nos dias de sol, a água ganha tons que vão do verde ao ' +
      'azul-turquesa.',
    tags: ['Piscina natural', 'Águas esverdeadas'],
    ratio: 1.776, // 1671 × 941
    images: [`${IMG}/Renata.webp`],
  },
  {
    id: 'tombador',
    name: 'Cachoeira do Tombador',
    context: 'Queda imponente, poço profundo',
    category: 'Cachoeira',
    description:
      'Queda alta e volumosa que despenca sobre um poço profundo — o clássico cartão-postal ' +
      'de cachoeira. O banho de queda aqui é dos mais revigorantes.',
    tags: ['Banho de queda', 'Poço profundo'],
    ratio: 1.775, // 1670 × 941
    images: [`${IMG}/Tombador.webp`],
  },
  {
    id: 'veu-da-noiva',
    name: 'Cachoeira Véu da Noiva',
    context: 'Cortina d’água fotogênica',
    category: 'Cachoeira',
    description:
      'A água desce em lâmina ampla sobre a rocha, formando uma cortina branca que lembra ' +
      'um véu — daí o nome. Uma das paisagens mais fotogênicas entre as cachoeiras da região.',
    tags: ['Fotogênica', 'Cortina d’água'],
    ratio: 1.777, // 1672 × 941
    images: [`${IMG}/Véu da Noiva.webp`],
  },
];

/* ============================================================
 *  Renderização: galeria justificada (ver place-tiles.js)
 * ============================================================ */

export function renderWaterfalls() {
  renderPlaceTiles(document.getElementById('waterfallsGrid'), WATERFALLS, { note: NOTE });
}
