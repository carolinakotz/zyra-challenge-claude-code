// campos do formulário de contato
export interface DadosContato {
  nome: string
  sobrenome: string
  email: string
  telefone: string
  mensagem: string
}

// resultado do último envio; null quando não há mensagem para mostrar
export type StatusEnvio = 'sucesso' | 'erro' | null
