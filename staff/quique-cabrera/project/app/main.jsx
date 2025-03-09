import { createRoot } from 'react-dom/client'; // Importa createRoot para renderizar la app de React
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para manejar el enrutamiento (solo un Router)
import App from './App'; // Importa el componente principal de la aplicación
import './main.css'; // Importa los estilos globales

// Registrar las importaciones para depuración
console.log("📥 Importando createRoot desde 'react-dom/client'");
console.log("📥 Importando BrowserRouter desde 'react-router-dom'");
console.log("📥 Importando componente App desde './App'");
console.log("📥 Importando estilos desde './main.css'");

// Obtener el elemento raíz del DOM donde se montará la aplicación
const rootElement = document.getElementById('root');
console.log("🔍 Verificando elemento raíz:", rootElement ? "Elemento encontrado" : "Elemento no encontrado");

// Crear la raíz para renderizar la aplicación
console.log("🌱 Creando raíz para renderizar la aplicación");
const root = createRoot(rootElement);
console.log("✅ Raíz creada exitosamente");

// Renderizar la aplicación dentro de BrowserRouter
console.log("🎨 Renderizando la aplicación con BrowserRouter");
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

console.log("✅ Aplicación renderizada correctamente");