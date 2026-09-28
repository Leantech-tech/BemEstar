import { openModal } from './modal.js';
import { createGallery } from './gallery.js';
import { ICONS, placeholderImage } from './utils.js';

/**
 * ============================================================
 *  MODAL DE LUGAR (praias, cachoeiras, pontos turísticos)
 * ------------------------------------------------------------
 *  Monta o painel de detalhes de um "lugar" no padrão visual
 *  da seção Pontos Turísticos: galeria + categoria + descrição
 *  + tags + nota informativa.
 *
 *  @param {{ name: string, category: string, context?: string,
 *            description: string, tags: string[], images: string[],
 *            ratio?: number }} place
 *  @param {{ note?: string }} [opts] Nota exibida em destaque no rodapé.
 * ============================================================
 */
export function openPlaceModal(place, { note } = {}) {
  const images = place.images?.length ? place.images : [placeholderImage(place.name)];

  const html = `
    <article class="detail">
      <div class="detail-gallery" data-gallery-mount></div>

      <div class="detail-info">
        <div class="detail-head">
          <div>
            <span class="badge badge-gold">${place.category}</span>
            <h3>${place.name}</h3>
            ${place.context ? `<p class="detail-context">${place.context}</p>` : ''}
          </div>
        </div>

        <div class="detail-block">
          <h4>Sobre o lugar</h4>
          <p>${place.description}</p>
        </div>

        <ul class="detail-meta attr-meta">
          ${place.tags.map((t) => `<li>${ICONS.compass}<span>${t}</span></li>`).join('')}
        </ul>

        ${
          note
            ? `<p class="attr-note">${ICONS.info}<span>${note}</span></p>`
            : ''
        }
      </div>
    </article>`;

  const modal = openModal(html, { variant: 'modal-detail' });

  const gallery = createGallery(modal.body.querySelector('[data-gallery-mount]'), images, {
    alt: `Fotos de ${place.name}`,
    ratio: place.ratio,
  });

  // Remove os listeners da galeria quando o modal fechar
  const originalClose = modal.close;
  modal.close = () => {
    gallery.destroy();
    originalClose();
  };
}
