// espelham os records do backend (br.com.zyra.dto)
// os nomes dos campos são o contrato JSON: não renomear

// o que a API devolve sobre uma conquista
export interface ConquistaSaidaDTO {
  idConquista: number
  pontosRecompensa: number
  idMissao: number
}

// o que a API devolve sobre uma missão
// conquista pode faltar ou vir null se a missão ainda não tiver conquista cadastrada
export interface MissaoSaidaDTO {
  id: number
  nomeMissao: string
  requisito: string
  conquista?: ConquistaSaidaDTO | null
}

// o que o frontend envia no POST/PUT de /missoes (sem id e sem conquista)
export interface MissaoEntradaDTO {
  nomeMissao: string
  requisito: string
}
