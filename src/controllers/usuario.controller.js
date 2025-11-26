const { Usuario } = require('../models');

exports.registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const { contraseña, ...sinPass } = usuario.toJSON();
    res.status(201).json(sinPass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { nombre, contraseña } = req.body;
  const usuario = await Usuario.findOne({ where: { nombre } });
  if (!usuario || !(await usuario.validPassword(contraseña))) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
  const { contraseña: _, ...datos } = usuario.toJSON();
  res.json({ mensaje: 'Login exitoso', usuario: datos });
};

exports.listar = async (req, res) => res.json(await Usuario.findAll({ attributes: { exclude: ['contraseña'] } }));