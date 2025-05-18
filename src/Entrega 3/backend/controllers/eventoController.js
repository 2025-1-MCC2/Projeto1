const eventoModel = require('../models/Evento');

// Controlador para obter todos os eventos
const getEventos = async (req, res) => {
    try {
        const eventos = await eventoModel.getEventos();
        res.json(eventos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar eventos', error: err.message });
    }
};

// Controlador para obter um evento específico pelo ID
const getEventoById = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoModel.getEventoById(id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json(evento);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar evento', error: err.message });
    }
};

// Controlador para criar um novo evento (VERSÃO CORRIGIDA)
const createEvento = async (req, res) => {
    try {
        const { titulo, descricao, ano, status, autor_id } = req.body;
        const imagem = req.file ? req.file.filename : null; // Já trata o caso de não ter imagem

        if (!titulo || !descricao || !ano || !status || !autor_id) {
            return res.status(400).json({
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }

        const result = await eventoModel.createEvento({
            titulo,
            descricao,
            ano,
            status,
            imagem, 
            autor_id
        });

        res.status(201).json({
            message: 'Evento criado com sucesso',
            id: result.insertId,
            imagem
        });
    } catch (err) {
        console.error('Erro ao criar evento:', err);
        res.status(500).json({
            message: 'Erro ao criar evento',
            error: err.message
        });
    }
};

// Controlador para atualizar um evento
const updateEvento = async (req, res) => {
    const { id } = req.params;
    let { titulo, descricao, ano, status, autor_id } = req.body;
    let imagem = req.file ? req.file.filename : null; 

    try {
     
        if (!titulo || !descricao || !ano || !status || !autor_id) {
            return res.status(400).json({
                message: 'Todos os campos obrigatórios devem ser preenchidos'
            });
        }

   
        const eventoExistente = await eventoModel.getEventoById(id);

        if (!eventoExistente) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

      
        if (!imagem) {
            imagem = eventoExistente.imagem;
        }

        // Atualiza o evento no banco de dados
        const result = await eventoModel.updateEvento(id, {
            titulo,
            descricao,
            ano,
            status,
            imagem, 
            autor_id
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        res.json({ message: 'Evento atualizado com sucesso' });

    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        res.status(500).json({ message: 'Erro ao atualizar evento', error: err.message });
    }
};


// Controlador para excluir um evento
const deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await eventoModel.deleteEvento(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        res.json({ message: 'Evento excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir evento', error: err.message });
    }
};


const getEventosPorUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const eventos = await eventoModel.getEventosPorUsuario(id); 
        res.json(eventos);
    } catch (err) {
        console.error('Erro ao buscar eventos do usuário:', err);
        res.status(500).json({ message: 'Erro ao buscar eventos do usuário', error: err.message });
    }
};

module.exports = {
    getEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento,
    getEventosPorUsuario 
};