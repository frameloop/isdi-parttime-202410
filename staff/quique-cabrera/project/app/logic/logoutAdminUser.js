export default function logoutUser(API_URL, token, navigate) {
    fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .finally(() => {
            localStorage.clear();
            navigate('/login');
        });
}