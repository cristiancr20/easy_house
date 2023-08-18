import React, { useState } from "react";
import { Link } from "react-router-dom";
import login_img from "../img/login.svg";
import "./UsuarioStyle.css";
import { iniciarSesion } from "../core/apiCore";

const IniciarSesion = () => {
    const [values, setValues] = useState({
        email: "",
        contrasena: "",
        error: "",
        loading: false,
    });

    const { email, contrasena, loading, error } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: "", [name]: event.target.value });
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        try {
            const data = await iniciarSesion({ email, contrasena });
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                console.log("Inicio de sesión exitoso");
                redirectUser(data.user.rol);
            }
        } catch (error) {
            setValues({
                ...values,
                error: "Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.",
                loading: false,
            });
        }
    };

    const redirectUser = (rol) => {
        if (rol === "Arrendador") {
            window.location.href = "/registrar/arriendo";
        } else if (rol === "Arrendatario") {
            window.location.href = "/obtener/arriendo";
        }
    };

    const showError = () => (
        <div className={`alerta ${error ? "" : "hidden"}`}>
            {error}
        </div>
    );

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
