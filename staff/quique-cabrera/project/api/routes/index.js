import usersRouter from './users/index.js'; // Importa el enrutador de usuarios desde el módulo users
import sessionsRouter from './sessions/index.js'; // Importa el enrutador de sesiones desde el módulo sessions

// Registrar los logs de importación de los enrutadores
console.log("📥 Importando enrutador de usuarios desde './users/index.js'");
console.log("📥 Importando enrutador de sesiones desde './sessions/index.js'");

// Exporta los enrutadores para su uso en otras partes de la aplicación
console.log("📤 Exportando enrutadores: usersRouter y sessionsRouter");
export {
    usersRouter,
    sessionsRouter
};

console.log("✅ Módulo de enrutadores configurado y exportado correctamente");