import { openModal } from './modal.js';
import { ICONS, categoryIcon, guardImage, placeholderImage } from './utils.js';

/**
 * ============================================================
 *  MODAL DE PONTO DE INTERESSE
 * ------------------------------------------------------------
 *  Foto do ponto à esquerda; à direita, as informações em
 *  blocos separados (Sobre / Localização / Contato), com o
 *  mapa do Google Maps na localização exata do ponto.
 *
 *  @param {{ name: string, description: string, context?: string,
 *            address: string, neighborhood: string, city: string,
 *            state: string, latitude: number|null, longitude: number|null,
 *            phone: string, site: string, image: string,
 *            tags?: string[] }} point
 *  @param {{ name: string, slug: string, icon: string } | null} category
 * ============================================================
 */

function formatPhoneDisplay(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return phone;
}

function mapsQuery(point) {
  const hasCoords =
    typeof point.latitude === 'number' && typeof point.longitude === 'number' &&
    (point.latitude !== 0 || point.longitude !== 0);
  if (hasCoords) return `${point.latitude},${point.longitude}`;
  return [point.address || [point.name, point.city, point.state].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(', ');
}

export function openPointModal(point, category) {
  const image = point.image || placeholderImage(point.name);
  const query = mapsQuery(point);
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const location = [point.neighborhood, point.city].filter(Boolean).join(' · ');

  const html = `
    <article class="detail poi-detail">
      <div class="detail-col-left">
        <figure class="poi-cover">
          <img src="${image}" alt="${point.name}" decoding="async" />
        </figure>
        ${point.tags?.length
          ? `<ul class="poi-tags">${point.tags.map((t) => `<li>${t}</li>`).join('')}</ul>`
          : ''}
      </div>

      <div class="detail-info">
        <div class="detail-head">
          <span class="badge badge-gold">${category ? categoryIcon(category.icon || category.slug) : ''}${category?.name ?? 'Ponto de interesse'}</span>
          <h3>${point.name}</h3>
          ${point.context ? `<p class="detail-context">${point.context}</p>` : ''}
          ${location ? `<p class="detail-location">${ICONS.pin}<span>${location}</span></p>` : ''}
        </div>

        ${point.description
          ? `<div class="detail-block"><h4>Sobre</h4><p>${point.description}</p></div>`
          : ''}

        <div class="detail-block">
          <h4>Localização</h4>
          ${point.address ? `<p class="detail-address">${point.address}</p>` : ''}
          <div class="poi-map">
            <iframe
              src="${embedUrl}"
              title="Localização de ${point.name} no Google Maps"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen></iframe>
          </div>
          <div class="poi-map-actions">
            <a class="btn btn-primary btn-sm" href="${directionsUrl}" target="_blank" rel="noopener">
              ${ICONS.compass} Como chegar
            </a>
            <a class="btn btn-outline btn-sm" href="${searchUrl}" target="_blank" rel="noopener">
              ${ICONS.pin} Abrir no Google Maps
            </a>
          </div>
        </div>

        ${point.phone || point.site
          ? `<div class="detail-block">
          <h4>Contato</h4>
          <ul class="poi-contact">
            ${point.phone
              ? `<li><a href="tel:+55${String(point.phone).replace(/\D/g, '')}">${ICONS.phone}<span>${formatPhoneDisplay(point.phone)}</span></a></li>`
              : ''}
            ${point.site
              ? `<li><a href="${point.site}" target="_blank" rel="noopener">${ICONS.globe}<span>Visitar site</span></a></li>`
              : ''}
          </ul>
        </div>`
          : ''}
      </div>
    </article>`;

  const modal = openModal(html, { variant: 'modal-detail' });
  modal.body.querySelectorAll('img').forEach(guardImage);
}
