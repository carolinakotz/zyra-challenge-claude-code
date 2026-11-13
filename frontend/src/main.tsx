import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import PaginaInicio from './pages/PaginaInicio'
import PaginaMissoes from './pages/PaginaMissoes'
import PaginaCadastroMissao from './pages/PaginaCadastroMissao'
import PaginaDetalheMissao from './pages/PaginaDetalheMissao'
import PaginaEdicaoMissao from './pages/PaginaEdicaoMissao'
import PaginaErro from './pages/PaginaErro'

// App é o layout (cabeçalho + rodapé); as rotas filhas aparecem no <Outlet /> dele
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // mostrado no lugar de App quando a rota não existe ou uma página lança erro
    errorElement: <PaginaErro />,
    children: [
      { index: true, element: <PaginaInicio /> },
      { path: 'missoes', element: <PaginaMissoes /> },
      // "nova" é texto fixo, então tem prioridade sobre ":id"
      { path: 'missoes/nova', element: <PaginaCadastroMissao /> },
      { path: 'missoes/:id', element: <PaginaDetalheMissao /> },
      { path: 'missoes/:id/editar', element: <PaginaEdicaoMissao /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
