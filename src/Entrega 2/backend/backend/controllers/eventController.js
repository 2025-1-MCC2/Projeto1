const Event = require('../models/Event');
const path = require('path');

exports.createEvent = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : '';

    await Event.create({ titulo, descricao, imagem, usuario_id: req.user.id }, (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao criar evento' });
      res.status(201).json({ message: 'Evento criado!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    await Event.getAllByUser(req.user.id, (err, results) => {
      if (err) return res.status(500).json({ error: 'Erro ao buscar eventos' });
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    const imagem = req.file ? `/uploads/${req.file.filename}` : req.body.imagemAtual;

    await Event.update(id, { titulo, descricao, imagem }, (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar evento' });
      res.status(200).json({ message: 'Evento atualizado!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.delete(id, (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao deletar evento' });
      res.status(200).json({ message: 'Evento deletado!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};