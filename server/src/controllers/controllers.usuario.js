const usuario = require('../models/usuarios')
const jwt = require('jsonwebtoken');

//crear un nuevo usuario
exports.crearUsuario = (req, res) => {
    const { rol, nombre, apellido, email, cedula, telefono, contrasena } = req.body;
    if(rol === "Arrendador"){
        rol ="1";
    }
    if(rol === "Arrendatario"){
        rol ="0";
    }
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

//iniciar sesion
exports.iniciarSesion = async (req, res) => {
    try{
        const {email, contrasena} = req.body;
        const user = await usuario.findOne({email});
        if(!user){
            res.status(400).json({msg: 'El usuario no existe'});
        }

        if(contrasena !== user.contrasena){
            res.status(400).json({msg: 'La contraseña es incorrecta'});
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
}