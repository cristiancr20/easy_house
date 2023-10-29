import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import { BiLogOut } from "react-icons/bi";

import { cerrarSesion } from '../core/apiCore';
import logo from '../img/logo.png'

const Navbar = () => {
  const nombreUsuario = localStorage.getItem('nombreUsuario'); // Obtén el nombre del usuario desde localStorage
  const rolUsuario = localStorage.getItem('rolUsuario');

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

      <div className="rol-user">

        {rolUsuario === 'Arrendador' && (
          /* Opciones específicas para el arrendador */
          <div className='options-user'>
            <ul>
              <li>
                <Link to="/home/arrendador" className='link'>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/registrar/arriendo" className='link'>
                  Publicar un nuevo arriendo
                </Link>
              </li>
              <li>
                <Link to='/listar/arriendos' className='link'>
                  Ver tus arriendos publicados
                </Link>
              </li>
              {/* Agrega más opciones específicas para arrendadores aquí */}
            </ul>
          </div>
        )}

        {rolUsuario === 'Arrendatario' && (
          /* Opciones específicas para el arrendatario */
          <div className='options-user'>
            <ul>
            <li>
                <Link to="/home" className='link'>
                  Inicio
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="user-info">
          <span>Bienvenido, {nombreUsuario}</span>
          <button onClick={handleCerrarSesion}>Cerrar Sesión <BiLogOut /></button>
        </div>

      </div>

    </nav>
  );
};

export default Navbar;
