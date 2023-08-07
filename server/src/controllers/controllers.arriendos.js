const arriendo = require('../models/arriendos');

// crear un nuevo arriendo
exports.crearArriendo = async (req, res) => {
    
    const fechaActual = new Date();

    const nuevoArriendo = new arriendo({
        titulo: req.body.titulo,
        precio: req.body.precio,
        ubicacion: req.body.ubicacion,
        capacidad: req.body.capacidad,
        imagen: req.body.imagen,
        fecha: fechaActual,
        estado: "Disponible"
    });

    try {
        const nuevoarriendo = await nuevoArriendo.save();
        res.status(201).json({msg: 'Arriendo creado correctamente', arriendo: nuevoarriendo});   
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

//obtener todos los arriendos
exports.obtenerArriendos = async (req, res) => {
    try {
        const arriendos = await arriendo.find();
        res.json(arriendos);
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

//obtener un arriendo por id
exports.obtenerArriendo = async (req, res) => {
    try {
        const arriendoId = await arriendo.findById(req.params.id);
        res.json({arriendoId});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}