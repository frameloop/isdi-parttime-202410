import getUsserSession from './getUserSession'; // Importa la función para obtener la sesión del usuario
import recoverPassword from './recoverPassword'; // Importa la función para manejar la recuperación de contraseña
import loginUser from './loginUser'; // Importa la función para autenticar un usuario
import logoutUser from './logoutUser'; // Importa la función para cerrar sesión

// Registrar las importaciones de las funciones
console.log("📥 Importando función getUsserSession desde './getUserSession'");
console.log("📥 Importando función recoverPassword desde './recoverPassword'");
console.log("📥 Importando función loginUser desde './loginUser'");
console.log("📥 Importando función logoutUser desde './logoutUser'");

// Definir el objeto logic que agrupa las funciones de lógica
const logic = {
    loginUser, // Función para iniciar sesión
    getUsserSession, // Función para obtener la sesión del usuario
    recoverPassword, // Función para manejar la recuperación de contraseña
    logoutUser // Función para cerrar sesión
};
console.log("✅ Objeto logic creado con las funciones: loginUser, getUsserSession, recoverPassword, logoutUser");

// Exportar el objeto logic
console.log("📤 Exportando el objeto logic");
export default logic;

console.log("✅ Módulo de lógica configurado y exportado correctamente");