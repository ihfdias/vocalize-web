# Vocalize - Plataforma de Comunicação Corporativa


![Vocalize Banner] <img width="2400" height="1350" alt="Captura de tela de 2026-03-24 20-13-52" src="https://github.com/user-attachments/assets/4409fac9-cb22-4819-8089-9516981ebf3c" />


> **Vocalize** é uma plataforma Full-Stack desenvolvida para centralizar, modernizar e proteger o fluxo de comunicação interna de empresas. O sistema substitui murais físicos e e-mails dispersos por um dashboard dinâmico, seguro e responsivo.

**Acesso ao Sistema em Produção:** [Insira o link da Vercel aqui]  
**Status da API:** [Insira o link do Render aqui]/api/status

---

## O Desafio e a Solução
A comunicação empresarial ineficiente gera ruídos e atrasos nos processos. O Vocalize foi arquitetado para resolver esse gargalo, garantindo que comunicados da diretoria, atualizações de TI e avisos de RH cheguem a todos os colaboradores de forma clara e padronizada. 

O sistema conta com um painel de administração blindado, onde apenas usuários com permissões específicas podem redigir e publicar avisos utilizando um editor de texto rico, enquanto os colaboradores consomem a informação em uma interface otimizada para leitura.

## Principais Funcionalidades

- **Autenticação Segura (JWT):** Sistema de login robusto com controle de acesso baseado em cargos (Role-Based Access Control - RBAC). Apenas usuários com a flag `admin` podem gerenciar os comunicados.
- **Editor Rich Text Avançado:** Integração com **React Quill** para formatação visual (WYSIWYG) de comunicados, permitindo listas, negrito, itálico e links estruturados.
- **Segurança contra Ataques XSS:** Implementação da biblioteca **DOMPurify** para higienizar (sanitize) todo o conteúdo HTML injetado, protegendo a aplicação contra scripts maliciosos.
- **Interface Fluida e Responsiva:** UI/UX moderna construída com **Tailwind CSS**, garantindo acessibilidade e leitura confortável em desktops e dispositivos móveis.
- **Dark Mode Nativo:** Suporte completo e integrado a temas claro e escuro para conforto visual do usuário.
- **API RESTful Otimizada:** Backend estruturado seguindo os padrões do Node.js, isolando rotas, controladores e serviços.

---

## Tecnologias Utilizadas

O projeto foi construído utilizando as tecnologias mais modernas e requisitadas do mercado:

### Frontend (Interface)
- **React 19** com **Vite** (Máxima performance de build)
- **TypeScript** (Tipagem estática e segurança de código)
- **Tailwind CSS** (Estilização utilitária e Dark Mode)
- **React Router DOM** (Navegação de página única - SPA)
- **Axios** (Integração assíncrona com a API)
- **React Quill & DOMPurify** (Edição de texto e cibersegurança)

### Backend (API & Lógica)
- **Node.js** com **Express**
- **TypeScript**
- **JSON Web Token (JWT)** & **Bcrypt** (Criptografia e Autenticação)
- **CORS** & **Dotenv** (Segurança de rotas e variáveis de ambiente)

### Banco de Dados & Infraestrutura
- **MongoDB** (Banco de dados NoSQL flexível e escalável)
- **Mongoose** (Modelagem de dados/ODM)
- **Vercel** (Deploy contínuo do Frontend)
- **Render** (Hospedagem em nuvem da API Node.js)
- **MongoDB Atlas** (Cluster de banco de dados na nuvem)

---

## Como Executar o Projeto Localmente

Se você deseja testar a aplicação na sua máquina, siga os passos abaixo:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+)
- [MongoDB](https://www.mongodb.com/) rodando localmente ou uma conta no MongoDB Atlas.

### 1. Clonando os Repositórios

Abra o seu terminal e clone os projetos para a sua máquina:

```bash
# Clone a interface (Frontend)
git clone [https://github.com/ihfdias/vocalize-web.git](https://github.com/ihfdias/vocalize-web.git)

# Clone a API (Backend)
git clone [https://github.com/ihfdias/Vocalize-API.git](https://github.com/ihfdias/Vocalize-API.git)

---

### 2. Configurando o Backend (API)





