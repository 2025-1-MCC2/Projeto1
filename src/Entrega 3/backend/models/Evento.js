const pool = require('../config/db');

// Função para buscar todos os eventos
const getEventos = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM eventos');
    return rows;
  } catch (err) {
    console.error('Erro ao buscar eventos:', err);
    throw err;
  }
};

// Função para buscar um evento específico pelo ID
const getEventoById = async (id) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM eventos WHERE id = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Erro ao buscar evento:', err);
    throw err;
  }
};

// Função para criar um evento
const createEvento = async (evento) => {
  try {
    const { titulo, descricao, ano, status, imagem, autor_id } = evento;


    const imagemValue = imagem || null;

    const [result] = await pool.execute(
      'INSERT INTO eventos (titulo, descricao, ano, status, imagem, autor_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descricao, ano, status, imagemValue, autor_id]
    );
    return result;
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    throw err;
  }
};

const updateEvento = async (id, evento) => {
  try {
    const { titulo, descricao, ano, status, imagem, autor_id } = evento;


    const tituloValue = titulo ?? null;
    const descricaoValue = descricao ?? null;
    const anoValue = ano ?? null;
    const statusValue = status ?? null;
    const imagemValue = imagem ?? null;  
    const autorIdValue = autor_id ?? null;

   
    const [result] = await pool.execute(
      'UPDATE eventos SET titulo = ?, descricao = ?, ano = ?, status = ?, imagem = ?, autor_id = ? WHERE id = ?',
      [tituloValue, descricaoValue, anoValue, statusValue, imagemValue, autorIdValue, id]
    );

    return result;
  } catch (err) {
    console.error('Erro ao atualizar evento:', err);
    throw err;
  }
};


// Função para excluir um evento
const deleteEvento = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM eventos WHERE id = ?', [id]);
    return result;
  } catch (err) {
    console.error('Erro ao excluir evento:', err);
    throw err;
  }
};


const getEventosPorUsuario = async (autorId) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM eventos WHERE autor_id = ?', [autorId]);
    return rows;
  } catch (err) {
    console.error('Erro ao buscar eventos por autor_id:', err);
    throw err;
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