import ComoFazer from '../ComoFazer'
import TituloSecao from '../TituloSecao'

// seção com o passo a passo para converter pontos em saldo
function SecaoPassos() {
  return (
    <section
      aria-label="Passo a passo da funcionalidade"
      className="mx-auto w-full max-w-[1300px] px-[1.6rem] pb-[5rem] tablet:px-[3.2rem] tablet:pb-[6rem] desktop:px-[6.4rem] desktop:pb-[8rem]"
    >
      <TituloSecao titulo="Passo a passo" />
      <ComoFazer />
    </section>
  )
}

export default SecaoPassos
