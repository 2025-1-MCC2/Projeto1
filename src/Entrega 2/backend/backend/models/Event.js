const db = require('../db.js');

class Event {
  static create({ titulo, descricao, imagem, usuario_id }, callback) {
    db.query(
      'INSERT INTO eventos (titulo, descricao, imagem, usuario_id) VALUES (?, ?, ?, ?)',
      [titulo, descricao, imagem, usuario_id],
      callback
    );
  }

  static getAllByUser(usuario_id, callback) {
    db.query('SELECT * FROM eventos WHERE usuario_id = ?', [usuario_id], callback);
  }

  static update(id, { titulo, descricao, imagem }, callback) {
    db.query(
      'UPDATE eventos SET titulo = ?, descricao = ?, imagem = ? WHERE id = ?',
      [titulo, descricao, imagem, id],
      callback
    );
  }

  static delete(id, callback) {
    db.query('DELETE FROM eventos WHERE id = ?', [id], callback);
  }
}

module.exports = Event;