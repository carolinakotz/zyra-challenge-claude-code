package br.com.zyra.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// o que chega no POST/PUT de /missoes
// sem id (quem gera é a sequence) e sem conquista (é cadastrada à parte)
// mínimo de 3 caracteres para evitar textos sem sentido ("a", "ok")
// o máximo segue o tamanho das colunas da ZYRA2_MISSAO
public record MissaoEntradaDTO(

        @NotBlank(message = "O nome da missão é obrigatório.")
        @Size(min = 3, max = 100, message = "O nome da missão deve ter entre 3 e 100 caracteres.")
        String nomeMissao,

        @NotBlank(message = "O requisito da missão é obrigatório.")
        @Size(min = 3, max = 255, message = "O requisito da missão deve ter entre 3 e 255 caracteres.")
        String requisito
) {
}
