import type { RespostaErroApi } from '../types/api'

// endereço base da API, vem do .env (VITE_API_URL)
export const API_URL = import.meta.env.VITE_API_URL

// erro de requisição que também guarda o status HTTP (0 = nem chegou ao servidor)
export class ErroApi extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.name = 'ErroApi'
    this.status = status
  }
}

// confere se o JSON recebido tem o formato {"message": "..."}
function ehRespostaErroApi(corpo: unknown): corpo is RespostaErroApi {
  return (
    typeof corpo === 'object' &&
    corpo !== null &&
    'message' in corpo &&
    typeof corpo.message === 'string'
  )
}

// tenta ler a mensagem de erro que o backend mandou; se não der, usa a de fallback
async function lerMensagemErro(resposta: Response): Promise<string> {
  try {
    const corpo: unknown = await resposta.json()
    if (ehRespostaErroApi(corpo) && corpo.message.trim() !== '') {
      return corpo.message
    }
  } catch {
    // corpo vazio ou que não é JSON: cai no fallback abaixo
  }

  if (resposta.status === 404) return 'Recurso não encontrado.'
  if (resposta.status >= 500) return 'Erro no servidor. Tente novamente mais tarde.'
  return `Não foi possível concluir a requisição (erro ${resposta.status}).`
}

// faz a chamada à API e devolve o corpo já convertido para o tipo T
async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      ...opcoes,
      headers: {
        'Content-Type': 'application/json',
        ...opcoes.headers,
      },
    })
  } catch (erro) {
    // cancelamento pedido por quem chamou (AbortController): repassa o erro original,
    // para não virar a mensagem de "sem conexão"
    if (opcoes.signal?.aborted) throw erro

    // o fetch só rejeita quando não há resposta nenhuma (servidor fora do ar, sem rede, CORS)
    throw new ErroApi('Não foi possível conectar ao servidor. Verifique sua conexão.', 0)
  }

  // o fetch NÃO lança erro em 404 ou 500: quem diz se deu certo é resposta.ok (status 200–299)
  if (!resposta.ok) {
    throw new ErroApi(await lerMensagemErro(resposta), resposta.status)
  }

  // 204 No Content não tem corpo; chamar .json() aqui quebraria
  if (resposta.status === 204) {
    return undefined as T
  }

  return (await resposta.json()) as T
}

// GET (signal opcional, para poder cancelar a busca)
export function obter<T>(caminho: string, signal?: AbortSignal): Promise<T> {
  return requisitar<T>(caminho, { signal })
}

// POST (cadastro) ou PUT (edição), com corpo em JSON
export function enviar<T>(
  caminho: string,
  corpo: unknown,
  metodo: 'POST' | 'PUT' = 'POST',
): Promise<T> {
  return requisitar<T>(caminho, {
    method: metodo,
    body: JSON.stringify(corpo),
  })
}

// DELETE (normalmente responde 204, por isso devolve void)
export function remover(caminho: string): Promise<void> {
  return requisitar<void>(caminho, { method: 'DELETE' })
}
