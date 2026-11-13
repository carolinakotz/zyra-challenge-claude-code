import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

// layout comum a todas as páginas: o Outlet é trocado pela página da rota atual
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />
      <main className="mx-auto w-full max-w-conteudo flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}

export default App
