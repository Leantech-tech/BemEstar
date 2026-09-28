import { renderPlaceTiles } from './place-tiles.js';

/**
 * ============================================================
 *  NOSSAS PRAIAS — DADOS
 * ------------------------------------------------------------
 *  Cada praia referencia a foto real em `assets/imagens/nossas praias`.
 *
 *  ⚠️  Para trocar uma foto, substitua o arquivo na pasta (mantendo
 *  o nome) ou altere o caminho em `images`. Se a nova imagem tiver
 *  proporção diferente, atualize `ratio` (largura ÷ altura, ex.:
 *  1920×1080 → 1.777) para que ela se encaixe sem cortes.
 *
 *  As praias são exibidas em duplas (uma por linha), com as
 *  imagens sempre completas — nada de nomes ou cenários cortados.
 *  Um toque no card abre o modal com a descrição da praia.
 * ============================================================ */

const IMG = 'assets/imagens/nossas praias';

/* Nota exibida no modal de cada praia. */
const NOTE =
  'As condições do mar variam com o vento e a maré. Em dias de ressaca, prefira as ' +
  'praias mais protegidas e siga sempre a orientação dos guarda-vidas.';

export const BEACHES = [
  {
    id: 'enseada',
    name: 'Praia da Enseada',
    context: 'A praia dos nossos apartamentos',
    category: 'Praia',
    location: 'Praia da Enseada, Ubatuba — SP',
    description:
      'Mar geralmente calmo e uma longa faixa de areia — perfeita para caminhadas no fim ' +
      'de tarde e banho tranquilo com as crianças. É aqui que ficam nossos apartamentos: ' +
      'dá para ir e voltar a pé quantas vezes quiser.',
    tags: ['Águas calmas', 'Ao lado dos apartamentos'],
    ratio: 1.275, // 1448 × 1136
    images: [`${IMG}/Enseada.png`],
  },
  {
    id: 'itamambuca',
    name: 'Praia de Itamambuca',
    context: 'Point de surf cercado de mata',
    category: 'Praia',
    description:
      'Uma das praias mais famosas do litoral norte: ondas constantes que recebem ' +
      'campeonatos de surf, areia clara e o Rio Itamambuca desaguando no cantinho. ' +
      'Mesmo sem prancha, vale pela paisagem.',
    tags: ['Surf', 'Natureza preservada'],
    ratio: 1.687, // 1672 × 991
    images: [`${IMG}/Itamambuca.png`],
  },
  {
    id: 'ubatumirim',
    name: 'Ubatumirim',
    context: 'Sossego no encontro do rio com o mar',
    category: 'Praia',
    description:
      'Mar calmo, areia clara e pouco movimento: Ubatumirim é refúgio para quem quer ' +
      'silêncio. Em uma das pontas, o rio encontra o mar formando piscinas rasas — um ' +
      'charme a mais para as crianças.',
    tags: ['Águas calmas', 'Pouco movimento'],
    ratio: 1.687, // 1672 × 991
    images: [`${IMG}/Ubatumirim.png`],
  },
  {
    id: 'praia-grande',
    name: 'Praia Grande',
    context: 'Movimento, quiosques e passeios',
    category: 'Praia',
    description:
      'Uma das praias mais animadas da cidade: orla com quiosques, saída de passeios de ' +
      'barco e mar bom para banho. Ideal para quem gosta de estrutura completa pé na areia.',
    tags: ['Quiosques', 'Passeios de barco'],
    ratio: 1.893, // 1774 × 937
    images: [`${IMG}/Praia Grande.png`],
  },
  {
    id: 'toninhas',
    name: 'Praia das Toninhas',
    context: 'Enseada protegida, ideal para famílias',
    category: 'Praia',
    description:
      'O formato de enseada protege o banho de mar em boa parte dos dias. Os cantinhos ' +
      'são ainda mais tranquilos, e o trecho central atrai quem pratica caiaque e ' +
      'stand-up paddle.',
    tags: ['Famílias', 'Caiaque e SUP'],
    ratio: 1.687, // 1672 × 991
    images: [`${IMG}/Toninhas.png`],
  },
  {
    id: 'praia-do-portugues',
    name: 'Praia do Português',
    context: 'Cantinho de águas claras',
    category: 'Praia',
    description:
      'Pequena, charmosa e encostada na mata, tem mar calmo e água transparente na maior ' +
      'parte do ano. Uma parada perfeita para relaxar longe do movimento.',
    tags: ['Águas claras', 'Sossego'],
    ratio: 1.687, // 1672 × 991
    images: [`${IMG}/Praia do Português.png`],
  },
];

/* ============================================================
 *  Renderização: galeria justificada (ver place-tiles.js)
 * ============================================================ */

export function renderBeaches() {
  renderPlaceTiles(document.getElementById('beachesGrid'), BEACHES, { note: NOTE });
}
