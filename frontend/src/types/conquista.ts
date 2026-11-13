// conquista fixa mostrada na página de missões (não vem da API)
// para a conquista que a API devolve, ver ConquistaSaidaDTO em missao.ts
export interface ConquistaExibicao {
  id: string
  icone: string
  nome: string
  criterio: string
  pontos: number
}
