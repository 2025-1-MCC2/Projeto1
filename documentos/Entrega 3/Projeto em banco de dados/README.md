# 📊 Descrição das Tabelas Implementadas

No banco de dados **InstitutoCriativoDashbord**, foram criadas três tabelas principais: `usuarios`, `mensagens` e `eventos`.

---

## 🔹 1. Tabela `usuarios`

Armazena os dados dos usuários do sistema. Estrutura:

| Campo          | Tipo             | Descrição                                                                                      |
|----------------|------------------|------------------------------------------------------------------------------------------------|
| `id`           | INT              | Chave primária, com AUTO_INCREMENT. Identifica de forma única cada usuário.                     |
| `nome`         | VARCHAR(255)     | Nome completo do usuário. Campo obrigatório (NOT NULL).                                        |
| `email`        | VARCHAR(255)     | E-mail do usuário. Campo obrigatório, único (UNIQUE), garantindo que não haja duplicação.       |
| `senha`        | VARCHAR(255)     | Senha do usuário armazenada como hash para segurança. Campo obrigatório.                        |
| `tipo_usuario` | ENUM             | Tipo do usuário, podendo ser `ADM_MASTER` ou `COLABORADOR`. Campo obrigatório.                  |
| `data_cadastro`| TIMESTAMP        | Data e hora do cadastro do usuário, com valor padrão no momento da inserção.                    |

**Índices:** Para otimização das consultas, há índices nos campos `email` e `tipo_usuario`.

---

## 🔹 2. Tabela `mensagens`

Armazena as mensagens trocadas entre usuários do sistema. Estrutura:

| Campo           | Tipo       | Descrição                                                                                              |
|-----------------|------------|------------------------------------------------------------------------------------------------------|
| `id`            | INT        | Chave primária, com AUTO_INCREMENT. Identificador único da mensagem.                                 |
| `remetente_id`  | INT        | ID do usuário que enviou a mensagem. Chave estrangeira referenciando `usuarios(id)`.                 |
| `destinatario_id`| INT       | ID do usuário que recebeu a mensagem. Chave estrangeira referenciando `usuarios(id)`.                |
| `conteudo`      | TEXT       | Conteúdo textual da mensagem enviada. Campo obrigatório.                                             |
| `data_envio`    | TIMESTAMP  | Data e hora em que a mensagem foi enviada. Valor padrão: momento da inserção.                        |
| `lida`          | BOOLEAN    | Indica se a mensagem já foi lida pelo destinatário. Valor padrão: `false`.                           |

**Índices:** Índices criados para otimizar consultas pelos campos `remetente_id`, `destinatario_id` e `data_envio`.

---

## 🔹 3. Tabela `eventos`

Armazena informações sobre eventos criados no sistema. Estrutura:

| Campo          | Tipo             | Descrição                                                                                      |
|----------------|------------------|------------------------------------------------------------------------------------------------|
| `id`           | INT              | Chave primária com AUTO_INCREMENT.                                                             |
| `titulo`       | VARCHAR(255)     | Título do evento. Campo obrigatório.                                                           |
| `descricao`    | TEXT             | Descrição detalhada do evento. Campo obrigatório.                                               |
| `ano`          | VARCHAR(4)       | Ano ao qual o evento está relacionado. Campo obrigatório.                                       |
| `status`       | ENUM             | Status do evento: `pendente` (padrão) ou `concluido`.                                           |
| `imagem`       | VARCHAR(255)     | Nome do arquivo de imagem associada ao evento, armazenado no servidor.                          |
| `autor_id`     | INT              | ID do usuário que criou o evento. Chave estrangeira referenciando `usuarios(id)`.              |
| `data_criacao` | TIMESTAMP        | Data e hora da criação do evento, com valor padrão no momento da inserção.                      |

---

## 🔗 Relacionamentos entre Tabelas

- A constraint `FOREIGN KEY (autor_id) REFERENCES usuarios(id)` na tabela `eventos` garante que cada evento esteja associado a um usuário válido.
- As foreign keys `remetente_id` e `destinatario_id` em `mensagens` garantem que as mensagens são enviadas e recebidas por usuários existentes.

---

### Funcionalidades Implementadas

✅ Com esses relacionamentos, o sistema permite que usuários autenticados possam:

- Criar, editar e excluir seus próprios eventos.
- Enviar e receber mensagens entre usuários, com controle de leitura.
- Filtrar eventos e mensagens pelo usuário autor ou participante.

---

### Como Funciona na Prática

- O campo `autor_id` em `eventos` identifica quem criou cada evento, permitindo controle de acesso e organização personalizada no painel de cada usuário.
- O sistema usa `remetente_id` e `destinatario_id` para mostrar mensagens específicas de cada conversa, garantindo privacidade e histórico correto.
- Índices otimizam a performance em consultas por e-mail, tipo de usuário, e datas de envio.

