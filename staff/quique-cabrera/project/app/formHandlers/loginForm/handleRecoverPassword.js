import { usersApi } from '../../logic';

export default function handleRecoverPassword({ username, setRecoverError, setSuccessMessage, setShowPopup }) {
    if (!username.trim()) return setRecoverError("Introduce tu usuario para recuperar contraseña");

    usersApi.recoverPassword(username)
        .then(data => {
            setRecoverError(null);
            setSuccessMessage(data.message);
        })
        .catch(err => {
            setSuccessMessage(null);
            setRecoverError(err.message);
        })
        .finally(() => setShowPopup(false));
}