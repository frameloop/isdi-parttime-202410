export default function loginUser(username, password, rememberMe) {
    const API_URL = import.meta.env.VITE_API_URL;
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rememberMe })
    })
        .then(res => {
            if (!res.ok) throw new Error("Credenciales inválidas");
            return res.json();
        });
}