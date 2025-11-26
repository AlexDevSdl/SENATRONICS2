// index.js (en la raíz)
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión MySQL exitosa');

    await sequelize.sync({ alter: true });  // crea o actualiza tablas
    console.log('Tablas sincronizadas');

    app.listen(PORT, () => {
      console.log(`API corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar:', error);
  }
}

iniciar();