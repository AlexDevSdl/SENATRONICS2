// src/models/index.js   ← CREA este archivo
const sequelize = require('../settings/db');

const Producto = require('./Producto');
const Categoria = require('./Categoria');
const Proveedor = require('./Proveedor');
const Almacen = require('./Almacen');
const MovimientoInventario = require('./MovimientoInventario');
const Usuario = require('./Usuario');

// Relaciones
Producto.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });
Producto.belongsTo(Almacen, { foreignKey: 'id_almacen' });
MovimientoInventario.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = {
  sequelize,
  Producto,
  Categoria,
  Proveedor,
  Almacen,
  MovimientoInventario,
  Usuario
};