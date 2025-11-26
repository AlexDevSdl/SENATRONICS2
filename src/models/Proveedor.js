// src/models/Proveedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  telefono: DataTypes.STRING(20),
  correo: DataTypes.STRING(100),
  direccion: DataTypes.TEXT
}, { tableName: 'proveedores' });

module.exports = Proveedor;