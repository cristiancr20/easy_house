const express = require ('express');
const router =express.Router();

const arriendoController = require('../../../arriendos/src/controllers/controllers.arriendos');

// crear un nuevo arriendo
router.post('/crear/nuevo/arriendo', arriendoController.crearArriendo);
//obtener todos los arriendos
router.get('/obtener/arriendo', arriendoController.obtenerArriendos);
//obtener un arriendo por id
router.get('/obtener/arriendo/:id', arriendoController.obtenerArriendo);

module.exports = router;