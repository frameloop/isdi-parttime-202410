export default function deletePhotographer(API_URL, token, id, setPhotographers) {
    return fetch(`${API_URL}/users/photographers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(() => {
            setPhotographers(prev => prev.filter(p => p._id !== id));
        });
}