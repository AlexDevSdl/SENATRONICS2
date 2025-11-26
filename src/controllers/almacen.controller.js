const { Almacen } = require('../models');

module.exports = {
  listar: async (req, res) => res.json(await Almacen.findAll()),
  obtener: async (req, res) => {
    const a = await Almacen.findByPk(req.params.id);
    if (!a) return res.status(404).json({ mensaje: 'Almacén no encontrado' });
    res.json(a);
  },
  crear: async (req, res) => res.status(201).json(await Almacen.create(req.body)),
  actualizar: async (req, res) => {
    const a = await Almacen.findByPk(req.params.id);
    if (!a) return res.status(404).json({ mensaje: 'No encontrado' });
    await a.update(req.body);
    res.json(a);
  },
  eliminar: async (req, res) => {
    const a = await Almacen.findByPk(req.params.id);
    if (!a) return res.status(404).json({ mensaje: 'No encontrado' });
    await a.destroy();
    res.json({ mensaje: 'Almacén eliminado' });
  }
};