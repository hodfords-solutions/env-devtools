/// <reference types="vite/client" />

interface ImportMetaEnv {
  ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
