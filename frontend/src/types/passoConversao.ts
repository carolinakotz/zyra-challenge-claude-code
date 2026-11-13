// um passo do "Como fazer?" da página Sobre (não vem da API)
// cada passo tem uma imagem ou um ícone do Font Awesome
export interface PassoConversao {
  id: string
  nome: string
  descricao: string
  icone?: string
  imagem?: string
  // passo principal (o que usa o Zyra): fica em verde-escuro com o número rosa
  destaque?: boolean
}
