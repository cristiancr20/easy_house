
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