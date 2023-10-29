const usuario = require('../models/usuario')

//patron factory
const UsuarioFactoryMongoDB = require('../factory/UsuarioFactoryMongoDB')

// Crear una instancia de la factoría concreta
const usuarioFactory = new UsuarioFactoryMongoDB();

//crear un nuevo usuario
exports.crearUsuario = async (req, res) => {

    // Usar la factoría para crear un nuevo usuario
    const nuevoUsuario = usuarioFactory.crearUsuario({
        rol: req.body.rol,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        contrasena: req.body.contrasena
    });

    try {
        const nuevaUsuario = await nuevoUsuario.save();
        res.status(201).json({ msg: 'Usuario creado correctamente', usuario: nuevaUsuario });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al crear el usuario');
    }
}


// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno

exports.iniciarSesion = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const user = await usuario.findOne({ email });

        if (!user || user.contrasena !== contrasena) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
          }

        const token = jwt.sign({ userId: user._id, userName:user.nombre }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Genera un token seguro

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                rol: user.rol,
                nombre: user.nombre
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor' });
    }
};


//cerrar sesion con eliminacion del token
exports.cerrarSesion = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor' });
    }
};

