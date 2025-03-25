const loginUser = (username, password) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                const payload = JSON.parse(atob(data.token.split('.')[1]));

                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", payload.sub);
                localStorage.setItem("name", data.name);

                if (data.photographerId) {
                    localStorage.setItem("photographerId", data.photographerId);
                }

                return { token: data.token };
            }

            throw new Error("Password incorrecto");
        })
        .catch(error => { throw error; });
};

export default loginUser;
