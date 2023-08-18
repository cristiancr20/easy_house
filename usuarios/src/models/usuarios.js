const mongoose = require('mongoose')

const nuevoUsuario = mongoose.Schema({
    rol: {
        type: String,
        trim: true,
        required: true,
    },
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    apellido: {
        type: String,
        trim: true,
        required: true,

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    cedula: {
        type: String,
        trim: true,
        required: true,
        maxlength: 10,
        unique: true
    },
    telefono: {
        type: String,
        trim: true,
        maxlength: 10,
        required: true,

    },
    contrasena: {
        type: String,
        required: true,
        trim: true,
    }

}, { versionKey: false })


module.exports = mongoose.model('usuario', nuevoUsuario)