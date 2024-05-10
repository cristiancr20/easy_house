import React, { useState } from "react";
import { Link } from "react-router-dom";
/* import './navbar.css' */
import { BiLogOut } from "react-icons/bi";

import { cerrarSesion } from "../core/apiCore";
import logo from "../img/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const nombreUsuario = localStorage.getItem("nombreUsuario"); // Obtén el nombre del usuario desde localStorage
  const rolUsuario = localStorage.getItem("rolUsuario");

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
    <nav className="bg-bg-400 border-bg-300 dark:bg-bg-200 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="House Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          House
          </span>
        </a>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <div>
            <ul className="flex flex-col font-semibold p-4 md:p-0 mt-4 border border-bg-100 rounded-lg bg-bg-400 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-bg-400 dark:bg-bg-300 md:dark:bg-bg-200 dark:border-bg-300 md:items-center">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-bg-100 rounded hover:text-primary-100 md:hover:bg-transparent md:hover:text-primary-100 md:dark:hover:text-bg-100 dark:text-text-100 dark:hover:bg-bg-200 dark:hover:text-primary-200 md:dark:hover:bg-transparent dark:border-bg-300"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 md:p-0 text-bg-100 rounded hover:text-primary-100  md:hover:bg-transparent md:hover:text-primary-100 md:dark:hover:text-bg-100  dark:text-text-100 dark:hover:bg-bg-200 dark:hover:text-primary-200 md:dark:hover:bg-transparent dark:border-bg-300"
                >
                  Servicios
                </a>
              </li>

              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <Link
                  to="/registrar/usuarios"
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-100 hover:bg-accent-100 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Empezar
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
