import { useLocation } from 'react-router'
import HeroMissoes from '../components/HeroMissoes'
import MensagemRetorno from '../components/MensagemRetorno'
import SecaoAppPrint from '../components/SecaoAppPrint'
import SecaoCalculadora from '../components/SecaoCalculadora'
import SecaoConquistas from '../components/SecaoConquistas'
import SecaoMissoes from '../components/SecaoMissoes'
import Separador from '../components/Separador'
import { ehAvisoNavegacao } from '../types/navegacao'

// cada seção controla a própria largura e os próprios espaçamentos, como no projeto original
function PaginaMissoes() {
  // aviso mandado por outra tela (missão cadastrada, editada, excluída ou não encontrada)
  const location = useLocation()
  const aviso = ehAvisoNavegacao(location.state) ? location.state : null

  return (
    <>
      <HeroMissoes />
      {aviso && (
        <div className="px-[1.6rem] pt-[2.4rem] tablet:px-[3.2rem]">
          <MensagemRetorno tipo={aviso.tipo} texto={aviso.mensagem} />
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
