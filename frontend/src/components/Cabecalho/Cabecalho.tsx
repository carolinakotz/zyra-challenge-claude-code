import { Link, NavLink } from 'react-router'

// classes do item da navegação; o item da rota atual fica destacado
function classesItem({ isActive }: { isActive: boolean }) {
  const base =
    'rounded-full px-4 py-2 text-text-light-yellow transition-colors duration-150 motion-reduce:transition-none hover:bg-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-destaque-rosa'
  return isActive ? `${base} bg-hover` : base
}

function Cabecalho() {
  return (
    <header className="bg-nav">
      <div className="mx-auto flex max-w-conteudo flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          className="rounded-controle font-titulo text-subtitulo font-black text-text-light-yellow focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-destaque-rosa"
        >
          Zyra
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex gap-2">
            <li>
              {/* end: só fica ativo exatamente em "/", não em toda rota que começa com "/" */}
              <NavLink to="/" end className={classesItem}>
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/sobre" className={classesItem}>
                Sobre
              </NavLink>
            </li>
            <li>
              {/* sem end: continua ativo em /missoes/nova, /missoes/7 etc. */}
              <NavLink to="/missoes" className={classesItem}>
                Missões
              </NavLink>
            </li>
            <li>
              <NavLink to="/integrantes" className={classesItem}>
                Integrantes
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Cabecalho
