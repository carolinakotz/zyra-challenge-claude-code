import { NavLink } from 'react-router'
import type { LinkNavegacao } from '../../types/navegacao'

interface ColunaRodape {
  titulo: string
  links: LinkNavegacao[]
}

const COLUNAS_RODAPE: ColunaRodape[] = [
  {
    titulo: 'Projeto:',
    links: [
      { caminho: '/', rotulo: 'Início' },
      { caminho: '/sobre', rotulo: 'Sobre' },
      { caminho: '/missoes', rotulo: 'Missões' },
      { caminho: '/faq', rotulo: 'FAQ' },
    ],
  },
  {
    titulo: 'Equipe:',
    links: [
      { caminho: '/integrantes', rotulo: 'Integrantes' },
      { caminho: '/contato', rotulo: 'Contato' },
    ],
  },
]

// obs.: os espaçamentos vêm do projeto original em rem fixo (ex.: gap-[2rem]), porque o --spacing
// do Zyra é diferente do padrão do Tailwind usado lá

// rodapé: logo claro e duas colunas de links; centralizado no celular, em linha a partir do tablet
function Rodape() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-[2rem] bg-footer px-[1.5rem] py-[2.5rem] text-center text-text-light-yellow mobile-lg:px-[2rem] tablet:flex-row tablet:items-start tablet:justify-center tablet:gap-[2.5rem] tablet:text-left desktop:justify-start desktop:gap-[8rem] desktop:px-[6rem]">
      <img src="/img/zyra-inv.png" alt="Logo Zyra" className="h-[4rem] w-auto mobile-lg:h-[4.4rem] desktop:h-[5rem]" />

      <nav aria-label="Navegação do rodapé" className="flex flex-wrap justify-center gap-[2.5rem] desktop:gap-[6rem]">
        {COLUNAS_RODAPE.map((coluna) => (
          <div key={coluna.titulo} className="flex min-w-[12rem] flex-col items-center gap-[0.75rem] tablet:items-start">
            {/* font-texto: no Zyra os títulos usam Merriweather por padrão; o original usa Lato aqui */}
            <h2 className="font-texto text-[1.5rem] font-extrabold text-text-light-yellow">{coluna.titulo}</h2>
            <ul className="flex flex-col items-center gap-[0.5rem] tablet:items-start">
              {coluna.links.map((link) => (
                <li key={link.caminho}>
                  <NavLink
                    to={link.caminho}
                    className="text-[1.2rem] font-normal text-text-light-yellow transition-colors duration-200 hover:text-hover"
                  >
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </footer>
  )
}

export default Rodape
