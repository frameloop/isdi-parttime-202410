export default function addPhotographer(API_URL, token, data, setPhotographers) {
    return fetch(`${API_URL}/users/photographers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then(newPhotographer => {
            setPhotographers(prev => [...prev, newPhotographer]);
            return newPhotographer;
        });
}