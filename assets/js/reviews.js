import { openModal } from './modal.js';

const starFilled = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const starEmpty = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

function starsHTML(nota, max = 5, interactive = false, name = 'rating') {
  const arr = [];
  for (let i = 1; i <= max; i++) {
    const filled = i <= nota;
    arr.push(`
      <button type="button" class="star-btn ${filled ? 'filled' : ''}" data-value="${i}" ${interactive ? '' : 'disabled'} aria-label="${i} estrela${i > 1 ? 's' : ''}">
        ${filled ? starFilled : starEmpty}
      </button>
    `);
  }
  return `<div class="stars${interactive ? ' interactive' : ''}" data-stars="${name}">${arr.join('')}</div>`;
}

function formatDateBR(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
}

function avaliacaoItemHTML(av) {
  return `
    <article class="review-item">
      <header class="review-header">
        <strong>${av.nome}</strong>
        <time>${formatDateBR(av.data)}</time>
      </header>
      <div class="review-stars">${starsHTML(av.nota)}</div>
      ${av.comentario ? `<p class="review-text">${av.comentario}</p>` : ''}
    </article>
  `;
}

function distribuicaoHTML(dist, total) {
  const bars = [5, 4, 3, 2, 1].map(n => {
    const count = dist[n] || 0;
    const pct = total ? (count / total) * 100 : 0;
    return `
      <div class="dist-row">
        <span class="dist-label">${n} <span class="star-icon">${starFilled}</span></span>
        <div class="dist-bar"><span style="width:${pct}%"></span></div>
        <span class="dist-count">${count}</span>
      </div>
    `;
  }).join('');
  return `<div class="review-distribuicao">${bars}</div>`;
}

function mediaHTML(media, total) {
  return `
    <div class="review-summary">
      <div class="review-score">
        <span class="score-value">${media.toFixed(1)}</span>
        <div class="score-stars">${starsHTML(Math.round(media))}</div>
        <span class="score-total">${total} avaliação${total !== 1 ? 'ões' : ''}</span>
      </div>
      ${distribuicaoHTML({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, 0)}
    </div>
  `;
}

export function openReviewsModal(imovelId, imovelName, onClose) {
  let currentData = null;

  async function loadReviews() {
    try {
      const res = await fetch(`/api/imoveis/${imovelId}/avaliacoes`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      currentData = await res.json();
      render();
    } catch (e) {
      console.error('Erro ao carregar avaliações:', e);
      document.getElementById('reviewsList').innerHTML = '<p class="review-error">Erro ao carregar avaliações.</p>';
    }
  }

  function render() {
    const { media, total, distribuicao, avaliacoes } = currentData || { media: 0, total: 0, distribuicao: {}, avaliacoes: [] };

    document.getElementById('reviewsSummary').innerHTML = `
      <div class="review-summary">
        <div class="review-score">
          <span class="score-value">${media.toFixed(1)}</span>
          <div class="score-stars">${starsHTML(Math.round(media))}</div>
          <span class="score-total">${total} avaliação${total !== 1 ? 'ões' : ''}</span>
        </div>
        ${distribuicaoHTML(distribuicao, total)}
      </div>
    `;

    const list = document.getElementById('reviewsList');
    if (avaliacoes && avaliacoes.length) {
      list.innerHTML = avaliacoes.map(avaliacaoItemHTML).join('');
    } else {
      list.innerHTML = '<p class="review-empty">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>';
    }
  }

  let selectedRating = 0;

  const html = `
    <div class="reviews-modal">
      <header class="reviews-header">
        <h3>Avaliações <span class="reviews-property">${imovelName}</span></h3>
      </header>
      <div class="reviews-body">
        <section id="reviewsSummary" class="reviews-summary-section"></section>
        <section class="reviews-form-section">
          <h4>Deixe sua avaliação</h4>
          <form id="reviewForm" class="review-form">
            <div class="form-group">
              <label>Sua nota</label>
              <div class="stars interactive" data-stars="new" id="newRatingStars">
                ${[1,2,3,4,5].map(i => `<button type="button" class="star-btn" data-value="${i}" aria-label="${i} estrela${i>1?'s':''}">${starEmpty}</button>`).join('')}
              </div>
              <input type="hidden" name="nota" id="notaInput" required>
            </div>
            <div class="form-group">
              <label for="nomeInput">Seu nome <span class="required">*</span></label>
              <input type="text" id="nomeInput" name="nome" required maxlength="100" placeholder="Como você quer ser identificado">
            </div>
            <div class="form-group">
              <label for="comentarioInput">Seu comentário (opcional)</label>
              <textarea id="comentarioInput" name="comentario" rows="3" maxlength="500" placeholder="Conte sua experiência..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar avaliação</button>
          </form>
        </section>
        <section class="reviews-list-section">
          <h4>O que dizem os hóspedes</h4>
          <div id="reviewsList" class="reviews-list"></div>
        </section>
      </div>
    </div>
  `;

  const modal = openModal(html, { variant: 'modal-reviews', size: 'large' });

  // Intercepta o fechamento para abrir o detalhe ANTES de fechar (evita ver a grade)
  const originalClose = modal.close;
  const customClose = () => {
    if (onClose) onClose(); // mostra o detalhe imediatamente
    originalClose();
  };
  modal.close = customClose;

  // Substitui o handler do botão X para usar nosso customClose
  const closeBtn = modal.sheet.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.replaceWith(closeBtn.cloneNode(true));
    modal.sheet.querySelector('.modal-close').addEventListener('click', customClose);
  }

  const starsContainer = modal.body.querySelector('#newRatingStars');
  starsContainer.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.value, 10);
      modal.body.querySelector('#notaInput').value = selectedRating;
      starsContainer.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('filled', i < selectedRating);
        b.innerHTML = i < selectedRating ? starFilled : starEmpty;
      });
    });
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.value, 10);
      starsContainer.querySelectorAll('.star-btn').forEach((b, i) => {
        b.innerHTML = i < val ? starFilled : starEmpty;
      });
    });
  });
  starsContainer.addEventListener('mouseleave', () => {
    starsContainer.querySelectorAll('.star-btn').forEach((b, i) => {
      b.classList.toggle('filled', i < selectedRating);
      b.innerHTML = i < selectedRating ? starFilled : starEmpty;
    });
  });

  modal.body.querySelector('#reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const nome = form.nome.value.trim();
    const nota = parseInt(form.nota.value, 10);
    const comentario = form.comentario.value.trim();

    if (!nome || !nota) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const res = await fetch(`/api/imoveis/${imovelId}/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nota, comentario })
      });
      if (!res.ok) throw new Error('Erro ao enviar');
      form.reset();
      selectedRating = 0;
      starsContainer.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.remove('filled');
        b.innerHTML = starEmpty;
      });
      modal.body.querySelector('#notaInput').value = '';
      await loadReviews();
    } catch (err) {
      alert('Erro ao enviar avaliação: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar avaliação';
    }
  });

  loadReviews();
}