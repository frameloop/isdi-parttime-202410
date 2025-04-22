const authService = {
    saveSession: (data) => {
        // Espera una estructura plana: { token: '...', name: '...', role: '...', id: '...', photographerId?: '...' }
        if (!data?.token) {
            console.error("Token no disponible en los datos de sesión:", data);
            throw new Error('Token no disponible');
        }

        const token = data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));

        localStorage.setItem('token', token);
        localStorage.setItem('userId', payload.sub); // userId viene del payload del token

        // Guardar name y photographerId si existen en la respuesta plana
        if (data.name) {
            localStorage.setItem('name', data.name);
        }

        if (data.photographerId) {
            localStorage.setItem('photographerId', data.photographerId);
        }

        // Devolver toda la información de la sesión
        return {
            token,
            userId: payload.sub,
            name: data.name,
            role: payload.role,
            photographerId: data.photographerId
        };
    },

    getToken: () => localStorage.getItem('token'),

    clearSession: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('photographerId');
    }
};

export default authService; 