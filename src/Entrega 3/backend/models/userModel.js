const pool = require("../config/db"); // Ajuste o caminho se necessário
const bcrypt = require("bcryptjs");

const User = {
    async create(nome, email, senha, tipoUsuario) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const [result] = await pool.query(
            "INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)",
            [nome, email, hashedPassword, tipoUsuario]
        );
        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        return rows[0];
    },

    async findById(id) {
        const [rows] = await pool.query("SELECT id, nome, email, tipo_usuario, data_cadastro FROM usuarios WHERE id = ?", [id]);
        return rows[0];
    },

    async existsAdmin() {
        const [rows] = await pool.query("SELECT COUNT(*) as admin_count FROM usuarios WHERE tipo_usuario = ?", ["ADM_MASTER"]);
        return rows[0].admin_count > 0;
    }
};

module.exports = User;


