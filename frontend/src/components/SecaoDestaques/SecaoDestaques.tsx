import { destaques } from '../../data/destaques'
import CardDestaque from '../CardDestaque'
import LinkSeta from '../LinkSeta'

// seção com os três destaques do projeto e o link para saber mais
function SecaoDestaques() {
  return (
    <section
      aria-label="Destaques do projeto"
      className="mx-auto w-full max-w-[1300px] px-[2rem] pt-[1.6rem] pb-[5rem] mobile-lg:px-[3.2rem] tablet:px-[4.8rem] tablet:pb-[6.4rem] desktop:px-[6.4rem] desktop:pb-[8rem]"
    >
      {/* título próprio (não o TituloSecao): tamanho e traço mudam por breakpoint, como no original;
          leading-[1.6] porque o text-subtitulo do Zyra tem altura de linha 1.3 */}
      <h2 className="mb-[1rem] text-center font-texto text-[2.3rem] leading-[1.6] font-medium text-title tablet:text-[2.6rem] desktop:text-subtitulo">
        Destaques
      </h2>

      <div
        className="mx-auto mb-[3.6rem] h-[0.2rem] w-[8rem] bg-separator-dark tablet:mb-[4.4rem] tablet:w-[9rem] desktop:mb-[5.2rem] desktop:w-[10rem]"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-[2.4rem] tablet:grid-cols-2 tablet:gap-[2.8rem] desktop:grid-cols-3">
        {destaques.map((destaque) => (
          <CardDestaque key={destaque.id} destaque={destaque} />
        ))}
      </div>

      <div className="mt-[3rem] flex justify-center tablet:justify-end desktop:mt-[3.6rem]">
        <LinkSeta to="/sobre">Saiba mais</LinkSeta>
      </div>
    </section>
  )
}

export default SecaoDestaques
