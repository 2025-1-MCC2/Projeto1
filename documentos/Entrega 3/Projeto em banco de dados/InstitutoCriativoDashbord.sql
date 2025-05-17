

create database InstitutoCriativoDashbord;
use InstitutoCriativoDashbord;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('ADM_MASTER', 'COLABORADOR') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização de consultas
CREATE INDEX idx_email ON usuarios (email);
CREATE INDEX idx_tipo_usuario ON usuarios (tipo_usuario);

CREATE TABLE IF NOT EXISTS mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
);

-- Índices para otimização de consultas
CREATE INDEX idx_remetente ON mensagens (remetente_id);
CREATE INDEX idx_destinatario ON mensagens (destinatario_id);
CREATE INDEX idx_data_envio ON mensagens (data_envio);


CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    ano VARCHAR(4) NOT NULL,
    status ENUM('pendente', 'concluido') NOT NULL DEFAULT 'pendente',
    imagem VARCHAR(255),
    autor_id INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);


select * from eventos
select * from usuarios






