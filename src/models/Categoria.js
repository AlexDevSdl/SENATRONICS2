// src/models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');

const Categoria = sequelize.define('Categoria', {
  id_categoria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  descripcion: DataTypes.TEXT
}, { tableName: 'categorias' });

module.exports = Categoria;