export const getBlockedTimesForDate = (date, sessions, availability) => {
    // Formatear la fecha de manera consistente
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const blocked = [];

    // Formato y comparación consistente para las fechas
    const formatDateToCompare = (dateStr) => {
        const d = new Date(dateStr);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    // Bloqueo por sesiones
    sessions.filter(s => formatDateToCompare(s.date) === formattedDate)
        .forEach(session => {
            const sessionStart = new Date(session.date);
            const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);
            for (let t = new Date(sessionStart); t < sessionEnd; t.setMinutes(t.getMinutes() + 30)) {
                blocked.push(`${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`);
            }
        });

    // Bloqueo por disponibilidad
    availability.filter(a => formatDateToCompare(a.date) === formattedDate)
        .forEach(slot => {
            const start = new Date(slot.startDate);
            const end = new Date(slot.endDate);
            for (let t = new Date(start); t <= end; t.setMinutes(t.getMinutes() + 30)) {
                const time = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
                if (!blocked.includes(time)) blocked.push(time);
            }
        });

    return blocked;
};
