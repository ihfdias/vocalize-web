# Vocalize Web

> Frontend da plataforma Vocalize para comunicação corporativa interna.

## Visão Geral

O Vocalize Web é uma SPA construída com React, Vite e TypeScript para exibir comunicados corporativos e permitir que administradores criem, editem e excluam avisos com autenticação.

## Funcionalidades

- Listagem pública de comunicados
- Visualização detalhada de cada comunicado
- Login administrativo
- Criação, edição e exclusão de comunicados
- Sanitização de HTML com `DOMPurify`
- Dark mode

## Stack

- React 19
- Vite
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- SweetAlert2
- React Quill

## Configuração

### Pré-requisitos

- Node.js 18 ou superior

### Variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e ajuste se necessário:

```bash
cp .env.example .env
```

Variável disponível:

- `VITE_API_URL`: URL base da API. Exemplo padrão: `https://vocalize-api.onrender.com/api`

## Executando localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy

O projeto está preparado para deploy na Vercel com suporte a rotas SPA via `rewrites` no arquivo `vercel.json`.

## Observações

- As rotas administrativas no frontend exigem token e perfil `admin`.
- A validação final deve incluir testes de `build` e `lint` em um ambiente com Node.js instalado.








