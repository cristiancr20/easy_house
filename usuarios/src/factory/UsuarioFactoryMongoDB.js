// factories/UsuarioFactoryMongoDB.js
const UsuarioFactory = require('./UsuarioFactory');
const usuario = require('../models/usuario');

class UsuarioFactoryMongoDB extends UsuarioFactory {
    crearUsuario(data) {
        return new usuario(data);
    }
}

module.exports = UsuarioFactoryMongoDB;
