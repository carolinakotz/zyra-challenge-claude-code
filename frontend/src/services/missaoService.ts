import { obter, enviar, remover } from './api'
import type { MissaoEntradaDTO, MissaoSaidaDTO } from '../types/missao'

// cada função corresponde a um método do MissaoResource (backend)
const CAMINHO = '/missoes'

// GET /missoes -> MissaoResource.listarTodos()
export function listarMissoes(signal?: AbortSignal): Promise<MissaoSaidaDTO[]> {
  return obter<MissaoSaidaDTO[]>(CAMINHO, signal)
}

// GET /missoes/{id} -> MissaoResource.buscarPorId(id)
export function buscarMissao(id: number, signal?: AbortSignal): Promise<MissaoSaidaDTO> {
  return obter<MissaoSaidaDTO>(`${CAMINHO}/${id}`, signal)
}

// POST /missoes?pontos= -> MissaoResource.cadastrar(dto, pontos)
// sem pontos, o backend usa o valor padrão (MissaoBO.PONTOS_PADRAO)
export function cadastrarMissao(
  dados: MissaoEntradaDTO,
  pontos?: number,
): Promise<MissaoSaidaDTO> {
  const consulta = pontos === undefined ? '' : `?${new URLSearchParams({ pontos: String(pontos) })}`
  return enviar<MissaoSaidaDTO>(`${CAMINHO}${consulta}`, dados, 'POST')
}

// PUT /missoes/{id} -> MissaoResource.atualizar(id, dto)
export function atualizarMissao(id: number, dados: MissaoEntradaDTO): Promise<MissaoSaidaDTO> {
  return enviar<MissaoSaidaDTO>(`${CAMINHO}/${id}`, dados, 'PUT')
}

// DELETE /missoes/{id} -> MissaoResource.excluir(id), responde 204 sem corpo
export function excluirMissao(id: number): Promise<void> {
  return remover(`${CAMINHO}/${id}`)
}
