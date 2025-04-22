# Sistema de Agendamento de Banhos em Pet Shop

Sistema web completo para cadastro de usuários, login seguro e agendamento de banhos em petshop, com upload de imagens dos pets.

## Tecnologias utilizadas

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express
- Banco de dados: MySQL
- Autenticação: JWT
- Criptografia: Bcrypt
- Upload de imagens: Multer

## Como rodar o sistema

1. **Pré-requisitos**
   - Node.js instalado
   - MySQL instalado e rodando
   - Git instalado (opcional)

2. **Configuração do banco de dados**
   - Crie um banco de dados MySQL chamado `petshop`
   - Importe o arquivo `banco_petshop.sql` para criar as tabelas necessárias

3. **Configuração do backend**
   - Navegue até a pasta `backend`
   - Crie um arquivo `.env` com as configurações do banco de dados (veja o exemplo abaixo)
   - Instale as dependências: `npm install`
   - Inicie o servidor: `node server.js`

4. **Configuração do frontend**
   - Abra os arquivos HTML diretamente no navegador ou use um servidor local como o Live Server do VSCode
   - Certifique-se de que o backend está rodando na porta 5000 (ou ajuste as URLs no frontend)

## Exemplo de arquivo .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=petshop
JWT_SECRET=yourjwtsecretkey
PORT=5000

## Funcionalidades implementadas

- Cadastro de usuários com email e senha criptografada
- Login com JWT
- CRUD completo de agendamentos de banho
- Upload de imagens dos pets
- Visualização de agendamentos
- Mostrar/esconder senha nos formulários (ponto extra)
- Preview da imagem antes do upload (ponto extra)

## Screenshots

[Inclua screenshots ou descrições das telas aqui]