import { passosConversao } from '../../data/passosConversao'
import PassoConversao from '../PassoConversao'

// card verde-escuro com o cabeçalho "Como fazer?" e a lista numerada de passos
function ComoFazer() {
  return (
    <div className="card-shape-alt mx-auto max-w-[70rem] overflow-hidden bg-card-dark-green shadow-calculadora">
      <div className="flex items-center gap-[1rem] border-b border-vidro-borda p-[2rem_3.2rem]">
        <p className="font-texto text-[1.8rem] font-bold text-text-light-yellow">Como fazer?</p>
      </div>

      <ul className="relative">
        {passosConversao.map((passo, indice) => (
          <PassoConversao key={passo.id} passo={passo} numero={indice + 1} />
        ))}
      </ul>
    </div>
  )
}

export default ComoFazer
