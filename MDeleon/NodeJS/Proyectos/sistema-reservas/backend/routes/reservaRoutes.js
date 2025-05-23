const express = require('express');
const {
  crearReserva,
  obtenerReservasUsuario,
  editarReserva,
  eliminarReserva,
  obtenerTodasLasReservas
} = require('../controllers/reservaController');
const { auth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, crearReserva);
router.get('/', auth, obtenerReservasUsuario);
router.put('/:id', auth, editarReserva);
router.delete('/:id', auth, eliminarReserva);
router.get('/admin', auth, isAdmin, obtenerTodasLasReservas);

module.exports = router;
