import CabecalhoPagina from '../components/CabecalhoPagina'
import CardMembro from '../components/CardMembro'
import { integrantes } from '../data/integrantes'

// página com uma seção só, como no projeto original: título e os cards da equipe
function PaginaIntegrantes() {
  return (
    <section
      aria-label="Integrantes da equipe"
      className="mx-auto max-w-[1300px] p-[2.4rem_1.6rem_5.2rem] tablet:p-[6.4rem_6.4rem_8rem]"
    >
      <CabecalhoPagina titulo="Integrantes:" />

      <div className="flex flex-wrap items-stretch justify-center gap-[1.6rem] tablet:gap-[2.8rem]">
        {integrantes.map((integrante) => (
          <CardMembro key={integrante.id} integrante={integrante} />
        ))}
      </div>
    </section>
  )
}

export default PaginaIntegrantes
