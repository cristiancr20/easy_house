
//registrar Persona
// apiCore.js
export const registrarPersona = async user => {
    try {
        const response = await fetch('http://localhost:5000/registrar/usuario', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Hubo un problema al registrar el usuario.');
        }
    } catch (error) {
        throw error;
    }
};


//inicio de sesion
//inicio de sesion
export const iniciarSesion = async user => {
    try {
        const response = await fetch('http://localhost:5000/iniciar/sesion', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if (response.ok) {
            // El inicio de sesión fue exitoso, devolver los datos del usuario
            return data;
        } else {
            // Hubo un error en el inicio de sesión, devolver el mensaje de error del servidor
            throw new Error(data.message);
        }
    } catch (error) {
        // Error de red u otro error, puedes mostrar un mensaje de error genérico aquí
        console.log(error);
        throw new Error('Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.');
    }
}


export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return null;
    }
}