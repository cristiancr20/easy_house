import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/obtener/usuarios")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Datos del servidor:</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>Nombre: {item.nombre}</p>
            <p>Apellido: {item.apellido}</p>
            <p>Email: {item.email}</p>
            <p>Cedula: {item.cedula}</p>
            <p>Telefono: {item.telefono}</p>
            <p>Contraseña: {item.contrasena}</p>
            <p>MI SECRETO: SOY PUTO</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
