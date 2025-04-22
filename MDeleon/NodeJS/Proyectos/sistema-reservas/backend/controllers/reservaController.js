const Reserva = require('../models/Reserva');

exports.crearReserva = async (req, res) => {
  const { fecha, hora, lugar } = req.body;
  const reserva = new Reserva({ fecha, hora, lugar, usuario: req.user._id });
  await reserva.save();
  res.send('Reserva creada');
};

exports.obtenerReservasUsuario = async (req, res) => {
  const reservas = await Reserva.find({ usuario: req.user._id });
  res.json(reservas);
};

exports.editarReserva = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, lugar } = req.body;
  await Reserva.findOneAndUpdate({ _id: id, usuario: req.user.id }, { fecha, hora, lugar });
  res.send('Reserva actualizada');
};

exports.eliminarReserva = async (req, res) => {
  const { id } = req.params;
  await Reserva.findOneAndDelete({ _id: id, usuario: req.user.id });
  res.send('Reserva eliminada');
};

exports.obtenerTodasLasReservas = async (req, res) => {
  const reservas = await Reserva.find().populate('usuario', 'nombre email');
  res.json(reservas);
};
