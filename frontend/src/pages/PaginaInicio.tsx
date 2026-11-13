import HeroInicio from '../components/HeroInicio'
import SecaoDestaques from '../components/SecaoDestaques'
import Separador from '../components/Separador'

// cada seção controla a própria largura e os próprios espaçamentos, como no projeto original
function PaginaInicio() {
  return (
    <>
      <HeroInicio />
      <Separador />
      <SecaoDestaques />
    </>
  )
}

export default PaginaInicio
