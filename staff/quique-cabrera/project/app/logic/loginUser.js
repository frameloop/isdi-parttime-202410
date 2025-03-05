const loginUser = (username, password) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json()) // ✅ Ahora recibirá un JSON con { token: "..." }
        .then(data => {
            console.log("API Response:", data); // 🔍 Verifica la respuesta en consola

            if (data.token) {
                sessionStorage.setItem("token", data.token); // ✅ Guarda el token
                return { token: data.token };
            } else {
                throw new Error("No token received");
            }
        })
        .catch(error => {
            console.error("Login error:", error.message);
            throw error;
        });
};

export default loginUser;
