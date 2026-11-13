# Zyra — Frontend

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4: usar o plugin `@tailwindcss/vite` e `@import "tailwindcss";` no CSS principal.
  O v4 não precisa de `tailwind.config.js`; customizações vão no CSS com `@theme`.

## Estrutura de `src/`

```
src/
├── components/            # componentes reutilizáveis, um por pasta
│   └── CartaoMissao/
│       ├── CartaoMissao.tsx
│       └── index.ts       # export { default } from './CartaoMissao'
├── pages/                 # telas (rotas), montadas a partir dos componentes
├── services/              # TODAS as chamadas à API
│   ├── api.ts             # configuração base (URL, headers, tratamento de erro)
│   ├── missaoService.ts
│   └── usuarioService.ts
├── data/                  # dados fixos de exibição, que não vêm da API (ex.: conquistas.ts)
├── types/                 # tipos TS que espelham os DTOs do backend
├── hooks/                 # hooks customizados (useMissoes, useUsuario...)
└── utils/                 # funções puras, sem React e sem chamar a API (ex.: converterId)
```

## Regras

- **Componentes em pastas**: cada componente tem sua pasta em PascalCase, com o `.tsx` de mesmo nome
  e um `index.ts` que o reexporta. Importar pela pasta: `import CartaoMissao from '../components/CartaoMissao'`.
- **Chamadas de API só em `services/`**: componentes e páginas nunca chamam `fetch` diretamente;
  usam funções dos services (ex.: `listarMissoes()`, `recarregarCartao(...)`).
- A URL da API vem de `import.meta.env.VITE_API_URL`. Nenhuma credencial de banco existe no frontend.
- Estilos somente com classes do Tailwind; evitar CSS avulso. O único CSS escrito à mão fica em
  `src/index.css` (`@theme`, `@layer base` e `@utility`); componentes não têm arquivos `.css`.

## Deploy e variáveis de ambiente

O frontend é publicado na **Vercel** (raiz em `frontend/`). O `vercel.json` reescreve todas as rotas
para `/index.html`, para o React Router (`createBrowserRouter`) abrir rotas como `/missoes/3` mesmo
com F5 ou link direto.

| Variável       | Onde                                                    | Uso                    |
|----------------|---------------------------------------------------------|------------------------|
| `VITE_API_URL` | `.env` local; painel da Vercel em produção (URL do Render) | Endereço base da API. |

- **Não guarda segredo, e nunca deve guardar**: o Vite grava o valor no JavaScript do build, então
  qualquer pessoa consegue lê-lo no navegador. Mudar o valor exige um novo deploy.
- Em produção, usar `https` e **sem barra no final**: `https://zyra-api.onrender.com`.
- O backend libera pelo `CORS_ORIGENS` **só o domínio de produção** da Vercel. Os endereços de
  preview mudam a cada deploy e ficam bloqueados pelo CORS (ver `backend/CLAUDE.md`).

## Idiomas e nomes

Ver seção "Idiomas" no `CLAUDE.md` da raiz.

- Componentes, páginas, funções, variáveis e tipos em português **sem acento**:
  `CartaoMissao`, `PaginaPerfil`, `listarMissoes`, `nomeMissao`.
- Textos que aparecem na tela (títulos, botões, mensagens de erro e sucesso) em português **com acento**:
  `"Missão concluída!"`, `"Saldo insuficiente."`.
- Componentes e páginas em PascalCase; services em camelCase com sufixo `Service` (`missaoService.ts`);
  hooks com prefixo `use` (`useMissoes`).
- Tipos com os mesmos nomes dos DTOs do backend (`MissaoSaidaDTO`, `MissaoEntradaDTO`).
- Tokens de design: os de cor herdados da identidade original ficam em inglês (`bg`, `brand`,
  `card-gray`, `text-dark`...); os de feedback e os criados no Zyra ficam em português (`erro-texto`,
  `titulo-card`, `forma-folha`). Ver seção "Design".
- Comentários em português simples.
- TypeScript estrito; evitar `any`. Apenas componentes funcionais com hooks.

## Design

O Zyra reproduz o design do projeto original (`challenge-front-end-sprint-3-4/zyra-app`, repositório
privado da Carolina). Ao recriar uma tela, copiar o JSX e as classes do componente de mesmo nome no original,
trocando só os nomes de token da tabela abaixo. Textos da tela também iguais ao original.

Telas já no design original: **Missões** (`/missoes`). As demais (Início, cadastro, detalhe, edição, erro)
ainda usam o visual antigo dentro do `ContainerPagina` (layout de rota em `main.tsx`); ao migrar uma tela,
tirá-la de dentro dele.

