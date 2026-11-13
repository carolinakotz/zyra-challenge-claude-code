import { Link, useLocation } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { listarMissoes } from '../services/missaoService'
import CartaoMissao from '../components/CartaoMissao'
import EstadoRequisicao from '../components/EstadoRequisicao'

// formato do state que as telas de cadastro/edição mandam ao voltar para cá
interface EstadoComMensagem {
  mensagemSucesso: string
}

// location.state é unknown: confere o formato antes de usar
function temMensagemSucesso(estado: unknown): estado is EstadoComMensagem {
  return (
    typeof estado === 'object' &&
    estado !== null &&
    'mensagemSucesso' in estado &&
    typeof estado.mensagemSucesso === 'string'
  )
}

function PaginaMissoes() {
  const location = useLocation()
  // listarMissoes é definida fora do componente, então já é estável
  const { dados, carregando, erro, recarregar } = useFetch(listarMissoes)

  const mensagemSucesso = temMensagemSucesso(location.state)
    ? location.state.mensagemSucesso
    : null

  // vazio só depois de carregar com sucesso; dados null na primeira carga não conta
  const vazio = !carregando && erro === null && dados !== null && dados.length === 0

  return (
    <div className="flex flex-col gap-8">
      {mensagemSucesso && (
        <p
          role="status"
          className="flex items-start gap-3 rounded-cartao border border-sucesso-borda bg-sucesso-fundo p-4 text-sucesso-texto"
        >
          <i className="fa-solid fa-circle-check mt-1" aria-hidden="true" />
          <span>{mensagemSucesso}</span>
        </p>
      )}

      <header className="flex flex-col items-start gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-subtitulo font-bold tablet:text-hero">Missões</h1>
          <p className="max-w-texto text-corpo-grande font-light">
            Cumpra uma missão para ganhar pontos.
          </p>
        </div>
        <Link
          to="/missoes/nova"
          className="rounded-full bg-button-pink px-6 py-3 font-bold text-text-light-yellow transition-colors duration-150 hover:bg-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none"
        >
          Nova missão
        </Link>
      </header>

      <EstadoRequisicao
        carregando={carregando}
        erro={erro}
        vazio={vazio}
        aoTentarNovamente={recarregar}
        textoCarregando="Carregando missões…"
        mensagemVazio="Nenhuma missão cadastrada ainda."
        acaoVazio={
          <Link
            to="/missoes/nova"
            className="rounded-controle font-bold text-brand hover:text-hover hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Cadastrar a primeira missão
          </Link>
        }
      >
        <ul className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {dados?.map((missao) => (
            <li key={missao.id}>
              <CartaoMissao missao={missao} />
            </li>
          ))}
        </ul>
      </EstadoRequisicao>
    </div>
  )
}

export default PaginaMissoes
