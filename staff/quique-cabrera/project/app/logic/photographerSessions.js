export default async function fetchSessions(API_URL, photographerId, setSessions) {
    const token = localStorage.getItem('token');
    if (!token || !photographerId) return;
    try {
        const res = await fetch(`${API_URL}/sessions/my-sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Error al cargar sesiones');
        const data = await res.json();
        setSessions(data);
    } catch (err) {
        console.error('Error cargando sesiones:', err);
    }
}