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
└── hooks/                 # hooks customizados (useMissoes, useUsuario...)
```

## Regras

- **Componentes em pastas**: cada componente tem sua pasta em PascalCase, com o `.tsx` de mesmo nome
  e um `index.ts` que o reexporta. Importar pela pasta: `import CartaoMissao from '../components/CartaoMissao'`.
- **Chamadas de API só em `services/`**: componentes e páginas nunca chamam `fetch` diretamente;
  usam funções dos services (ex.: `listarMissoes()`, `recarregarCartao(...)`).
- A URL da API vem de `import.meta.env.VITE_API_URL`. Nenhuma credencial de banco existe no frontend.
- Estilos somente com classes do Tailwind; evitar CSS avulso.

## Idiomas e nomes

Ver seção "Idiomas" no `CLAUDE.md` da raiz.

- Componentes, páginas, funções, variáveis e tipos em português **sem acento**:
  `CartaoMissao`, `PaginaPerfil`, `listarMissoes`, `nomeMissao`.
- Textos que aparecem na tela (títulos, botões, mensagens de erro e sucesso) em português **com acento**:
  `"Missão concluída!"`, `"Saldo insuficiente."`.
- Componentes e páginas em PascalCase; services em camelCase com sufixo `Service` (`missaoService.ts`);
  hooks com prefixo `use` (`useMissoes`).
- Tipos com os mesmos nomes dos DTOs do backend (`MissaoSaidaDTO`, `MissaoEntradaDTO`).
- Comentários em português simples.
- TypeScript estrito; evitar `any`. Apenas componentes funcionais com hooks.
