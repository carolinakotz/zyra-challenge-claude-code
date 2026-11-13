import { Outlet } from 'react-router'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'

// layout comum a todas as páginas: o Outlet é trocado pela página da rota atual
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />
      {/* sem largura nem padding aqui: cada página define os seus, como no projeto original */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}

export default App
