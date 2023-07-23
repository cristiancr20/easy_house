import React, { useState } from "react";
import { Link } from "react-router-dom";

import login_img from "../img/login.svg";
import "./UsuarioStyle.css";

import { iniciarSesion, authenticate, isAuthenticated } from "../core/apiCore";

const IniciarSesion = () => {
    const [values, setValues] = useState({
        email: "",
        contrasena: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    });

    const { email, contrasena, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        iniciarSesion({ email, contrasena }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                    });
                });
            }
        });
    };

    const showError = () => (
        <div className="" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="">
                <h2>Cargando...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (
                user.email === email &&
                user.contrasena === contrasena &&
                user.rol === "1"
            ) {
                console.log(user);
                return (window.location.href = "/arrendador");
            }
            if (
                user.email === email &&
                user.contrasena === contrasena &&
                user.rol === "0"
            ) {
                return (window.location.href = "/arrendatario");
            }
        }
        //if (isAuthenticated()) {
        //  return window.location.href = '/'
        //}
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
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Contraseña</label>
                        <input
                            onChange={handleChange("contrasena")}
                            type="password"
                            className="form-control"
                            value={contrasena}
                        />
                    </div>
                </form>
                <div className="boton">
                    <button type="submit" onClick={clickSubmit}>
                        Iniciar sesión
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
            {showLoading()}
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
