import axios from 'axios';

const API_SERVER_URL = 'http://backend-service:5000';

/* export const registrarPersona = async (user) => {
  try {
    const response = await axios(`${API_SERVER_URL}/registrar/usuario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(
        data.error || "Hubo un problema al registrar el usuario."
      );
    }
  } catch (error) {
    throw error;
  }
}; */

export const registrarPersona = async (user) => {
  try {
    const response = await axios.post(`${API_SERVER_URL}/registrar/usuario`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
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
    const response = await fetch(`${API_SERVER_URL}/iniciar/sesion`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      "Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde."
    );
  }
};

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

export const crearArriendo = async (arriendo) => {
  try {
    const response = await fetch(`${API_SERVER_URL}/crear/nuevo/arriendo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    const response = await fetch(`${API_SERVER_URL}/obtener/arriendo`, {
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
