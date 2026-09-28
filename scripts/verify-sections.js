/* Verificação funcional (não faz parte do site): render + cliques + modais via jsdom. */
const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/', pretendToBeVisual: true });
const { window } = dom;
const doc = window.document;

window.eval(fs.readFileSync('assets/js/bundle.js', 'utf8'));
if (!doc.querySelector('#waterfallsGrid .tile')) {
  doc.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));
}

let failures = 0;
const check = (label, cond, extra = '') => {
  console.log((cond ? 'PASS' : 'FAIL') + '  ' + label + (extra ? '  → ' + extra : ''));
  if (!cond) failures++;
};

/* ---- Estrutura das seções ---- */
const sections = [...doc.querySelectorAll('main section')].map((s) => s.id || '(cta)');
check('ordem das seções', sections.join(',') === 'inicio,como-funciona,apartamentos,praias,cachoeiras,pontos-turisticos,a-noite,localizacao', sections.join(' > '));

/* ---- Renderização ---- */
check('6 tiles de praias', doc.querySelectorAll('#beachesGrid .tile').length === 6);
check('7 tiles de cachoeiras', doc.querySelectorAll('#waterfallsGrid .tile').length === 7);
const rows = [...doc.querySelectorAll('#waterfallsGrid .tile-row')];
check('4 fileiras de cachoeiras (2+2+2+1)', rows.length === 4 && rows.map((r) => r.children.length).join('') === '2221',
  rows.map((r) => r.children.length).join('+'));
check('última fileira é is-single', rows[3].classList.contains('is-single'));
check('6 cards de pontos turísticos', doc.querySelectorAll('#attractionsGrid .attr-card').length === 6);
check('tiles são botões com aria-label', doc.querySelector('#waterfallsGrid .tile').tagName === 'BUTTON' && !!doc.querySelector('#waterfallsGrid .tile').getAttribute('aria-label'));
check('imagens webp referenciadas', [...doc.querySelectorAll('#waterfallsGrid img')].every((i) => i.getAttribute('src').endsWith('.webp')));

/* ---- Clique: cachoeira ---- */
doc.querySelector('#waterfallsGrid [data-place="agua-branca"]').click();
let overlay = doc.querySelector('.modal-overlay');
check('modal da cachoeira abriu', !!overlay);
check('título do modal', overlay?.querySelector('.detail-head h3')?.textContent === 'Cachoeira da Água Branca', overlay?.querySelector('.detail-head h3')?.textContent);
check('badge Cachoeira', overlay?.querySelector('.badge')?.textContent === 'Cachoeira');
check('descrição presente', (overlay?.querySelector('.detail-block p')?.textContent || '').length > 40);
check('tags presentes', overlay?.querySelectorAll('.detail-meta li').length === 2);
check('nota de segurança presente', !!overlay?.querySelector('.attr-note'));
check('galeria com proporção da foto (sem crop)', overlay?.querySelector('.gallery-main')?.style.aspectRatio === '1.776', overlay?.querySelector('.gallery-main')?.style.aspectRatio);
overlay.querySelector('.modal-close').click();

setTimeout(() => {
  /* ---- Clique: praia ---- */
  doc.querySelector('#beachesGrid [data-place="itamambuca"]').click();
  overlay = doc.querySelector('.modal-overlay');
  check('modal da praia abriu', !!overlay);
  check('título do modal', overlay?.querySelector('.detail-head h3')?.textContent === 'Praia de Itamambuca', overlay?.querySelector('.detail-head h3')?.textContent);
  check('badge Praia', overlay?.querySelector('.badge')?.textContent === 'Praia');
  check('contexto presente', overlay?.querySelector('.detail-context')?.textContent === 'Point de surf cercado de mata');
  overlay.querySelector('.modal-close').click();

  setTimeout(() => {
    /* ---- Clique: ponto turístico (regressão) ---- */
    doc.querySelector('#attractionsGrid [data-attraction="projeto-tamar"] [data-action="open"]').click();
    overlay = doc.querySelector('.modal-overlay');
    check('modal do ponto turístico abriu', !!overlay);
    check('título do modal', overlay?.querySelector('.detail-head h3')?.textContent === 'Projeto Tamar', overlay?.querySelector('.detail-head h3')?.textContent);
    check('galeria sem ratio forçado (padrão 4/3)', !overlay?.querySelector('.gallery-main')?.style.aspectRatio);
    overlay.querySelector('.modal-close').click();

    setTimeout(() => {
      check('todos os modais fecharam', !doc.querySelector('.modal-overlay'));
      console.log(failures === 0 ? '\nTODOS OS TESTES PASSARAM' : `\n${failures} TESTE(S) FALHARAM`);
      process.exit(failures === 0 ? 0 : 1);
    }, 400);
  }, 400);
}, 400);
