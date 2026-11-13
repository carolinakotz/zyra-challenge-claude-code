import type { ConquistaExibicao } from '../types/conquista'

// conquistas apresentadas na seção "Novas conquistas" da página de missões
export const conquistas: ConquistaExibicao[] = [
  {
    id: 'iniciante',
    icone: 'fa-brands fa-pagelines',
    nome: 'Iniciante',
    criterio: 'Complete sua primeira missão sustentável.',
    pontos: 50,
  },
  {
    id: 'viajante',
    icone: 'fa-solid fa-train-subway',
    nome: 'Viajante',
    criterio: 'Registre 10 viagens com check-in.',
    pontos: 200,
  },
  {
    id: 'guardiao-clima',
    icone: 'fa-solid fa-tree',
    nome: 'Guardião do Clima',
    criterio: 'Evite 3 kg de CO₂ usando transporte público.',
    pontos: 1000,
  },
]
