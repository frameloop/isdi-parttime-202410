import validatePassword from '../../logic/validatePassword.js';
import loginUser from '../../logic/loginUser.js';
import storeLoginSession from '../../logic/storeLoginSession.js';
import redirectByRole from '../../logic/redirectByRole.js';

export default function handleLogin({ e, username, password, rememberMe, navigate, setLoginError }) {
    e.preventDefault();
    try {
        validatePassword(password);
        loginUser(username, password, rememberMe)
            .then(({ token }) => {
                const payload = storeLoginSession(token, username);
                const route = redirectByRole(payload);
                navigate(route);
            })
            .catch(err => setLoginError(err.message || "Error al iniciar sesión"));
    } catch (err) {
        setLoginError(err.message || "Contraseña inválida");
    }
}