### Tokens (definidos no `@theme` de `src/index.css`)

- As cores, tamanhos, raios e breakpoints padrão do Tailwind foram removidos de propósito
  (`bg-blue-500`, `text-sm`, `md:` não existem). Cor e sombra só por token: nenhum hex ou `rgba` solto em
  componente. Tamanhos e espaçamentos podem usar valores arbitrários como no original (`text-[1.5rem]`,
  `px-[1.6rem]`, `max-w-[1300px]`).
- 1rem = 10px (html a 62.5%). `p-4` = 16px, como no Tailwind padrão.
- Breakpoints mobile-first: `mobile-lg:` (481px), `tablet:` (768px), `desktop:` (992px).

Tradução dos nomes do original para o Zyra:

| Original                       | Zyra                                                    |
|--------------------------------|---------------------------------------------------------|
| `font-title` / `font-text`     | `font-titulo` / `font-texto`                            |
| `text-subtitle`                | `text-subtitulo` + `leading-[1.6]` (o do Zyra tem 1.3)  |
| `text-body`                    | `text-corpo-grande`                                     |
| `text-hero`                    | `text-hero`                                             |
| `rounded-[0.8rem]`             | `rounded-controle`                                      |
| `shadow-[... rgba(60,88,74,...)]` | `shadow-cartao`, `shadow-cartao-hover`, `shadow-calculadora`, `shadow-print` |
| `shadow-[... rgba(154,74,97,...)]` | `shadow-botao(-hover)` (0,25/0,35) ou `shadow-botao-forte(-hover)` (0,3/0,4) |
| `text-[#e8a0b4]` / `text-[#f5b7b1]` | `text-destaque-rosa` / `text-erro-claro`           |
| `bg-[rgba(255,255,255,0.0x)]`  | `bg-vidro-campo`, `bg-vidro-cartao`, `bg-vidro-resumo`, `border-vidro-borda` |
| `bg-[rgba(154,74,97,...)]`     | `bg-rosa-translucido`, `border-rosa-translucido-borda`  |
| alertas `#d4edda`, `#f8d7da`...| `sucesso-fundo/borda/texto`, `erro-fundo/borda/texto`   |

Se o original usar uma cor ou sombra que ainda não tem token, criar o token no `@theme` com o valor exato.

### Estrutura de uma página

- O `<main>` do `App` não limita largura: cada `<section>` usa
  `mx-auto w-full max-w-[1300px] px-[1.6rem] pb-[5rem] tablet:px-[3.2rem] tablet:pb-[6rem] desktop:px-[6.4rem] desktop:pb-[8rem]`.
- Seções separadas por `Separador`; cada seção começa com `TituloSecao` (título em Lato, traço embaixo).
- Hero da página: `h1` em Merriweather 900, `text-[2.8rem]` → `tablet:text-[3.6rem]` → `desktop:text-hero`.

### Componentes e cores

- Cards de missão e conquista: `card-shape` + `bg-card-green` + `shadow-cartao`, `hover:scale-[1.06]
  hover:shadow-cartao-hover`. Pontos em `text-hover` ("+50 pts").
- Card da calculadora: `card-shape-alt` + `bg-card-dark-green`; texto `text-text-light-yellow` e `text-card-green`.
- Botão primário (`BotaoPrimario`): `rounded-lg bg-button-pink text-white shadow-botao`, `hover:scale-[1.06]`.
  Botões menores (calcular, tentar novamente): `rounded-controle`, `shadow-botao-forte`, `hover:scale-105`.
- Avisos depois de uma ação: `MensagemRetorno` (centralizado, cores `sucesso-*` / `erro-*`).
- Carregando, erro e vazio: `EstadoRequisicao` (ícone centralizado + texto + "Tentar novamente").
- `forma-folha` é do visual antigo (ainda usado no detalhe da missão); não usar em telas novas.

### Acessibilidade (manter ao copiar)

- `brand` nunca sobre `nav`, `footer` ou `card-dark-green` (contraste ~1,6:1).
- Ícone decorativo com `aria-hidden="true"`; botão só com ícone com `aria-label` em pt-BR com acento.
- Card clicável que é um `Link` inteiro: adicionar `focus-visible:ring-3 focus-visible:ring-brand
  focus-visible:ring-offset-2 focus-visible:ring-offset-bg`.

### Ícones

- Font Awesome 6 Free, carregado por CDN no `index.html`. Cor `text-icon` em fundo claro.
