import { createContext, useContext } from 'react'; // Importa createContext y useContext de React para manejar el contexto

// Registrar las importaciones para depuración
console.log("📥 Importando createContext y useContext desde 'react'");

// Crear el contexto de la aplicación
console.log("🌐 Creando contexto de la aplicación (AppContext)");
const AppContext = createContext();
console.log("✅ Contexto AppContext creado exitosamente");

// Definir el hook personalizado para usar el contexto
console.log("🔧 Definiendo hook personalizado useAppContext");
const useAppContext = () => {
    console.log("🔍 Usando el contexto AppContext");
    const context = useContext(AppContext);
    console.log("✅ Contexto obtenido:", context);
    return context;
};

// Registrar la exportación de los componentes
console.log("📤 Exportando AppContext y useAppContext");
export {
    AppContext,
    useAppContext
};

console.log("✅ Módulo de contexto configurado y exportado correctamente");