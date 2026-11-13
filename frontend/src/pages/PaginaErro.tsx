import { Link } from 'react-router'

function PaginaErro() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-subtitulo font-bold tablet:text-hero">Ops! Algo deu errado.</h1>
      <Link
        to="/"
        className="self-start rounded-controle text-corpo text-brand hover:text-hover hover:underline focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none"
      >
        Voltar ao início
      </Link>
    </div>
  )
}

export default PaginaErro
