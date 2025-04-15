export default function storeLoginSession(token, fallbackName) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem('token', token);
    if (!localStorage.getItem('name')) localStorage.setItem('name', payload.name || fallbackName);
    localStorage.setItem('role', payload.role);
    if (payload.role === 'photographer' && payload.photographerId)
        localStorage.setItem('photographerId', payload.photographerId);
    return payload;
}