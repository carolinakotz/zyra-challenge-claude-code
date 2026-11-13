import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface LinkVoltarProps {
  // rota de destino (ex.: "/missoes")
  para: string
  // texto do link (ex.: "Voltar para a lista")
  children: ReactNode
}

// link de volta com seta, no estilo de link do Zyra
function LinkVoltar({ para, children }: LinkVoltarProps) {
  return (
    <Link
      to={para}
      className="inline-flex items-center gap-2 self-start rounded-controle text-brand hover:text-hover hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <i className="fa-solid fa-arrow-left" aria-hidden="true" />
      {children}
    </Link>
  )
}

export default LinkVoltar
