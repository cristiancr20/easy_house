const usuario = require('../models/usuarios')


//crear un nuevo usuario
exports.crearUsuario = (req, res) => {
    const { rol, nombre, apellido, email, cedula, telefono, contrasena } = req.body;
    const nuevoUsuario = new usuario({
        rol,
        nombre,
        apellido,
        email,
        cedula,
        telefono,
        contrasena
    });
    try {
        nuevoUsuario.save();
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
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