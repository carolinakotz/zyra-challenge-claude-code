package br.com.zyra.dto;

// o que a API devolve sobre uma conquista
// os nomes dos campos são o Contrato JSON: não renomear
public record ConquistaSaidaDTO(
        Long idConquista,
        Integer pontosRecompensa,
        Long idMissao
) {
}
