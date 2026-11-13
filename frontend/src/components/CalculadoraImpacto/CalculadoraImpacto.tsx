import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CardResultadoCalculo from '../CardResultadoCalculo'

// kg de CO₂ emitidos por km rodado
const FATOR_CARRO_KG_KM = 0.12
const FATOR_METRO_KG_KM = 0.006

interface DadosCalculadora {
  km: number
}

interface ResultadoCalculo {
  km: number
  carro: number
  metro: number
  evitado: number
}

function formatarKm(valor: number): string {
  return valor.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

function formatarKg(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// compara o CO₂ de uma viagem de carro com a mesma viagem de metrô/trem
function CalculadoraImpacto() {
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosCalculadora>()

  function calcularImpacto({ km }: DadosCalculadora) {
    setResultado({
      km,
      carro: km * FATOR_CARRO_KG_KM,
      metro: km * FATOR_METRO_KG_KM,
      evitado: km * (FATOR_CARRO_KG_KM - FATOR_METRO_KG_KM),
    })
  }

  return (
    <div className="card-shape-alt mx-auto max-w-[80rem] bg-card-dark-green p-[4rem_4.8rem] shadow-calculadora">
      <h3 className="mb-[0.8rem] flex items-center justify-center gap-[1rem] font-texto text-[2rem] font-bold text-text-light-yellow">
        <i className="fa-solid fa-leaf" aria-hidden="true" />
        Quanto CO₂ você evitou hoje?
      </h3>
      <p className="mb-[3.2rem] text-center font-texto text-[1.4rem] leading-[1.6] text-card-green">
        Compare a emissão de CO₂ entre andar de carro e de metrô/trem.
        <br />
        Descubra o impacto real da sua escolha sustentável.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit(calcularImpacto)}
        className="mb-[3.2rem] flex flex-wrap items-center justify-center gap-[1.2rem]"
      >
        <label className="font-texto text-[1.5rem] font-bold text-text-light-yellow" htmlFor="calc-km">
          Quilômetros percorridos:
        </label>
        <input
          id="calc-km"
          type="number"
          step="any"
          placeholder="0"
          aria-invalid={Boolean(errors.km)}
          aria-describedby={errors.km ? 'erro-calc-km' : undefined}
          {...register('km', {
            valueAsNumber: true,
            required: 'Informe a distância percorrida.',
            validate: (valor) => Number.isFinite(valor) || 'Digite um número válido.',
            min: { value: 1, message: 'Informe pelo menos 1 km.' },
            max: { value: 999, message: 'O máximo permitido é 999 km.' },
          })}
          className="w-[10rem] [appearance:textfield] rounded-controle border-2 border-card-green bg-vidro-campo p-[1rem_1.4rem] text-center font-texto text-[1.8rem] font-bold text-text-light-yellow outline-none transition-colors duration-200 focus:border-text-light-yellow [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="font-texto text-[1.5rem] text-card-green">km</span>
        <button
          type="submit"
          aria-label="Calcular impacto ambiental"
          className="rounded-controle bg-button-pink p-[1rem_2.8rem] font-texto text-[1.5rem] font-semibold text-white shadow-botao-forte transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-botao-forte-hover"
        >
          Calcular
        </button>
        {errors.km && (
          <small id="erro-calc-km" role="alert" className="basis-full text-center font-texto text-[1.3rem] text-erro-claro">
            {errors.km.message}
          </small>
        )}
      </form>

      <div aria-live="polite" className="mb-[2.4rem] flex flex-wrap justify-center gap-[1.6rem]">
        <CardResultadoCalculo
          icone="fa-solid fa-car"
          rotulo="De carro"
          valor={resultado ? formatarKg(resultado.carro) : null}
        />
        <CardResultadoCalculo
          icone="fa-solid fa-train-subway"
          rotulo="De metrô"
          valor={resultado ? formatarKg(resultado.metro) : null}
        />
        <CardResultadoCalculo
          icone="fa-solid fa-circle-check"
          rotulo="CO₂ evitado"
          valor={resultado ? formatarKg(resultado.evitado) : null}
          destaque
        />
      </div>

      {resultado && (
        <p
          aria-live="polite"
          className="rounded-controle bg-vidro-resumo p-[1.6rem_2rem] text-center font-texto text-[1.4rem] leading-[1.7] text-card-green"
        >
          Ao percorrer <strong className="font-bold text-text-light-yellow">{formatarKm(resultado.km)} km</strong> de
          metrô em vez de carro, você evitou{' '}
          <strong className="font-bold text-text-light-yellow">{formatarKg(resultado.evitado)} kg de CO₂</strong>.{' '}
          <i className="fa-solid fa-leaf" aria-hidden="true" />
        </p>
      )}
    </div>
  )
}

export default CalculadoraImpacto
