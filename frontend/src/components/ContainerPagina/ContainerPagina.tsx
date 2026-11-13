import { Outlet } from 'react-router'

// layout de rota: centraliza a página e limita a largura a max-w-conteudo
// usado pelas páginas que ainda não seguem o design original (a de Missões controla a própria largura)
function ContainerPagina() {
  return (
    <div className="mx-auto w-full max-w-conteudo px-4 py-8">
      <Outlet />
    </div>
  )
}

export default ContainerPagina
