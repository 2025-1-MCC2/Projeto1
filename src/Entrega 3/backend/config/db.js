const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "instituto_criativo_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Testa a conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso! ID da conexão:", connection.threadId);
  connection.release(); 
});

module.exports = pool.promise();
