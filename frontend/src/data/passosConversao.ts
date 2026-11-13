import type { PassoConversao } from '../types/passoConversao'

// passos da seção "Passo a passo" da página Sobre, na ordem em que aparecem
export const passosConversao: PassoConversao[] = [
  {
    id: 'soul-up',
    nome: 'Soul Up',
    descricao: 'Cadastre-se na SoulUp.',
    imagem: '/img/icon-soulup.png',
  },
  {
    id: 'pontos-soul',
    nome: 'Pontos Soul',
    descricao: 'Acumule pontos Soul cumprindo missões, conquistas, convidando amigos e muito mais.',
    icone: 'fa-solid fa-coins',
  },
  {
    id: 'comprar-saldo',
    nome: 'Comprar Saldo',
    descricao:
      'Use a funcionalidade Zyra para converter seus pontos em saldo para transporte público com RecargaPay.',
    icone: 'fa-solid fa-mobile-screen-button',
    destaque: true,
  },
  {
    id: 'recarga-pay',
    nome: 'RecargaPay',
    descricao:
      'No aplicativo RecargaPay, você pode consultar seu saldo para utilizar em transporte público com seu bilhete único.',
    icone: 'fa-regular fa-credit-card',
  },
  {
    id: 'viagem',
    nome: 'Viagem',
    descricao:
      'Apresente seu bilhete único na catraca e viaje com tranquilidade por metrôs, trens e ônibus municipais e muito mais.',
    icone: 'fa-solid fa-train-subway',
  },
]
