# Zyra — Backend

## Stack

- Java 21
- Spring Boot (API REST)
- Oracle (FIAP) acessado com **JDBC puro**: `Connection`, `PreparedStatement`, `ResultSet` (`java.sql`).
  A conexão vem do `DataSource` configurado pelo Spring (injetado no DAO).
- **Proibido**: JPA, Hibernate, Spring Data, `@Entity`, repositórios gerados.

## Pacote base

`br.com.zyra`

## Arquitetura em camadas

Fluxo de uma requisição:

```
HTTP → filter → resource → bo → dao → Oracle
                   ↑        ↑      ↑
                  dto     model  model
```

Cada camada só conversa com a camada imediatamente abaixo. O `resource` nunca chama o `dao` direto.

| Pacote      | Responsabilidade                                                                                          | Exemplo                                       |
|-------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `model`     | Classes de domínio que representam as tabelas. Sem lógica de negócio.                                     | `Usuario`, `Missao`, `CartaoTransporte`       |
| `dto`       | Dados que entram e saem da API, sempre como `record`. A API nunca expõe `model` diretamente.              | `MissaoEntradaDTO`, `MissaoSaidaDTO`          |
| `dao`       | Único lugar com SQL. Converte `ResultSet` em `model`.                                                     | `MissaoDAO`, `UsuarioDAO`                     |
| `bo`        | Regras de negócio: validações, cálculo de pontos, conversão de pontos em saldo, recarga. Converte DTO ↔ model. | `MissaoBO`, `RecargaBO`                  |
| `resource`  | Controllers REST (`@RestController`). Finos: recebem DTO, chamam o BO, devolvem DTO e o status HTTP.      | `MissaoResource`, `UsuarioResource`           |
| `exception` | Exceções próprias e o `@RestControllerAdvice` que as traduz em respostas HTTP.                            | `RegraNegocioException`, `RecursoNaoEncontradoException`, `AcessoDadosException` (falha no banco, vira HTTP 500), `TratadorGlobalExceptions` |
| `filter`    | Filtros que rodam antes dos resources em toda requisição (ex.: CORS para o frontend).                     | `CorsFilter`                                  |

### Regras do DAO

- Receber o `DataSource` do Spring por injeção e pegar a conexão com `dataSource.getConnection()`.
- Sempre `PreparedStatement` com parâmetros `?`. **Nunca** concatenar valores em SQL (evita SQL injection).
- Sempre `try-with-resources` para `Connection`, `PreparedStatement` e `ResultSet`.
- Capturar `SQLException` e relançar como exceção da camada `exception`.

## Convenções de nomes

Identificadores em português sem acento (ver seção "Idiomas" no `CLAUDE.md` da raiz).

- **Sufixos obrigatórios**: `MissaoDAO`, `MissaoBO`, `MissaoResource`, `MissaoEntradaDTO` (o que chega
  na requisição), `MissaoSaidaDTO` (o que volta na resposta). Models sem sufixo: `Missao`.
- **Exceções**: terminam em `Exception`: `RecursoNaoEncontradoException`.
- **Métodos**: camelCase com verbo: `buscarPorId`, `listarTodos`, `inserir`, `atualizar`, `excluir`,
  `converterPontosEmSaldo`.
- **Variáveis, atributos e campos JSON**: camelCase: `idUsuario`, `nomeMissao`, `saldo`.
  - **Exceção proposital:** o id da Missão no JSON é `id`, e não `idMissao`, porque o frontend usa
    `missao.id`. Não "corrigir": o Contrato JSON (seção abaixo) vale mais que esta convenção.
- **Tabelas e colunas Oracle**: UPPER_SNAKE_CASE; tabelas com prefixo `ZYRA2_` (ver seção abaixo):
  `ZYRA2_MISSAO`, `ID_MISSAO`, `NOME_MISSAO`.
- **Endpoints**: minúsculos, no plural: `/missoes`, `/usuarios/{id}/conquistas`.
- **Mensagens das exceções** (o usuário lê): com acento: `"Missão não encontrada."`,
  `"Pontos insuficientes para a conversão."`.

## Status HTTP

