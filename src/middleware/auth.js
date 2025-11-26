// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  jwt.verify(token, secret, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
    req.usuario = usuario; // guardamos los datos del usuario en la request
    next();
  });
};

// Middleware para rol específico
const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo admin' });
  }
  next();
};

const soloAdminOGerente = (req, res, next) => {
  if (!['admin', 'gerente'].includes(req.usuario.rol)) {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo admin o gerente' });
  }
  next();
};

module.exports = { verificarToken, soloAdmin, soloAdminOGerente };