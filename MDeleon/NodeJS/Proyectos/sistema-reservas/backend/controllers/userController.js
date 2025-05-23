const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ nombre, email, password: hashed, rol: rol || 'cliente' });
  await user.save();
  res.send('Usuario registrado');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send('Credenciales inválidas');

  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}, 'nombre email rol');
  res.json(users);
};
