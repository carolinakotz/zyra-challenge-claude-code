import { useCallback } from 'react'
import { useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { buscarMissao } from '../services/missaoService'
import EstadoRequisicao from '../components/EstadoRequisicao'
import AlertaSemRepeticao from '../components/AlertaSemRepeticao'
import FormularioMissao from '../components/FormularioMissao'
import LinkVoltar from '../components/LinkVoltar'
import { converterId } from '../utils/converterId'

const voltarParaLista = <LinkVoltar para="/missoes">Voltar para a lista</LinkVoltar>

// só é montado com id válido, então a API nunca é chamada com id inválido
function EdicaoMissao({ id }: { id: number }) {
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
      <h1 className="text-subtitulo font-bold tablet:text-hero">Editar missão</h1>
      {/* uma edição nunca fica "vazia": o componente só cuida de carregando e erro */}
      <EstadoRequisicao
        carregando={carregando}
        erro={erro}
        vazio={false}
        mensagemVazio=""
        aoTentarNovamente={recarregar}
        textoCarregando="Carregando missão…"
      >
        {/* o formulário só monta com a missão carregada, para já nascer preenchido */}
        {dados && <FormularioMissao modo="edicao" missao={dados} />}
      </EstadoRequisicao>
    </div>
  )
}

function PaginaEdicaoMissao() {
  const { id } = useParams()
  const idNumero = converterId(id)

  if (idNumero === null) {
    return <AlertaSemRepeticao mensagem="Endereço de missão inválido." acao={voltarParaLista} />
  }

  return <EdicaoMissao id={idNumero} />
}

export default PaginaEdicaoMissao
