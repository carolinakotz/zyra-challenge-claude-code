package br.com.zyra.exception;

// lançada pelos BOs quando uma regra de negócio é violada (ex.: nome curto demais)
// o TratadorGlobalExceptions traduz esta exceção em HTTP 400
// a mensagem vai direto para o usuário: escrever em português com acento
public class RegraNegocioException extends RuntimeException {

    public RegraNegocioException(String mensagem) {
        super(mensagem);
    }
}
