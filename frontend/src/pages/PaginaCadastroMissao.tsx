import FormularioMissao from '../components/FormularioMissao'
import LinkVoltar from '../components/LinkVoltar'

function PaginaCadastroMissao() {
  return (
    <div className="flex flex-col gap-6">
      <LinkVoltar para="/missoes">Voltar para a lista</LinkVoltar>
      <h1 className="text-subtitulo font-bold tablet:text-hero">Nova missão</h1>
      <FormularioMissao modo="cadastro" />
    </div>
  )
}

export default PaginaCadastroMissao
