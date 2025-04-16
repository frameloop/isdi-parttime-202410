import { createContext, useContext } from 'react'; // Importa createContext y useContext de React para manejar el contexto

// Crear el contexto de la aplicación
const AppContext = createContext();

// Hook personalizado para usar el contexto con manejo de errores
const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext debe ser usado dentro de un AppContext.Provider');
    }

    return context;
};

// Registrar la exportación de los componentes
export {
    AppContext,
    useAppContext
};