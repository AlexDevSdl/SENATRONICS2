// src/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/productos', require('./producto.routes'));
router.use('/categorias', require('./categoria.routes'));
router.use('/proveedores', require('./proveedor.routes'));
router.use('/almacenes', require('./almacen.routes'));
router.use('/movimientos', require('./movimiento.routes'));
router.use('/usuarios', require('./usuario.routes'));

module.exports = router;