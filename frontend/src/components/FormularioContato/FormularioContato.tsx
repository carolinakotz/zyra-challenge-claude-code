import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { DadosContato, StatusEnvio } from '../../types/contato'
import CampoTexto from '../CampoTexto'
import CampoTextarea from '../CampoTextarea'
import MensagemRetorno from '../MensagemRetorno'

// letras (com acento) separadas por espaço, hífen ou apóstrofo
const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// (11) 91234-5678 ou (11) 1234-5678, com ou sem espaço depois do DDD
const REGEX_TELEFONE = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/

// tempo que a mensagem de sucesso ou erro fica na tela
const TEMPO_MENSAGEM_MS = 5000

// remove espaços nas pontas antes de validar e de enviar
const removerEspacos = (valor: string) => valor.trim()

// a API não tem endpoint de contato, então o envio é simulado (igual ao projeto original):
// só espera um pouco para o botão mostrar "Enviando..."; os dados não saem do navegador
function simularEnvio(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 800))
}

function FormularioContato() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DadosContato>()

  const [status, setStatus] = useState<StatusEnvio>(null)

  // esconde a mensagem depois de alguns segundos
  useEffect(() => {
    if (status === null) return

    const temporizador = setTimeout(() => setStatus(null), TEMPO_MENSAGEM_MS)
    return () => clearTimeout(temporizador)
  }, [status])

  async function aoEnviar() {
    try {
      await simularEnvio()
      setStatus('sucesso')
      reset()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <>
      {status && (
        <MensagemRetorno
          tipo={status}
          texto={
            status === 'sucesso'
              ? 'Mensagem enviada com sucesso! Em breve entraremos em contato.'
              : 'Não foi possível enviar sua mensagem. Tente novamente.'
          }
        />
      )}

      <form
        noValidate
        onSubmit={handleSubmit(aoEnviar)}
        className="flex flex-col gap-[2.4rem] mobile-lg:gap-[2.8rem] tablet:gap-[3.2rem]"
      >
        <div className="grid grid-cols-1 gap-[2rem] tablet:grid-cols-2 tablet:gap-[2.4rem]">
          <CampoTexto
            id="contato-nome"
            label="Nome"
            placeholder="Digite seu nome"
            autoComplete="given-name"
            register={register('nome', {
              setValueAs: removerEspacos,
              required: 'Informe seu nome.',
              minLength: { value: 2, message: 'Use pelo menos 2 caracteres.' },
              maxLength: { value: 50, message: 'Use no máximo 50 caracteres.' },
              pattern: { value: REGEX_NOME, message: 'Use apenas letras, espaço, hífen ou apóstrofo.' },
            })}
            erro={errors.nome?.message}
          />
          <CampoTexto
            id="contato-sobrenome"
            label="Sobrenome"
            placeholder="Digite seu sobrenome"
            autoComplete="family-name"
            register={register('sobrenome', {
              setValueAs: removerEspacos,
              required: 'Informe seu sobrenome.',
              minLength: { value: 2, message: 'Use pelo menos 2 caracteres.' },
              maxLength: { value: 80, message: 'Use no máximo 80 caracteres.' },
              pattern: { value: REGEX_NOME, message: 'Use apenas letras, espaço, hífen ou apóstrofo.' },
            })}
            erro={errors.sobrenome?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-[2rem] tablet:grid-cols-2 tablet:gap-[2.4rem]">
          <CampoTexto
            id="contato-email"
            label="Email"
            type="email"
            placeholder="Digite seu Email"
            autoComplete="email"
            register={register('email', {
              setValueAs: removerEspacos,
              required: 'Informe seu e-mail.',
              maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
              pattern: { value: REGEX_EMAIL, message: 'Informe um e-mail válido.' },
            })}
            erro={errors.email?.message}
          />
          <CampoTexto
            id="contato-telefone"
            label="Telefone"
            type="tel"
            placeholder="(11) 91234-5678"
            autoComplete="tel"
            register={register('telefone', {
              setValueAs: removerEspacos,
              required: 'Informe seu telefone.',
              pattern: { value: REGEX_TELEFONE, message: 'Use o formato (11) 91234-5678.' },
            })}
            erro={errors.telefone?.message}
          />
        </div>

        <CampoTextarea
          id="contato-mensagem"
          label="Mensagem"
          placeholder="Eu gostaria de saber mais sobre..."
          rows={6}
          register={register('mensagem', {
            setValueAs: removerEspacos,
            required: 'Escreva sua mensagem.',
            minLength: { value: 10, message: 'Use pelo menos 10 caracteres.' },
            maxLength: { value: 500, message: 'Use no máximo 500 caracteres.' },
          })}
          erro={errors.mensagem?.message}
        />

        <hr className="h-[1.5px] border-none bg-separator-light" aria-hidden="true" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-controle bg-card-green px-[2.4rem] py-[1.3rem] text-center font-texto text-[1.5rem] font-semibold text-title shadow-botao-verde transition-[background-color,transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-card-dark-green hover:text-text-light-yellow hover:shadow-botao-verde-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 mobile-lg:px-[3rem] mobile-lg:py-[1.4rem] mobile-lg:text-[1.6rem] tablet:px-[3.6rem] tablet:py-[1.5rem]"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </>
  )
}

export default FormularioContato
