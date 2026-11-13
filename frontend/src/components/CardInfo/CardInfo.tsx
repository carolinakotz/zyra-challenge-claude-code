import type { DetalheConversao } from '../../types/detalheConversao'

interface CardInfoProps {
  detalhe: DetalheConversao
}

// card com uma informação da conversão: ícone, título, valor em destaque e descrição
function CardInfo({ detalhe }: CardInfoProps) {
  return (
    <article className="card-shape flex max-w-[26rem] min-w-[18rem] flex-1 flex-col items-center gap-[1.2rem] bg-card-green p-[3.2rem_2.4rem] text-center shadow-cartao transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-cartao-hover">
      <i className={`${detalhe.icone} text-[2.8rem] text-icon`} aria-hidden="true" />
      <p className="font-texto text-[1.5rem] font-bold text-title">{detalhe.titulo}</p>
      <p className="font-titulo text-[2.2rem] leading-[1.1] font-black text-title">{detalhe.valor}</p>
      <p className="font-texto text-[1.4rem] text-text-dark">{detalhe.descricao}</p>
    </article>
  )
}

export default CardInfo
