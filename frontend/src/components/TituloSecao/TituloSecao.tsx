interface TituloSecaoProps {
  titulo: string
  nivel?: 'h1' | 'h2'
}

// título centralizado com um traço embaixo, usado no topo de cada seção
function TituloSecao({ titulo, nivel = 'h2' }: TituloSecaoProps) {
  const Titulo = nivel

  return (
    <>
      {/* leading-[1.6]: o text-subtitulo do Zyra tem altura de linha 1.3; o original herdava 1.6 do body */}
      <Titulo className="mb-[1rem] text-center font-texto text-subtitulo leading-[1.6] font-medium text-title">
        {titulo}
      </Titulo>
      <div className="mx-auto mb-[5.2rem] h-[0.2rem] w-[8rem] bg-separator-dark" aria-hidden="true" />
    </>
  )
}

export default TituloSecao
