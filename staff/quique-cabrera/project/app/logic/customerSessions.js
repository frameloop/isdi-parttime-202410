export default function fetchSessions(API_URL, token, setSessions) {
    fetch(`${API_URL}/sessions/my-sessions`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(setSessions)
        .catch(console.error);
}