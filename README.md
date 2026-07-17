# Onde Nada Nasce

**Onde Nada Nasce** é um RPG de texto de *survival horror* psicológico cósmico, ambientado no Brasil em meados de 1994, durante a transição turbulenta para o Plano Real. Com uma interface retrô que remete aos antigos sistemas de DOS e Monitores CRT, o jogo mescla escolhas clássicas (Árvores de Decisão) com um inovador sistema de **Ações Livres**, interpretado e avaliado dinamicamente pela Inteligência Artificial (Google Gemini), atuando como um implacável Mestre de Jogo.

O horror neste universo não provém de monstros de sangue ou garras, mas do "Vazio" absoluto — uma anomalia cósmica de erosão da realidade. Atributos como Força, Inteligência e a crucial **Sanidade** afetam o peso das suas ações e de suas falhas.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Next.js, React, Zustand (gerenciamento de estado complexo, inventário e cutscenes) e TailwindCSS (com estilos de CRT e scanlines).
- **Backend:** Node.js, Express e PostgreSQL (autenticação de usuários, salvamento no banco de dados e proxy seguro para requisições de IA).
- **Inteligência Artificial:** Integração via SDK oficial `@google/genai` utilizando modelos `gemini-3-flash` e `gemini-2.0-flash` para agir como *Dungeon Master*.
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

1. Dentro da pasta `backend`, faça uma cópia do arquivo `.env.example` e renomeie para `.env`. (Ou crie um do zero).
2. Abra o arquivo `.env` e preencha as variáveis abaixo:

```env
PORT=3001
# URL de conexão com seu banco PostgreSQL
DATABASE_URL=postgres://usuario:senha@host:5432/nome_do_banco
# Assinatura dos tokens
JWT_SECRET=super_secret_key_change_this_in_production
# Origem liberada para o frontend
CORS_ORIGIN=http://localhost:3000

# Chave de API do Google Gemini (Essencial para as Ações Livres)
GEMINI_API_KEY=AIzaSy...
```

> **Nota sobre o Gemini:** Para o jogo gerar as reações dinâmicas e o comportamento dos NPCs perante textos abertos dos jogadores, é obrigatório inserir uma `GEMINI_API_KEY`. Você pode gerar uma no [Google AI Studio](https://aistudio.google.com/app/apikey).
O jogo também possui uma interface `[ CFG ] Opções` in-game para que os jogadores coloquem chaves pessoais customizadas, poupando a chave central (global) configurada neste `.env`.

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
