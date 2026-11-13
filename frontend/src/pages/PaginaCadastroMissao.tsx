import CabecalhoPagina from '../components/CabecalhoPagina'
import FormularioMissao from '../components/FormularioMissao'

// página com uma seção só, como no projeto original: título com descrição e o formulário
// (o formulário cadastra e volta para a lista com o aviso de sucesso)
function PaginaCadastroMissao() {
  return (
    <section
      aria-label="Cadastrar missão"
      className="mx-auto max-w-[1300px] p-[3.2rem_1.6rem_5.2rem] mobile-lg:p-[4.8rem_2.4rem_6.4rem] tablet:p-[5.6rem_4rem_7.2rem] desktop:p-[6.4rem_6.4rem_8rem]"
    >
      <CabecalhoPagina titulo="Nova missão:" descricao="Cadastre uma missão que incentive o uso do transporte público." />
      <FormularioMissao modo="cadastro" />
    </section>
  )
}

export default PaginaCadastroMissao
