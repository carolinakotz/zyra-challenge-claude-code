import { useLocation } from 'react-router'
import HeroMissoes from '../components/HeroMissoes'
import MensagemRetorno from '../components/MensagemRetorno'
import SecaoAppPrint from '../components/SecaoAppPrint'
import SecaoCalculadora from '../components/SecaoCalculadora'
import SecaoConquistas from '../components/SecaoConquistas'
import SecaoMissoes from '../components/SecaoMissoes'
import Separador from '../components/Separador'

// formato do state que as telas de cadastro/edição/exclusão mandam ao voltar para cá
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

// cada seção controla a própria largura e os próprios espaçamentos, como no projeto original
function PaginaMissoes() {
  const location = useLocation()
  const mensagemSucesso = temMensagemSucesso(location.state) ? location.state.mensagemSucesso : null

  return (
    <>
      <HeroMissoes />
      {mensagemSucesso && (
        <div className="px-[1.6rem] pt-[2.4rem] tablet:px-[3.2rem]">
          <MensagemRetorno tipo="sucesso" texto={mensagemSucesso} />
        </div>
      )}
      <Separador />
      <SecaoMissoes />
      <Separador />
      <SecaoConquistas />
      <Separador />
      <SecaoCalculadora />
      <Separador />
      <SecaoAppPrint ariaLabel="Imagem do aplicativo com as missões" titulo="As missões no aplicativo" />
    </>
  )
}

export default PaginaMissoes
