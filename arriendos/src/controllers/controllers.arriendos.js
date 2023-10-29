const arriendo = require('../models/arriendos');
const jwt = require('jsonwebtoken');

// crear un nuevo arriendo
exports.crearArriendo = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const fechaActual = new Date();

    console.log('ID del usuario:', userId);

    const nuevoArriendo = new arriendo({
      userId: userId,
      titulo: req.body.titulo,
      precio: req.body.precio,
      ubicacion: req.body.ubicacion,
      capacidad: req.body.capacidad,
      imagen: req.body.imagen,
      fecha: fechaActual,
      estado: "Disponible"
    });

    console.log(nuevoArriendo);
    const nuevoarriendo = await nuevoArriendo.save();
    res.status(201).json({ msg: 'Arriendo creado correctamente', arriendo: nuevoarriendo });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}

//obtener todos los arriendos
exports.obtenerArriendos = async (req, res) => {
  try {
    const arriendos = await arriendo.find();
    const arriendosConUsuario = arriendos.map(arriendo => {
      return {
        _id: arriendo._id,
        userId: arriendo.userId ? arriendo.userId._id : null, // Verifica si userId está definido
        titulo: arriendo.titulo,
        precio: arriendo.precio,
        ubicacion: arriendo.ubicacion,
        capacidad: arriendo.capacidad,
        imagen: arriendo.imagen,
        fecha: arriendo.fecha,
        estado: arriendo.estado,
      };
    });

    console.log(arriendosConUsuario);
    res.json(arriendosConUsuario);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}

//obtener un arriendo por id
exports.obtenerArriendoId = async (req, res) => {
  try {
    const arriendoId = await arriendo.findById(req.params.id);
    res.json(arriendoId);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}


// Obtener arriendos por userId
exports.obtenerArriendosPorUsuario = async (req, res) => {
  const userId = req.body.userId; // Obtén el userId del cuerpo de la solicitud

  try {
    const arriendos = await arriendo.find({ userId });
    res.json(arriendos);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}

//editar arriendo
exports.editarArriendo = async (req, res) => {
  try {
    const arriendoId = await arriendo.findById(req.params.id);
    if (!arriendoId) {
      res.status(404).json({ msg: 'No existe el arriendo' });
    }
    const arriendoEditado = await arriendo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json({ msg: 'Arriendo editado correctamente', arriendo: arriendoEditado });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}