import usersRouter from './users/index.js';
import sessionsRouter from './sessions/index.js';

console.log("Importando enrutador de usuarios desde './users/index.js'");
console.log("Importando enrutador de sesiones desde './sessions/index.js'");

console.log("Exportando enrutadores: usersRouter y sessionsRouter");
export {
    usersRouter,
    sessionsRouter
};

console.log("Módulo de enrutadores configurado y exportado correctamente");