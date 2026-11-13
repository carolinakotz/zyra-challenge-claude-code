# Zyra

Plataforma de sustentabilidade: usuários cumprem **missões sustentáveis**, ganham **pontos** por
**conquistas**, convertem pontos em **saldo** e usam o saldo para **recarregar cartões de transporte**.

## Estrutura do monorepo

| Pasta       | Stack                                                        | Detalhes              |
|-------------|--------------------------------------------------------------|-----------------------|
| `backend/`  | Java 21, Spring Boot, Oracle via JDBC puro (sem JPA)         | `backend/CLAUDE.md`   |
| `frontend/` | React + Vite + TypeScript + Tailwind CSS v4                  | `frontend/CLAUDE.md`  |

Cada pasta tem seu próprio `CLAUDE.md` com as convenções específicas. Leia-o antes de mexer ali.

## Glossário do domínio

Nomes usados no código (português, sem acento):

| Conceito              | Nome no código      |
|-----------------------|---------------------|
| Usuário               | `Usuario`           |
| Missão                | `Missao`            |
| Conquista             | `Conquista`         |
| Pontos                | `pontos`            |
| Saldo                 | `saldo`             |
| Cartão de transporte  | `CartaoTransporte`  |
| Recarga               | `Recarga`           |

## Regra de credenciais

O banco é o Oracle da FIAP. As credenciais existem **apenas** nas variáveis de ambiente da máquina:

- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`

Regras:

1. **Nunca** pedir, escrever, imprimir, logar ou commitar os valores dessas variáveis.
2. O código lê as variáveis **somente pelo nome** (ex.: `${DB_URL}` no Spring, `System.getenv("DB_URL")` em Java).
3. **Nunca** criar valor padrão/fallback com credencial (proibido, por exemplo, `${DB_PASSWORD:minhasenha}`).
   Se a variável não existir, a aplicação deve falhar ao iniciar.
4. Não rodar comandos que exibam os valores (`echo $DB_PASSWORD`, `env`, `printenv`, `set`).
5. Não colocar credenciais em arquivos de configuração, testes, exemplos, README ou mensagens de commit.

## Idiomas

| O quê                                                                                       | Idioma                              | Exemplo                                   |
|---------------------------------------------------------------------------------------------|-------------------------------------|-------------------------------------------|
| Identificadores: classes, métodos, variáveis, tabelas, colunas, endpoints, campos JSON, componentes, pastas | Português do Brasil **SEM acento** | `MissaoBO`, `/missoes`, `nomeMissao`      |
| Tudo que o usuário final lê: textos da interface, mensagens de erro e sucesso, mensagens das exceções do backend | Português do Brasil **COM acento** | `"Missão não encontrada."`                |
| Comentários no código                                                                       | Português simples                   | `// soma os pontos da conquista ao saldo` |

Observações:

- Sem acento e sem `ç` em identificador: `Missao`, `Conquista`, `acao`, `descricao`.
- Termos técnicos que fazem parte das convenções da stack ficam como estão: sufixos `DAO`, `BO`,
  `Resource`, `DTO`, a pasta `services/` do frontend, prefixo `use` de hooks, anotações do Spring.
- Exceção: os tokens de design do frontend herdados da identidade visual original ficam em inglês
  (`bg`, `brand`, `nav`, `card-gray`, `text-dark`...). Ver seção "Design" em `frontend/CLAUDE.md`.

## Convenções gerais

- Mensagens de commit em **inglês**.
- Ao criar ou alterar arquivos, explique o que foi feito e por quê.
