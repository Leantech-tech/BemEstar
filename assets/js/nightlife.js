import { ICONS, guardImage } from './utils.js';

/**
 * ============================================================
 *  O QUE FAZER À NOITE EM UBATUBA — DADOS
 * ------------------------------------------------------------
 *  Organizado por categoria → opções. Para ajustar o conteúdo,
 *  edite os textos abaixo — a navegação é gerada automaticamente.
 *
 *  ⚠️  Nada aqui é garantia de programação: horários e eventos
 *  variam conforme temporada e condições locais (ver nota no
 *  rodapé da seção).
 * ============================================================
 */

const IMG = '/assets/imagens/o que fazer a noite';

export const NIGHTLIFE = [
  {
    id: 'rua-guarani',
    title: 'Rua Guarani',
    icon: 'mug',
    image: `${IMG}/Rua Guarani.webp`,
    intro:
      'O principal ponto de encontro da noite ubatubense: bares, restaurantes e food trucks ' +
      'concentrados em uma única rua — dá para percorrer tudo a pé.',
    location: 'Centro — Ubatuba/SP',
    tips: [
      'Vá a pé: bares e restaurantes ficam concentrados em poucos quarteirões.',
      'Nos fins de semana, chegue cedo para encontrar mesa com tranquilidade.',
      'Estacionamento no centro é limitado — considere táxi ou aplicativo.',
    ],
    options: [
      {
        name: 'Passeio a pé pela rua',
        desc: 'O melhor jeito de aproveitar é ir sem pressa: tudo fica concentrado em poucos quarteirões.',
      },
      {
        name: 'Petiscos e drinks na calçada',
        desc: 'Mesinhas na calçada, petiscos e drinks tropicais — o clássico happy hour ubatubense.',
      },
      {
        name: 'Food trucks e culinária casual',
        desc: 'Comida de rua descontraída e sabores variados para todos os gostos e bolsos.',
      },
    ],
  },
  {
    id: 'baladas-shows',
    title: 'Baladas e Shows',
    icon: 'music',
    image: `${IMG}/Baladas e shows.webp`,
    intro:
      'Para quem busca música e dança, Ubatuba tem opções de casa noturna a beach club — ' +
      'com atrações variadas conforme a programação da temporada.',
    tips: [
      'A programação muda por temporada — confira as redes sociais das casas.',
      'A festa costuma começar tarde; jante antes de sair.',
      'Se for beber, prefira ir e voltar de aplicativo.',
    ],
    options: [
      {
        name: 'Casas noturnas',
        desc: 'Pistas com DJs e música ao vivo — a festa começa tarde e segue até de madrugada.',
      },
      {
        name: 'Beach clubs',
        desc: 'Em alta temporada, funcionam até a noite com música, petiscos e vista para o mar.',
      },
      {
        name: 'Eventos e festas sazonais',
        desc: 'No verão e nos feriadões, a cidade recebe eventos especiais — acompanhe a programação.',
      },
    ],
  },
  {
    id: 'teatro-artes',
    title: 'Teatro e Artes',
    icon: 'ticket',
    image: `${IMG}/Teatro e Artes.webp`,
    intro:
      'Opções culturais para uma noite mais tranquila — entre peças, apresentações e o ' +
      'artesanato local.',
    location: 'Praça Exaltação à Santa Cruz, 22 - Centro, Ubatuba - SP, 11680-000',
    tips: [
      'Consulte a programação da semana antes de sair de casa.',
      'Em temporada, chegue com antecedência para garantir lugar.',
      'Combine com um jantar no centro para aproveitar a noite.',
    ],
    options: [
      {
        name: 'Programação cultural',
        desc: 'Peças e apresentações movimentam a agenda da cidade, principalmente em temporada.',
      },
      {
        name: 'Feiras de artesanato',
        desc: 'Lembranças e produtos regionais para levar um pedacinho de Ubatuba com você.',
      },
      {
        name: 'Galerias e ateliês',
        desc: 'Espaços de arte e ateliês de artistas locais — um passeio tranquilo e inspirador.',
      },
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping',
    icon: 'bag',
    image: `${IMG}/Shopping.webp`,
    intro:
      'Para um programa tranquilo, a cidade tem shoppings e galerias com lojas, alimentação ' +
      'e áreas de lazer — perfeito para a noite ou para dias de chuva.',
    location: 'Rua Guarani, 374 - Itaguá, Ubatuba - SP, 11689-046',
    tips: [
      'Em alta temporada, o horário costuma ser estendido.',
      'Boa pedida para dias de chuva ou noites mais tranquilas.',
      'Mercados e conveniências do centro atendem até tarde.',
    ],
    options: [
      {
        name: 'Shoppings e galerias',
        desc: 'Lojas, praça de alimentação e áreas de lazer para uma noite despreocupada.',
      },
      {
        name: 'Artesanato e lembranças',
        desc: 'Produtos regionais e lembranças de praia para garimpar bons presentes.',
      },
      {
        name: 'Mercados e conveniências',
        desc: 'Tudo para o café da manhã ou o churrasco no apartamento, perto de você.',
      },
    ],
  },
  {
    id: 'parque-diversao',
    title: 'Parque de Diversão',
    icon: 'ferris',
    image: `${IMG}/Parque de diversão.webp`,
    intro:
      'Diversão para toda a família até a noite cair: atrações e espaços de lazer que ' +
      'garantem o programa das crianças — e de quem é criança por dentro.',
    location: 'Av. Iperoig - Centro, Ubatuba - SP, 11680-000',
    tips: [
      'Em alta temporada, o funcionamento costuma se estender até a noite.',
      'Ideal para gastar a energia da criançada antes de dormir.',
      'Confira ingressos e horários na chegada à cidade.',
    ],
    options: [
      {
        name: 'Atrações para a criançada',
        desc: 'Brinquedos e atividades de recreação para os pequenos gastarem energia.',
      },
      {
        name: 'Diversão para todas as idades',
        desc: 'Atrações que agradam em família — ninguém fica de fora do programa.',
      },
      {
        name: 'Lazer em dias de chuva',
        desc: 'Opções de lazer cobertas que salvam o passeio quando o tempo fecha.',
      },
    ],
  },
];

/* ============================================================
 *  Renderização: categoria → opções
 * ============================================================ */

function panelHTML(category) {
  return `
    <div class="night-panel-head">
      <figure class="night-cover">
        <img
          src="${category.image}"
          alt="${category.title} à noite em Ubatuba"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="night-head-text">
        <span class="night-panel-icon" aria-hidden="true">${ICONS[category.icon] ?? ICONS.moon}</span>
        <h3 class="night-panel-title">${category.title}</h3>
        <p class="night-intro">${category.intro}</p>
      </div>
    </div>
    <div class="night-panel-body">
      <ul class="night-options">
        ${category.options
          .map(
            (o) => `
          <li class="night-option">
            <h4>${o.name}</h4>
            <p>${o.desc}</p>
          </li>`
          )
          .join('')}
      </ul>
      <aside class="night-aside">
        ${
          category.location
            ? `
        <div class="night-info-block">
          <h5>${ICONS.pin} Localização</h5>
          <p>${category.location}</p>
        </div>`
            : ''
        }
        <div class="night-info-block">
          <h5>${ICONS.info} Informações</h5>
          <ul class="night-info-list">
            ${category.tips.map((t) => `<li>${ICONS.check}<span>${t}</span></li>`).join('')}
          </ul>
        </div>
      </aside>
    </div>`;
}

export function renderNightlife() {
  const mount = document.getElementById('nightlifeMount');
  if (!mount) return;

  mount.innerHTML = `
    <div class="night-wrap reveal">
      <div class="night-tabs" role="tablist" aria-label="Categorias da noite em Ubatuba">
        ${NIGHTLIFE.map(
          (c, i) => `
          <button
            type="button"
            class="night-tab${i === 0 ? ' is-active' : ''}"
            role="tab"
            id="night-tab-${c.id}"
            aria-selected="${i === 0}"
            aria-controls="nightPanel"
            tabindex="${i === 0 ? '0' : '-1'}"
            data-night="${c.id}"
          >
            ${ICONS[c.icon] ?? ICONS.moon}
            <span>${c.title}</span>
          </button>`
        ).join('')}
      </div>
      <div
        class="night-panel"
        id="nightPanel"
        role="tabpanel"
        tabindex="0"
        aria-live="polite"
        aria-labelledby="night-tab-${NIGHTLIFE[0].id}"
      ></div>
    </div>`;

  const tabs = [...mount.querySelectorAll('.night-tab')];
  const panel = mount.querySelector('#nightPanel');

  const showPanel = (category) => {
    panel.innerHTML = panelHTML(category);
    panel.querySelectorAll('img').forEach(guardImage);
  };

  const select = (id, { animate = true } = {}) => {
    const category = NIGHTLIFE.find((c) => c.id === id);
    if (!category) return;

    tabs.forEach((t) => {
      const active = t.dataset.night === id;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      if (active) panel.setAttribute('aria-labelledby', t.id);
    });

    if (!animate) {
      showPanel(category);
      return;
    }

    panel.classList.add('is-switching');
    setTimeout(() => {
      showPanel(category);
      panel.classList.remove('is-switching');
    }, 190);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab.dataset.night));

    // Navegação por setas (acessibilidade)
    tab.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      select(next.dataset.night);
    });
  });

  select(NIGHTLIFE[0].id, { animate: false });
}
