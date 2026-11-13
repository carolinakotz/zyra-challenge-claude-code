interface MensagemRetornoProps {
  tipo: 'sucesso' | 'erro'
  texto: string
}

// aviso centralizado no topo da página (ex.: depois de cadastrar, editar ou excluir uma missão)
function MensagemRetorno({ tipo, texto }: MensagemRetornoProps) {
  const estilos =
    tipo === 'sucesso'
      ? 'border-sucesso-borda bg-sucesso-fundo text-sucesso-texto'
      : 'border-erro-borda bg-erro-fundo text-erro-texto'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mx-auto mb-[2.4rem] max-w-[76rem] rounded-controle border-[1.5px] p-[1.4rem_2.4rem] text-center font-texto text-[1.5rem] font-medium ${estilos}`}
    >
      {texto}
    </div>
  )
}

export default MensagemRetorno
