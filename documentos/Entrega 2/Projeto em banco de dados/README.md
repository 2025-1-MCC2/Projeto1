# 📊 Descrição das Tabelas Implementadas

No banco de dados `instituto_criativo`, foram criadas duas tabelas principais: `usuarios` e `eventos`.

## 🔹 1. Tabela `usuarios`

Armazena os dados dos usuários do sistema. Estrutura:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Chave primária, com AUTO_INCREMENT. Identifica de forma única cada usuário. |
| `nome` | VARCHAR(100) | Nome completo do usuário. Campo obrigatório (NOT NULL). |
| `email` | VARCHAR(100) | E-mail do usuário. Campo obrigatório e com restrição UNIQUE, garantindo que não haja duplicação de e-mails. |
| `senha` | VARCHAR(255) | Senha do usuário (armazenada de forma criptografada). Campo obrigatório. |

## 🔹 2. Tabela `eventos`

Armazena informações sobre os eventos criados no sistema. Estrutura:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | Chave primária com AUTO_INCREMENT. |
| `titulo` | VARCHAR(255) | Título do evento. Campo obrigatório. |
| `descricao` | TEXT | Descrição detalhada do evento. Campo obrigatório. |
| `imagem` | VARCHAR(255) | Caminho ou nome do arquivo de imagem relacionado ao evento. Campo obrigatório. |
| `usuario_id` | INT | ID do usuário que criou o evento. Campo obrigatório. Chave estrangeira que referencia `usuarios(id)`, garantindo a integridade referencial. |
| `data_criacao` | TIMESTAMP | Armazena a data e hora de criação do evento. Valor padrão: CURRENT_TIMESTAMP. |
