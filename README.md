# 🧠 Taskflow

**Taskflow** é uma aplicação **Fullstack** para gerenciamento de tarefas e fluxos de trabalho, com autenticação segura, interface moderna e APIs robustas. O sistema é dividido em dois diretórios:

- 📦 `taskflow-api` → Backend com **NestJS**, **TypeORM**, e banco de dados **PostgreSQL** containerizado.
- 🖥 `client` → Frontend construído com **React 19**, **Ant Design 5**, e **Vite**.

---

## 📦 Tecnologias Utilizadas

### 🛠 Backend (`taskflow-api`)

- [NestJS](https://nestjs.com/) — framework Node.js para construir aplicações escaláveis  
- [TypeORM](https://typeorm.io/) — ORM para conexão com o banco de dados  
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional  
- [Zod](https://zod.dev/) — validação e parsing de dados  
- [JWT](https://jwt.io/) — autenticação com tokens  
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) — hash de senhas  
- [Swagger](https://swagger.io/) — documentação automática da API  
- Outros utilitários: Helmet, Cookie Parser, Day.js, Config, etc.

---

#### 🐘 Banco de Dados com Podman

Nesse projeto eu utilizei o **Podman** em vez de Docker, você pode subir o container do PostgreSQL com o comando abaixo:

```bash
podman run -d \
  --name taskflow-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=taskflow \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  docker.io/library/postgres:latest
```

### 🎨 Frontend (`client`)

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Ant Design 5](https://ant.design/) — biblioteca de componentes UI
- [React Router v7](https://reactrouter.com/) — roteamento SPA
- [Axios](https://axios-http.com/) — chamadas HTTP com suporte a interceptadores

---

## 📦 Ambiente de Desenvolvimento

---

## 🚀 Como Rodar Localmente

### 🐘 Pré-requisitos

- Node.js v18+
- Docker (ou Podman)
- Yarn ou NPM

---

### 🔧 Backend

#### 📁 Instalação

```bash
cd taskflow-api
npm install
```

#### ▶️ Rodar o servidor

```bash
npm run dev
```

#### 📄 Documentação da API

Após o servidor estar rodando, acesse:

```
http://localhost:3000/api
```

> Aqui está a documentação Swagger da API com todos os endpoints.

---

### 💻 Frontend

#### 📁 Instalação

```bash
cd client
npm install
```

#### ▶️ Iniciar o projeto

```bash
npm run dev
```

> A aplicação será acessível em `http://localhost:5173`.

---

## 🧪 Testes

O backend possui cobertura de testes com **Jest**:

```bash
npm run test
```

---

## 📌 Observações

- Os dados sensíveis como senhas e JWTs são protegidos e validados com boas práticas de segurança.
- A API foi modularizada seguindo os princípios do NestJS, facilitando manutenção e escalabilidade.
- O frontend é responsivo e utiliza componentes prontos do Ant Design com customizações de estilo.

