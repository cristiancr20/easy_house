const mongoose = require('mongoose')

const nuevoUsuario = mongoose.Schema({
    rol: {
        type: String,
        trim: true,
        require: true
    },
    nombre: {
        type: String,
        trim: true,
        require: true
    },
    apellido: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    cedula: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    telefono: {
        type: String,
        trim: true,
        require: true,
    },    
    contrasena: {
        type: String,
        trim: true,
        require: true
    }

}, { versionKey: false })


module.exports = mongoose.model('usuario', nuevoUsuario)