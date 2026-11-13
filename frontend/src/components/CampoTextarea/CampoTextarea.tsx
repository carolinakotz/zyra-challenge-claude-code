import type { UseFormRegisterReturn } from 'react-hook-form'

interface CampoTextareaProps {
  id: string
  label: string
  placeholder?: string
  rows?: number
  // retorno do register('campo', regras) do react-hook-form
  register: UseFormRegisterReturn
  erro?: string
}

// campo de várias linhas com rótulo e mensagem de erro logo abaixo
function CampoTextarea({ id, label, placeholder, rows = 6, register, erro }: CampoTextareaProps) {
  const idErro = `erro-${id}`

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label htmlFor={id} className="font-texto text-[1.5rem] font-medium text-title">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? idErro : undefined}
        className={`min-h-[14rem] w-full resize-y rounded-[1.2rem] border-[1.5px] bg-transparent px-[2rem] py-[1.2rem] font-texto text-[1.4rem] leading-[1.6] text-text-dark outline-none transition-[border-color,box-shadow] duration-[250ms] placeholder:text-separator-light focus:border-nav focus:shadow-foco-campo ${
          erro ? 'border-erro shadow-erro-campo' : 'border-separator-dark'
        }`}
        {...register}
      />
      {/* min-h reserva o espaço da mensagem, para o formulário não pular quando o erro aparece */}
      <small id={idErro} role="alert" className="min-h-[1.6rem] font-texto text-[1.2rem] text-erro">
        {erro}
      </small>
    </div>
  )
}

export default CampoTextarea
