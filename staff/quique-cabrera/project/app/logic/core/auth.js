const authService = {
    saveSession: (data) => {
        if (!data.token) throw new Error('Token no disponible');

        const payload = JSON.parse(atob(data.token.split('.')[1]));

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', payload.sub);
        localStorage.setItem('name', data.name);

        if (data.photographerId) {
            localStorage.setItem('photographerId', data.photographerId);
        }

        return { token: data.token };
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