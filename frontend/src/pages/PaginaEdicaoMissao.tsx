import { useCallback } from 'react'
import { Navigate, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { buscarMissao } from '../services/missaoService'
import CabecalhoPagina from '../components/CabecalhoPagina'
import EstadoRequisicao from '../components/EstadoRequisicao'
import FormularioMissao from '../components/FormularioMissao'
import { converterId } from '../utils/converterId'
import { avisoMissaoNaoEncontrada } from '../utils/avisoMissaoNaoEncontrada'

// só é montado com id válido, então a API nunca é chamada com id inválido
function EdicaoMissao({ id }: { id: number }) {
  // useCallback: a mesma função entre renderizações, nova só quando o id muda
  // (sem isso o useFetch entraria em loop de requisições)
  const busca = useCallback((sinal: AbortSignal) => buscarMissao(id, sinal), [id])
  const { dados, carregando, erro, recarregar } = useFetch(busca)

  // missão inexistente: volta para a lista com o aviso, como no projeto original
  if (erro?.status === 404) {
    return <Navigate to="/missoes" replace state={avisoMissaoNaoEncontrada(String(id))} />
  }

  // carregando e erro aparecem sozinhos; o título e o formulário só com a missão carregada
  return (
    <EstadoRequisicao
      carregando={carregando}
      erro={erro}
      vazio={false}
      mensagemVazio=""
      aoTentarNovamente={recarregar}
      textoCarregando="Carregando missão..."
    >
      {dados && (
        <section
          aria-label="Editar missão"
          className="mx-auto max-w-[1300px] p-[3.2rem_1.6rem_5.2rem] mobile-lg:p-[4.8rem_2.4rem_6.4rem] tablet:p-[5.6rem_4rem_7.2rem] desktop:p-[6.4rem_6.4rem_8rem]"
        >
          <CabecalhoPagina titulo="Editar missão:" descricao="Altere o nome ou o requisito da missão." />
          {/* o formulário só monta com a missão carregada, para já nascer preenchido */}
          <FormularioMissao modo="edicao" missao={dados} />
        </section>
      )}
    </EstadoRequisicao>
  )
}

function PaginaEdicaoMissao() {
  const { id } = useParams()
  const idNumero = converterId(id)

  // endereço com id inválido (ex.: /missoes/abc/editar): trata como missão não encontrada
  if (idNumero === null) {
    return <Navigate to="/missoes" replace state={avisoMissaoNaoEncontrada(id)} />
  }

  return <EdicaoMissao id={idNumero} />
}

export default PaginaEdicaoMissao
