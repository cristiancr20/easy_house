const mongoose = require('mongoose');

const nuevoArriendo = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',  // Referencia al modelo de usuario
    },
    titulo:{
        type: String,
        required: true
    },
    precio:{
        type: String,
        required: true
    },
    ubicacion:{
        type: String,
        required: true
    },
    capacidad:{
        type: String,
        required: true
    },
    imagen:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    estado:{
        type: String,
        required: true
    },
}, {versionKey:false});

module.exports = mongoose.model('arriendo', nuevoArriendo);