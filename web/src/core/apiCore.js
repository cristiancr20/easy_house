
//registrar Persona
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
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

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
        return await response.json();
    } catch (error) {
        console.log(error);
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
        return false;
    }
}