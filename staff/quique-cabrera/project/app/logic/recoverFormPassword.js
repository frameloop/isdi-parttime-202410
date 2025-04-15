export default function recoverPassword(username) {
    const API_URL = import.meta.env.VITE_API_URL;
    return fetch(`${API_URL}/users/recover-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    })
        .then(res => {
            if (!res.ok) throw new Error("Error al recuperar contraseña");
            return res.json();
        });
}