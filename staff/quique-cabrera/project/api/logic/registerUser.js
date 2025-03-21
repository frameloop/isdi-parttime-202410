import { User, Photographer } from '../data/models.js';
import { validate, errors } from 'com';
import bcrypt from 'bcryptjs';

const { DuplicityError, SystemError } = errors;

const registerUser = async (name, email, phone, username, password, role, coverage) => {
    try {
        console.log('[registerUser] 🚀 Iniciando registro de usuario:', { username, role });

        validate.name(name);
        validate.email(email);
        validate.phone(phone);
        validate.username(username);
        validate.password(password);

        // Validar role
        if (!['customer', 'photographer', 'administrator'].includes(role)) {
            throw new SystemError('Rol de usuario no válido');
        }

        // Validar coverage para fotógrafos
        if (role === 'photographer' && !coverage) {
            throw new SystemError('El área de cobertura es requerida para fotógrafos');
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            console.warn(`[registerUser] ⚠️ Usuario ya existe:`, { email, username });
            throw new DuplicityError('El usuario ya está registrado');
        }

        // Crear el usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await new User({
            name,
            email,
            phone,
            username,
            password: hashedPassword,
            role
        }).save();

        console.log(`[registerUser] ✅ Usuario creado:`, { id: user._id, username, role });

        // Si es fotógrafo, crear el perfil
        if (role === 'photographer') {
            console.log(`[registerUser] 📸 Creando perfil de fotógrafo para:`, { id: user._id, username });

            // Verificar si ya existe un perfil de fotógrafo para este usuario
            const existingPhotographer = await Photographer.findOne({ user: user._id });

            if (!existingPhotographer) {
                await new Photographer({
                    user: user._id,
                    coverage_area: coverage,
                    sessions: []
                }).save();
                console.log(`[registerUser] ✅ Perfil de fotógrafo creado para:`, { id: user._id, username });
            } else {
                console.warn(`[registerUser] ⚠️ El perfil de fotógrafo ya existe para:`, { id: user._id, username });
            }
        }

        return user;
    } catch (error) {
        console.error('[registerUser] ❌ Error:', error);
        if (error instanceof DuplicityError) throw error;
        throw new SystemError(error.message);
    }
};

export default registerUser;
