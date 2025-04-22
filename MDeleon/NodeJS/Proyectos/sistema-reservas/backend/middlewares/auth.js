const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Token faltante');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).send('Token inválido');
  }
}

function isAdmin(req, res, next) {
  if (req.user.rol !== 'admin') return res.status(403).send('Solo admin');
  next();
}

module.exports = { auth, isAdmin };
