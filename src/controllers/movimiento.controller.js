// src/controllers/movimiento.controller.js
const { MovimientoInventario, Producto } = require('../models');

const listar = async (req, res) => {
  try {
    const movimientos = await MovimientoInventario.findAll({
      include: [{ model: Producto, attributes: ['nombre', 'marca', 'modelo'] }],
      order: [['fecha', 'DESC']]
    });
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crear = async (req, res) => {
  try {
    const { id_producto, tipo_movimiento, cantidad, usuario_responsable = 'Sistema', motivo } = req.body;

    const producto = await Producto.findByPk(id_producto);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Validación de stock en salidas
    if (tipo_movimiento === 'salida' && producto.stock_actual < cantidad) {
      return res.status(400).json({ mensaje: 'Stock insuficiente' });
    }

    // Crear el movimiento
    const movimiento = await MovimientoInventario.create({
      id_producto,
      tipo_movimiento,
      cantidad,
      usuario_responsable,
      motivo
    });

    // Actualizar stock del producto
    if (tipo_movimiento === 'entrada') {
      producto.stock_actual += cantidad;
    } else if (tipo_movimiento === 'salida') {
      producto.stock_actual -= cantidad;
    }
    // Si es 'ajuste', puedes decidir si reemplazar o sumar/restar. Aquí lo dejo como suma/resta según signo:
    else if (tipo_movimiento === 'ajuste') {
      producto.stock_actual += cantidad; // si cantidad es negativa, resta
    }

    await producto.save();

    res.status(201).json({
      mensaje: 'Movimiento registrado y stock actualizado',
      movimiento,
      stock_actual: producto.stock_actual
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listar, crear };