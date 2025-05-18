const { verificarToken } = require('../utils/jwtUtils'); 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (token == null) {
        return res.status(401).json({ message: "Token não fornecido." }); 
    }

    try {
        
        const user = verificarToken(token); 
        req.user = user; 
        console.log("User do token:", user); 
        next(); 
    } catch (err) {
        console.error("Erro ao verificar o token:", err);  
        if (err.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expirado." }); 
        }
        return res.status(403).json({ message: "Token inválido." });
    }
};

// Middleware para verificar se o usuário é ADM_MASTER
const isAdminMaster = (req, res, next) => {
    if (req.user && req.user.tipo_usuario === "ADM_MASTER") {
        next();
    } else {
        res.status(403).json({ message: "Acesso negado. Requer privilégios de ADM Master." }); // Forbidden
    }
};

module.exports = { authenticateToken, isAdminMaster };
