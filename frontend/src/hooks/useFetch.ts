import { useCallback, useEffect, useState } from 'react'
import { ErroApi } from '../services/api'

// função que busca os dados; recebe o signal para poder ser cancelada
export type FuncaoBusca<T> = (signal: AbortSignal) => Promise<T>

export interface ResultadoFetch<T> {
  dados: T | null
  carregando: boolean
  erro: ErroApi | null
  recarregar: () => void
}

// resultado da última busca que terminou, junto com "qual busca" o gerou
interface Resposta<T> {
  busca: FuncaoBusca<T>
  tentativa: number
  dados: T | null
  erro: ErroApi | null
}

// roda a busca ao montar o componente (e quando a busca mudar) e guarda o resultado
// IMPORTANTE: a função de busca precisa ser estável (useCallback ou definida fora do componente),
// senão o efeito roda de novo a cada renderização e entra em loop
export function useFetch<T>(busca: FuncaoBusca<T>): ResultadoFetch<T> {
  const [resposta, setResposta] = useState<Resposta<T> | null>(null)
  // muda de valor só para forçar o efeito a rodar de novo (usado pelo recarregar)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    const controlador = new AbortController()

    busca(controlador.signal)
      .then((dados) => {
        if (controlador.signal.aborted) return
        setResposta({ busca, tentativa, dados, erro: null })
      })
      .catch((e: unknown) => {
        // busca cancelada: o componente saiu da tela ou outra busca começou, então ignora
        if (controlador.signal.aborted) return
        const erro = e instanceof ErroApi ? e : new ErroApi('Ocorreu um erro inesperado.', 0)
        setResposta({ busca, tentativa, dados: null, erro })
      })

    // limpeza: roda antes do próximo efeito e quando o componente sai da tela
    return () => controlador.abort()
  }, [busca, tentativa])

  // estável (useCallback sem dependências), então pode ir em props e dependências de efeitos
  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), [])

  // está carregando enquanto a última resposta não for da busca/tentativa atual
  // (calculado na renderização, sem setState extra dentro do efeito)
  const carregando = resposta?.busca !== busca || resposta.tentativa !== tentativa

  return {
    // durante um recarregar, mantém os dados anteriores na tela até chegarem os novos
    dados: resposta?.dados ?? null,
    carregando,
    erro: carregando ? null : (resposta?.erro ?? null),
    recarregar,
  }
}
