// src/models/Producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');

const Producto = sequelize.define('Producto', {
  id_producto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  marca: DataTypes.STRING(50),
  modelo: DataTypes.STRING(50),
  categoria: DataTypes.STRING(60),
  descripcion: DataTypes.TEXT,
  precio_compra: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  precio_venta: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  stock_actual: { type: DataTypes.INTEGER, defaultValue: 0 },
  stock_minimo: { type: DataTypes.INTEGER, defaultValue: 0 },
  id_proveedor: DataTypes.INTEGER,
  id_almacen: DataTypes.INTEGER
}, { tableName: 'productos' });

module.exports = Producto;