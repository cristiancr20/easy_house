import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from 'react-router-dom';
import { obtenerDetallesArriendo, editarArriendo } from '../../core/apiCore';


import './VerArriendo.css'

import { FaLocationDot } from "react-icons/fa6";

const VerArriendo = () => {
    const { arriendoId } = useParams();
    const [arriendo, setArriendo] = useState({});
    const [reservado, setReservado] = useState(false);


    console.log(arriendoId);
    console.log(arriendo);

    // Verifica el estado de reserva en localStorage al cargar
    useEffect(() => {
        const isReservado = localStorage.getItem(`reservado_${arriendoId}`);
        if (isReservado === 'true') {
            setReservado(true);
        }
    }, [arriendoId]);


    useEffect(() => {
        obtenerDetallesArriendo(arriendoId)
            .then((data) => {
                setArriendo(data);
                // Verifica si el arriendo está reservado al cargar
                if (data.estado === 'Ocupado') {
                    setReservado(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [arriendoId]);

    if (!arriendo) {
        return <div>Cargando...</div>;
    }

    const handleReservarClick = () => {
        // Verifica si el arriendo ya está reservado, para evitar reservas duplicadas
        if (!reservado) {
            // Realiza la solicitud para editar el arriendo
            editarArriendo(arriendoId, { estado: 'Ocupado' })
                .then((data) => {
                    // Si la edición fue exitosa, establece el estado de "reservado" a true
                    setReservado(true);
                    // Guarda el estado de reserva en localStorage
                    localStorage.setItem(`reservado_${arriendoId}`, 'true');
                })
                .catch((error) => {
                    console.error(error);
                    // Maneja el error de la solicitud de edición aquí
                });
        }
    };

    // Ahora que sabemos que arriendo se ha cargado, podemos acceder a sus propiedades de manera segura.
    return (
        <div>
            <Navbar />
            <div className="verdetalle">

                <div className="info">
                    <div className="img">
                        <img src={arriendo.imagen} alt={arriendo.titulo} />
                    </div>
                    <div className="details">
                        <h2>{arriendo.titulo}</h2>
                        <div className="details-op">

                            <div className="options">
                                <p>Precio: {arriendo.precio} $</p>

                            </div>
                            <div className="options">
                                <p>< FaLocationDot /> Se encuentra ubicado en: {arriendo.ubicacion}</p>

                            </div>
                            <div className="options">
                                <p>Capacidad: {arriendo.capacidad} personas</p>

                            </div>
                            <div className="options">
                                <p>Fecha de publicación {new Date(arriendo.fecha).toLocaleDateString()}</p>

                            </div>
                            <div className="options">
                                <p>Estado: {arriendo.estado}</p>
                            </div>

                            <button
                                className={`button-reserva ${reservado ? 'disabled' : ''}`}
                                onClick={handleReservarClick}
                                disabled={reservado} // Desactiva el botón si ya está reservado
                            >
                                {reservado ? 'Reservado' : 'Reservar'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default VerArriendo;
