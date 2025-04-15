export default function fetchPhotographers(API_URL, token, setPhotographers) {
    fetch(`${API_URL}/users/photographers`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(setPhotographers)
        .catch(console.error);
}