| Situação                                         | Status | Observação                                                    |
|--------------------------------------------------|--------|---------------------------------------------------------------|
| GET / PUT com sucesso                            | 200    | Corpo com o `SaidaDTO`.                                       |
| POST que cria recurso                            | 201    | Header `Location` com a URL do novo recurso (ex.: `/missoes/15`) e corpo com o `SaidaDTO`. |
| DELETE com sucesso                               | 204    | Sem corpo.                                                    |
| Regra de negócio violada                         | 400    | `RegraNegocioException`, com mensagem em português com acento. |
| Id inexistente                                   | 404    | `RecursoNaoEncontradoException`, com mensagem em português com acento. |

Quem traduz exceção em status é o `@RestControllerAdvice` do pacote `exception`, não o resource.

## Contrato JSON (idêntico ao frontend original)

Os nomes dos campos do JSON não podem mudar, porque o frontend depende deles.

- Missão: `id`, `nomeMissao`, `requisito`, `conquista`
- Conquista: `idConquista`, `pontosRecompensa`, `idMissao`
- Erro: **todo** erro da API (400, 404, 500...) tem o formato `{"message": "..."}` (`ErroSaidaDTO`),
  com a mensagem em português com acento. Nenhuma resposta de erro sai em outro formato.

## Prefixo `ZYRA2_` no banco

O schema Oracle da FIAP é compartilhado e já tem tabelas de outros projetos (`MISSAO`, `CONQUISTA` etc.).

- **Todo** objeto deste projeto usa o prefixo `ZYRA2_`: tabelas (`ZYRA2_MISSAO`), sequences
  (`ZYRA2_SEQ_MISSAO`) e constraints (`ZYRA2_PK_MISSAO`, `ZYRA2_FK_CONQUISTA_MISSAO`).
- **Nunca** rodar `DROP`, `ALTER`, `DELETE`, `UPDATE` ou `TRUNCATE` em objeto que não comece com `ZYRA2_`.
- Ids são gerados por sequence (`ZYRA2_SEQ_<TABELA>.NEXTVAL`), nunca por `MAX(id) + 1`.
- Scripts SQL ficam em `backend/db/`, numerados na ordem de execução (`01-schema.sql`, ...).

## Configuração do banco

`application.properties` referencia as variáveis **só pelo nome e sem valor padrão**:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
```

Veja a regra de credenciais no `CLAUDE.md` da raiz. Nunca imprimir ou logar esses valores.

## Deploy e variáveis de ambiente

O backend roda no **Render** como serviço Docker: raiz em `backend/`, imagem gerada pelo
`backend/Dockerfile` (build com `eclipse-temurin:21-jdk`, execução com `eclipse-temurin:21-jre`,
usuário não-root, `-XX:MaxRAMPercentage=60`). O `Dockerfile` não tem `ENV` nem `ARG` com variável do
banco: todas são configuradas no painel do Render e lidas quando o container roda.

Variáveis além das do banco. **Nenhuma delas guarda segredo**, por isso podem ter valor padrão:

| Variável       | Padrão                  | Uso                                                                                   |
|----------------|-------------------------|---------------------------------------------------------------------------------------|
| `PORT`         | `8080`                  | Porta do servidor (`server.port=${PORT:8080}`). O Render define sozinho.               |
| `CORS_ORIGENS` | `http://localhost:5173` | Origens liberadas no `CorsFilter`, separadas por vírgula. Comparação exata, nunca `*`. |

Regras do `CORS_ORIGENS`:

- Em produção, usar `https` e **sem barra no final**: `https://zyra.vercel.app` (o `CorsFilter`
  também remove a barra final de cada item, por segurança).
- Liberar **só o domínio de produção** da Vercel. Os endereços de preview mudam a cada deploy e
  ficam bloqueados de propósito.
- Deve bater com o domínio do frontend que usa o `VITE_API_URL` (ver `frontend/CLAUDE.md`).

As variáveis do banco (`DB_URL`, `DB_USER`, `DB_PASSWORD`) continuam sem valor padrão e seguem a
regra de credenciais do `CLAUDE.md` da raiz.

## Testes

Não criar testes automatizados até a desenvolvedora pedir.
