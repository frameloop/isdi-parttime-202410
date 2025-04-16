import { validatePassword, usersApi, redirectByRole } from '../../logic';

export default function handleLogin({ e, username, password, rememberMe, navigate, setLoginError }) {
    e.preventDefault();
    try {
        validatePassword(password);
        usersApi.login(username, password)
            .then(({ token }) => {
                const session = usersApi.getSession();
                const route = redirectByRole(session);
                navigate(route);
            })
            .catch(err => setLoginError(err.message || "Error al iniciar sesión"));
    } catch (err) {
        setLoginError(err.message || "Contraseña inválida");
    }
}