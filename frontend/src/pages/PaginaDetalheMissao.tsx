import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { ErroApi } from '../services/api'
import { buscarMissao, excluirMissao } from '../services/missaoService'
import EstadoRequisicao from '../components/EstadoRequisicao'
import AlertaSemRepeticao from '../components/AlertaSemRepeticao'
import LinkVoltar from '../components/LinkVoltar'
import { converterId } from '../utils/converterId'
import type { MissaoSaidaDTO } from '../types/missao'
import type { AvisoNavegacao } from '../types/navegacao'

const CLASSES_FOCO =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

// o mesmo link aparece no topo da página e nos alertas sem repetição
const voltarParaLista = <LinkVoltar para="/missoes">Voltar para a lista</LinkVoltar>

function ConteudoMissao({ missao }: { missao: MissaoSaidaDTO }) {
  const navigate = useNavigate()
  // estado próprio da exclusão: separado do erro do useFetch, que é o erro da busca
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState<string | null>(null)

  const pontos = missao.conquista?.pontosRecompensa

  async function excluir() {
    // cancelou a confirmação: não faz nada
    if (!window.confirm('Tem certeza que deseja excluir esta missão?')) return

    // limpa o erro da tentativa anterior e trava o botão contra clique duplo
    setErroExclusao(null)
    setExcluindo(true)

    try {
      // DELETE responde 204 sem corpo; o api.ts devolve undefined nesse caso
      await excluirMissao(missao.id)
    } catch (e) {
      setErroExclusao(
        e instanceof ErroApi ? e.message : 'Ocorreu um erro inesperado ao excluir a missão.',
      )
      // só reabilita se falhar; se der certo, a página navega embora
      setExcluindo(false)
      return
    }

    // replace: o detalhe da missão apagada sai do histórico, então o Voltar do navegador
    // não reabre uma missão que não existe mais
    const aviso: AvisoNavegacao = {
      mensagem: `Missão "${missao.nomeMissao}" excluída com sucesso!`,
      tipo: 'sucesso',
    }
    navigate('/missoes', { replace: true, state: aviso })
  }

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

      <div className="flex flex-col gap-4">
        {/* erro da exclusão fica junto dos botões; a missão continua visível acima */}
        {erroExclusao && (
          <p
            role="alert"
            className="flex items-start gap-3 rounded-cartao border border-erro-borda bg-erro-fundo p-4 text-erro-texto"
          >
            <i className="fa-solid fa-circle-exclamation mt-1" aria-hidden="true" />
            <span>{erroExclusao}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          <Link
            to={`/missoes/${missao.id}/editar`}
            className={`rounded-full bg-button-pink px-6 py-3 font-bold text-text-light-yellow transition-colors duration-150 hover:bg-brand motion-reduce:transition-none ${CLASSES_FOCO}`}
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={excluir}
            disabled={excluindo}
            className={`rounded-full border-2 border-erro px-6 py-3 font-bold text-erro-texto transition-colors duration-150 enabled:hover:bg-erro-fundo disabled:cursor-not-allowed disabled:border-card-gray disabled:bg-card-gray disabled:text-separator-dark motion-reduce:transition-none ${CLASSES_FOCO}`}
          >
            {excluindo ? 'Excluindo…' : 'Excluir'}
          </button>
        </div>
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
