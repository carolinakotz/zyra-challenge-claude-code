import { Link } from 'react-router'
import type { MissaoSaidaDTO } from '../../types/missao'

interface CartaoMissaoProps {
  missao: MissaoSaidaDTO
}

// a API não devolve ícone, então todas as missões usam o mesmo
const ICONE_MISSAO = 'fa-solid fa-bus'

// card de uma missão na lista; o card inteiro é o link para o detalhe
function CartaoMissao({ missao }: CartaoMissaoProps) {
  return (
    <Link
      to={`/missoes/${missao.id}`}
      aria-label={`Ver detalhes da missão ${missao.nomeMissao}`}
      className="card-shape flex max-w-[26rem] min-w-[18rem] flex-1 flex-col items-center gap-[1.2rem] bg-card-green p-[3.2rem_2.4rem] text-center shadow-cartao transition-[transform,box-shadow] duration-200 hover:scale-[1.06] hover:shadow-cartao-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <i className={`${ICONE_MISSAO} flex items-center justify-center text-[3rem] text-icon`} aria-hidden="true" />
      <h3 className="font-texto text-[1.5rem] font-bold text-title">{missao.nomeMissao}</h3>
      <p className="font-texto text-[1.4rem] leading-[1.5] text-text-dark">{missao.requisito}</p>
      {/* missão sem conquista não mostra pontos */}
      {missao.conquista && (
        <p className="font-texto text-[1.4rem] font-bold text-hover">+{missao.conquista.pontosRecompensa} pts</p>
      )}
    </Link>
  )
}

export default CartaoMissao
