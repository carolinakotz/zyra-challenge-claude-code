import { useCallback } from 'react'
import { Link, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { buscarMissao } from '../services/missaoService'
import EstadoRequisicao from '../components/EstadoRequisicao'
import type { MissaoSaidaDTO } from '../types/missao'

const CLASSES_FOCO =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// converte o id da URL; devolve null se não for um inteiro positivo ("abc", "1.5", "-3", "1e2")
function converterId(texto: string | undefined): number | null {
  if (texto === undefined || !/^\d+$/.test(texto)) return null
  const numero = Number(texto)
  return numero > 0 ? numero : null
}

function LinkVoltar() {
  return (
    <Link
      to="/missoes"
      className={`inline-flex items-center gap-2 self-start rounded-controle text-brand hover:text-hover hover:underline ${CLASSES_FOCO}`}
    >
      <i className="fa-solid fa-arrow-left" aria-hidden="true" />
      Voltar para a lista
    </Link>
  )
}

// erro em que tentar de novo não resolve (id inválido, missão inexistente): só oferece voltar
function AlertaSemRepeticao({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col gap-6">
      <p
        role="alert"
        className="flex items-start gap-3 rounded-cartao border border-erro-borda bg-erro-fundo p-6 text-erro-texto"
      >
        <i className="fa-solid fa-circle-exclamation mt-1" aria-hidden="true" />
        <span>{mensagem}</span>
      </p>
      <LinkVoltar />
    </div>
  )
}

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
    return <AlertaSemRepeticao mensagem={erro.message} />
  }

  return (
    <div className="flex flex-col gap-6">
      <LinkVoltar />
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
    return <AlertaSemRepeticao mensagem="Endereço de missão inválido." />
  }

  // ao ir de /missoes/1 para /missoes/2 o componente é reaproveitado:
  // o id muda, o useCallback gera outra função e o useFetch busca a missão nova
  return <DetalheMissao id={idNumero} />
}

export default PaginaDetalheMissao
