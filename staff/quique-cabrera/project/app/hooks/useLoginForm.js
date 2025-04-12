import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../logic/loginUser';
import recoverPassword from '../logic/recoverPassword';
import { validate } from 'com';

const API_URL = import.meta.env.VITE_API_URL;

export default function useLoginForm() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [recoverError, setRecoverError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleContinue = () => {
        if (!username.trim()) return setLoginError('Por favor, introduce tu usuario');
        try {
            validate.username(username);
        } catch (err) {
            return setLoginError(err.message);
        }

        fetch(`${API_URL}/users/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error("El usuario no existe");
                setName(data.name);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                setStep(2);
                setLoginError(null);
            })
            .catch(err => setLoginError(err.message));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            validate.password(password);
            loginUser(username, password, rememberMe)
                .then(({ token }) => {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    localStorage.setItem('token', token);
                    if (!localStorage.getItem('name')) localStorage.setItem('name', payload.name || username);
                    localStorage.setItem('role', payload.role);
                    if (payload.role === 'photographer' && payload.photographerId)
                        localStorage.setItem('photographerId', payload.photographerId);

                    const route = payload.role === 'customer'
                        ? '/home-customer'
                        : payload.role === 'photographer'
                            ? '/home-photographer'
                            : payload.role === 'administrator'
                                ? '/home-admin'
                                : '/home';

                    navigate(route);
                })
                .catch(err => setLoginError(err.message || "Error al iniciar sesión"));
        } catch (err) {
            setLoginError(err.message || "Contraseña inválida");
        }
    };

    const handleRecoverPassword = () => {
        if (!username.trim()) return setRecoverError("Introduce tu usuario para recuperar contraseña");

        recoverPassword(username)
            .then(data => {
                setRecoverError(null);
                setSuccessMessage(data.message);
            })
            .catch(err => {
                setSuccessMessage(null);
                setRecoverError(err.message);
            })
            .finally(() => setShowPopup(false));
    };

    const resetErrors = () => {
        setLoginError(null);
        setRecoverError(null);
        setSuccessMessage(null);
    };

    return {
        step,
        username,
        password,
        name,
        rememberMe,
        loginError,
        recoverError,
        successMessage,
        showPopup,
        showPassword,
        setUsername,
        setPassword,
        setRememberMe,
        setShowPopup,
        setShowPassword,
        resetErrors,
        handleContinue,
        handleLogin,
        handleRecoverPassword
    };
}
