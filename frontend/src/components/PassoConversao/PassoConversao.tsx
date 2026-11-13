import type { PassoConversao as PassoConversaoTipo } from '../../types/passoConversao'

interface PassoConversaoProps {
  passo: PassoConversaoTipo
  numero: number
}

// uma linha do "Como fazer?": número, ícone (ou imagem), nome e descrição
// as cores alternam entre linhas pares e ímpares; o passo em destaque tem cores próprias
function PassoConversao({ passo, numero }: PassoConversaoProps) {
  const par = numero % 2 === 0
  const destaque = Boolean(passo.destaque)

  const fundoLinha = destaque ? 'bg-card-dark-green' : par ? 'bg-card-green' : 'bg-card-light-green'

  const fundoNumero = destaque
    ? 'bg-hover text-white'
    : par
      ? 'bg-card-light-yellow text-card-dark-green'
      : 'bg-card-dark-green text-text-light-yellow'

  const fundoIcone = destaque ? 'bg-hover' : par ? 'bg-card-dark-green/15' : 'bg-card-dark-green'
  const corIcone = destaque ? 'text-white' : par ? 'text-card-dark-green' : 'text-text-light-yellow'

  const corNome = destaque ? 'text-text-light-yellow' : 'text-title'
  const corDescricao = destaque ? 'text-card-green' : 'text-text-dark'

  return (
    <li
      className={`flex items-center gap-[2.4rem] p-[2rem_3.2rem] transition-colors duration-200 hover:brightness-[1.04] ${fundoLinha}`}
    >
      {/* o original também declara um anel rosa no passo em destaque, mas essa sombra nunca aparecia
          (perdia para esta); aqui fica só a sombra que de fato aparece na tela */}
      <span
        className={`z-[1] flex h-[3.8rem] w-[3.8rem] shrink-0 items-center justify-center rounded-full font-texto text-[1.6rem] font-bold shadow-numero ${fundoNumero}`}
      >
        {numero}
      </span>

      {passo.imagem ? (
        <img
          src={passo.imagem}
          alt={`Ícone de ${passo.nome}`}
          className="h-[5.6rem] w-[5.6rem] shrink-0 rounded-[1.2rem] object-cover"
        />
      ) : (
        <div className={`flex h-[5.6rem] w-[5.6rem] shrink-0 items-center justify-center rounded-[1.2rem] ${fundoIcone}`}>
          <i className={`${passo.icone} text-[2.2rem] ${corIcone}`} aria-hidden="true" />
        </div>
      )}

      <div className="flex-1">
        <h3 className={`mb-[0.3rem] font-texto text-[1.6rem] font-bold ${corNome}`}>{passo.nome}</h3>
        <p className={`font-texto text-[1.3rem] leading-[1.5] ${corDescricao}`}>{passo.descricao}</p>
      </div>
    </li>
  )
}

export default PassoConversao
