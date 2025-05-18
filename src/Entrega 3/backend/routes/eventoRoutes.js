const express = require('express');
const eventoController = require('../controllers/eventoController');
const upload = require('../middlewares/upload'); 

const router = express.Router();

router.get('/', eventoController.getEventos);
router.get('/:id', eventoController.getEventoById);
router.post('/', upload.single('imagem'), eventoController.createEvento);
router.put('/:id', upload.single('imagem'), eventoController.updateEvento);
router.delete('/:id', eventoController.deleteEvento);
router.get('/usuario/:id', eventoController.getEventosPorUsuario);

module.exports = router;