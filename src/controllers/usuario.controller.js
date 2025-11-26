// src/controllers/usuario.controller.js
const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Registro (igual que antes, pero sin devolver contraseña)
exports.registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const { contraseña, ...sinPass } = usuario.toJSON();
    res.status(201).json(sinPass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN CON JWT
exports.login = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    const usuario = await Usuario.findOne({ where: { nombre } });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const valido = await usuario.validPassword(contraseña);
    if (!valido) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      secret,
      { expiresIn }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar usuarios (solo admin)
exports.listar = async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: { exclude: ['contraseña'] }
  });
  res.json(usuarios);
};