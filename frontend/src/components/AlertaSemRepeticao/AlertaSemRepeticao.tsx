import type { ReactNode } from 'react'

interface AlertaSemRepeticaoProps {
  mensagem: string
  // o que a pessoa pode fazer em vez de tentar de novo (ex.: um link de volta)
  acao: ReactNode
}

// erro em que tentar de novo não resolve (id inválido, recurso inexistente): sem "Tentar novamente"
function AlertaSemRepeticao({ mensagem, acao }: AlertaSemRepeticaoProps) {
  return (
    <div className="flex flex-col gap-6">
      <p
        role="alert"
        className="flex items-start gap-3 rounded-cartao border border-erro-borda bg-erro-fundo p-6 text-erro-texto"
      >
        <i className="fa-solid fa-circle-exclamation mt-1" aria-hidden="true" />
        <span>{mensagem}</span>
      </p>
      {acao}
    </div>
  )
}

export default AlertaSemRepeticao
