const { Proveedor } = require('../models');

const ctrl = {
  listar: async (req, res) => res.json(await Proveedor.findAll()),
  obtener: async (req, res) => {
    const p = await Proveedor.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    res.json(p);
  },
  crear: async (req, res) => res.status(201).json(await Proveedor.create(req.body)),
  actualizar: async (req, res) => {
    const p = await Proveedor.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: 'No encontrado' });
    await p.update(req.body);
    res.json(p);
  },
  eliminar: async (req, res) => {
    const p = await Proveedor.findByPk(req.params.id);
    if (!p) return res.status(404).json({ mensaje: 'No encontrado' });
    await p.destroy();
    res.json({ mensaje: 'Proveedor eliminado' });
  }
};

module.exports = ctrl;