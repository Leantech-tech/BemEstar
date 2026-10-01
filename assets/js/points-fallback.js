/**
 * ============================================================
 *  PONTOS DE INTERESSE — DADOS LOCAIS (FALLBACK)
 * ------------------------------------------------------------
 *  Estes dados só são usados quando a API do backend está fora
 *  do ar e existe uma empresa vinculada na URL. Com a API no ar,
 *  a seção exibe exclusivamente os pontos cadastrados no banco
 *  (tabela pontos_interesse) pela empresa vinculada.
 *
 *  O formato é o mesmo da API: categorias com slug/ícone e
 *  pontos referenciando a categoria pelo slug.
 * ============================================================
 */

const IMG_PRAIAS = '/assets/imagens/nossas praias';
const IMG_CACHOEIRAS = '/assets/imagens/nossas cachoeiras';
const IMG_PONTOS = '/assets/imagens/pontos turísticos';
const IMG_NOITE = '/assets/imagens/o que fazer a noite';

export const FALLBACK_CATEGORIES = [
  { id: 'praia', name: 'Praias', slug: 'praia', icon: 'beach_access', order: 10 },
  { id: 'cachoeira', name: 'Cachoeiras', slug: 'cachoeira', icon: 'waterfall', order: 20 },
  { id: 'passeio', name: 'Passeios', slug: 'passeio', icon: 'tour', order: 30 },
  { id: 'vida-noturna', name: 'Vida noturna', slug: 'vida-noturna', icon: 'nightlife', order: 40 },
];

const point = (category, id, name, context, description, image, tags = [], address = '') => ({
  id,
  name,
  context,
  description,
  address,
  neighborhood: '',
  city: 'Ubatuba',
  state: 'SP',
  latitude: null,
  longitude: null,
  phone: '',
  site: '',
  image,
  featured: false,
  categoryId: category,
  tags,
});

