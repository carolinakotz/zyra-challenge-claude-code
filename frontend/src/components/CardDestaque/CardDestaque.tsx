import type { Destaque } from '../../types/destaque'

interface CardDestaqueProps {
  destaque: Destaque
}

// card de um destaque; o canto grande cresce conforme a tela
function CardDestaque({ destaque }: CardDestaqueProps) {
  return (
    <article className="flex w-full flex-col items-center gap-[1.6rem] rounded-[4rem_1rem_4rem_1rem] bg-card-green px-[2.4rem] py-[3.2rem] text-center shadow-cartao transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-cartao-hover mobile-lg:px-[2.8rem] tablet:gap-[2rem] tablet:rounded-[5rem_1rem_5rem_1rem] tablet:pt-[3.6rem] tablet:pb-[3.2rem] desktop:rounded-[6rem_1rem_6rem_1rem] desktop:pt-[4rem] desktop:hover:scale-[1.06]">
      <i
        className={`${destaque.icone} flex items-center justify-center text-[2.8rem] text-icon tablet:text-[3rem]`}
        aria-hidden="true"
      />
      {/* font-texto: no Zyra os títulos usam Merriweather por padrão; o original usa Lato aqui */}
      <h3 className="font-texto text-[1.6rem] font-semibold text-title tablet:text-[1.7rem]">{destaque.titulo}</h3>
      <p className="text-[1.4rem] leading-[1.6] text-title tablet:text-[1.5rem]">{destaque.texto}</p>
    </article>
  )
}

export default CardDestaque
