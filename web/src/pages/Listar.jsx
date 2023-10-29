import React, { useState, useEffect } from 'react';
import './Listar.css';

import { FaMapMarkerAlt, FaDollarSign, FaHouseUser } from 'react-icons/fa';
import { FaCalendarDays, FaPeopleGroup } from 'react-icons/fa6';
import { listarArriendos } from '../core/apiCore'; // Importa la función de búsqueda

const Listar = () => {

  /*  const token = localStorage.getItem('token'); // Obtén el token
    const nombreUsuario = localStorage.getItem('nombreUsuario'); // Obtén el nombre del usuario
    const rolUsuario = localStorage.getItem('rolUsuario'); // Obtén el rol del usuario
  */
  const [data, setData] = useState([]);


  useEffect(() => {
    listarArriendos().then((response) => {
      setData(response);
    });
  });



  const handleVerDetalles = (arriendoId) => {
    // Redirigir al usuario a la página de detalles del arriendo
    // Puedes utilizar React Router para gestionar la navegación
    // por ejemplo: history.push(`/arriendos/${arriendoId}`);
    window.location.href = `/arriendos/${arriendoId}`;

  };


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
                <button onClick={() => handleVerDetalles(item._id)}>Ver Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listar;
