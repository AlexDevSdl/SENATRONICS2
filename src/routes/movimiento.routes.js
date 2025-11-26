const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/movimiento.controller');

router.get('/', ctrl.listar);
router.post('/', ctrl.crear);

module.exports = router;