import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface BotaoPrimarioProps {
  to: string
  children: ReactNode
  className?: string
}

// link com cara de botão rosa; cresce um pouco no hover
function BotaoPrimario({ to, children, className = '' }: BotaoPrimarioProps) {
  return (
    <Link
      to={to}
      className={`inline-block rounded-lg bg-button-pink px-[3.6rem] py-[1.4rem] text-center text-[1.6rem] font-semibold text-white shadow-botao transition-[transform,box-shadow] duration-300 hover:scale-[1.06] hover:shadow-botao-hover ${className}`}
    >
      {children}
    </Link>
  )
}

export default BotaoPrimario
