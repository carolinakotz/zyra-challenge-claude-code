package br.com.zyra.bo;

import br.com.zyra.dao.ConquistaDAO;
import br.com.zyra.dao.MissaoDAO;
import br.com.zyra.dto.ConquistaSaidaDTO;
import br.com.zyra.dto.MissaoEntradaDTO;
import br.com.zyra.dto.MissaoSaidaDTO;
import br.com.zyra.exception.RecursoNaoEncontradoException;
import br.com.zyra.exception.RegraNegocioException;
import br.com.zyra.model.Conquista;
import br.com.zyra.model.Missao;
import org.springframework.stereotype.Service;

import java.util.List;

// regras de negócio da missão
// recebe e devolve DTO (fala com o resource) e trabalha com model (fala com os DAOs)
@Service
public class MissaoBO {

    // pontos da conquista quando quem chama não informa outro valor
    public static final int PONTOS_PADRAO = 20;

    private static final int TAMANHO_MINIMO_NOME = 3;

    private final MissaoDAO missaoDAO;
    private final ConquistaDAO conquistaDAO;

    public MissaoBO(MissaoDAO missaoDAO, ConquistaDAO conquistaDAO) {
        this.missaoDAO = missaoDAO;
        this.conquistaDAO = conquistaDAO;
    }

    // cadastra a missão com a conquista padrão de 20 pontos
    public MissaoSaidaDTO cadastrar(MissaoEntradaDTO dto) {
        return cadastrar(dto, PONTOS_PADRAO);
    }

    // cadastra a missão e já cria a conquista vinculada a ela
    public MissaoSaidaDTO cadastrar(MissaoEntradaDTO dto, Integer pontosRecompensa) {
        validar(dto);
        if (pontosRecompensa == null || pontosRecompensa <= 0) {
            throw new RegraNegocioException("Os pontos da conquista devem ser maiores que zero.");
        }

        Missao missao = converterParaModel(dto);
        missao.setId(missaoDAO.proximoId());
        missaoDAO.inserir(missao);

        // a missão precisa existir antes da conquista, por causa da FK
        try {
            Conquista conquista = new Conquista(conquistaDAO.proximoId(), pontosRecompensa, missao.getId());
            conquistaDAO.inserir(conquista);
            missao.setConquista(conquista);
        } catch (RuntimeException e) {
            // cada DAO grava sozinho (sem transação), então se a conquista falhar
            // apagamos a missão para não deixar uma missão sem conquista no banco
            missaoDAO.excluir(missao.getId());
            throw e;
        }

        return converterParaDTO(missao);
    }

    public MissaoSaidaDTO atualizar(Long id, MissaoEntradaDTO dto) {
        validar(dto);

        Missao missao = converterParaModel(dto);
        missao.setId(id);
        if (!missaoDAO.atualizar(missao)) {
            throw new RecursoNaoEncontradoException("Missão não encontrada.");
        }

        missao.setConquista(buscarConquista(id));
        return converterParaDTO(missao);
    }

    public void excluir(Long id) {
        buscarMissao(id);

        // primeiro as conquistas, depois a missão: a FK não deixa apagar a missão
        // enquanto houver conquista apontando para ela
        for (Conquista conquista : conquistaDAO.buscarPorMissao(id)) {
            conquistaDAO.excluir(conquista.getIdConquista());
        }
        missaoDAO.excluir(id);
    }

    public MissaoSaidaDTO buscarPorId(Long id) {
        Missao missao = buscarMissao(id);
        missao.setConquista(buscarConquista(id));
        return converterParaDTO(missao);
    }

    public List<MissaoSaidaDTO> listarTodos() {
        List<Missao> missoes = missaoDAO.listarTodos();
        for (Missao missao : missoes) {
            missao.setConquista(buscarConquista(missao.getId()));
        }
        return missoes.stream().map(this::converterParaDTO).toList();
    }

    // as regras ficam aqui mesmo com as anotações do DTO, porque o BO
    // pode ser chamado por outro código que não passa pelo @Valid do resource
    private void validar(MissaoEntradaDTO dto) {
        if (dto == null) {
            throw new RegraNegocioException("Os dados da missão são obrigatórios.");
        }
        if (dto.nomeMissao() == null || dto.nomeMissao().trim().length() < TAMANHO_MINIMO_NOME) {
            throw new RegraNegocioException("O nome da missão deve ter pelo menos 3 caracteres.");
        }
        if (dto.requisito() == null || dto.requisito().isBlank()) {
            throw new RegraNegocioException("O requisito da missão é obrigatório.");
        }
    }

    private Missao buscarMissao(Long id) {
        return missaoDAO.buscarPorId(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Missão não encontrada."));
    }

    // o schema permite várias conquistas por missão, mas o contrato JSON tem só uma:
    // usamos a primeira (menor id); null se a missão ainda não tiver conquista
    private Conquista buscarConquista(Long idMissao) {
        List<Conquista> conquistas = conquistaDAO.buscarPorMissao(idMissao);
        return conquistas.isEmpty() ? null : conquistas.get(0);
    }

    // DTO de entrada -> model (sem id e sem conquista; quem preenche é o BO)
    private Missao converterParaModel(MissaoEntradaDTO dto) {
        Missao missao = new Missao();
        missao.setNomeMissao(dto.nomeMissao().trim());
        missao.setRequisito(dto.requisito().trim());
        return missao;
    }

    // model -> DTO de saída (o que vai no JSON)
    private MissaoSaidaDTO converterParaDTO(Missao missao) {
        Conquista conquista = missao.getConquista();
        ConquistaSaidaDTO conquistaDTO = conquista == null
                ? null
                : new ConquistaSaidaDTO(conquista.getIdConquista(), conquista.getPontosRecompensa(), conquista.getIdMissao());
        return new MissaoSaidaDTO(missao.getId(), missao.getNomeMissao(), missao.getRequisito(), conquistaDTO);
    }
}
