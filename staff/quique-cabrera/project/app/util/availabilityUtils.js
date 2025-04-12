export const getBlockedTimesForDate = (date, sessions, availability) => {
    const formattedDate = date.toISOString().split("T")[0];
    const blocked = [];

    // Bloqueo por sesiones
    sessions.filter(s => new Date(s.date).toISOString().split("T")[0] === formattedDate)
        .forEach(session => {
            const sessionStart = new Date(session.date);
            const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000);
            for (let t = new Date(sessionStart); t < sessionEnd; t.setMinutes(t.getMinutes() + 30)) {
                blocked.push(`${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`);
            }
        });

    // Bloqueo por disponibilidad
    availability.filter(a => new Date(a.date).toISOString().split("T")[0] === formattedDate)
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
