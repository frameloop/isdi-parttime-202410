import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Asegurar que solo haya un Router
import App from './App';
import './main.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
