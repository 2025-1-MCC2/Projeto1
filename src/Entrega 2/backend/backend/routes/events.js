const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const auth = require('../middleware/auth'); // Importe o middleware de autenticação
const db = require('../db');

// Configuração do Multer (mantenha esta parte)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Rota GET para listar todos os eventos DO USUÁRIO AUTENTICADO
router.get('/', auth, (req, res) => { // Adicione o middleware auth
    db.query('SELECT * FROM eventos WHERE usuario_id = ? ORDER BY id DESC', [req.user.id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor ao buscar eventos' });
        }
        res.status(200).json({ success: true, data: results });
    });
});

// Rota POST para criar um NOVO evento
router.post('/', auth, upload.single('imagem'), (req, res) => { // Adicione o middleware auth
    try {
        const { titulo, descricao } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Imagem é obrigatória para novo evento' });
        }
        const imagemPath = '/uploads/' + req.file.filename;

        db.query(
            'INSERT INTO eventos (titulo, descricao, imagem, usuario_id) VALUES (?, ?, ?, ?)',
            [titulo, descricao, imagemPath, req.user.id], // Use req.user.id
            (err, result) => {
                if (err) {
                    console.error('Erro ao criar evento:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao criar evento no banco de dados' });
                }
                res.status(201).json({
                    success: true,
                    message: 'Evento criado!',
                    data: { id: result.insertId, titulo, descricao, imagem: imagemPath }
                });
            }
        );
    } catch (error) {
        console.error('Erro geral ao criar evento:', error);
        res.status(500).json({ success: false, message: 'Erro interno ao criar evento' });
    }
});

// Rota PUT para atualizar um evento existente
router.put('/:id', auth, upload.single('imagem'), (req, res) => { // Adicione o middleware auth
    try {
        const { id } = req.params;
        const { titulo, descricao } = req.body;
        let query = 'UPDATE eventos SET titulo = ?, descricao = ?';
        const values = [titulo, descricao];

        if (req.file) {
            const imagemPath = '/uploads/' + req.file.filename;
            query += ', imagem = ?';
            values.push(imagemPath);
        }
        query += ' WHERE id = ? AND usuario_id = ?'; // Garante que só o dono pode atualizar
        values.push(id, req.user.id);

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Erro ao atualizar evento:', err);
                return res.status(500).json({ success: false, message: 'Erro ao atualizar evento no banco de dados' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Evento não encontrado ou você não tem permissão para atualizá-lo' });
            }
            res.status(200).json({ success: true, message: 'Evento atualizado!' });
        });
    } catch (error) {
        console.error('Erro geral ao atualizar evento:', error);
        res.status(500).json({ success: false, message: 'Erro interno ao atualizar evento' });
    }
});

module.exports = router;