import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErroApi } from '../../services/api'
import { atualizarMissao, cadastrarMissao } from '../../services/missaoService'
import type { MissaoEntradaDTO, MissaoSaidaDTO } from '../../types/missao'
import type { AvisoNavegacao } from '../../types/navegacao'

// no cadastro não existe missão ainda; na edição a página já buscou e passa a missão pronta
type FormularioMissaoProps = { modo: 'cadastro' } | { modo: 'edicao'; missao: MissaoSaidaDTO }

interface ValoresFormulario {
  nomeMissao: string
  requisito: string
  // só usado no cadastro
  pontos: number
}

// mesmo valor de MissaoBO.PONTOS_PADRAO no backend
const PONTOS_PADRAO = 20

// mesmas regras do MissaoEntradaDTO (backend), contando o tamanho sem os espaços das pontas
function validarTexto(min: number, max: number, mensagemVazio: string, mensagemTamanho: string) {
  return (valor: string) => {
    const texto = valor.trim()
    if (texto === '') return mensagemVazio
    if (texto.length < min || texto.length > max) return mensagemTamanho
    return true
  }
}

function classesCampo(temErro: boolean) {
  const borda = temErro
    ? 'border-erro focus-visible:ring-erro'
    : 'border-separator-dark focus-visible:ring-brand'
  return `w-full rounded-controle border bg-card-light-yellow px-4 py-3 text-text-dark focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${borda}`
}

// mensagem de validação logo abaixo do campo; o id liga a mensagem ao campo (aria-describedby)
function MensagemCampo({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null
  return (
    <p id={id} role="alert" className="text-pequeno text-erro-texto">
      {mensagem}
    </p>
  )
}

function FormularioMissao(props: FormularioMissaoProps) {
  const navigate = useNavigate()
  // erro devolvido pela API no último envio (fica acima do formulário)
  const [erroApi, setErroApi] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValoresFormulario>({
    // na edição a missão já chegou antes do formulário montar, então os valores entram direto
    defaultValues:
      props.modo === 'edicao'
        ? {
            nomeMissao: props.missao.nomeMissao,
            requisito: props.missao.requisito,
            pontos: PONTOS_PADRAO,
          }
        : { nomeMissao: '', requisito: '', pontos: PONTOS_PADRAO },
  })

  // só é chamado se todos os campos passarem na validação;
  // enquanto a Promise não termina, isSubmitting fica true e o botão fica desabilitado
  async function enviar(valores: ValoresFormulario) {
    // limpa o erro do envio anterior antes de tentar de novo
    setErroApi(null)

    // manda sem os espaços das pontas, igual ao que o backend grava
    const dados: MissaoEntradaDTO = {
      nomeMissao: valores.nomeMissao.trim(),
      requisito: valores.requisito.trim(),
    }

    let aviso: AvisoNavegacao
    try {
      if (props.modo === 'cadastro') {
        const criada = await cadastrarMissao(dados, valores.pontos)
        aviso = { mensagem: `Missão "${criada.nomeMissao}" cadastrada com sucesso!`, tipo: 'sucesso' }
      } else {
        const atualizada = await atualizarMissao(props.missao.id, dados)
        aviso = { mensagem: `Missão "${atualizada.nomeMissao}" atualizada com sucesso!`, tipo: 'sucesso' }
      }
    } catch (e) {
      setErroApi(e instanceof ErroApi ? e.message : 'Ocorreu um erro inesperado.')
      return
    }

    // a lista lê o aviso do location.state e mostra a mensagem no topo
    navigate('/missoes', { state: aviso })
  }

  const textoBotao =
    props.modo === 'cadastro'
      ? isSubmitting
        ? 'Cadastrando…'
        : 'Cadastrar missão'
      : isSubmitting
        ? 'Salvando…'
        : 'Salvar alterações'

  return (
    <div className="flex max-w-texto flex-col gap-6">
      {erroApi && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-cartao border border-erro-borda bg-erro-fundo p-4 text-erro-texto"
        >
          <i className="fa-solid fa-circle-exclamation mt-1" aria-hidden="true" />
          <span>{erroApi}</span>
        </p>
      )}

      {/* noValidate: a validação é do React Hook Form, não a do navegador */}
      <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="campo-nome" className="font-bold text-title">
            Nome
          </label>
          <input
            id="campo-nome"
            type="text"
            aria-invalid={errors.nomeMissao ? 'true' : 'false'}
            aria-describedby={errors.nomeMissao ? 'campo-nome-erro' : undefined}
            className={classesCampo(!!errors.nomeMissao)}
            {...register('nomeMissao', {
              validate: validarTexto(
                3,
                100,
                'Informe o nome da missão.',
                'O nome da missão deve ter entre 3 e 100 caracteres.',
              ),
            })}
          />
          <MensagemCampo id="campo-nome-erro" mensagem={errors.nomeMissao?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="campo-requisito" className="font-bold text-title">
            Requisito
          </label>
          <textarea
            id="campo-requisito"
            rows={4}
            aria-invalid={errors.requisito ? 'true' : 'false'}
            aria-describedby={errors.requisito ? 'campo-requisito-erro' : undefined}
            className={classesCampo(!!errors.requisito)}
            {...register('requisito', {
              validate: validarTexto(
                3,
                255,
                'Informe o requisito da missão.',
                'O requisito da missão deve ter entre 3 e 255 caracteres.',
              ),
            })}
          />
          <MensagemCampo id="campo-requisito-erro" mensagem={errors.requisito?.message} />
        </div>

        {/* pontos só no cadastro: a edição não mexe na conquista */}
        {props.modo === 'cadastro' && (
          <div className="flex flex-col gap-2">
            <label htmlFor="campo-pontos" className="font-bold text-title">
              Pontos da conquista
            </label>
            <input
              id="campo-pontos"
              type="number"
              min={1}
              step={1}
              inputMode="numeric"
              aria-invalid={errors.pontos ? 'true' : 'false'}
              aria-describedby={errors.pontos ? 'campo-pontos-erro' : undefined}
              className={`${classesCampo(!!errors.pontos)} mobile-lg:max-w-48`}
              {...register('pontos', {
                // converte para number; campo vazio vira NaN e cai na mensagem abaixo
                valueAsNumber: true,
                validate: (valor) =>
                  (Number.isInteger(valor) && valor > 0) ||
                  'Os pontos devem ser um número inteiro maior que zero.',
              })}
            />
            <MensagemCampo id="campo-pontos-erro" mensagem={errors.pontos?.message} />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start rounded-full bg-button-pink px-6 py-3 font-bold text-text-light-yellow transition-colors duration-150 enabled:hover:bg-brand focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:bg-card-gray disabled:text-separator-dark motion-reduce:transition-none"
        >
          {textoBotao}
        </button>
      </form>
    </div>
  )
}

export default FormularioMissao
