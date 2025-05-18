const jwt = require('jsonwebtoken');

const gerarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { gerarToken, verificarToken };
