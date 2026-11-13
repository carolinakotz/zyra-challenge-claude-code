// link interno com o texto que aparece na tela (ex.: links sugeridos na página de erro)
export interface LinkNavegacao {
  caminho: string
  rotulo: string
}

// aviso que uma página manda para a lista de missões pelo state do react-router
// (ex.: missão cadastrada, editada, excluída ou não encontrada)
export interface AvisoNavegacao {
  mensagem: string
  tipo: 'sucesso' | 'erro'
}

// location.state é unknown: confere o formato antes de usar
export function ehAvisoNavegacao(estado: unknown): estado is AvisoNavegacao {
  return (
    typeof estado === 'object' &&
    estado !== null &&
    'mensagem' in estado &&
    typeof estado.mensagem === 'string' &&
    'tipo' in estado &&
    (estado.tipo === 'sucesso' || estado.tipo === 'erro')
  )
}
