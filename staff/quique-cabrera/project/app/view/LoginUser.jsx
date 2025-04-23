import React from 'react';
import useLoginForm from '../hooks/useLoginForm';
import LoginStepUsername from './components/LoginStepUsername';
import LoginStepPassword from './components/LoginStepPassword';
import RecoverPasswordModal from './components/RecoverPasswordModal';

function LoginUser() {
    const {
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
    } = useLoginForm();

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            <img
                src="/util/logo_sesiona.png"
                alt="Logo Sesiona"
                className="max-w-[50%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mb-6"
            />

            {step === 1 ? (
                <LoginStepUsername
                    username={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        resetErrors();
                    }}
                    onContinue={handleContinue}
                    error={loginError}
                />
            ) : (
                <LoginStepPassword
                    name={name}
                    password={password}
                    showPassword={showPassword}
                    rememberMe={rememberMe}
                    successMessage={successMessage}
                    loginError={loginError}
                    recoverError={recoverError}
                    onChangePassword={(e) => setPassword(e.target.value)}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    onToggleRememberMe={() => setRememberMe(!rememberMe)}
                    onRecoverPasswordClick={() => {
                        setShowPopup(true);
                        resetErrors();
                    }}
                    onSubmit={handleLogin}
                />
            )}

            {showPopup && (
                <RecoverPasswordModal
                    onConfirm={handleRecoverPassword}
                    onCancel={() => {
                        setShowPopup(false);
                        resetErrors();
                    }}
                />
            )}

            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default LoginUser;