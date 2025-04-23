const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Cadastro
exports.cadastrar = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error("Erro ao verificar e-mail:", err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);

      db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Erro ao cadastrar usuário:", err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
          }

          console.log("Usuário cadastrado com sucesso:", email);
          res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
      );
    } catch (err) {
      console.error("Erro ao gerar hash da senha:", err);
      return res.status(500).json({ message: 'Erro ao processar senha.' });
    }
  });
};

// Login
exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const usuario = results[0];

    // Logs de verificação
    console.log("Tentativa de login para:", email);
    console.log("Senha digitada:", senha);
    console.log("Senha no banco:", usuario.senha);

    try {
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Login realizado com sucesso.', token });

    } catch (err) {
      console.error("Erro ao comparar senhas:", err);
      return res.status(500).json({ message: 'Erro ao verificar a senha.' });
    }
  });
};
