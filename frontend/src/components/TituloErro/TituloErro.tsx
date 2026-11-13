interface TituloErroProps {
  codigo: string
}

// código do erro em destaque (ex.: "404"); decorativo, o título da página explica o erro
function TituloErro({ codigo }: TituloErroProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        aria-hidden="true"
        className="font-titulo text-[6rem] leading-none font-black text-brand mobile-lg:text-[7.5rem] tablet:text-[9.5rem] desktop:text-[11rem]"
      >
        {codigo}
      </span>
    </div>
  )
}

export default TituloErro
