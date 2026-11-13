interface CardResultadoCalculoProps {
  icone: string
  rotulo: string
  // null antes do primeiro cálculo: mostra um traço no lugar do número
  valor: string | null
  destaque?: boolean
}

// um dos três resultados da calculadora (carro, metrô, CO₂ evitado)
function CardResultadoCalculo({ icone, rotulo, valor, destaque = false }: CardResultadoCalculoProps) {
  const corTexto = destaque ? 'text-destaque-rosa' : 'text-card-green'
  const fundo = destaque
    ? 'border-rosa-translucido-borda bg-rosa-translucido'
    : 'border-vidro-borda bg-vidro-cartao'

  return (
    <div
      className={`flex max-w-[22rem] min-w-[15rem] flex-1 flex-col items-center gap-[0.8rem] rounded-[1.2rem_0.4rem_1.2rem_0.4rem] border p-[2rem_2.4rem] text-center ${fundo}`}
    >
      <i className={`${icone} text-[2.4rem] ${corTexto}`} aria-hidden="true" />
      <p className={`font-texto text-[1.2rem] font-semibold tracking-[0.08em] uppercase ${corTexto}`}>{rotulo}</p>
      <p className="font-titulo text-[2.8rem] leading-none font-black text-text-light-yellow">{valor ?? '—'}</p>
      <p className={`font-texto text-[1.2rem] ${corTexto}`}>kg de CO₂</p>
    </div>
  )
}

export default CardResultadoCalculo
