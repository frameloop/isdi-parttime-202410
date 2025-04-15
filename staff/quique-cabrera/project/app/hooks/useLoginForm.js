import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleLogin from '../formHandlers/loginForm/handleLogin.js';
import handleContinue from '../formHandlers/loginForm/handleContinue.js';
import handleRecoverPassword from '../formHandlers/loginForm/handleRecoverPassword.js';
import resetErrors from '../formHandlers/loginForm/resetErrors.js';

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
        resetErrors: () => resetErrors(setLoginError, setRecoverError, setSuccessMessage),
        handleContinue: () => handleContinue({ username, setLoginError, setName, setStep }),
        handleLogin: (e) => handleLogin({ e, username, password, rememberMe, navigate, setLoginError }),
        handleRecoverPassword: () => handleRecoverPassword({ username, setRecoverError, setSuccessMessage, setShowPopup })
    };
}