package br.com.zyra.resource;

import br.com.zyra.bo.MissaoBO;
import br.com.zyra.dto.MissaoEntradaDTO;
import br.com.zyra.dto.MissaoSaidaDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

// endpoints REST da missão
// fino de propósito: recebe o DTO, chama o BO e devolve DTO + status HTTP
// erros não são tratados aqui: as exceções do BO caem no TratadorGlobalExceptions
@RestController
@RequestMapping("/missoes")
public class MissaoResource {

    private final MissaoBO missaoBO;

    public MissaoResource(MissaoBO missaoBO) {
        this.missaoBO = missaoBO;
    }

    // GET /missoes -> 200 com a lista (vazia se não houver missões)
    @GetMapping
    public ResponseEntity<List<MissaoSaidaDTO>> listarTodos() {
        return ResponseEntity.ok(missaoBO.listarTodos());
    }

    // GET /missoes/{id} -> 200 com a missão, ou 404 se não existir
    @GetMapping("/{id}")
    public ResponseEntity<MissaoSaidaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(missaoBO.buscarPorId(id));
    }

    // POST /missoes?pontos=20 -> 201 com header Location e a missão criada no corpo
    // "pontos" é opcional: sem ele, o BO usa o valor padrão (MissaoBO.PONTOS_PADRAO)
    @PostMapping
    public ResponseEntity<MissaoSaidaDTO> cadastrar(@RequestBody @Valid MissaoEntradaDTO dto,
                                                    @RequestParam(required = false) Integer pontos) {
        MissaoSaidaDTO criada = pontos == null
                ? missaoBO.cadastrar(dto)
                : missaoBO.cadastrar(dto, pontos);

        // monta a URL do novo recurso a partir da URL da requisição, sem a query string
        // (ex.: http://localhost:8080/missoes/15, e não .../missoes/15?pontos=20)
        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(criada.id())
                .toUri();

        return ResponseEntity.created(location).body(criada);
    }

    // PUT /missoes/{id} -> 200 com a missão atualizada, ou 404 se não existir
    @PutMapping("/{id}")
    public ResponseEntity<MissaoSaidaDTO> atualizar(@PathVariable Long id,
                                                    @RequestBody @Valid MissaoEntradaDTO dto) {
        return ResponseEntity.ok(missaoBO.atualizar(id, dto));
    }

    // DELETE /missoes/{id} -> 204 sem corpo, ou 404 se não existir
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        missaoBO.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
