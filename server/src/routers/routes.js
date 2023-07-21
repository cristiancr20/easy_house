const express = require ('express');
const router =express.Router();

const usuarioController = require('../controllers/controllers.usuario');

//registrar usuario
router.post('/registrar/usuario', usuarioController.crearUsuario);
// Obtener todos los usuarios
router.get('/obtener/usuarios', usuarioController.obtenerUsuarios);

module.exports = router;