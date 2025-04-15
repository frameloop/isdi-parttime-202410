export default async function fetchAvailability(API_URL, photographerId, setAvailability) {
    const token = localStorage.getItem('token');
    if (!token || !photographerId) return;
    try {
        const res = await fetch(`${API_URL}/sessions/availability/${photographerId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setAvailability(data);
    } catch (err) {
        console.error('Error cargando disponibilidad:', err);
    }
}