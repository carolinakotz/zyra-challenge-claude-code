import type { ReactNode } from 'react'
import type { ErroApi } from '../../services/api'

interface EstadoRequisicaoProps {
  carregando: boolean
  erro: ErroApi | null
  // quem usa decide o que é "vazio" (ex.: lista carregada sem nenhum item)
  vazio: boolean
  aoTentarNovamente: () => void
  // texto e ação do estado vazio vêm de fora, para o componente servir a qualquer tela
  mensagemVazio: string
  acaoVazio?: ReactNode
  // lido só por leitores de tela enquanto carrega
  textoCarregando?: string
  // conteúdo real, mostrado quando nenhum dos estados acima se aplica
  children: ReactNode
}

// mostra carregando, erro ou vazio; se nenhum deles valer, mostra o conteúdo (children)
function EstadoRequisicao({
  carregando,
  erro,
  vazio,
  aoTentarNovamente,
  mensagemVazio,
  acaoVazio,
  textoCarregando = 'Carregando…',
  children,
}: EstadoRequisicaoProps) {
  if (carregando) {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">{textoCarregando}</span>
        {/* blocos cinza no lugar do conteúdo, para a tela não "pular" quando ele chegar */}
        <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-48 animate-pulse rounded-cartao bg-card-gray motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
    )
  }

  if (erro) {
    return (
      <div
        role="alert"
        className="flex flex-col items-start gap-4 rounded-cartao border border-erro-borda bg-erro-fundo p-6 text-erro-texto mobile-lg:flex-row mobile-lg:items-center"
      >
        <p className="flex flex-1 items-start gap-3">
          <i className="fa-solid fa-circle-exclamation mt-1" aria-hidden="true" />
          <span>{erro.message}</span>
        </p>
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="rounded-full bg-button-pink px-6 py-2 font-bold text-text-light-yellow transition-colors duration-150 hover:bg-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (vazio) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-cartao bg-card-light-green p-8">
        <i className="fa-solid fa-seedling text-subtitulo text-icon" aria-hidden="true" />
        <p className="max-w-texto text-corpo-grande font-light text-text-dark">{mensagemVazio}</p>
        {acaoVazio}
      </div>
    )
  }

  return <>{children}</>
}

export default EstadoRequisicao
