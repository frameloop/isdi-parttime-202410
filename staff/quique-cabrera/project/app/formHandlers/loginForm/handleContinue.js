import { validateUsername, usersApi } from '../../logic';

const API_URL = import.meta.env.VITE_API_URL;

export default function handleContinue({ username, setLoginError, setName, setStep }) {
    if (!username.trim()) return setLoginError('Por favor, introduce tu usuario');
    try {
        validateUsername(username);
    } catch (err) {
        return setLoginError(err.message);
    }

    usersApi.verify(username)
        .then(response => {
            setName(response.name);
            localStorage.setItem('name', response.name);
            setStep(2);
            setLoginError(null);
        })
        .catch(err => setLoginError(err.message || "Error al verificar usuario"));
}