export const FALLBACK_POINTS = [
  /* ---------- Praias ---------- */
  point(
    'praia', 'enseada', 'Praia da Enseada', 'A praia dos nossos apartamentos',
    'Mar geralmente calmo e uma longa faixa de areia — perfeita para caminhadas no fim ' +
      'de tarde e banho tranquilo com as crianças. É aqui que ficam nossos apartamentos: ' +
      'dá para ir e voltar a pé quantas vezes quiser.',
    `${IMG_PRAIAS}/Enseada.png`,
    ['Águas calmas', 'Ao lado dos apartamentos'],
    'Praia da Enseada, Ubatuba — SP'
  ),
  point(
    'praia', 'itamambuca', 'Praia de Itamambuca', 'Point de surf cercado de mata',
    'Uma das praias mais famosas do litoral norte: ondas constantes que recebem ' +
      'campeonatos de surf, areia clara e o Rio Itamambuca desaguando no cantinho. ' +
      'Mesmo sem prancha, vale pela paisagem.',
    `${IMG_PRAIAS}/Itamambuca.png`,
    ['Surf', 'Natureza preservada']
  ),
  point(
    'praia', 'ubatumirim', 'Ubatumirim', 'Sossego no encontro do rio com o mar',
    'Mar calmo, areia clara e pouco movimento: Ubatumirim é refúgio para quem quer ' +
      'silêncio. Em uma das pontas, o rio encontra o mar formando piscinas rasas — um ' +
      'charme a mais para as crianças.',
    `${IMG_PRAIAS}/Ubatumirim.png`,
    ['Águas calmas', 'Pouco movimento']
  ),
  point(
    'praia', 'praia-grande', 'Praia Grande', 'Movimento, quiosques e passeios',
    'Uma das praias mais animadas da cidade: orla com quiosques, saída de passeios de ' +
      'barco e mar bom para banho. Ideal para quem gosta de estrutura completa pé na areia.',
    `${IMG_PRAIAS}/Praia Grande.png`,
    ['Quiosques', 'Passeios de barco']
  ),
  point(
    'praia', 'toninhas', 'Praia das Toninhas', 'Enseada protegida, ideal para famílias',
    'O formato de enseada protege o banho de mar em boa parte dos dias. Os cantinhos ' +
      'são ainda mais tranquilos, e o trecho central atrai quem pratica caiaque e ' +
      'stand-up paddle.',
    `${IMG_PRAIAS}/Toninhas.png`,
    ['Famílias', 'Caiaque e SUP']
  ),
  point(
    'praia', 'praia-do-portugues', 'Praia do Português', 'Cantinho de águas claras',
    'Pequena, charmosa e encostada na mata, tem mar calmo e água transparente na maior ' +
      'parte do ano. Uma parada perfeita para relaxar longe do movimento.',
    `${IMG_PRAIAS}/Praia do Português.png`,
    ['Águas claras', 'Sossego']
  ),

  /* ---------- Cachoeiras ---------- */
  point(
    'cachoeira', 'dos-macacos', 'Cachoeira dos Macacos', 'Poço amplo em meio à mata',
    'A queda desce por degraus de rocha até um poço grande e profundo, cercado por ' +
      'Mata Atlântica preservada. O nome é uma homenagem aos macacos-prego que costumam ' +
      'aparecer na copa das árvores ao redor.',
    `${IMG_CACHOEIRAS}/Dos Macacos.webp`,
    ['Piscina natural', 'Mata preservada']
  ),
  point(
    'cachoeira', 'agua-branca', 'Cachoeira da Água Branca', 'Sequência de quedas e poços',
    'Uma sequência de pequenas quedas que descem pela pedra formando poços de água ' +
      'cristalina. Dá para escolher entre banho de queda, piscinas rasas para as crianças ' +
      'e a sombra generosa da mata.',
    `${IMG_CACHOEIRAS}/Água Branca.webp`,
    ['Poços rasos', 'Ideal para famílias']
  ),
  point(
    'cachoeira', 'escada', 'Cachoeira da Escada', 'Degraus naturais e escorregadores',
    'Como o nome sugere, a água desce por degraus sucessivos, formando escorregadores ' +
      'naturais e piscinas entre um nível e outro. Diversão garantida — com a dose certa ' +
      'de frescor.',
    `${IMG_CACHOEIRAS}/Escada.webp`,
    ['Escorregador natural', 'Banho de queda']
  ),
  point(
    'cachoeira', 'prumirim', 'Cachoeira do Prumirim', 'Pertinho da Praia do Prumirim',
    'A poucos minutos da Praia do Prumirim, combina trilha curta na mata com poços ' +
      'esverdeados de água doce. O programa perfeito é unir os dois: manhã de cachoeira, ' +
      'tarde de praia.',
    `${IMG_CACHOEIRAS}/Prumirim.webp`,
    ['Trilha curta', 'Combina com a praia']
  ),
  point(
    'cachoeira', 'renata', 'Cachoeira da Renata', 'Um dos poços mais bonitos da região',
    'Poço amplo de águas esverdeadas com faixa de areia na borda — cenário de piscina ' +
      'natural de revista. Nos dias de sol, a água ganha tons que vão do verde ao ' +
      'azul-turquesa.',
    `${IMG_CACHOEIRAS}/Renata.webp`,
    ['Piscina natural', 'Águas esverdeadas']
  ),
  point(
    'cachoeira', 'tombador', 'Cachoeira do Tombador', 'Queda imponente, poço profundo',
    'Queda alta e volumosa que despenca sobre um poço profundo — o clássico cartão-postal ' +
      'de cachoeira. O banho de queda aqui é dos mais revigorantes.',
    `${IMG_CACHOEIRAS}/Tombador.webp`,
    ['Banho de queda', 'Poço profundo']
  ),
  point(
    'cachoeira', 'veu-da-noiva', 'Cachoeira Véu da Noiva', 'Cortina d’água fotogênica',
    'A água desce em lâmina ampla sobre a rocha, formando uma cortina branca que lembra ' +
      'um véu — daí o nome. Uma das paisagens mais fotogênicas entre as cachoeiras da região.',
    `${IMG_CACHOEIRAS}/Véu da Noiva.webp`,
    ['Fotogênica', 'Cortina d’água']
  ),

  /* ---------- Passeios ---------- */
  point(
    'passeio', 'ubatuba-mall', 'Ubatuba Mall', 'Compras e alimentação na cidade',
    'Centro de compras no coração de Ubatuba, com lojas e praça de alimentação. ' +
      'Uma boa pedida para os dias de chuva ou para relaxar entre um passeio e outro.',
    `${IMG_PONTOS}/Ubatuba-Mall-Aeroporto.webp`,
    ['Compras', 'Gastronomia']
  ),
  point(
    'passeio', 'aquario', 'Aquário de Ubatuba', 'Fauna marinha do litoral norte',
    'Aquário municipal dedicado à fauna marinha da região. Um passeio educativo e divertido, ' +
      'perfeito para crianças e adultos conhecerem de perto as espécies que vivem no litoral.',
    `${IMG_PONTOS}/Aquario-de-Ubatuba-2-2.webp`,
    ['Famílias', 'Fauna marinha']
  ),
  point(
    'passeio', 'projeto-tamar', 'Projeto Tamar', 'Conservação de tartarugas marinhas',
    'Base do Projeto Tamar em Ubatuba, dedicada à proteção das tartarugas marinhas. ' +
      'Vale a visita para conhecer o trabalho de conservação — e, em épocas adequadas, ' +
      'acompanhar atividades como a soltura de filhotes.',
    `${IMG_PONTOS}/fundacao_projeto_tamar_ubatuba07.webp`,
    ['Conservação', 'Ao ar livre']
  ),
  point(
    'passeio', 'sobradao-do-porto', 'Sobradão do Porto', 'História e cultura à beira-mar',
    'Casarão histórico na orla do bairro do Porto, um dos cartões-postais da cidade. ' +
      'O imóvel abriga atividades culturais e é parada obrigatória para quem gosta de história ' +
      '— e de uma boa foto.',
    `${IMG_PONTOS}/Casarao-de-Ubatuba-2.webp`,
    ['Patrimônio', 'Cultura']
  ),
  point(
    'passeio', 'ilhas', 'Ilhas Paradisíacas', 'Passeios de barco pelo litoral',
    'Passeios de escuna e barcos menores levam a ilhas e praias de acesso apenas pelo mar, ' +
      'como a região da Ilha Anchieta e do Prumirim — águas claras, paisagens preservadas ' +
      'e paradas para banho.',
    `${IMG_PONTOS}/Ilhas.png`,
    ['Passeio de barco', 'Natureza']
  ),
  point(
    'passeio', 'trilha-7-praias', 'Trilha das 7 Praias', 'Natureza e praias selvagens',
    'Uma das trilhas costeiras mais famosas do litoral paulista: cerca de 7 km ligando a ' +
      'Praia da Lagoinha ao Saco da Ribeira, passando por praias desertas, morros e mirantes naturais.',
    `${IMG_PONTOS}/Trilha 7 praias.webp`,
    ['Trilha', 'Praias selvagens']
  ),

  /* ---------- Vida noturna ---------- */
  point(
    'vida-noturna', 'rua-guarani', 'Rua Guarani', 'O point da noite ubatubense',
    'O principal ponto de encontro da noite ubatubense: bares, restaurantes e food trucks ' +
      'concentrados em uma única rua — dá para percorrer tudo a pé.',
    `${IMG_NOITE}/Rua Guarani.webp`,
    ['Bares', 'Food trucks'],
    'Rua Guarani, Centro — Ubatuba/SP'
  ),
  point(
    'vida-noturna', 'baladas-shows', 'Baladas e Shows', 'Música e dança na temporada',
    'Para quem busca música e dança, Ubatuba tem opções de casa noturna a beach club — ' +
      'com atrações variadas conforme a programação da temporada.',
    `${IMG_NOITE}/Baladas e shows.webp`,
    ['Casas noturnas', 'Beach clubs']
  ),
  point(
    'vida-noturna', 'teatro-artes', 'Teatro e Artes', 'Cultura para uma noite tranquila',
    'Opções culturais para uma noite mais tranquila — entre peças, apresentações e o ' +
      'artesanato local.',
    `${IMG_NOITE}/Teatro e Artes.webp`,
    ['Peças', 'Artesanato'],
    'Praça Exaltação à Santa Cruz, 22 - Centro, Ubatuba - SP'
  ),
  point(
    'vida-noturna', 'shopping', 'Shopping', 'Compras e lazer à noite',
    'Para um programa tranquilo, a cidade tem shoppings e galerias com lojas, alimentação ' +
      'e áreas de lazer — perfeito para a noite ou para dias de chuva.',
    `${IMG_NOITE}/Shopping.webp`,
    ['Shoppings', 'Galerias'],
    'Rua Guarani, 374 - Itaguá, Ubatuba - SP'
  ),
  point(
    'vida-noturna', 'parque-diversao', 'Parque de Diversão', 'Diversão para toda a família',
    'Diversão para toda a família até a noite cair: atrações e espaços de lazer que ' +
      'garantem o programa das crianças — e de quem é criança por dentro.',
    `${IMG_NOITE}/Parque de diversão.webp`,
    ['Família', 'Crianças'],
    'Av. Iperoig - Centro, Ubatuba - SP'
  ),
];
