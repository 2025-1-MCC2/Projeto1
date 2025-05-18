const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Função simples para verificar a força da senha (exemplo)
const isStrongPassword = (password) => {
    // Mínimo de 8 caracteres, 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    return strongRegex.test(password);
};

exports.register = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario } = req.body;

        if (!nome || !email || !senha || !tipo_usuario) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        if (tipo_usuario !== "ADM_MASTER" && tipo_usuario !== "COLABORADOR") {
            return res.status(400).json({ message: "Tipo de usuário inválido." });
        }

        if (!isStrongPassword(senha)) {
            return res.status(400).json({
                message: "Senha fraca. A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
            });
        }

        if (tipo_usuario === "ADM_MASTER") {
            const adminExists = await User.existsAdmin();
            if (adminExists) {
                return res.status(400).json({ message: "Já existe um ADM Master cadastrado." });
            }
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Este e-mail já está cadastrado." });
        }

        const userId = await User.create(nome, email, senha, tipo_usuario);
        res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId });

    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: "Erro interno do servidor ao tentar registrar usuário.", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." }); // E-mail não encontrado
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciais inválidas." }); // Senha incorreta
        }

        const token = jwt.sign(
            { userId: user.id, tipo_usuario: user.tipo_usuario },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } 
        );

        // Não retornar a senha
        const { senha: _, ...userWithoutPassword } = user;

        res.status(200).json({
            message: "Login bem-sucedido!",
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: "Erro interno do servidor ao tentar fazer login.", error: error.message });
    }
};

