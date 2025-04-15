export default function fetchAvailability(API_URL, token, setAvailability) {
    fetch(`${API_URL}/sessions/availability`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(setAvailability)
        .catch(console.error);
}