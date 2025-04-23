// app.js ou server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events'); // Rota de eventos

dotenv.config();

const app = express();

// Configurações do servidor
app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://127.0.0.1:5501',
        'http://localhost:3000',
        'http://localhost:5500',
        'http://localhost:5501'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); // Rota de eventos

// Rota de fallback para erro 404
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

// Error handling centralizado
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({ success: false, message: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});