const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Função para cadastrar um novo usuário
exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
    }

    // Verifica se o e-mail já está cadastrado
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Erro no servidor" });

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "Email já cadastrado" });
        }

        const hashedSenha = await bcrypt.hash(senha, 10);
        db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedSenha],
            (err, result) => {
                if (err) return res.status(500).json({ success: false, message: "Erro ao cadastrar usuário" });

                res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso" });
            }
        );
    });
};

// Função para login
exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Erro no servidor" });

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: "Usuário não encontrado" });
        }

        const usuario = results[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ success: false, message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || "segredo", { expiresIn: '2h' });

        res.status(200).json({
            success: true,
            message: "Login bem-sucedido",
            token,
            nome: usuario.nome
        });
    });
};

exports.verificarToken = (req, res) => {
    res.status(200).json({ success: true, message: "Token válido", user: req.user });
};
