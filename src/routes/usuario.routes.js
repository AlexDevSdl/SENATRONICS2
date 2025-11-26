const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuario.controller');

router.post('/registro', ctrl.registrar);
router.post('/login', ctrl.login);
router.get('/', ctrl.listar);

module.exports = router;