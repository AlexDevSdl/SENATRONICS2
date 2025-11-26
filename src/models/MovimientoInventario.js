// src/models/MovimientoInventario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');

const MovimientoInventario = sequelize.define('MovimientoInventario', {
  id_movimiento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo_movimiento: { type: DataTypes.ENUM('entrada', 'salida', 'ajuste'), allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  usuario_responsable: DataTypes.STRING(100),
  motivo: DataTypes.TEXT,
  id_producto: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'movimientos_inventario' });

module.exports = MovimientoInventario;