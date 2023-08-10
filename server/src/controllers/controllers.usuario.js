const router = require('express').Router();
const usuario = require('../models/usuarios')
const jwt = require('jsonwebtoken');

//crear un nuevo usuario
exports.crearUsuario = async (req, res) => {

    const nuevoUsuario = new usuario({
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

//iniciar sesion
/* exports.iniciarSesion = async (req, res) => {
    try{
        const {email, contrasena} = req.body;
        const user = await usuario.findOne({email});
        if(!user){
            res.status(400).json({msg: 'El usuario no existe'});
            return;
        }

        if(contrasena !== user.contrasena){
            res.status(400).json({msg: 'La contraseña es incorrecta'});
            return;
        }

        if(user.contrasena === contrasena){
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            // persist the token as 't' in cookie with expiration date
            res.cookie('t', token, { expire: new Date() + 9999 })
            // return response with user and token to frontend client
            const { _id, email, contrasena, rol } = user
            return res.json({ token, user: { _id, email, contrasena, rol } })
        }else{
            res.status(400).json({msg: 'La contraseña es incorrecta'});
        }
    }catch(error){
        return res.status(400).json({msg: 'Hubo un error'});
    }
} */

// Iniciar sesión
// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const user = await usuario.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'El usuario no existe' });
            return;
        }

        if (contrasena !== user.contrasena) {
            res.status(400).json({ msg: 'La contraseña es incorrecta' });
            return;
        }

        // Return response with user information to frontend client
        const { _id, rol } = user;
        return res.json({ user: { _id, email,contrasena, rol } });
    } catch (error) {
        return res.status(400).json({ msg: 'Hubo un error' });
    }
}
