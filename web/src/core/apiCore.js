import axios from 'axios';
//import jwt_decode from 'jwt-decode';

const API_USUARIOS_URL = 'http://localhost:8000/api/usuarios';
const API_ARRIENDOS_URL = 'http://localhost:8000/api/arriendos';

export const registrarPersona = async (user) => {
  try {
    const response = await axios.post(`${API_USUARIOS_URL}/registrar/usuario`, user);

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(
        response.data.error || "Hubo un problema al registrar el usuario."
      );
    }
  } catch (error) {
    throw error;
  }
};


export const iniciarSesion = async (user) => {
  try {
      const response = await fetch(`${API_USUARIOS_URL}/iniciar/sesion`, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
          // Guarda el token en el almacenamiento local
          localStorage.setItem('token', data.token);
          return data;
      } else {
          throw new Error(data.message);
      }
  } catch (error) {
      console.log(error);
      throw new Error('Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.');
  }
};

export const cerrarSesion = async () => {
  try {
    const response = await fetch(`${API_USUARIOS_URL}/cerrar/sesion`, {
      method: 'POST', // Puedes usar el método POST para enviar una solicitud al backend para cerrar la sesión.
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // La sesión se cerró correctamente, puedes realizar alguna acción adicional, como redirigir al usuario a la página de inicio de sesión.
      localStorage.removeItem('token'); // También puedes eliminar el token del almacenamiento local.
      return { success: true };
    } else {
      throw new Error('No se pudo cerrar la sesión.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Hubo un error al cerrar la sesión. Inténtalo de nuevo más tarde.');
  }
};


/*
export const obtenerUsuarioActual = () => {
  const token = localStorage.getItem('token');
  if (token) {
      const decoded = jwt_decode(token);
      return decoded;
  }
  return null;
};*/


/* export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return null;
  }
}; */

export const crearArriendo = async (arriendo, headers) => {
 // Obtén el token del almacenamiento local

  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/crear/nuevo/arriendo`, {
      method: "POST",
      headers,
      body: JSON.stringify(arriendo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Hubo un problema al crear el arriendo.");
    }

    return data;
  } catch (error) {
    throw new Error("Hubo un problema con la solicitud: " + error.message);
  }
};

export const listarArriendos = async () => {
  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/obtener/arriendo`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los arriendos.");
    }

    const data = await response.json();

    if (data) {
      return data;
    } else {
      throw new Error("Respuesta inválida del servidor.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//obtener los arriendos por criterio
export const buscarArriendos = async (criterios) => {
  try {
    const url = `${API_ARRIENDOS_URL}/buscar/arriendos`;

    // Convierte el objeto criterios en una cadena de consulta
    const queryString = Object.keys(criterios)
      .map(key => `${key}=${encodeURIComponent(criterios[key])}`)
      .join('&');

    const response = await fetch(`${url}?${queryString}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Hubo un problema en la búsqueda.');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    throw error;
  }
};

