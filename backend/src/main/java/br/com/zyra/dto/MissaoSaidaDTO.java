package br.com.zyra.dto;

// o que a API devolve sobre uma missão
// os nomes dos campos são o Contrato JSON: não renomear
// (o id é "id", e não "idMissao", porque o frontend usa missao.id)
// conquista pode vir null se a missão ainda não tiver conquista cadastrada
public record MissaoSaidaDTO(
        Long id,
        String nomeMissao,
        String requisito,
        ConquistaSaidaDTO conquista
) {
}
