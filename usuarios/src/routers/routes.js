const express = require ('express');
const router =express.Router();

const usuarioController = require('../controllers/controllers.usuario');

//registrar usuario
router.post('/registrar/usuario', usuarioController.crearUsuario);
// Obtener todos los usuarios
router.get('/obtener/usuario', usuarioController.obtenerUsuarios);
//iniciar sesion
router.post('/iniciar/sesion', usuarioController.iniciarSesion);
//cerrar sesion
router.post('/cerrar/sesion', usuarioController.cerrarSesion);

module.exports = router;