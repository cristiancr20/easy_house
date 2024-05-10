import React, { useState } from "react";
import { registrarPersona } from "../core/apiCore";
import { Link } from "react-router-dom";

const RegisterUsuarioForm = () => {
  const [values, setValues] = useState({
    rol: "",
    nombre: "",
    apellido: "",
    email: "",
    cedula: "",
    telefono: "",
    contrasena: "",
    success: false,
    error: "",
    loading: false,
  });

  const {
    rol,
    nombre,
    apellido,
    email,
    cedula,
    telefono,
    contrasena,
    success,
    error,
    loading,
  } = values;

  const handleChange = (event) => {
    setValues({
      ...values,
      error: "",
      [event.target.name]: event.target.value,
    });
  };

  const clickSubmit = () => {
    setValues({ ...values, error: "", loading: true });
    const user = { rol, nombre, apellido, email, cedula, telefono, contrasena };
    registrarPersona(user)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            ...values,
            rol: "",
            nombre: "",
            apellido: "",
            email: "",
            cedula: "",
            telefono: "",
            contrasena: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((error) => {
        setValues({
          ...values,
          error: "Hubo un problema con la solicitud.",
          success: false,
          loading: false,
        });
      });
  };

  const signUpForm = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col bg-bg-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-4/5">
        <h1 className="text-2xl font-semibold mb-4 text-center text-primary-100">Registro de Usuario</h1>

        <form className="grid grid-cols-2 space-y-4 gap-4">
          <div>
            <label htmlFor="rol" className=" block text-bg-400 my-2">
              Rol
            </label>
            <select
              id="rol"
              name="rol"
              value={rol}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              <option value="Arrendador">Arrendador</option>
              <option value="Arrendatario">Arrendatario</option>
            </select>
          </div>
          <div>
            <label htmlFor="nombre" className=" block text-bg-400 my-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              placeholder="Nombre"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>
          <div>
            <label htmlFor="apellido" className=" block text-bg-400 my-2">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={apellido}
              placeholder="Apellido"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>
          <div>
            <label htmlFor="email" className=" block text-bg-400 my-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>

          <div>
            <label htmlFor="cedula" className=" block text-bg-400 my-2">
              Cedula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={cedula}
              placeholder="Cedula"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>
          <div>
            <label htmlFor="telefono" className=" block text-bg-400 my-5">
              Telefono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              placeholder="Telefono"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>
          <div>
            <label htmlFor="contrasena" className=" block text-bg-400 my-2">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-200 dark:border-gray-600 dark:focus:border-primary-300"
            />
          </div>

          <div class="text-sm font-medium text-gray-900 dark:text-white">
            Ya tienes la cuenta?{" "}
            <a class="text-blue-600 hover:underline dark:text-blue-500">
              Inicia Sesión
            </a>
          </div>
        </form>
        <div className=" px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <button type="submit" onClick={clickSubmit}>
            {loading ? "Cargando..." : "Registrarse"}
          </button>
        </div>
      </div>
    </div>
  );

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>
      <div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">{error}</span>
      </div>
    </div>
  );

  const showSuccess = () => (
    <div  style={{ display: success ? "" : "none" }}>

      <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <span class="font-medium">Nueva cuenta creada con éxito.</span>
      </div>
    </div>
  );

  return (
    <>
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </>
  );
};

export default RegisterUsuarioForm;
