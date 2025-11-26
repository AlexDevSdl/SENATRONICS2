// src/models/Almacen.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');

const Almacen = sequelize.define('Almacen', {
  id_almacen: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  ubicacion: DataTypes.STRING(200)
}, { tableName: 'almacenes' });

module.exports = Almacen;