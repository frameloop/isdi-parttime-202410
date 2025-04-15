export default function verifyUser(username, API_URL) {
    return fetch(`${API_URL}/users/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    }).then(res => res.json());
}