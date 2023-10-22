import React, { useState } from "react";
import './ArriendosStyle.css'
import img_register_arriendo from '../img/register_arriengo.svg'

import { crearArriendo } from "../core/apiCore";

const CrearArriendoForm = () => {

    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const [step, setStep] = useState(1);

    const [values, setValues] = useState({
        titulo: '',
        precio: '',
        ubicacion: '',
        capacidad: 1,
        imagen: '',
        success: false,
        error: '',
        loading: false,
    });

    const { titulo, precio, ubicacion, capacidad, imagen, success, error, loading } = values;

    const handleChange = event => {
        setValues({ ...values, error: '', [event.target.name]: event.target.value });
    }

    const handleCapacidadChange = (increment) => {
        // Ajustar la capacidad al incremento o disminución
        setValues({ ...values, error: '', capacidad: capacidad + increment });
    }

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const clickSubmit = () => {
        setValues({ ...values, error: '', loading: true });
        const arriendo = {  titulo, precio, ubicacion, capacidad, imagen };
        crearArriendo(arriendo, headers)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, loading: false });
                } else {
                    setValues({
                        ...values,
                        titulo: '',
                        precio: '',
                        ubicacion: '',
                        capacidad: 1,
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

    const renderSection = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-group titulo">

                        <div className="input">
                            <h2>Ingresa un titulo llamativo para tu Arriendo</h2>
                            <textarea onChange={handleChange} type="text" name="titulo" placeholder="Título" value={titulo} />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="form-group">

                        <div className="input">
                            <h2>Ingresa el precio de tu arriendo</h2>
                            <input onChange={handleChange} type="text" name="precio" placeholder="Precio" value={precio} />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="form-group">
                        <div className="input">
                            <h2>Ingresa la ubicación de tu arriendo</h2>
                            <input onChange={handleChange} type="text" name="ubicacion" placeholder="Ubicación" value={ubicacion} />
                        </div>

                    </div>
                );

            case 4:
                return (
                    <div className="form-group">

                        <div className="input">
                            <h2>Ingresa la capacidad de personas para el arriendo</h2>
                            <button className="nextbutton" onClick={() => handleCapacidadChange(-1)}>-</button>
                            <span>{capacidad}</span>
                            <button className="backbutton" onClick={() => handleCapacidadChange(1)}>+</button>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="form-group">

                        <div className="input">
                            <h2>Ingresa una imagen para tu arriendo</h2>
                            <input onChange={handleChange} type="text" name="imagen" className="form-control-img" placeholder="Imagen" value={imagen} />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    }

    const crearArriendoForm = () => (
        <div className="register__arriendos_container">
            <div className="register__arriendos_img">
                <img src={img_register_arriendo} alt="Imagen de arriendo" />
            </div>
            <div className="register__arriendos_form">

                {renderSection()}

                <div className="button-section">

                    {step > 1 && (
                        <button className="prev-button" onClick={prevStep}>Anterior</button>
                    )}

                    {step < 5 && (
                        <button className="next-button" onClick={nextStep}>Siguiente</button>
                    )}

                    {step === 5 && (
                        <button className="register-button" type="submit" onClick={clickSubmit}>
                            {loading ? 'Cargando...' : 'Crear Arriendo'}
                        </button>
                    )}
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
