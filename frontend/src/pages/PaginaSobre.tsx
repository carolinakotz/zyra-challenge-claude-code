import HeroSobre from '../components/HeroSobre'
import SecaoAppPrint from '../components/SecaoAppPrint'
import SecaoDetalhes from '../components/SecaoDetalhes'
import SecaoPassos from '../components/SecaoPassos'
import Separador from '../components/Separador'

// cada seção controla a própria largura e os próprios espaçamentos, como no projeto original
function PaginaSobre() {
  return (
    <>
      <HeroSobre />
      <Separador />
      <SecaoDetalhes />
      <Separador />
      <SecaoPassos />
      <Separador />
      {/* sem props: usa o título padrão "A funcionalidade no aplicativo", como no original */}
      <SecaoAppPrint />
    </>
  )
}

export default PaginaSobre
