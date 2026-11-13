package br.com.zyra.exception;

// lançada pelos DAOs quando o banco falha (SQLException)
// é unchecked (RuntimeException) para não obrigar bo e resource a declarar "throws"
// o TratadorGlobalExceptions vai traduzir esta exceção em HTTP 500
public class AcessoDadosException extends RuntimeException {

    // guarda a SQLException original como causa, para o erro real aparecer no log
    public AcessoDadosException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }
}
