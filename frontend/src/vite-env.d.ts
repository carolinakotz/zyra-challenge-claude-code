/// <reference types="vite/client" />

// tipa as variáveis de ambiente lidas via import.meta.env
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
