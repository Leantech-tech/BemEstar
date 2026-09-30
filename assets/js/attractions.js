import { openPlaceModal } from './place-modal.js';
import { ICONS, guardImage, placeholderImage } from './utils.js';

/**
 * ============================================================
 *  PONTOS TURÍSTICOS — DADOS
 * ------------------------------------------------------------
 *  ⚠️  SUBSTITUA AS IMAGENS: preencha o array `images` com as
 *  fotos reais de cada ponto (aceita uma ou várias — com várias,
 *  o modal exibe setas, contador e miniaturas). Enquanto estiver
 *  vazio, um placeholder com a identidade visual é exibido.
 *
 *  As descrições são informativas e podem ser ajustadas livremente.
 * ============================================================
 */

const IMG = '/assets/imagens/pontos turísticos';

/* Nota exibida no modal de cada ponto turístico. */
const NOTE =
  'Horários, programação e disponibilidade podem variar conforme a temporada e as ' +
  'condições locais. Confirme antes de programar sua visita.';

export const ATTRACTIONS = [
  {
    id: 'ubatuba-mall',
    name: 'Ubatuba Mall',
    context: 'Compras e alimentação na cidade',
    category: 'Compras',
    description:
      'Centro de compras no coração de Ubatuba, com lojas e praça de alimentação. ' +
      'Uma boa pedida para os dias de chuva ou para relaxar entre um passeio e outro.',
    tags: ['Compras', 'Gastronomia'],
    images: [`${IMG}/Ubatuba-Mall-Aeroporto.webp`],
  },
  {
    id: 'aquario',
    name: 'Aquário de Ubatuba',
    context: 'Fauna marinha do litoral norte',
    category: 'Passeio educativo',
    description:
      'Aquário municipal dedicado à fauna marinha da região. Um passeio educativo e divertido, ' +
      'perfeito para crianças e adultos conhecerem de perto as espécies que vivem no litoral.',
    tags: ['Famílias', 'Fauna marinha'],
    images: [`${IMG}/Aquario-de-Ubatuba-2-2.webp`],
  },
  {
    id: 'projeto-tamar',
    name: 'Projeto Tamar',
    context: 'Conservação de tartarugas marinhas',
    category: 'Natureza',
    description:
      'Base do Projeto Tamar em Ubatuba, dedicada à proteção das tartarugas marinhas. ' +
      'Vale a visita para conhecer o trabalho de conservação — e, em épocas adequadas, ' +
      'acompanhar atividades como a soltura de filhotes.',
    tags: ['Conservação', 'Ao ar livre'],
    images: [`${IMG}/fundacao_projeto_tamar_ubatuba07.webp`],
  },
  {
    id: 'sobradao-do-porto',
    name: 'Sobradão do Porto',
    context: 'História e cultura à beira-mar',
    category: 'Patrimônio',
    description:
      'Casarão histórico na orla do bairro do Porto, um dos cartões-postais da cidade. ' +
      'O imóvel abriga atividades culturais e é parada obrigatória para quem gosta de história ' +
      '— e de uma boa foto.',
    tags: ['Patrimônio', 'Cultura'],
    images: [`${IMG}/Casarao-de-Ubatuba-2.webp`],
  },
  {
    id: 'ilhas',
    name: 'Ilhas Paradisíacas',
    context: 'Passeios de barco pelo litoral',
    category: 'Passeio de barco',
    description:
      'Passeios de escuna e barcos menores levam a ilhas e praias de acesso apenas pelo mar, ' +
      'como a região da Ilha Anchieta e do Prumirim — águas claras, paisagens preservadas ' +
      'e paradas para banho.',
    tags: ['Passeio de barco', 'Natureza'],
    images: [`${IMG}/Ilhas.png`],
  },
  {
    id: 'trilha-7-praias',
    name: 'Trilha das 7 Praias',
    context: 'Natureza e praias selvagens',
    category: 'Trilha',
    description:
      'Uma das trilhas costeiras mais famosas do litoral paulista: cerca de 7 km ligando a ' +
      'Praia da Lagoinha ao Saco da Ribeira, passando por praias desertas, morros e mirantes naturais.',
    tags: ['Trilha', 'Praias selvagens'],
    images: [`${IMG}/Trilha 7 praias.webp`],
  },
];

/* ============================================================
 *  Renderização dos cards
 * ============================================================ */

export function renderAttractions() {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  grid.innerHTML = ATTRACTIONS.map(
    (attr, i) => `
    <article class="attr-card reveal" data-delay="${(i % 3) * 100}" data-attraction="${attr.id}">
      <button type="button" class="attr-media" data-action="open" aria-label="Ver detalhes: ${attr.name}">
        <img
          src="${attr.images[0] ?? placeholderImage(attr.name)}"
          alt="${attr.name}"
          loading="lazy"
          decoding="async"
        />
        <span class="attr-category">${attr.category}</span>
        <span class="attr-name">${attr.name}</span>
        <span class="attr-arrow" aria-hidden="true">${ICONS.arrowRight}</span>
      </button>
      <div class="attr-body">
        <p class="attr-context">${attr.context}</p>
        <button type="button" class="attr-more" data-action="open">
          Explorar ${ICONS.arrowRight}
        </button>
      </div>
    </article>`
  ).join('');

  grid.querySelectorAll('img').forEach(guardImage);

  grid.querySelectorAll('[data-action="open"]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.closest('[data-attraction]').dataset.attraction;
      const attraction = ATTRACTIONS.find((a) => a.id === id);
      if (attraction) openPlaceModal(attraction, { note: NOTE });
    });
  });
}
