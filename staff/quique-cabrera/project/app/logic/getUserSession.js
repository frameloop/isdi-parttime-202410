const getUserSession = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) return Promise.resolve(null); // Ensure it always returns a Promise

    return fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => {
            if (res.status === 200) return res.json();
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return null;
        })
        .catch(() => null); // Catch errors and return null
};

export default getUserSession;
