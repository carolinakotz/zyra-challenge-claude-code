import type { Faq } from '../../types/faq'

interface ItemFaqProps {
  item: Faq
  aberto: boolean
  aoAlternar: (id: number) => void
}

// uma pergunta do acordeão: o botão abre e fecha a resposta logo abaixo
function ItemFaq({ item, aberto, aoAlternar }: ItemFaqProps) {
  const idPergunta = `faq-pergunta-${item.id}`
  const idResposta = `faq-resposta-${item.id}`

  // aberto: cantos menores; fechado: cantos bem arredondados, que crescem com a tela
  const cantos = aberto
    ? 'rounded-[1.6rem] tablet:rounded-[2rem]'
    : 'rounded-[2.4rem] mobile-lg:rounded-[3rem] tablet:rounded-[4rem]'

  const corBotao = aberto
    ? 'rounded-none bg-card-light-green'
    : 'bg-card-green hover:bg-card-dark-green hover:text-text-light-yellow'

  const corIcone = aberto ? 'bg-card-dark-green text-text-light-yellow' : 'bg-bg text-title'

  // a resposta fechada fica com altura e padding vertical zero; a transição anima os dois
  const resposta = aberto
    ? 'max-h-[50rem] px-[1.8rem] pt-[1.6rem] pb-[2rem] mobile-lg:px-[2.2rem] tablet:px-[2.8rem] tablet:pt-[2rem] tablet:pb-[2.4rem]'
    : 'max-h-0 px-[1.8rem] py-0 mobile-lg:px-[2.2rem] tablet:px-[2.8rem]'

  return (
    <div className={`w-full overflow-hidden transition-[border-radius] duration-300 ${cantos}`}>
      <button
        id={idPergunta}
        type="button"
        onClick={() => aoAlternar(item.id)}
        aria-expanded={aberto}
        aria-controls={idResposta}
        className={`flex w-full items-center justify-between gap-[1.2rem] px-[1.8rem] py-[1.6rem] text-left font-texto text-[1.4rem] leading-[1.5] font-semibold text-title transition-colors duration-200 mobile-lg:gap-[1.4rem] mobile-lg:px-[2.2rem] mobile-lg:py-[1.7rem] mobile-lg:text-[1.5rem] tablet:gap-[1.6rem] tablet:px-[2.8rem] tablet:py-[1.8rem] tablet:text-[1.6rem] ${corBotao}`}
      >
        <span className="min-w-0">{item.pergunta}</span>

        <span
          aria-hidden="true"
          className={`flex h-[2.8rem] w-[2.8rem] shrink-0 items-center justify-center rounded-full text-[1.6rem] leading-none font-light transition-colors duration-200 mobile-lg:h-[3rem] mobile-lg:w-[3rem] tablet:h-[3.2rem] tablet:w-[3.2rem] tablet:text-[1.8rem] ${corIcone}`}
        >
          {aberto ? 'x' : '+'}
        </span>
      </button>

      {/* aria-labelledby: o leitor de tela anuncia a pergunta junto com a resposta */}
      <div
        id={idResposta}
        role="region"
        aria-labelledby={idPergunta}
        className={`overflow-hidden bg-card-light-green transition-[max-height,padding] duration-[400ms] ${resposta}`}
      >
        <p className="font-texto text-[1.4rem] leading-[1.7] text-text-dark mobile-lg:text-[1.45rem] tablet:text-[1.5rem]">
          {item.resposta}
        </p>
      </div>
    </div>
  )
}

export default ItemFaq
