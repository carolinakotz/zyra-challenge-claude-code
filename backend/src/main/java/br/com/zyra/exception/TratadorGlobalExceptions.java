package br.com.zyra.exception;

import br.com.zyra.dto.ErroSaidaDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

// "vigia" todos os resources: quando uma exceção escapa de um deles, cai aqui
// e é traduzida em status HTTP + JSON {"message": "..."}
// assim os resources não precisam de try/catch
@RestControllerAdvice
public class TratadorGlobalExceptions {

    private static final Logger log = LoggerFactory.getLogger(TratadorGlobalExceptions.class);

    private static final String MENSAGEM_ERRO_INTERNO =
            "Não foi possível acessar os dados no momento. Tente novamente mais tarde.";

    // regra de negócio violada: 400 com a mensagem do BO
    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<ErroSaidaDTO> tratarRegraNegocio(RegraNegocioException e) {
        return responder(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    // id inexistente: 404 com a mensagem do BO
    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroSaidaDTO> tratarRecursoNaoEncontrado(RecursoNaoEncontradoException e) {
        return responder(HttpStatus.NOT_FOUND, e.getMessage());
    }

    // falha no banco: 500 com mensagem genérica
    // o detalhe técnico (SQL, erro do Oracle) vai só para o log do servidor, nunca para o usuário
    @ExceptionHandler(AcessoDadosException.class)
    public ResponseEntity<ErroSaidaDTO> tratarAcessoDados(AcessoDadosException e) {
        log.error(e.getMessage(), e);
        return responder(HttpStatus.INTERNAL_SERVER_ERROR, MENSAGEM_ERRO_INTERNO);
    }

    // DTO com @Valid que não passou nas anotações (@NotBlank, @Size...): 400 com a primeira mensagem
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroSaidaDTO> tratarValidacao(MethodArgumentNotValidException e) {
        List<ObjectError> erros = e.getBindingResult().getAllErrors();
        String mensagem = erros.isEmpty()
                ? "Dados inválidos."
                : erros.get(0).getDefaultMessage();
        return responder(HttpStatus.BAD_REQUEST, mensagem);
    }

    private ResponseEntity<ErroSaidaDTO> responder(HttpStatus status, String mensagem) {
        return ResponseEntity.status(status).body(new ErroSaidaDTO(mensagem));
    }
}
