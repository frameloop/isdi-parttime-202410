import logic from '../../../logic/index.js';

export default (req, res, next) => {
    try {
        const { name, email, phone, username, password, role, coverage_area } = req.body;

        if (!name || !email || !phone || !username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validación específica para fotógrafos
        if (role === 'photographer' && !coverage_area) {
            return res.status(400).json({ error: 'Coverage area is required for photographers' });
        }

        console.log(`[registerUserHandler] 🚀 Processing request for username: ${username}, role: ${role}`);

        if (!global.processingUsers) global.processingUsers = {};
        if (global.processingUsers[username]) {
            console.warn(`[registerUserHandler] ⏳ Duplicate request detected for: ${username}`);
            return res.status(429).json({ error: 'Duplicate request detected' });
        }

        global.processingUsers[username] = true;

        logic.registerUser(name, email, phone, username, password, role, coverage_area)
            .then(user => {
                console.log(`[registerUserHandler] ✅ User successfully registered: ${username}`);
                res.status(201).json({
                    success: true,
                    message: role === 'photographer' ? 'Photographer registered successfully' : 'User registered successfully',
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        role: user.role
                    }
                });
            })
            .catch(error => {
                console.error(`[registerUserHandler] ❌ Error registering user: ${username}`, error);

                if (error.name === 'DuplicityError') {
                    return res.status(409).json({ error: 'El usuario ya está registrado' });
                }

                next(error);
            })
            .finally(() => {
                console.log(`[registerUserHandler] 🔓 Releasing lock for: ${username}`);
                delete global.processingUsers[username];
            });

    } catch (error) {
        console.error(`[registerUserHandler] ❌ Fatal error: ${error.message}`);
        next(error);
    }
};
