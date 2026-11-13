package br.com.zyra.dto;

// corpo JSON de toda resposta de erro da API: {"message": "..."}
// o campo se chama "message" (em inglês) porque é o formato combinado com o frontend
public record ErroSaidaDTO(String message) {
}
