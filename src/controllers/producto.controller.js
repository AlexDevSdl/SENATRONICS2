const { Producto, Proveedor, Almacen } = require('../models');

exports.listar = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        { model: Proveedor, as: 'proveedor', attributes: ['nombre'] },
        { model: Almacen, as: 'almacen', attributes: ['nombre', 'ubicacion'] }
      ]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Proveedor, as: 'proveedor' }, { model: Almacen, as: 'almacen' }]
    });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};