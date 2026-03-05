# 🐶 DogVue — Rede Social de Cachorros

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-4.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Vuex-4-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" />
</p>

## 📋 Sobre o Projeto

**DogVue** é uma rede social temática de cachorros, onde usuários podem criar contas, postar fotos dos seus pets e interagir com o feed de publicações. O projeto é baseado no curso da [Origamid](https://www.origamid.com/) (originalmente feito em React), e está sendo **reconstruído em Vue.js 3** com uma **API própria** desenvolvida por mim.

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| **Vue.js 3** | Framework JavaScript progressivo para construção de interfaces |
| **TypeScript** | Tipagem estática para maior segurança e produtividade |
| **Vite** | Build tool rápido para desenvolvimento moderno |
| **Vue Router 4** | Gerenciamento de rotas com navegação protegida |
| **Vuex 4** | Gerenciamento de estado global da aplicação |
| **Axios** | Cliente HTTP para consumo da API |
| **Bootstrap 5** | Framework CSS para estilização responsiva |

## ✨ Funcionalidades

- 🔐 **Autenticação** — Login, cadastro e recuperação de senha com JWT
- 👤 **Perfil do Usuário** — Painel com informações e estatísticas da conta
- 📸 **Postar Fotos** — Upload de fotos dos seus cachorros
- 📰 **Feed** — Visualização das publicações da comunidade
- 🛡️ **Rotas Protegidas** — Navegação com guard para áreas autenticadas
- ⚠️ **Tratamento de Erros** — Páginas de erro e notificações amigáveis

## 📂 Estrutura do Projeto

```
src/
├── assets/              # Estilos globais (CSS)
├── components/
│   ├── Header.vue       # Cabeçalho da aplicação
│   ├── Footer.vue       # Rodapé da aplicação
│   ├── error/           # Componentes de erro (NotFound, Notificação)
│   └── feed/            # Componente de feed de publicações
├── models/              # Interfaces TypeScript (Usuario, Login)
├── router/              # Configuração de rotas (Vue Router)
├── service.ts           # Configuração do Axios e chamadas à API
├── store.ts             # Estado global com Vuex
└── views/
    ├── HomeView.vue     # Página inicial
    ├── Login/           # Telas de login, cadastro e recuperação de senha
    └── usuario/         # Painel do usuário, posts e estatísticas
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16+)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/DogVue.git

# Acesse a pasta do projeto
cd DogVue

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🗺️ Rotas da Aplicação

| Rota | Descrição | Autenticação |
|---|---|---|
| `/` | Página inicial (Home) | ❌ |
| `/login/entrar` | Formulário de login | ❌ |
| `/login/cadastro` | Cadastro de novo usuário | ❌ |
| `/login/perdeu` | Recuperação de senha | ❌ |
| `/conta` | Painel do usuário | ✅ |
| `/conta/criarpost` | Criar nova publicação | ✅ |
| `/conta/estatisticas` | Estatísticas do usuário | ✅ |

## 🎯 Origem do Projeto

Este projeto é inspirado no curso **Dogs** da [Origamid](https://www.origamid.com/), originalmente desenvolvido em **React**. A proposta aqui é reconstruí-lo do zero utilizando **Vue.js 3** com **TypeScript**, aplicando boas práticas de componentização, gerenciamento de estado e consumo de APIs — integrando com uma **API REST construída por mim**.

## 📄 Licença

Este projeto é apenas para fins de estudo e portfólio.

---

<p align="center">Feito com 💚 e Vue.js</p>
