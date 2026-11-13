import { useFetch } from '../../hooks/useFetch'
import { listarMissoes } from '../../services/missaoService'
import BotaoPrimario from '../BotaoPrimario'
import CartaoMissao from '../CartaoMissao'
import EstadoRequisicao from '../EstadoRequisicao'
import TituloSecao from '../TituloSecao'

// seção com as missões cadastradas na API e o botão para cadastrar uma nova
function SecaoMissoes() {
  // listarMissoes é definida fora do componente, então já é estável
  const { dados: missoes, carregando, erro, recarregar } = useFetch(listarMissoes)

  // vazio só depois de carregar com sucesso; dados null na primeira carga não conta
  const vazio = !carregando && erro === null && missoes !== null && missoes.length === 0

  return (
    <section
      aria-label="Missões adicionadas"
      className="mx-auto w-full max-w-[1300px] px-[1.6rem] pb-[5rem] tablet:px-[3.2rem] tablet:pb-[6rem] desktop:px-[6.4rem] desktop:pb-[8rem]"
    >
      <TituloSecao titulo="Missões adicionadas" />

      <p className="mx-auto mb-[2.4rem] w-full max-w-[70rem] text-center font-texto text-[1.5rem] leading-[1.7] text-text-dark tablet:mb-[3.2rem] tablet:text-[1.6rem] desktop:text-corpo-grande">
        Na SoulUp já existem missões, porém queremos adicionar novas missões que incentivem o uso
        do transporte público.
      </p>

      <div className="mb-[2.4rem] text-center tablet:mb-[3.2rem]">
        <BotaoPrimario to="/missoes/nova">Cadastrar nova missão</BotaoPrimario>
      </div>

      <EstadoRequisicao
        carregando={carregando}
        erro={erro}
        vazio={vazio}
        aoTentarNovamente={recarregar}
        textoCarregando="Carregando missões..."
        mensagemVazio="Nenhuma missão cadastrada por enquanto."
      >
        <div className="flex flex-col items-center justify-center gap-[2rem] tablet:gap-[2.4rem] desktop:flex-row desktop:flex-wrap desktop:items-stretch desktop:gap-[2.8rem]">
          {missoes?.map((missao) => (
            <CartaoMissao key={missao.id} missao={missao} />
          ))}
        </div>
      </EstadoRequisicao>
    </section>
  )
}

export default SecaoMissoes
