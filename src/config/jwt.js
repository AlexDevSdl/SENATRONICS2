// src/config/jwt.js
module.exports = {
    secret: 'tu_secreto_super_secreto_123456', // cámbialo en producción
    expiresIn: '8h',           // token válido 8 horas
    refreshExpiresIn: '7d'     // refresh token 7 días (opcional futuro)
  };