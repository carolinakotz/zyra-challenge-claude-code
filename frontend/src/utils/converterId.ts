// converte o id da URL; devolve null se não for um inteiro positivo ("abc", "1.5", "-3", "1e2")
export function converterId(texto: string | undefined): number | null {
  if (texto === undefined || !/^\d+$/.test(texto)) return null
  const numero = Number(texto)
  return numero > 0 ? numero : null
}
