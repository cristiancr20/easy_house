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
  console.log(nuevoArriendo);
  try {
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
    console.log(arriendos);
    res.json(arriendos);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}

//obtener un arriendo por id
exports.obtenerArriendo = async (req, res) => {
  try {
    const arriendoId = await arriendo.findById(req.params.id);
    res.json({ arriendoId });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error' });
  }
}

//obtwener arriendos por diferentes criterios
exports.buscarArriendos = async (req, res) => {
  try {
    const { titulo, precio, ubicacion, capacidad, estado } = req.query;
    const condiciones = {};

    if (titulo) {
      condiciones.titulo = { $regex: titulo, $options: 'i' };
    }

    if (precio) {
      condiciones.precio = { $regex: precio, $options: 'i' };
    }

    if (ubicacion) {
      condiciones.ubicacion = { $regex: ubicacion, $options: 'i' };
    }

    if (capacidad) {
      condiciones.capacidad = { $regex: capacidad, $options: 'i' };
    }

    if (estado) {
      condiciones.estado = { $regex: estado, $options: 'i' };
    }

    const resultados = await arriendo.find(condiciones);
    res.json(resultados);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};