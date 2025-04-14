export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// Formato de fecha y hora - Miércoles, 30 de abril de 2025
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const lowercase = date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toLowerCase();

    // Capitaliza la primera letra de la frase
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
};

// Formato de fecha y hora - 30/04/2025, 09:00
export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};


