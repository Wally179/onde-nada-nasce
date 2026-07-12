# Onde Nada Nasce

Um projeto de narrativa interativa e RPG baseado em texto, com um sistema de status (HUD) dinâmico e salvamento de progresso.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Next.js, React, Zustand (gerenciamento de estado), e TailwindCSS.
- **Backend:** Node.js, Express, e banco de dados PostgreSQL.
- **Ferramentas:** `concurrently` para rodar o frontend e o backend simultaneamente no ambiente de desenvolvimento.

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **PostgreSQL** rodando localmente ou em um serviço de nuvem (como Render, Supabase, etc).

## 🛠️ Configuração e Instalação

Siga os passos abaixo para rodar o projeto localmente:

### 1. Instalar as dependências

Você precisará instalar as dependências tanto do frontend (na raiz) quanto do backend:

```bash
# Instala as dependências do frontend
npm install

# Instala as dependências do backend
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

O backend precisa de acesso ao banco de dados PostgreSQL.

1. Dentro da pasta `backend`, faça uma cópia do arquivo `.env.example` e renomeie para `.env`.
2. Abra o arquivo `.env` e preencha a variável `DATABASE_URL` com a string de conexão do seu banco de dados:

```env
PORT=3001
DATABASE_URL=postgres://usuario:senha@host:5432/nome_do_banco
JWT_SECRET=super_secret_key_change_this_in_production
CORS_ORIGIN=http://localhost:3000
```

> **Nota sobre Migrations:** Você não precisa rodar nenhum comando de migration. O backend está configurado para criar automaticamente as tabelas necessárias (`users` e `saves`) sempre que o servidor for iniciado.

### 3. Rodar o Projeto

Volte para a pasta raiz do projeto e execute o comando de desenvolvimento integrado:

```bash
# (certifique-se de estar na raiz do projeto)
npm run dev:all
```

Esse comando faz o seguinte:
- Inicia a API (Backend) em `http://localhost:3001`
- Inicia a Interface (Frontend) em `http://localhost:3000`

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o projeto funcionando!

## 📁 Estrutura do Projeto

- `/src`: Código do frontend (componentes React, páginas do Next.js, store do Zustand).
- `/backend`: Código do servidor (rotas Express, conexão com banco de dados em `db.js`).
