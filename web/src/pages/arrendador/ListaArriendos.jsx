import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import { obtenerArriendosPorUsuario } from '../../core/apiCore';
import './ListarArriendos.css'

const ListarArriendos = () => {
    const [arriendos, setArriendos] = useState([]);

    useEffect(() => {
        // Obtiene el userId almacenado en el localStorage
        const userId = localStorage.getItem('idUsuario');
        console.log(userId);
        const token = localStorage.getItem('token'); // Asegúrate de obtener el token si es necesario para la autenticación.

        if (userId) {
            // Llama a la función para obtener arriendos por usuario
            obtenerArriendosPorUsuario(userId, token)
                .then(data => {
                    console.log(data); // Agrega este console.log
                    const arriendosFiltrados = data.filter(item => item.userId === userId);
                    setArriendos(arriendosFiltrados);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al cargar el componente.

    return (
        <div className='listar__arriendos-usuario'>
            <Navbar />
            <h1>Tu lista de  Arriendos</h1>
            <div className="lista">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Ubicación</th>
                            <th>Capacidad</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arriendos.map(item => (
                            <tr key={item._id}>

                                <td>{item.titulo}</td>
                                <td>{item.precio} $</td>
                                <td>{item.ubicacion}</td>
                                <td>{item.capacidad}</td>
                                <td>{item.fecha}</td>
                                <td>{item.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ListarArriendos;
