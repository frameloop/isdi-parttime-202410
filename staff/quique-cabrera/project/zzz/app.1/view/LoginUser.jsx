import React, { useState } from 'react';

function LoginUser() {
    const [step, setStep] = useState(1); // Track the current step
    const [email, setEmail] = useState(''); // Store email input
    const [password, setPassword] = useState(''); // Store password input

    return (
        <div className="w-screen h-screen bg-[#E1F56E] flex flex-col justify-center items-center">
            {/* Logo and title */}
            <img
                src="/util/logo_sesiona.png"
                alt="Logo Sesiona"
                className="max-w-[50%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mb-2"
            />

            {/* Step 1: Enter Email */}
            {step === 1 && (
                <>
                    <label className="text-black font-semibold mb-2">Your email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-64 p-2 border border-gray-400 rounded-md mb-4"
                    />
                    <button
                        onClick={() => setStep(2)} // Move to Step 2
                        className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Continue
                    </button>
                </>
            )}

            {/* Step 2: Enter Password */}
            {step === 2 && (
                <>
                    <p className="text-black font-semibold">Hello again</p>
                    <p className="text-black mb-4">{email}</p>

                    <label className="text-black font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-64 p-2 border border-gray-400 rounded-md mb-2"
                    />

                    <p className="text-black text-sm underline cursor-pointer mb-2">Forgot your password?</p>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-black text-sm">Remember your details</label>
                    </div>

                    <button
                        className="bg-[#B62682] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all"
                    >
                        Log in
                    </button>
                </>
            )}

            {/* Footer */}
            <footer className="absolute bottom-4 text-black text-sm font-semibold">
                emestudi © 2025
            </footer>
        </div>
    );
}

export default LoginUser;
