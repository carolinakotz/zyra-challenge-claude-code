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
  textoCarregando?: string
  // conteúdo real, mostrado quando nenhum dos estados acima se aplica
  children: ReactNode
}

// bloco centralizado com ícone e texto, igual para os três estados
const CLASSES_CAIXA =
  'mx-auto flex w-full max-w-[60rem] flex-col items-center gap-[1.6rem] px-[1.6rem] py-[4rem] text-center tablet:py-[5rem]'
const CLASSES_TEXTO = 'font-texto text-[1.5rem] leading-[1.7] text-text-dark tablet:text-[1.6rem]'

// mostra carregando, erro ou vazio; se nenhum deles valer, mostra o conteúdo (children)
function EstadoRequisicao({
  carregando,
  erro,
  vazio,
  aoTentarNovamente,
  mensagemVazio,
  acaoVazio,
  textoCarregando = 'Carregando...',
  children,
}: EstadoRequisicaoProps) {
  if (carregando) {
    return (
      <div role="status" className={CLASSES_CAIXA}>
        <i className="fa-solid fa-spinner fa-spin text-[2.8rem] text-icon" aria-hidden="true" />
        <p className={CLASSES_TEXTO}>{textoCarregando}</p>
      </div>
    )
  }

  if (erro) {
    return (
      <div role="alert" className={CLASSES_CAIXA}>
        <i className="fa-solid fa-triangle-exclamation text-[2.8rem] text-brand" aria-hidden="true" />
        <p className={CLASSES_TEXTO}>{erro.message}</p>
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="rounded-controle bg-button-pink p-[1rem_2.8rem] font-texto text-[1.5rem] font-semibold text-white shadow-botao-forte transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-botao-forte-hover"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (vazio) {
    return (
      <div role="status" className={CLASSES_CAIXA}>
        <i className="fa-regular fa-folder-open text-[2.8rem] text-icon" aria-hidden="true" />
        <p className={CLASSES_TEXTO}>{mensagemVazio}</p>
        {acaoVazio}
      </div>
    )
  }

  return <>{children}</>
}

export default EstadoRequisicao
