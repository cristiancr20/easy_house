import React from 'react';
import './navbar.css'
import { BiLogOut } from "react-icons/bi";

import { cerrarSesion } from '../core/apiCore';
import logo from '../img/logo.png'

const Navbar = () => {
  const nombreUsuario = localStorage.getItem('nombreUsuario'); // Obtén el nombre del usuario desde localStorage

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
      window.location.href = "/";
      // Realiza alguna acción adicional, como redirigir al usuario a la página de inicio de sesión.
    } catch (error) {
      console.error(error);
      // Maneja cualquier error que pueda ocurrir al cerrar sesión.
    }
  };


  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      
      <div className="user-info">
        <span>Bienvenido, {nombreUsuario}</span>
        <button onClick={handleCerrarSesion}>Cerrar Sesión <BiLogOut/></button>
      </div>
    </nav>
  );
};

export default Navbar;
