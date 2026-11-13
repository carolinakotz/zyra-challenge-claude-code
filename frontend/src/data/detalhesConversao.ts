import type { DetalheConversao } from '../types/detalheConversao'

// cards da seção "Detalhes da conversão" da página Sobre
export const detalhesConversao: DetalheConversao[] = [
  {
    id: 'pontos',
    icone: 'fa-solid fa-coins',
    titulo: 'Cálculo da conversão',
    valor: '50 pts',
    descricao: 'Equivalem a R$ 0,46.',
  },
  {
    id: 'taxa-conversao',
    icone: 'fa-solid fa-percent',
    titulo: 'Taxa de conversão',
    valor: '15%',
    descricao: 'Para cada conversão de pontos Soul, é cobrada uma taxa de 15% do valor total de pontos convertidos.',
  },
  {
    id: 'custo-bilhete',
    icone: 'fa-solid fa-ticket',
    titulo: 'Custo de 1 bilhete',
    valor: '587 pts + 15%',
    descricao: 'Equivalem a uma passagem (R$ 5,40).',
  },
  {
    id: 'sistema-parceiro',
    icone: 'fa-solid fa-shield-halved',
    titulo: 'Sistema Parceiro',
    valor: 'RecargaPay',
    descricao: 'Sistema de pagamento digital para recarga de saldo de transporte público.',
  },
  {
    id: 'cobertura',
    icone: 'fa-solid fa-train-subway',
    titulo: 'Cobertura',
    valor: '14 linhas',
    descricao: 'Metrô SP, CPTM e ViaMobilidade/ViaQuatro.',
  },
]
