import React, { useState, useEffect } from "react";
import "./Listar.css";

// Icons
import { FaMapMarkerAlt,  FaDollarSign, FaHouseUser } from "react-icons/fa";
import { FaCalendarDays, FaPeopleGroup } from "react-icons/fa6";

import { listarArriendos } from "../core/apiCore";

const Listar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarArriendos();
                setData(response); // Aquí utilizamos directamente 'response' porque la función listarArriendos ya devuelve el array de arriendos
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="listar__container">
            <div className="lista">
                
                <div className="card_container">
                    {data.map((item) => (
                        <div key={item._id} className="card">
                            <div className="card_imagen">
                                <img src={item.imagen} alt={item.titulo} />
                            </div>
                            <div className="card_descripcion">
                                <h1>{item.titulo}</h1>
                                <p>
                                    <FaDollarSign /> {item.precio} $
                                </p>
                                <p>
                                    <FaMapMarkerAlt /> {item.ubicacion}
                                </p>
                                <p>
                                    <FaPeopleGroup /> {item.capacidad}
                                </p>
                                <p>
                                    <FaCalendarDays /> {item.fecha}
                                </p>
                                <p>
                                    <FaHouseUser /> {item.estado}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listar;
