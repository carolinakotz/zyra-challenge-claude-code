import { useCallback } from 'react'
import { Link, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { buscarMissao } from '../services/missaoService'
import EstadoRequisicao from '../components/EstadoRequisicao'
import AlertaSemRepeticao from '../components/AlertaSemRepeticao'
import LinkVoltar from '../components/LinkVoltar'
import { converterId } from '../utils/converterId'
import type { MissaoSaidaDTO } from '../types/missao'

const CLASSES_FOCO =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// o mesmo link aparece no topo da página e nos alertas sem repetição
const voltarParaLista = <LinkVoltar para="/missoes">Voltar para a lista</LinkVoltar>

function ConteudoMissao({ missao }: { missao: MissaoSaidaDTO }) {
  const pontos = missao.conquista?.pontosRecompensa

  return (
    <article className="flex flex-col gap-8">
      <h1 className="text-subtitulo font-bold tablet:text-hero">{missao.nomeMissao}</h1>

      <div className="grid gap-6 tablet:grid-cols-[2fr_1fr]">
        <section className="flex flex-col gap-3 bg-card-light-yellow p-8 forma-folha">
          <h2 className="text-titulo-card font-bold">Requisito</h2>
          <p className="max-w-texto text-corpo-grande font-light text-text-dark">
            {missao.requisito}
          </p>
        </section>

        {/* pontos são o destaque da página: card-dark-green é o token de saldo/pontos */}
        {pontos !== undefined ? (
          <section className="flex flex-col justify-center gap-1 rounded-cartao bg-card-dark-green p-8 text-text-light-yellow">
            <p className="font-titulo text-subtitulo font-black tablet:text-hero">
              +{pontos} pontos
            </p>
            <p>ao concluir esta missão</p>
          </section>
        ) : (
          <section className="flex items-center rounded-cartao bg-card-light-green p-8 text-text-dark">
            <p>Sem conquista cadastrada</p>
          </section>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          to={`/missoes/${missao.id}/editar`}
          className={`rounded-full bg-button-pink px-6 py-3 font-bold text-text-light-yellow transition-colors duration-150 hover:bg-brand motion-reduce:transition-none ${CLASSES_FOCO}`}
        >
          Editar
        </Link>
        {/* exclusão ainda não implementada: o clique não faz nada por enquanto */}
        <button
          type="button"
          className={`rounded-full border-2 border-erro px-6 py-3 font-bold text-erro-texto transition-colors duration-150 hover:bg-erro-fundo motion-reduce:transition-none ${CLASSES_FOCO}`}
        >
          Excluir
        </button>
      </div>
    </article>
  )
}

// só é montado com id válido, então a API nunca é chamada com id inválido
function DetalheMissao({ id }: { id: number }) {
  // useCallback: a mesma função entre renderizações, nova só quando o id muda
  // (sem isso o useFetch entraria em loop de requisições)
  const busca = useCallback((sinal: AbortSignal) => buscarMissao(id, sinal), [id])
  const { dados, carregando, erro, recarregar } = useFetch(busca)

  // 404: a missão não existe, tentar de novo não resolve
  if (erro?.status === 404) {
    return <AlertaSemRepeticao mensagem={erro.message} acao={voltarParaLista} />
  }

  return (
    <div className="flex flex-col gap-6">
      {voltarParaLista}
      {/* um detalhe nunca fica "vazio": o componente só cuida de carregando e erro */}
      <EstadoRequisicao
        carregando={carregando}
        erro={erro}
        vazio={false}
        mensagemVazio=""
        aoTentarNovamente={recarregar}
        textoCarregando="Carregando missão…"
      >
        {dados && <ConteudoMissao missao={dados} />}
      </EstadoRequisicao>
    </div>
  )
}

function PaginaDetalheMissao() {
  const { id } = useParams()
  const idNumero = converterId(id)

  if (idNumero === null) {
    return <AlertaSemRepeticao mensagem="Endereço de missão inválido." acao={voltarParaLista} />
  }

  // ao ir de /missoes/1 para /missoes/2 o componente é reaproveitado:
  // o id muda, o useCallback gera outra função e o useFetch busca a missão nova
  return <DetalheMissao id={idNumero} />
}

export default PaginaDetalheMissao
