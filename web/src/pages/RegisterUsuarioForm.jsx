import React, { useState } from 'react';
import axios from 'axios';

const RegisterUsuarioForm= () => {
  const [formData, setFormData] = useState({
    rol:'',
    nombre: '',
    apellido: '',
    email: '',
    cedula: '',
    telefono: '',
    contrasena: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos al servidor
    axios.post('http://localhost:5000/registrar/usuario', formData)
      .then(response => {
        console.log(response.data); // Manejar la respuesta del servidor
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="rol">Rol:</label>
          <input
            type="text"
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cedula">Cedula:</label>
          <input
            type="cedula"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="telefono">Telefono:</label>
          <input
            type="telefono"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="contrasena"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterUsuarioForm;
