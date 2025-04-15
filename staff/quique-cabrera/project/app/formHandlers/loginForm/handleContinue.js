import validateUsername from '../../logic/validateUsername.js';
import verifyUser from '../../logic/verifyUser.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function handleContinue({ username, setLoginError, setName, setStep }) {
    if (!username.trim()) return setLoginError('Por favor, introduce tu usuario');
    try {
        validateUsername(username);
    } catch (err) {
        return setLoginError(err.message);
    }

    verifyUser(username, API_URL)
        .then(data => {
            if (!data.success) throw new Error("El usuario no existe");
            setName(data.name);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            setStep(2);
            setLoginError(null);
        })
        .catch(err => setLoginError(err.message));
}