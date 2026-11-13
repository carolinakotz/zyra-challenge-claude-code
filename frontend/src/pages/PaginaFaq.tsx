import CabecalhoPagina from '../components/CabecalhoPagina'
import ListaFaq from '../components/ListaFaq'

// página com uma seção só, como no projeto original: título e o acordeão de perguntas
function PaginaFaq() {
  return (
    <section
      aria-label="Perguntas frequentes"
      className="mx-auto w-full max-w-[1300px] px-[1.6rem] pt-[4rem] pb-[5.6rem] mobile-lg:px-[2.4rem] mobile-lg:pt-[5.6rem] mobile-lg:pb-[6.4rem] tablet:px-[4rem] tablet:pt-[7.2rem] tablet:pb-[8rem] desktop:px-[6.4rem] desktop:pt-[6.4rem] desktop:pb-[8rem]"
    >
      <CabecalhoPagina titulo="Perguntas Frequentes" />
      <ListaFaq />
    </section>
  )
}

export default PaginaFaq
