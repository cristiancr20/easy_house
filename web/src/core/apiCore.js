import axios from 'axios';
//import jwt_decode from 'jwt-decode';

const API_USUARIOS_URL = 'http://localhost:8000/api/usuarios';
const API_ARRIENDOS_URL = 'http://localhost:8000/api/arriendos';

//REGISTRAR PERSONA
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

//INICIAR SESION
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


//CERRAR SESION
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



//CREAR ARRIENDO
export const crearArriendo = async (arriendo) => {
 // Obtén el token del almacenamiento local
 const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/crear/nuevo/arriendo`, {
      method: "POST",
      headers:{'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`},
      body: JSON.stringify(arriendo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Hubo un problema al crear el arriendo.");
    }
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Hubo un problema con la solicitud: " + error.message);
  }
};


//LISTAR ARRIENDOS
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



// Función para obtener arriendos por usuario
export const obtenerArriendosPorUsuario = async (userId, token) => {
  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/arriendos/usuario`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }), // Envía el userId en el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error('Error al obtener arriendos por usuario');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener los detalles de un arriendo
export const obtenerDetallesArriendo = async (arriendoId) => {
  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/obtener/arriendo/${arriendoId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener los detalles del arriendo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

//editar arriendo
export const editarArriendo = async (arriendoId, datosArriendo, token) => {
  try {
    const response = await fetch(`${API_ARRIENDOS_URL}/editar/arriendo/${arriendoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(datosArriendo),
    });

    if (!response.ok) {
      throw new Error('Error al editar el arriendo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

