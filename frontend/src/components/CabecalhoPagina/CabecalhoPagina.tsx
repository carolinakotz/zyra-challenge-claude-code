interface CabecalhoPaginaProps {
  titulo: string
  descricao?: string
}

// título centralizado de páginas com uma seção só (ex.: Integrantes), com traço e descrição opcional
function CabecalhoPagina({ titulo, descricao }: CabecalhoPaginaProps) {
  return (
    <div className={`text-center ${descricao ? 'mb-[4rem]' : 'mb-[5.2rem]'}`}>
      {/* leading-[1.6]: o text-subtitulo do Zyra tem altura de linha 1.3; o original herdava 1.6 do body */}
      <h1 className="mb-[1.2rem] font-titulo text-subtitulo leading-[1.6] font-bold text-title">{titulo}</h1>
      <div className="mx-auto h-[0.2rem] w-[8rem] bg-separator-dark" aria-hidden="true" />
      {descricao && (
        <p className="mx-auto mt-[2rem] max-w-[70rem] font-texto text-corpo-grande leading-[1.7] text-text-dark">
          {descricao}
        </p>
      )}
    </div>
  )
}

export default CabecalhoPagina
