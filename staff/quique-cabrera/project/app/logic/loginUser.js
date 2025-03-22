const loginUser = (username, password) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                sessionStorage.setItem("token", data.token);
                return { token: data.token };
            }
            throw new Error("Password incorrecto");
        })
        .catch(error => { throw error; });
};

export default loginUser;