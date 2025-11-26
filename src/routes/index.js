// src/routes/index.js
const express = require('express');
const router = express.Router();
const { verificarToken, soloAdmin } = require('../middleware/auth');

// === RUTAS PÚBLICAS (SIEMPRE van PRIMERO) ===
router.post('/usuarios/login', require('./usuario.routes'));     
router.post('/usuarios/registro', require('./usuario.routes'));  

// === RUTAS PROTEGIDAS ===
router.use('/productos',   verificarToken, require('./producto.routes'));
router.use('/categorias',  verificarToken, require('./categoria.routes'));
router.use('/proveedores', verificarToken, require('./proveedor.routes'));
router.use('/almacenes',   verificarToken, require('./almacen.routes'));
router.use('/movimientos', verificarToken, require('./movimiento.routes'));

router.use('/usuarios', require('./usuario.routes'));

module.exports = router;