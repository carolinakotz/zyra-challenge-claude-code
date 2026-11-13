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

Conceito: natureza + trajeto. Verdes = o que é sustentável (missões, conquistas);
vinho/rosa = marca e ação (botões, links). Cada cor tem papel fixo; não usar como enfeite.

### Tokens (definidos no `@theme` de `src/index.css`)

- Usar só as classes geradas pelos tokens (`bg-nav`, `text-title`, `border-stroke`...). Nenhum hex
  solto em componente. As cores, tamanhos, raios e breakpoints padrão do Tailwind foram removidos
  de propósito: `text-white`, `bg-blue-500`, `text-sm`, `md:` etc. não existem.
- 1rem = 10px (html a 62.5%). O espaçamento continua igual ao Tailwind padrão: `p-4` = 16px.
- Texto: `text-hero` (40px), `text-subtitulo` (28px), `text-titulo-card` (22px),
  `text-corpo-grande` (18px), `text-corpo` (16px), `text-pequeno` (14px).
- Breakpoints mobile-first: `mobile-lg:` (481px), `tablet:` (768px), `desktop:` (992px).
- Larguras: `max-w-conteudo` (1200px) para o miolo da página, `max-w-texto` (68ch) para parágrafos.

### Onde cada cor vai

| Superfície                 | Fundo               | Texto / ícone       |
|----------------------------|---------------------|---------------------|
| Página                     | `bg`                | `text-dark`, `title`|
| Navegação                  | `nav`               | `text-light-yellow` |
| Rodapé                     | `footer`            | `text-light-yellow` |
| Missão disponível          | `card-light-yellow` | `title`, `text-dark`|
| Missão concluída           | `card-green`        | `title`             |
| Informação secundária      | `card-light-green`  | `text-dark`         |
| Destaque (saldo, pontos)   | `card-dark-green`   | `text-light-yellow` |
| Desabilitado / carregando  | `card-gray`         | `separator-dark`    |
| Selo "+pontos"             | `destaque-rosa`     | `title`             |

### Contraste (regras obrigatórias)

- `brand` nunca sobre `nav`, `footer` ou `card-dark-green` (contraste ~1,6:1, ilegível).
- Sobre superfícies escuras, texto sempre `text-light-yellow`.
- `erro` só para borda, ícone e anel de foco; texto de erro usa `erro-texto` (`erro` sobre `bg` não
  atinge 4,5:1).
- `separator-light` só decorativo; borda de input usa `separator-dark`.

### Tipografia

- Títulos: Merriweather (`font-titulo`, já aplicada em h1–h6) peso 700; o hero pode usar 900.
  Itálico 300 só para frases de impacto (ex.: o efeito de uma missão), nunca para destacar uma
  palavra solta dentro de um título.
- Texto: Lato (fonte padrão do body) peso 400; 300 em `text-corpo-grande`; 700 em botões.
- Alinhado à esquerda; parágrafos com `max-w-texto`. Frases em caixa normal, sem rótulos em CAIXA ALTA.
- No mobile, títulos de página usam `text-subtitulo`; `text-hero` só a partir de `tablet:`.

### Formas

- Botões: `rounded-full`. Inputs: `rounded-controle`. Cards comuns: `rounded-cartao`.
- Card de missão: `forma-folha` (assinatura visual do Zyra; não usar em outros cards).
- Sem sombras: a profundidade vem do preenchimento dos cards. Sem gradientes.

### Estados

- Botão primário: `bg-button-pink text-text-light-yellow`, `hover:bg-brand`.
- Link: `text-brand`, `hover:text-hover hover:underline`.
- Item da navegação: `hover:bg-hover`.
- Card clicável: `border-2 border-transparent`, `hover:border-stroke`. Card não clicável não tem hover.
- Foco sempre visível com `focus-visible:`: em fundo claro `ring-3 ring-brand ring-offset-2
  ring-offset-bg`; em fundo escuro `ring-destaque-rosa`.
- Desabilitado: `bg-card-gray text-separator-dark cursor-not-allowed`.
- Transições curtas (`duration-150`) e sempre com `motion-reduce:transition-none`.

### Feedback

- Alerta de erro: `bg-erro-fundo border border-erro-borda text-erro-texto` + ícone `fa-circle-exclamation`.
- Alerta de sucesso: `bg-sucesso-fundo border border-sucesso-borda text-sucesso-texto` + ícone
  `fa-circle-check`.
- Campo com erro: `border-erro` e mensagem em `text-pequeno text-erro-texto` logo abaixo.

### Ícones

- Font Awesome 6 Free, carregado por CDN no `index.html`. Cor `text-icon` em fundo claro.
- Ícone decorativo: `aria-hidden="true"`. Botão só com ícone: `aria-label` em pt-BR com acento.
