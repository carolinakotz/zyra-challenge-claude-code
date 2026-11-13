package br.com.zyra.dao;

import br.com.zyra.exception.AcessoDadosException;
import br.com.zyra.model.Conquista;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

// único lugar com SQL da tabela ZYRA2_CONQUISTA
@Repository
public class ConquistaDAO {

    private final DataSource dataSource;

    public ConquistaDAO(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    // pega o próximo id da sequence; o BO chama antes de inserir
    public Long proximoId() {
        String sql = "SELECT ZYRA2_SEQ_CONQUISTA.NEXTVAL FROM DUAL";
        try (Connection conexao = dataSource.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql);
             ResultSet resultado = comando.executeQuery()) {
            resultado.next();
            return resultado.getLong(1);
        } catch (SQLException e) {
            throw new AcessoDadosException("Erro ao gerar o id da conquista.", e);
        }
    }

    // grava a conquista; o id já deve vir preenchido (via proximoId)
    // a missão (ID_MISSAO) precisa existir, senão a FK recusa o INSERT
    public Conquista inserir(Conquista conquista) {
        String sql = "INSERT INTO ZYRA2_CONQUISTA (ID_CONQUISTA, PONTOS_RECOMPENSA, ID_MISSAO) VALUES (?, ?, ?)";
        try (Connection conexao = dataSource.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            comando.setLong(1, conquista.getIdConquista());
            comando.setInt(2, conquista.getPontosRecompensa());
            comando.setLong(3, conquista.getIdMissao());
            comando.executeUpdate();
            return conquista;
        } catch (SQLException e) {
            throw new AcessoDadosException("Erro ao cadastrar a conquista.", e);
        }
    }

    // lista porque o schema permite mais de uma conquista por missão;
    // lista vazia quando a missão não tem conquista
    public List<Conquista> buscarPorMissao(Long idMissao) {
        String sql = "SELECT ID_CONQUISTA, PONTOS_RECOMPENSA, ID_MISSAO FROM ZYRA2_CONQUISTA "
                + "WHERE ID_MISSAO = ? ORDER BY ID_CONQUISTA";
        try (Connection conexao = dataSource.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            comando.setLong(1, idMissao);
            try (ResultSet resultado = comando.executeQuery()) {
                List<Conquista> conquistas = new ArrayList<>();
                while (resultado.next()) {
                    conquistas.add(converter(resultado));
                }
                return conquistas;
            }
        } catch (SQLException e) {
            throw new AcessoDadosException("Erro ao buscar as conquistas da missão.", e);
        }
    }

    // devolve true se a conquista foi apagada; false indica que o id não existe
    public boolean excluir(Long idConquista) {
        String sql = "DELETE FROM ZYRA2_CONQUISTA WHERE ID_CONQUISTA = ?";
        try (Connection conexao = dataSource.getConnection();
             PreparedStatement comando = conexao.prepareStatement(sql)) {
            comando.setLong(1, idConquista);
            return comando.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new AcessoDadosException("Erro ao excluir a conquista.", e);
        }
    }

    // transforma a linha atual do ResultSet em um model Conquista
    private Conquista converter(ResultSet resultado) throws SQLException {
        return new Conquista(
                resultado.getLong("ID_CONQUISTA"),
                resultado.getInt("PONTOS_RECOMPENSA"),
                resultado.getLong("ID_MISSAO"));
    }
}
