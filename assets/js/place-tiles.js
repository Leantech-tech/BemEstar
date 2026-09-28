import { openPlaceModal } from './place-modal.js';
import { ICONS, guardImage, placeholderImage } from './utils.js';

/**
 * ============================================================
 *  GALERIA JUSTIFICADA DE LUGARES (praias e cachoeiras)
 * ------------------------------------------------------------
 *  Exibe os lugares em fileiras de dois, com as larguras
 *  ajustadas pela proporção (`ratio` = largura ÷ altura) de
 *  cada foto — as imagens aparecem sempre inteiras, sem cortes.
 *  Uma fileira ímpar (item único) é centralizada e tem a
 *  altura limitada.
 *
 *  Cada tile é um botão que abre o modal de detalhes do lugar
 *  (ver place-modal.js).
 *
 *  @param {HTMLElement|null} grid Elemento que recebe as fileiras.
 *  @param {Array} places          Lugares com id, name, ratio e images.
 *  @param {{ note?: string }} [opts] Nota exibida no modal.
 * ============================================================
 */
export function renderPlaceTiles(grid, places, { note } = {}) {
  if (!grid) return;

  const rows = [];
  for (let i = 0; i < places.length; i += 2) rows.push(places.slice(i, i + 2));

  grid.innerHTML = rows
    .map(
      (row) => `
    <div class="tile-row${row.length === 1 ? ' is-single' : ''}">
      ${row
        .map(
          (place, i) => `
      <button
        type="button"
        class="tile reveal"
        style="--r: ${place.ratio}"
        data-delay="${i * 110}"
        data-place="${place.id}"
        aria-label="Ver detalhes: ${place.name}"
      >
        <img
          src="${place.images[0] ?? placeholderImage(place.name)}"
          alt="${place.name}, Ubatuba"
          loading="lazy"
          decoding="async"
        />
        <span class="tile-arrow" aria-hidden="true">${ICONS.arrowRight}</span>
      </button>`
        )
        .join('')}
    </div>`
    )
    .join('');

  grid.querySelectorAll('img').forEach(guardImage);

  grid.querySelectorAll('[data-place]').forEach((el) => {
    el.addEventListener('click', () => {
      const place = places.find((p) => p.id === el.dataset.place);
      if (place) openPlaceModal(place, { note });
    });
  });
}
