import logic from '../../../logic/index.js'; // Importa el módulo de lógica que contiene registerUser

// Handler para registrar un nuevo usuario
export default (req, res, next) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { name, email, phone, username, password, role } = req.body;
        console.log(`📝 Solicitud de registro recibida para el usuario: ${username || 'No username provided'}`);
        console.log(`👤 Datos recibidos - Nombre: ${name}, Email: ${email}, Teléfono: ${phone}, Rol: ${role}`);

        // Registrar el usuario utilizando la función registerUser del módulo logic
        console.log(`🔧 Iniciando registro del usuario con username: ${username}`);
        logic.registerUser(name, email, phone, username, password, role)
            .then(() => {
                console.log(`✅ Usuario registrado exitosamente: ${username}`);
                res.status(201).send();
            })
            .catch(error => {
                console.warn(`⚠ Error al registrar usuario: ${username}`);
                console.log(`❌ Detalle del error en promise: ${error.message}`);
                next(error);
            });
    } catch (error) {
        console.error("🚨 Error en el registro del usuario:", error);
        console.log(`❌ Detalle del error en try-catch: ${error.message}`);
        next(error);
    }
};