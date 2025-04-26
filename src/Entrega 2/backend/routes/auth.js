const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/cadastro', authController.cadastrar);
router.post('/login', authController.login);
router.get('/verify', auth, authController.verificarToken); // ✅ Rota para verificar token

module.exports = router;
