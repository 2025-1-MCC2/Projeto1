const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota de Registro (Pública)
router.post("/register", authController.register);

// Rota de Login (Pública)
router.post("/login", authController.login);

module.exports = router;
