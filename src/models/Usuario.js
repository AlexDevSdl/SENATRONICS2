// src/models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../settings/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  contraseña: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.ENUM('admin', 'empleado', 'gerente'), defaultValue: 'empleado' }
}, {
  tableName: 'usuarios',
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.contraseña = await bcrypt.hash(user.contraseña, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('contraseña')) {
        const salt = await bcrypt.genSalt(10);
        user.contraseña = await bcrypt.hash(user.contraseña, salt);
      }
    }
  }
});

Usuario.prototype.validPassword = async function(pass) {
  return await bcrypt.compare(pass, this.contraseña);
};

module.exports = Usuario;