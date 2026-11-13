import type { AvisoNavegacao } from '../types/navegacao'

// aviso mostrado na lista quando a missão do endereço não existe (ou o id é inválido)
// usado pelas páginas de detalhe e de edição, que voltam para /missoes nesse caso
export function avisoMissaoNaoEncontrada(id: string | undefined): AvisoNavegacao {
  return {
    mensagem: `A missão ${id ?? ''} não foi encontrada. Escolha uma das missões abaixo.`,
    tipo: 'erro',
  }
}
