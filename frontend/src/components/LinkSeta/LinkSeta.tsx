import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface LinkSetaProps {
  to: string
  children: ReactNode
}

// link de texto com uma seta que desliza para a direita no hover
function LinkSeta({ to, children }: LinkSetaProps) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-[0.8rem] text-[1.3rem] font-medium text-text-dark transition-colors duration-200 hover:text-hover"
    >
      <span
        aria-hidden="true"
        className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[6px]"
      >
        →
      </span>
      {children}
    </Link>
  )
}

export default LinkSeta
