
# 📦 Product Catalog API

API RESTful desenvolvida com Node.js, Express e SQLite para gerenciar um catálogo de produtos. Possui autenticação via JWT, validações de dados com Zod e envio automático de e-mail ao cadastrar um novo produto.

## 🚀 Funcionalidades
- ✅ Cadastro de usuários com autenticação (JWT)
- ✅ Login de usuários
- ✅ CRUD completo de produtos (criar, listar, buscar por ID, atualizar e excluir)
- ✅ Busca de produtos por nome ou categoria
- ✅ Validação de dados com Zod
- ✅ Envio de e-mail automático ao cadastrar um produto
- ✅ Proteção de rotas autenticadas
- ✅ Relacionamento entre usuários e produtos (cada produto pertence a um usuário)

## 🛠️ Tecnologias e Ferramentas
- Node.js
- Express
- SQLite3
- Zod (validação de dados)
- JWT (autenticação)
- Bcrypt (hash de senhas)
- Nodemailer (envio de e-mails)
- Dotenv (variáveis de ambiente)

## 🔗 Dependências
```bash
npm install express sqlite3 jsonwebtoken bcrypt zod dotenv nodemailer
```

## 🏗️ Estrutura de Pastas
```
src/
├── config/                # Configurações do banco de dados
├── controller/            # Controladores (lógica das rotas)
├── middleware/            # Middlewares de validação e autenticação
├── repositories/          # Repositórios (acesso ao banco de dados)
├── schema/                # Esquemas de validação Zod
├── service/               # Regras de negócio e envio de e-mail
├── routes/                # Definição das rotas
├── database.sqlite        # Banco de dados SQLite
```

## 🔑 Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
SECRET_JWT=sua_chave_secreta
EMAIL=seu_email@gmail.com
PASS=sua_senha_do_email
```

⚠️ Importante: Se estiver usando Gmail, será necessário gerar uma senha de app nas configurações de segurança da sua conta Google.

## 📝 Documentação das Rotas

### 🔑 Usuários
| Método | Rota          | Descrição                  | Auth |
|--------|----------------|----------------------------|------|
| POST   | /users         | Criar um novo usuário      | ❌   |
| POST   | /users/login   | Login do usuário (token)   | ❌   |
| GET    | /users         | Listar todos os usuários   | ✅   |
| GET    | /users/:id     | Buscar usuário por ID      | ✅   |
| PATCH  | /users/:id     | Atualizar usuário          | ✅   |
| DELETE | /users/:id     | Deletar usuário            | ✅   |

### 📦 Produtos
| Método | Rota                    | Descrição                                    | Auth |
|--------|--------------------------|-----------------------------------------------|------|
| POST   | /products                | Criar um novo produto (envia e-mail)         | ✅   |
| GET    | /products                | Listar todos os produtos                     | ✅   |
| GET    | /products/:id            | Buscar produto por ID                        | ✅   |
| PATCH  | /products/:id            | Atualizar produto                            | ✅   |
| DELETE | /products/:id            | Deletar produto                              | ✅   |
| GET    | /products/search?search= | Buscar produtos por nome ou categoria        | ✅   |

## 🔒 Autenticação
A autenticação é feita via JWT (Bearer Token).

Após o login (`/users/login`), inclua o token no header das requisições protegidas:

```
Authorization: Bearer seu_token_aqui
```

## 📧 Envio de E-mail
Sempre que um produto é cadastrado, o sistema envia um e-mail automático para o usuário que realizou o cadastro, informando os detalhes do produto.

## 🗄️ Banco de Dados
O projeto utiliza SQLite, um banco de dados leve e local. As tabelas são criadas automaticamente na primeira execução, caso não existam.

## ▶️ Como Executar o Projeto

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis no arquivo `.env`.

Inicie o servidor:

```bash
npm run dev
```

O servidor estará rodando em:

👉 http://localhost:3001

## 👨‍💻 Autor
Feito por Israel Felipe

🔗 [LinkedIn](https://www.linkedin.com/in/israelbrands/)
🔗 [GitHub](https://github.com/Israel-ops-cmd)

