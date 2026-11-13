package br.com.zyra.model;

// representa uma linha da tabela ZYRA2_CONQUISTA
public class Conquista {

    private Long idConquista;
    private Integer pontosRecompensa;
    private Long idMissao;

    public Conquista() {
    }

    public Conquista(Long idConquista, Integer pontosRecompensa, Long idMissao) {
        this.idConquista = idConquista;
        this.pontosRecompensa = pontosRecompensa;
        this.idMissao = idMissao;
    }

    public Long getIdConquista() {
        return idConquista;
    }

    public void setIdConquista(Long idConquista) {
        this.idConquista = idConquista;
    }

    public Integer getPontosRecompensa() {
        return pontosRecompensa;
    }

    public void setPontosRecompensa(Integer pontosRecompensa) {
        this.pontosRecompensa = pontosRecompensa;
    }

    public Long getIdMissao() {
        return idMissao;
    }

    public void setIdMissao(Long idMissao) {
        this.idMissao = idMissao;
    }
}
