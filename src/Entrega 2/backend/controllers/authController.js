const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';

exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: 'Preencha todos os campos' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar e-mail:', err);
            return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            return res.status(409).json({ success: false, message: 'E-mail já cadastrado' });
        }

        const hashedPassword = bcrypt.hashSync(senha, 10);

        db.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
                }

                res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso' });
            }
        );
    });
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        const usuario = results[0];
        const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({
            success: true,
            token,
            nome: usuario.nome,
            usuarioId: usuario.id
        });
    });
};

// ✅ Esta função estava faltando!
exports.verificarToken = (req, res) => {
    res.status(200).json({ success: true, message: 'Token válido' });
};
