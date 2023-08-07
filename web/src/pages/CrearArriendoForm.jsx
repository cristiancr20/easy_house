import React, {useState} from "react";
import './ArriendosStyle.css'

import { crearArriendo } from "../core/apiCore";

const CrearArriendoForm = () => {
    const [values, setValues] = useState({
        titulo: '',
        precio: '',
        ubicacion: '',
        capacidad: '',
        imagen: '',
        success: false,
        error: '',
        loading: false,
    });

    const { titulo, precio, ubicacion, capacidad, imagen, success, error, loading } = values;

    const handleChange = event => {
        setValues({ ...values, error:'', [event.target.name]: event.target.value });
    }

    const clickSubmit = () => {
        setValues({ ...values, error: '', loading: true });
        const arriendo = { titulo,  precio, ubicacion, capacidad, imagen };
        crearArriendo(arriendo)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, loading: false });
                } else {
                    setValues({
                        ...values,
                        titulo: '',
                        precio: '',
                        ubicacion: '',
                        capacidad: '',
                        imagen: '',
                        error: '',
                        success: true,
                        loading: false,
                    });
                }
            })
            .catch(error => {
                setValues({ ...values, error: 'Hubo un problema con la solicitud.', success: false, loading: false });
            });
    }

    const crearArriendoForm = () => (
        <div className="register__arriendos_container">
            <div className="register__arriendos_form">
                <h1>Registro de Arriendo</h1>

                <form>
                    <div className="form-group">
                        <label htmlFor="titulo">Título</label>
                        <input onChange={handleChange} type="text" name="titulo" placeholder="Título" value={titulo} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precio">Precio</label>
                        <input onChange={handleChange} type="text" name="precio"  placeholder="Precio" value={precio} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ubicacion">Ubicación</label>
                        <input onChange={handleChange} type="text" name="ubicacion" placeholder="Ubicación" value={ubicacion} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacidad">Capacidad</label>
                        <input onChange={handleChange} type="text" name="capacidad" placeholder="Capacidad" value={capacidad} />
                    </div>
                    <div className="form-group-img">
                        <label htmlFor="imagen">Imagen</label>
                        <input onChange={handleChange} type="text" name="imagen" className="form-control-img" placeholder="Imagen" value={imagen} />
                    </div>
                    
                </form>
                <div className="boton">
                    <button type="submit" onClick={clickSubmit}>
                        {loading ? 'Cargando...' : 'Crear Arriendo'}
                    </button>
                </div>
            </div>
        </div>
    );

    const showError = () => (
        <div className='alerta' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alerta' style={{ display: success ? '' : 'none' }}>
            Nueva arriendo creado con éxito.
        </div>
    )

    return (
        <>
            {showSuccess()}
            {showError()}
            {crearArriendoForm()}
        </>
    );
};

export default CrearArriendoForm;


