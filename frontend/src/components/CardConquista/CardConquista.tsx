import type { ConquistaExibicao } from '../../types/conquista'

interface CardConquistaProps {
  conquista: ConquistaExibicao
}

// card de uma conquista; mesma forma do card de missão, mas não é clicável
function CardConquista({ conquista }: CardConquistaProps) {
  return (
    <article className="card-shape flex max-w-[26rem] min-w-[18rem] flex-1 flex-col items-center gap-[1.2rem] bg-card-green p-[3.2rem_2.4rem] text-center shadow-cartao transition-[transform,box-shadow] duration-200 hover:scale-[1.06] hover:shadow-cartao-hover">
      <i className={`${conquista.icone} flex items-center justify-center text-[3rem] text-icon`} aria-hidden="true" />
      <h3 className="font-texto text-[1.5rem] font-bold text-title">{conquista.nome}</h3>
      <p className="font-texto text-[1.4rem] leading-[1.5] text-text-dark">{conquista.criterio}</p>
      <p className="font-texto text-[1.4rem] font-bold text-hover">+{conquista.pontos} pts</p>
    </article>
  )
}

export default CardConquista
