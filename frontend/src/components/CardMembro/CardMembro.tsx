import type { Integrante } from '../../types/integrante'

interface CardMembroProps {
  integrante: Integrante
}

// mesmas classes nos dois links (GitHub e LinkedIn)
const CLASSES_LINK =
  'inline-flex items-center justify-center text-[2.5rem] text-icon transition-[color,transform] duration-200 hover:scale-[1.2] hover:text-hover'

// card de um integrante: foto, nome, RM, turma e links; em coluna no celular e em linha a partir do tablet
function CardMembro({ integrante }: CardMembroProps) {
  return (
    <article className="flex w-full flex-col items-center gap-[1.6rem] rounded-[3rem_0.5rem_3rem_0.5rem] bg-card-green p-[2rem_1.6rem] text-center shadow-membro transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-membro-hover tablet:w-auto tablet:max-w-[52rem] tablet:min-w-[28rem] tablet:flex-[1_1_40%] tablet:flex-row tablet:gap-[2.4rem] tablet:rounded-[5rem_0.7rem_5rem_0.7rem] tablet:p-[2.4rem_2.8rem] tablet:text-left">
      <img
        className="h-[9rem] w-[9rem] shrink-0 rounded-full bg-card-dark-green object-cover"
        src={integrante.foto}
        alt={integrante.fotoAlt}
      />
      <div className="flex flex-col items-center gap-[0.3rem] tablet:items-start">
        <h2 className="font-texto text-[1.6rem] leading-[1.3] font-bold text-title">{integrante.nome}</h2>
        <p className="font-texto text-[1.4rem] text-text-dark">RM: {integrante.rm}</p>
        <p className="font-texto text-[1.4rem] text-text-dark">Turma: {integrante.turma}</p>
        <div
          className="mt-[0.8rem] flex justify-center gap-[1.2rem] tablet:justify-start"
          aria-label={`Links de ${integrante.nome}`}
        >
          <a
            className={CLASSES_LINK}
            href={integrante.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub de ${integrante.nome}`}
          >
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          <a
            className={CLASSES_LINK}
            href={integrante.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${integrante.nome}`}
          >
            <i className="fa-brands fa-linkedin" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default CardMembro
