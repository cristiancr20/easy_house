import React, { useState } from "react";
import { Link } from "react-router-dom";

import login_img from "../img/login.svg";
import "./UsuarioStyle.css";

import { iniciarSesion } from "../core/apiCore"; // Eliminamos los métodos relacionados con JWT

const IniciarSesion = () => {
    const [values, setValues] = useState({
        email: "",
        contrasena: "",
        error: "",
        loading: false,
    });

    const { email, contrasena, loading, error } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        iniciarSesion({ email, contrasena })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    // Handle successful login (you can redirect or update state here)
                    console.log("Login successful");
                }
            })
            .catch((error) => {
                setValues({
                    ...values,
                    error: "Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.",
                    loading: false,
                });
            });
    };

    const showError = () => (
        <div className={`alerta ${error ? "" : "hidden"}`}>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (
                user.email === email &&
                user.contrasena === contrasena &&
                user.rol === "Arrendador"
            ) {
                console.log(user);
                return (window.location.href = "/registrar/arriendo");
            }
            if (
                user.email === email &&
                user.contrasena === contrasena &&
                user.rol === "Arrendatario"
            ) {
                return (window.location.href = "/obtener/arriendo");
            }
        }
        // Si no está autenticado o no cumple ninguna condición de redirección, no hace nada.
    };
    

    const signInForm = () => (
        <div className="login__usuario_container">
            <div className="login_img">
                <img src={login_img} alt="Imagen Inicio Sesion" />
            </div>
            <div className="login__usuario_form">
                <h1>Iniciar Sesion</h1>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Correo electrónico</label>
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            placeholder="Ingrese su correo electrónico"
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Contraseña</label>
                        <input
                            onChange={handleChange("contrasena")}
                            type="password"
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                            value={contrasena}
                        />
                    </div>
                </form>
                <div className="boton">
                    <button type="submit" onClick={clickSubmit}>
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </div>
                <Link to="/registrar/usuarios">
                    <p className="registrarUsuario">Registrar Usuario</p>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="container">
            {showError()}
            {signInForm()}
            {redirectUser()}
            <br />
            <Link
                to="/recuperar-contrasena"
                className="btn btn-sm btn-outline-danger"
            >
                ¿Olvidaste tu contraseña?
            </Link>
        </div>
    );
};

export default IniciarSesion;
