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

    const [user, setUser] = useState(null);

    const { email, contrasena, loading, error } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Avoid event propagation

        setValues({ ...values, error: false, loading: true });
        try {
            const data = await iniciarSesion({ email, contrasena });
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                console.log("Login successful");
                setValues({ ...values, loading: false });
                setUser(data.user);
                redirectUser(); // Call redirection here
            }
        } catch (error) {
            setValues({
                ...values,
                error: "Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.",
                loading: false,
            });
        }
    };

    const redirectUser = () => {
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
