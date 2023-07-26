import React, { useState } from "react";
import register_img from "../img/register.svg"

import "./UsuarioStyle.css";

import { registrarPersona } from "../core/apiCore";
import { Link } from "react-router-dom";

const RegisterUsuarioForm = () => {
  const [values, setValues] = useState({
    rol: '',
    nombre: '',
    apellido: '',
    email: '',
    cedula: '',
    telefono: '',
    contrasena: '',
    success: false,
    error: '',
    loading: false
  });

  const { rol, nombre, apellido, email, cedula, telefono, contrasena, success, error, loading } = values;

  const handleChange = event => {
    setValues({ ...values, error: '', [event.target.name]: event.target.value });
  }

  const clickSubmit = () => {
    setValues({ ...values, error: '', loading: true });
    const user = { rol, nombre, apellido, email, cedula, telefono, contrasena };
    registrarPersona(user)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false, loading: false });
        } else {

          setValues({
            ...values,
            rol: '',
            nombre: '',
            apellido: '',
            email: '',
            cedula: '',
            telefono: '',
            contrasena: '',
            error: '',
            success: true,
            loading: false
          });
        }
      })
      .catch(error => {
        setValues({ ...values, error: 'Hubo un problema con la solicitud.', success: false, loading: false });
      });
  }

  const signUpForm = () => (
    <div className="register__usuario_container">
      <div className="register_img">
        <img src={register_img} alt="imagen de registro" />
      </div>
      <div className="register__usuario_form">
        <h1>Registro de Usuario</h1>
        <form >

          <div>
            <label htmlFor="rol">Rol</label>

            <input type="text"
              id="rol"
              name="rol"
              value={rol}
              placeholder="Rol"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              placeholder="Apellido"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cedula">Cedula</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={cedula}
              placeholder="Cedula"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="telefono">Telefono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              placeholder="Telefono"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="boton">
          <button type="submit" onClick={clickSubmit}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </div>
        <Link to="/iniciar/sesion" >
          <p className="iniciarSesion">
            Iniciar Sesion
          </p>
        </Link>
      </div>
    </div>
  )

  const showError = () => (
    <div className='alerta' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className='alerta' style={{ display: success ? '' : 'none' }}>
      Nueva cuenta creada con éxito.
    </div>
  )

  return (
    <>
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </>
  );
};

export default RegisterUsuarioForm;
