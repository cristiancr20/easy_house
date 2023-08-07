const express = require ('express');
const router =express.Router();

const usuarioController = require('../controllers/controllers.usuario');
const arriendoController = require('../controllers/controllers.arriendos');

//registrar usuario
router.post('/registrar/usuario', usuarioController.crearUsuario);
// Obtener todos los usuarios
router.get('/obtener/usuarios', usuarioController.obtenerUsuarios);
//iniciar sesion
router.post('/iniciar/sesion', usuarioController.iniciarSesion);


// crear un nuevo arriendo
router.post('/crear/nuevo/arriendo', arriendoController.crearArriendo);
//obtener todos los arriendos
router.get('/obtener/arriendo', arriendoController.obtenerArriendos);
//obtener un arriendo por id
router.get('/obtener/arriendo/:id', arriendoController.obtenerArriendo);


module.exports = router;