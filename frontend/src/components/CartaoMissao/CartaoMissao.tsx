import { Link } from 'react-router'
import type { MissaoSaidaDTO } from '../../types/missao'

interface CartaoMissaoProps {
  missao: MissaoSaidaDTO
}

// card de uma missão na lista; o card inteiro leva ao detalhe
function CartaoMissao({ missao }: CartaoMissaoProps) {
  const pontos = missao.conquista?.pontosRecompensa

  return (
    // has-[a:focus-visible]: o anel de foco aparece no card quando o link de dentro recebe foco
    <article className="relative flex h-full flex-col gap-3 border-2 border-transparent bg-card-light-yellow p-6 forma-folha transition-colors duration-150 hover:border-stroke has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-brand has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-bg motion-reduce:transition-none">
      <h2 className="text-titulo-card font-bold">
        {/* o ::after cobre o card todo, então clicar em qualquer parte abre o detalhe;
            o leitor de tela anuncia só o nome da missão */}
        <Link
          to={`/missoes/${missao.id}`}
          className="focus-visible:outline-none after:absolute after:inset-0"
        >
          {missao.nomeMissao}
        </Link>
      </h2>

      <p className="line-clamp-3 text-text-dark">{missao.requisito}</p>

      {/* mt-auto empurra o selo para o rodapé do card, alinhando cards de alturas diferentes */}
      <div className="mt-auto pt-2">
        {pontos !== undefined ? (
          <span className="inline-block rounded-full bg-destaque-rosa px-3 py-1 text-pequeno font-bold text-title">
            +{pontos} pontos
          </span>
        ) : (
          <span className="text-pequeno text-text-dark">Ainda sem conquista</span>
        )}
      </div>
    </article>
  )
}

export default CartaoMissao
