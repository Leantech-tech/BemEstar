/**
 * ============================================================
 *  DADOS DOS APARTAMENTOS
 * ------------------------------------------------------------
 *  ⚠️  ATENÇÃO: os dados abaixo são EXEMPLOS (placeholders)
 *  para demonstrar o site. Substitua nome, descrição,
 *  capacidade, comodidades, fotos e disponibilidade pelas
 *  informações reais de cada apartamento.
 *
 *  Estrutura de cada apartamento:
 *  {
 *    id:          string único (usado internamente, não mude depois de publicar)
 *    name:        nome de exibição
 *    location:    bairro / cidade
 *    capacity:    número máximo de hóspedes
 *    bedrooms:    quantidade de quartos
 *    beds:        quantidade de camas
 *    bathrooms:   quantidade de banheiros
 *    sizeM2:      metragem (ou null para não exibir)
 *    price:       texto do preço (ex.: 'R$ 450 / noite') ou null para exibir "Sob consulta"
 *    available:   true = disponível, false = indisponível no momento
 *    description: texto de apresentação
 *    amenities:   lista de comodidades (texto livre)
 *    images:      lista de URLs das fotos — SUBSTITUA pelas fotos reais
 *    featured:    true para destacar o card (selo "Destaque")
 *  }
 * ============================================================
 */

const IMG = '/assets/imagens/aptos';

export const APARTMENTS = [
  {
    id: 'apto-01',
    name: 'Apartamento 01',
    location: 'Ubatuba — SP',
    capacity: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    sizeM2: null,
    price: null,
    available: true,
    description:
      'Exemplo de descrição: apartamento amplo e bem iluminado, ideal para famílias que querem ' +
      'aproveitar as praias de Ubatuba com conforto. Ambientes integrados, cozinha completa e ' +
      'varanda para relaxar após um dia de mar.',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Cozinha completa', 'TV', 'Estacionamento', 'Varanda'],
    images: [
      `${IMG}/apto 1/262cc91f-2d53-43fb-a615-413ab5d84b0c.jpg`,
      `${IMG}/apto 1/2ad0bb16-6133-409c-a8ed-ef80cd08ab76.jpg`,
      `${IMG}/apto 1/9dd81584-4b33-4e5f-88e4-18f4c73bae6a.jpg`,
      `${IMG}/apto 1/caa6f09f-4c8e-4fb9-a231-4969487567a0.jpg`,
      `${IMG}/apto 1/e5f1d91e-aac8-4a2e-aa82-6aa4723f9138.jpg`,
      `${IMG}/apto 1/fc977143-3b84-466c-a213-ac9afe8c9c1b.jpg`,
    ],
    featured: false,
  },
  {
    id: 'apto-02',
    name: 'Apartamento 02',
    location: 'Ubatuba — SP',
    capacity: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    sizeM2: null,
    price: null,
    available: true,
    description:
      'Exemplo de descrição: espaçoso e confortável, perfeito para grupos e famílias maiores. ' +
      'Distribuição inteligente dos quartos e áreas sociais amplas para todo mundo aproveitar.',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Cozinha completa', 'TV', 'Estacionamento', 'Churrasqueira'],
    images: [
      `${IMG}/apto 2/4abbb369-3f5f-423e-851e-c7ee651a4e19.jpg`,
      `${IMG}/apto 2/74067728-77c8-49b5-b56f-bc5a938faf16.jpg`,
      `${IMG}/apto 2/a9512c65-02a2-462f-95ac-a3ddb958063f.jpg`,
      `${IMG}/apto 2/c584adec-9735-48eb-89d3-bac3aa5b358c.jpg`,
      `${IMG}/apto 2/d7535fe1-f799-4a88-9234-a470141df1d9.jpg`,
      `${IMG}/apto 2/e456890d-51d0-44d4-82ce-ac02a34fc261.jpg`,
    ],
    featured: true,
  },
  {
    id: 'apto-03',
    name: 'Apartamento 03',
    location: 'Ubatuba — SP',
    capacity: 2,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    sizeM2: null,
    price: null,
    available: true,
    description:
      'Exemplo de descrição: charmoso e aconchegante, ideal para casais. Decoração cuidadosa, ' +
      'clima agradável e tudo o que você precisa para uma escapada romântica à beira-mar.',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Cozinha completa', 'TV'],
    images: [
      `${IMG}/apto 3/05eba255-2034-4f54-a1ee-1db872423528.jpg`,
      `${IMG}/apto 3/092857ad-3067-498a-9cd3-f05d5b729e04.jpg`,
      `${IMG}/apto 3/4fef326b-cfb1-44ec-aad6-2c5aec059d7e.jpg`,
      `${IMG}/apto 3/5bd9edf7-aa5e-4394-993b-13ed0d6d7d5f.jpg`,
      `${IMG}/apto 3/9cfed2a2-aca8-45c2-a988-f85f33694670.jpg`,
      `${IMG}/apto 3/d68b57ff-5b6e-4c89-aef2-f9701ebb5090.jpg`,
    ],
    featured: false,
  },
  {
    id: 'apto-04',
    name: 'Apartamento 04',
    location: 'Ubatuba — SP',
    capacity: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    sizeM2: null,
    price: null,
    available: true,
    description:
      'Exemplo de descrição: moderno e funcional, com ambientes claros e ventilados. Uma opção ' +
      'equilibrada para famílias que valorizam conforto e praticidade perto da praia.',
    amenities: ['Wi-Fi', 'Ar-condicionado', 'Cozinha completa', 'TV', 'Estacionamento'],
    images: [
      `${IMG}/apto 4/2aee38af-22df-4eee-93f7-b19cf5dd8b41.jpg`,
      `${IMG}/apto 4/3899448b-4737-4ec7-a85f-4c15c1de27cb.jpg`,
      `${IMG}/apto 4/4687b66a-dbd1-401c-8509-16da44fc25cc.jpg`,
      `${IMG}/apto 4/49772dc2-1258-4516-a1a2-b4d632c58cde.jpg`,
      `${IMG}/apto 4/4b012f13-b625-47a8-b526-1eaf0e70f564.jpg`,
      `${IMG}/apto 4/a745bb1d-6a2d-4bdc-bacd-66bdab198b05.jpg`,
      `${IMG}/apto 4/a8192a1d-2bf6-4b57-8228-b8989fcda0e2.jpg`,
      `${IMG}/apto 4/b5297660-2549-4c05-a825-d152aa9a8221.jpg`,
      `${IMG}/apto 4/b9d650fb-1b66-4132-85d8-7ee5712d9d65.jpg`,
      `${IMG}/apto 4/be3609b0-0770-4d4f-a71d-b0dc6aff5019.jpg`,
      `${IMG}/apto 4/d4a52d2e-dd04-49ef-a2c6-c606fe02f8fe.jpg`,
      `${IMG}/apto 4/def79a40-786f-4b80-8274-4867b19b1e05.jpg`,
    ],
    featured: false,
  },
];
