// factories/UsuarioFactoryMongoDB.js
const UsuarioFactory = require('./UsuarioFactory');
const usuario = require('../models/usuarios');

class UsuarioFactoryMongoDB extends UsuarioFactory {
    crearUsuario(data) {
        return new usuario(data);
    }
}

module.exports = UsuarioFactoryMongoDB;
