-- =====================================================================
-- Zyra - schema inicial: missoes e conquistas
--
-- REGRA: o schema da FIAP ja tem tabelas de outros projetos (MISSAO,
-- CONQUISTA etc.). Todo objeto deste projeto usa o prefixo ZYRA2_.
-- Nunca rodar DROP, ALTER ou DELETE em objetos sem esse prefixo.
-- =====================================================================


-- ---------------------------------------------------------------------
-- Limpeza (opcional). Fica comentada para o script nunca apagar nada
-- sem querer. Descomente so se precisar recriar tudo do zero.
-- A ordem importa: primeiro a tabela filha (CONQUISTA), depois a mae.
-- ---------------------------------------------------------------------
-- DROP TABLE ZYRA2_CONQUISTA;
-- DROP TABLE ZYRA2_MISSAO;
-- DROP SEQUENCE ZYRA2_SEQ_CONQUISTA;
-- DROP SEQUENCE ZYRA2_SEQ_MISSAO;


-- ---------------------------------------------------------------------
-- Sequences: geradores de numeros que o Oracle controla.
-- Cada chamada a .NEXTVAL devolve o proximo numero, sem repetir.
-- ---------------------------------------------------------------------
CREATE SEQUENCE ZYRA2_SEQ_MISSAO      -- cria o gerador de ids das missoes
    START WITH 1                      -- o primeiro numero entregue e 1
    INCREMENT BY 1                    -- cada chamada soma 1 ao anterior
    NOCACHE;                          -- nao guarda numeros em memoria (evita pulos grandes ao reiniciar o banco)

CREATE SEQUENCE ZYRA2_SEQ_CONQUISTA   -- cria o gerador de ids das conquistas
    START WITH 1
    INCREMENT BY 1
    NOCACHE;


-- ---------------------------------------------------------------------
-- Tabela ZYRA2_MISSAO: as missoes sustentaveis que o usuario cumpre.
-- ---------------------------------------------------------------------
CREATE TABLE ZYRA2_MISSAO (
    ID_MISSAO    NUMBER(10)     NOT NULL,   -- id da missao (vem da ZYRA2_SEQ_MISSAO)
    NOME_MISSAO  VARCHAR2(100)  NOT NULL,   -- nome curto, ex.: "Ir de bicicleta"
    REQUISITO    VARCHAR2(255)  NOT NULL,   -- o que o usuario precisa fazer para cumprir
    CONSTRAINT ZYRA2_PK_MISSAO              -- nome da restricao de chave primaria
        PRIMARY KEY (ID_MISSAO)             -- PK: o id identifica cada missao, nao repete e nao e nulo
);


-- ---------------------------------------------------------------------
-- Tabela ZYRA2_CONQUISTA: os pontos ganhos ao cumprir uma missao.
-- Cada conquista pertence a uma missao (ligacao pela FK).
-- ---------------------------------------------------------------------
CREATE TABLE ZYRA2_CONQUISTA (
    ID_CONQUISTA       NUMBER(10)  NOT NULL,   -- id da conquista (vem da ZYRA2_SEQ_CONQUISTA)
    PONTOS_RECOMPENSA  NUMBER(10)  NOT NULL,   -- quantos pontos o usuario ganha
    ID_MISSAO          NUMBER(10)  NOT NULL,   -- qual missao gera essa conquista
    CONSTRAINT ZYRA2_PK_CONQUISTA              -- nome da restricao de chave primaria
        PRIMARY KEY (ID_CONQUISTA),            -- PK: identifica cada conquista
    CONSTRAINT ZYRA2_FK_CONQUISTA_MISSAO       -- nome da restricao de chave estrangeira
        FOREIGN KEY (ID_MISSAO)                -- FK: esta coluna aponta para outra tabela
        REFERENCES ZYRA2_MISSAO (ID_MISSAO),   -- so aceita ids que existem em ZYRA2_MISSAO
    CONSTRAINT ZYRA2_CK_CONQUISTA_PONTOS       -- nome da restricao de verificacao
        CHECK (PONTOS_RECOMPENSA > 0)          -- impede conquista com zero ou pontos negativos
);


-- ---------------------------------------------------------------------
-- Dados de exemplo.
-- NEXTVAL pega o proximo id da sequence.
-- CURRVAL devolve o ultimo id que ESTA sessao pegou com NEXTVAL; serve
-- para ligar a conquista a missao que acabou de ser inserida.
-- ---------------------------------------------------------------------
INSERT INTO ZYRA2_MISSAO (ID_MISSAO, NOME_MISSAO, REQUISITO)
VALUES (ZYRA2_SEQ_MISSAO.NEXTVAL, 'Ir de bicicleta', 'Fazer um trajeto de pelo menos 5 km de bicicleta.');

INSERT INTO ZYRA2_CONQUISTA (ID_CONQUISTA, PONTOS_RECOMPENSA, ID_MISSAO)
VALUES (ZYRA2_SEQ_CONQUISTA.NEXTVAL, 50, ZYRA2_SEQ_MISSAO.CURRVAL);

INSERT INTO ZYRA2_MISSAO (ID_MISSAO, NOME_MISSAO, REQUISITO)
VALUES (ZYRA2_SEQ_MISSAO.NEXTVAL, 'Usar transporte público', 'Fazer 10 viagens de ônibus, metrô ou trem no mês.');

INSERT INTO ZYRA2_CONQUISTA (ID_CONQUISTA, PONTOS_RECOMPENSA, ID_MISSAO)
VALUES (ZYRA2_SEQ_CONQUISTA.NEXTVAL, 100, ZYRA2_SEQ_MISSAO.CURRVAL);

INSERT INTO ZYRA2_MISSAO (ID_MISSAO, NOME_MISSAO, REQUISITO)
VALUES (ZYRA2_SEQ_MISSAO.NEXTVAL, 'Reciclar', 'Levar materiais recicláveis a um ponto de coleta.');

INSERT INTO ZYRA2_CONQUISTA (ID_CONQUISTA, PONTOS_RECOMPENSA, ID_MISSAO)
VALUES (ZYRA2_SEQ_CONQUISTA.NEXTVAL, 30, ZYRA2_SEQ_MISSAO.CURRVAL);

-- grava de vez os INSERTs (sem COMMIT eles somem ao fechar a sessao)
COMMIT;
