package br.com.zyra.exception;

// lançada pelos BOs quando o id pedido não existe no banco
// o TratadorGlobalExceptions traduz esta exceção em HTTP 404
// a mensagem vai direto para o usuário: escrever em português com acento
public class RecursoNaoEncontradoException extends RuntimeException {

    public RecursoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
