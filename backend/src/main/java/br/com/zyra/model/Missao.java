package br.com.zyra.model;

// representa uma linha da tabela ZYRA2_MISSAO
// a conquista não é coluna da tabela: vem da ZYRA2_CONQUISTA, ligada pelo ID_MISSAO
public class Missao {

    private Long id;
    private String nomeMissao;
    private String requisito;
    private Conquista conquista;

    public Missao() {
    }

    public Missao(Long id, String nomeMissao, String requisito, Conquista conquista) {
        this.id = id;
        this.nomeMissao = nomeMissao;
        this.requisito = requisito;
        this.conquista = conquista;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeMissao() {
        return nomeMissao;
    }

    public void setNomeMissao(String nomeMissao) {
        this.nomeMissao = nomeMissao;
    }

    public String getRequisito() {
        return requisito;
    }

    public void setRequisito(String requisito) {
        this.requisito = requisito;
    }

    public Conquista getConquista() {
        return conquista;
    }

    public void setConquista(Conquista conquista) {
        this.conquista = conquista;
    }
}
