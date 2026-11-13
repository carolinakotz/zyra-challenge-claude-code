import { useCallback, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { ErroApi } from '../services/api'
import { buscarMissao, excluirMissao } from '../services/missaoService'
import BotaoPrimario from '../components/BotaoPrimario'
import EstadoRequisicao from '../components/EstadoRequisicao'
import MensagemRetorno from '../components/MensagemRetorno'
import { converterId } from '../utils/converterId'
import { avisoMissaoNaoEncontrada } from '../utils/avisoMissaoNaoEncontrada'
import type { MissaoSaidaDTO } from '../types/missao'
import type { AvisoNavegacao } from '../types/navegacao'

function ConteudoMissao({ missao }: { missao: MissaoSaidaDTO }) {
  const navigate = useNavigate()
  // estado próprio da exclusão: separado do erro do useFetch, que é o erro da busca
  const [excluindo, setExcluindo] = useState(false)
  const [erroExclusao, setErroExclusao] = useState<string | null>(null)

  async function excluir() {
    // cancelou a confirmação: não faz nada
    if (!window.confirm(`Deseja realmente excluir a missão "${missao.nomeMissao}"?`)) return

    // limpa o erro da tentativa anterior e trava o botão contra clique duplo
    setErroExclusao(null)
    setExcluindo(true)

    try {
      // DELETE responde 204 sem corpo; o api.ts devolve undefined nesse caso
      await excluirMissao(missao.id)
    } catch (e) {
      setErroExclusao(e instanceof ErroApi ? e.message : 'Não foi possível excluir a missão.')
      // só reabilita se falhar; se der certo, a página navega embora
      setExcluindo(false)
      return
    }

    const aviso: AvisoNavegacao = {
      mensagem: `Missão "${missao.nomeMissao}" excluída com sucesso!`,
      tipo: 'sucesso',
    }
    // replace: o detalhe da missão apagada sai do histórico, então o Voltar do navegador
    // não reabre uma missão que não existe mais
    navigate('/missoes', { replace: true, state: aviso })
  }

  return (
    <section
      aria-label={`Detalhes da missão ${missao.nomeMissao}`}
      className="mx-auto flex w-full max-w-[80rem] flex-col items-center gap-[2rem] px-[1.6rem] py-[6rem] text-center tablet:px-[3.2rem] tablet:py-[7.2rem] desktop:px-[6.4rem] desktop:py-[8.8rem]"
    >
      {/* volta para a página anterior do histórico, como no projeto original */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="self-start font-texto text-[1.4rem] font-semibold text-nav underline-offset-4 transition-colors duration-200 hover:text-hover hover:underline"
      >
        ← Voltar
      </button>

      <i className="fa-solid fa-bus text-[4.8rem] text-icon" aria-hidden="true" />

      <h1 className="font-titulo text-[2.6rem] leading-[1.2] font-black text-title tablet:text-subtitulo">
        {missao.nomeMissao}
      </h1>

      <p className="mx-auto max-w-[60rem] font-texto text-[1.5rem] leading-[1.7] text-text-dark tablet:text-corpo-grande">
        {missao.requisito}
      </p>

      {/* missão sem conquista não mostra pontos */}
      {missao.conquista && (
        <p className="font-texto text-[1.8rem] font-bold text-hover">
          +{missao.conquista.pontosRecompensa} pts ao completar essa missão
        </p>
      )}

      {erroExclusao && <MensagemRetorno tipo="erro" texto={erroExclusao} />}

      <div className="flex flex-col items-center gap-[1.6rem] mobile-lg:flex-row">
        <BotaoPrimario to="/missoes">Ver todas as missões</BotaoPrimario>
        <BotaoPrimario to={`/missoes/${missao.id}/editar`}>Editar</BotaoPrimario>
        <button
          type="button"
          onClick={excluir}
          disabled={excluindo}
          className="rounded-lg border-[1.5px] border-erro px-[3.6rem] py-[1.3rem] text-[1.6rem] font-semibold text-erro transition-[background-color,color] duration-300 hover:bg-erro hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {excluindo ? 'Excluindo...' : 'Excluir'}
        </button>
      </div>
    </section>
  )
}

// só é montado com id válido, então a API nunca é chamada com id inválido
function DetalheMissao({ id }: { id: number }) {
  // useCallback: a mesma função entre renderizações, nova só quando o id muda
  // (sem isso o useFetch entraria em loop de requisições)
  const busca = useCallback((sinal: AbortSignal) => buscarMissao(id, sinal), [id])
  const { dados, carregando, erro, recarregar } = useFetch(busca)

  // missão inexistente: volta para a lista com o aviso, como no projeto original
  if (erro?.status === 404) {
    return <Navigate to="/missoes" replace state={avisoMissaoNaoEncontrada(String(id))} />
  }

  // carregando e erro aparecem sozinhos; o conteúdo só com a missão carregada
  return (
    <EstadoRequisicao
      carregando={carregando}
      erro={erro}
      vazio={false}
      mensagemVazio=""
      aoTentarNovamente={recarregar}
      textoCarregando="Carregando missão..."
    >
      {dados && <ConteudoMissao missao={dados} />}
    </EstadoRequisicao>
  )
}

function PaginaDetalheMissao() {
  const { id } = useParams()
  const idNumero = converterId(id)

  // endereço com id inválido (ex.: /missoes/abc): trata como missão não encontrada
  if (idNumero === null) {
    return <Navigate to="/missoes" replace state={avisoMissaoNaoEncontrada(id)} />
  }

  // ao ir de /missoes/1 para /missoes/2 o componente é reaproveitado:
  // o id muda, o useCallback gera outra função e o useFetch busca a missão nova
  return <DetalheMissao id={idNumero} />
}

export default PaginaDetalheMissao
