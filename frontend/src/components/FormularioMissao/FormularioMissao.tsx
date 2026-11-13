import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErroApi } from '../../services/api'
import { atualizarMissao, cadastrarMissao } from '../../services/missaoService'
import type { MissaoEntradaDTO, MissaoSaidaDTO } from '../../types/missao'
import type { AvisoNavegacao } from '../../types/navegacao'
import CampoTexto from '../CampoTexto'
import CampoTextarea from '../CampoTextarea'
import MensagemRetorno from '../MensagemRetorno'

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

// remove espaços nas pontas antes de validar e de enviar (o backend grava sem eles)
const removerEspacos = (valor: string) => valor.trim()

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
        ? { nomeMissao: props.missao.nomeMissao, requisito: props.missao.requisito, pontos: PONTOS_PADRAO }
        : { nomeMissao: '', requisito: '', pontos: PONTOS_PADRAO },
  })

  // só é chamado se todos os campos passarem na validação;
  // enquanto a Promise não termina, isSubmitting fica true e o botão fica desabilitado
  async function enviar(valores: ValoresFormulario) {
    // limpa o erro do envio anterior antes de tentar de novo
    setErroApi(null)

    const dados: MissaoEntradaDTO = { nomeMissao: valores.nomeMissao, requisito: valores.requisito }

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
      setErroApi(e instanceof ErroApi ? e.message : 'Não foi possível salvar a missão. Tente novamente.')
      return
    }

    // a lista lê o aviso do location.state e mostra a mensagem no topo
    navigate('/missoes', { state: aviso })
  }

  return (
    <>
      {erroApi && <MensagemRetorno tipo="erro" texto={erroApi} />}

      {/* noValidate: a validação é do React Hook Form, não a do navegador */}
      <form
        noValidate
        onSubmit={handleSubmit(enviar)}
        className="mx-auto flex max-w-[76rem] flex-col gap-[2.4rem] mobile-lg:gap-[2.8rem] tablet:gap-[3.2rem]"
      >
        {/* limites iguais aos do MissaoEntradaDTO (backend); mensagens no estilo do projeto original */}
        <CampoTexto
          id="missao-nome"
          label="Nome da missão"
          placeholder="Ex.: Use o transporte público hoje"
          register={register('nomeMissao', {
            setValueAs: removerEspacos,
            required: 'Informe o nome da missão.',
            minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
            maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
          })}
          erro={errors.nomeMissao?.message}
        />

        <CampoTextarea
          id="missao-requisito"
          label="Requisito"
          placeholder="Descreva o que o usuário precisa fazer para completar a missão"
          rows={4}
          register={register('requisito', {
            setValueAs: removerEspacos,
            required: 'Informe o requisito da missão.',
            minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' },
            maxLength: { value: 255, message: 'Use no máximo 255 caracteres.' },
          })}
          erro={errors.requisito?.message}
        />

        {/* pontos só no cadastro: a edição não mexe na conquista */}
        {props.modo === 'cadastro' && (
          <CampoTexto
            id="missao-pontos"
            label="Pontos de recompensa"
            type="number"
            placeholder="20"
            register={register('pontos', {
              // converte para number; campo vazio vira NaN e cai no required/validate
              valueAsNumber: true,
              required: 'Informe os pontos de recompensa.',
              min: { value: 1, message: 'Use pelo menos 1 ponto.' },
              max: { value: 1000, message: 'Use no máximo 1000 pontos.' },
              validate: (valor) => Number.isInteger(valor) || 'Use um número inteiro.',
            })}
            erro={errors.pontos?.message}
          />
        )}

        <hr className="h-[1.5px] border-none bg-separator-light" aria-hidden="true" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-full rounded-controle bg-card-green px-[2.4rem] py-[1.3rem] text-center font-texto text-[1.5rem] font-semibold text-title shadow-botao-verde transition-[background-color,transform,box-shadow] duration-300 hover:scale-[1.02] hover:bg-card-dark-green hover:text-text-light-yellow hover:shadow-botao-verde-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 mobile-lg:px-[3rem] mobile-lg:py-[1.4rem] mobile-lg:text-[1.6rem] tablet:px-[3.6rem] tablet:py-[1.5rem]"
        >
          {isSubmitting ? 'Salvando...' : props.modo === 'cadastro' ? 'Cadastrar missão' : 'Salvar alterações'}
        </button>
      </form>
    </>
  )
}

export default FormularioMissao
