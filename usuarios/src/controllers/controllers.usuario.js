const usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
//patron factory
const UsuarioFactoryMongoDB = require('../factory/UsuarioFactoryMongoDB')

// Crear una instancia de la factoría concreta
const usuarioFactory = new UsuarioFactoryMongoDB();

//crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        // Generar un hash de la contraseña
        const hashContrasena = await bcrypt.hash(req.body.contrasena, 10); // '10' es el número de rondas de encriptación

        // Usar la factoría para crear un nuevo usuario con la contraseña encriptada
        const nuevoUsuario = usuarioFactory.crearUsuario({
            rol: req.body.rol,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            cedula: req.body.cedula,
            telefono: req.body.telefono,
            contrasena: hashContrasena // Usar el hash en lugar de la contraseña original
        });

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

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña encriptada utilizando bcrypt
        const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena);
        //const contrasenaValida = await bcrypt.compare('admin', user.contrasena);


        console.log('Contraseña ingresada:', contrasena);
        console.log('Contraseña almacenada:', user.contrasena);

        if (!contrasenaValida) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ userId: user._id, userName: user.nombre },
            process.env.JWT_SECRET, { expiresIn: '1h' }); // Generar un token seguro

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

