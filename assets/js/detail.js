import { openModal } from './modal.js';
import { openBooking } from './booking.js';
import { createGallery } from './gallery.js';
import {
  ICONS,
  amenityIcon,
  formatGuests,
  plural,
} from './utils.js';

/**
 * Abre a experiência de detalhes do apartamento:
 * galeria de fotos + informações completas + CTA "Alugar".
 */
export function openApartmentDetail(apartment) {
  const images = apartment.images.length ? apartment.images : [''];

  const meta = [
    { icon: ICONS.users, label: formatGuests(apartment.capacity) },
    { icon: ICONS.bedroom, label: plural(apartment.bedrooms, 'quarto', 'quartos') },
    { icon: ICONS.bed, label: plural(apartment.beds, 'cama', 'camas') },
    { icon: ICONS.bath, label: plural(apartment.bathrooms, 'banheiro', 'banheiros') },
    ...(apartment.sizeM2 ? [{ icon: ICONS.area, label: `${apartment.sizeM2} m²` }] : []),
  ];

  const html = `
    <article class="detail">
      <div class="detail-gallery" data-gallery-mount></div>

      <div class="detail-info">
        <div class="detail-head">
          <div>
            ${apartment.featured ? '<span class="badge badge-gold">Destaque</span>' : ''}
            <span class="badge ${apartment.available ? 'badge-open' : 'badge-closed'}">
              ${apartment.available ? 'Disponível' : 'Indisponível no momento'}
            </span>
            <h3>${apartment.name}</h3>
            <p class="detail-location">${ICONS.pin}<span>${apartment.location}</span></p>
          </div>
        </div>

        <ul class="detail-meta">
          ${meta.map((m) => `<li>${m.icon}<span>${m.label}</span></li>`).join('')}
        </ul>

        <div class="detail-block">
          <h4>Sobre o apartamento</h4>
          <p>${apartment.description}</p>
        </div>

        <div class="detail-block">
          <h4>Comodidades</h4>
          <ul class="detail-amenities">
            ${apartment.amenities.map((a) => `<li>${amenityIcon(a)}<span>${a}</span></li>`).join('')}
          </ul>
        </div>

        <div class="detail-cta">
          <div class="detail-price">
            <span class="detail-price-label">Investimento</span>
            <strong>${apartment.price ?? 'Sob consulta'}</strong>
          </div>
          ${
            apartment.available
              ? `<button type="button" class="btn btn-primary btn-lg" data-action="rent">Alugar ${ICONS.arrowRight}</button>`
              : '<p class="detail-unavailable">Este apartamento não está disponível no momento. Fale conosco para conhecer outras opções.</p>'
          }
        </div>
      </div>
    </article>`;

  const modal = openModal(html, { variant: 'modal-detail' });

  /* ---------- Galeria ---------- */
  const gallery = createGallery(modal.body.querySelector('[data-gallery-mount]'), images, {
    alt: `Foto do ${apartment.name}`,
  });

  /* ---------- CTA Alugar → fluxo de reserva ---------- */
  modal.body.querySelector('[data-action="rent"]')?.addEventListener('click', () => {
    modal.close();
    setTimeout(() => openBooking(apartment), 240);
  });

  // Remove os listeners da galeria quando o modal fechar
  const originalClose = modal.close;
  modal.close = () => {
    gallery.destroy();
    originalClose();
  };
}
