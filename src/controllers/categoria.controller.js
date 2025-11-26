const { Categoria } = require('../models');

exports.listar = async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
};

exports.obtener = async (req, res) => {
  const cat = await Categoria.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
  res.json(cat);
};

exports.crear = async (req, res) => {
  const cat = await Categoria.create(req.body);
  res.status(201).json(cat);
};

exports.actualizar = async (req, res) => {
  const cat = await Categoria.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ mensaje: 'No encontrada' });
  await cat.update(req.body);
  res.json(cat);
};

exports.eliminar = async (req, res) => {
  const cat = await Categoria.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ mensaje: 'No encontrada' });
  await cat.destroy();
  res.json({ mensaje: 'Categoría eliminada' });
};