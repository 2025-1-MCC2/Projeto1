const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Validação de e-mail
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Endpoint para obter todos os usuários
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const [users] = await db.query(
      "SELECT id, nome, email FROM usuarios WHERE id != ?",
      [userId]
    );
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ 
      error: "Erro interno ao listar usuários",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint para atualizar o perfil do usuário
router.put("/profile", authenticateToken, async (req, res) => {
  const { nome, email } = req.body;


  if (!nome || !email) {
    return res.status(400).json({ 
      error: "Dados incompletos",
      details: "Nome e e-mail são obrigatórios" 
    });
  }

  if (nome.length < 3 || nome.length > 50) {
    return res.status(400).json({
      error: "Nome inválido",
      details: "O nome deve ter entre 3 e 50 caracteres"
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: "E-mail inválido",
      details: "Por favor, insira um e-mail válido"
    });
  }

  const connection = await db.getConnection();

  try {
    const userId = req.user.userId;

    // Verificar conflito de e-mail
    const [existingUser] = await connection.query(
      "SELECT id FROM usuarios WHERE email = ? AND id != ?", 
      [email, userId]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({ 
        error: "E-mail em uso",
        details: "Este e-mail já está sendo usado por outro usuário" 
      });
    }

    await connection.beginTransaction();

    const [result] = await connection.query(
      "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
      [nome, email, userId]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ 
        error: "Usuário não encontrado" 
      });
    }

    const [updatedUser] = await connection.query(
      "SELECT id, nome, email, tipo_usuario FROM usuarios WHERE id = ?",
      [userId]
    );

    await connection.commit();
    connection.release();

    res.json({
      message: "Perfil atualizado com sucesso",
      user: updatedUser[0]
    });

  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ 
      error: "Erro interno ao atualizar perfil",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
